import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Player } from '../../@types/player';
import InfoPanel from '../Controls/InfoPanel';
import { COLOR_P1, COLOR_P2, TYPES_COLOR } from '../../pages/Game';
import VictoryOverlay from '../Effect/VictoryOverlay';
import DefeatOverlay from '../Effect/DefeatOverlay';
import { Position, Wall } from '../../@types/game';
import WallPlacer from './WallPlacer';
import WallFix from './WallFix';
import AxiosInstance from '../../api/AxiosInstance';

export const BOARD_SIZE = 9;
export const GAP_CELLULE = 10;
export const GRID_SIZE = 50;
export const PADDING_BOARD = 8;
export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";
export const NAME_PLAYER1 = "Player1";
export const NAME_PLAYER2 = "Player2";
type BoardProps = {
    playerColor: TYPES_COLOR,
}

const Board: React.FC<BoardProps> = ({ playerColor }) => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const initialPlayers = {
        P1: {
            id: 1,
            color: playerColor,
            name: NAME_PLAYER1,
            position: { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) },
            wallsRemaining: 10,
            isWinner: false,
            isPlayer: true,
        },
        P2: {
            id: 2,
            color: playerColor === COLOR_P1 ? COLOR_P2 : COLOR_P1,
            name: NAME_PLAYER2,
            position: { x: 0, y: Math.floor(BOARD_SIZE / 2) },
            wallsRemaining: 10,
            isWinner: false,
            isPlayer: true,
        }
    }

    const [players, setPlayers] = useState<{ P1: Player, P2: Player }>(initialPlayers);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [turn, setTurn] = useState<"P1" | "P2">("P1")
    const [victory, setVictory] = useState(false);
    const [walls, setWalls] = useState<Wall[]>([]);
    const [temporaryWall, setTemporaryWall] = useState<Wall | null>(null);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        }
        window.addEventListener("beforeunload", handleBeforeUnload);

        if (!playerColor) return;

        setPlayers({
            P1: {
                ...initialPlayers.P1,
                color: playerColor,
            },
            P2: {
                ...initialPlayers.P2,
                color: playerColor === COLOR_P1 ? COLOR_P2 : COLOR_P1,
            }
        });

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [playerColor]);

    const handleSelectPlayer = (player: Player) => {
        if (turn === (player.id === 1 ? "P1" : "P2")) {
            if (selectedPlayer && selectedPlayer.id === player.id) {
                setSelectedPlayer(null);
            } else {
                setSelectedPlayer(player);
            }
        }
    };

    const isPathBlockedByWall = (currentPos: Position, targetPos: Position): boolean => {
        return walls.some(wall => {
            // Di chuyển theo chiều dọc (x thay đổi, y không đổi)
            if (currentPos.y === targetPos.y) {
                const minX = Math.min(currentPos.x, targetPos.x);
                if (wall.orientation === HORIZONTAL) {
                    // Kiểm tra tường ngang
                    return (
                        wall.position.x === minX && // Tường ngang nằm giữa vị trí hiện tại và đích
                        (wall.position.y === currentPos.y || wall.position.y + 1 === currentPos.y) // Tường có thể bắt đầu tại y hoặc kết thúc tại y+1
                    );
                }
            }

            // Di chuyển theo chiều ngang (y thay đổi, x không đổi)
            if (currentPos.x === targetPos.x) {
                const minY = Math.min(currentPos.y, targetPos.y);
                if (wall.orientation === VERTICAL) {
                    // Kiểm tra tường dọc
                    return (
                        wall.position.y === minY && // Tường dọc nằm giữa vị trí hiện tại và đích
                        (wall.position.x === currentPos.x || wall.position.x + 1 === currentPos.x) // Tường có thể bắt đầu tại x hoặc kết thúc tại x+1
                    );
                }
            }

            return false;
        });
    };

    const getValidMoves = () => {
        if (!selectedPlayer) return [];
        const { x, y } = selectedPlayer.position;
        const directions = [
            { dx: -1, dy: 0 }, // Haut
            { dx: 1, dy: 0 }, // Bas
            { dx: 0, dy: -1 }, // Gauche
            { dx: 0, dy: 1 }, // Droite
        ];

        const validMoves: Position[] = [];
        for (const { dx, dy } of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Si ce n'est pas sur le tableau, sautez-le
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) continue;

            // Vérifier si le chemin est bloqué par un mur
            if (isPathBlockedByWall(selectedPlayer.position, { x: nx, y: ny })) continue;

            const otherPlayer = Object.values(players).find(
                p => p.position.x === nx && p.position.y === ny
            );

            if (otherPlayer) {
                const jumpX = nx + dx;
                const jumpY = ny + dy;

                // TH1: Có thể nhảy qua thẳng
                if (
                    jumpX >= 0 && jumpX < BOARD_SIZE &&
                    jumpY >= 0 && jumpY < BOARD_SIZE &&
                    !isPathBlockedByWall({ x: nx, y: ny }, { x: jumpX, y: jumpY }) &&
                    !Object.values(players).some(p => p.position.x === jumpX && p.position.y === jumpY)
                ) {
                    validMoves.push({ x: jumpX, y: jumpY });
                } else {
                    // TH2: Không thể nhảy thẳng qua do bị tường, cho phép nhảy chéo
                    const isVertical = dx !== 0;
                    const sideDirs = isVertical
                        ? [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }]  // nếu đối thủ đứng trên/dưới
                        : [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }]; // nếu đối thủ đứng trái/phải

                    for (const side of sideDirs) {
                        const sideX = nx + side.dx;
                        const sideY = ny + side.dy;
                        if (
                            sideX >= 0 && sideX < BOARD_SIZE &&
                            sideY >= 0 && sideY < BOARD_SIZE &&
                            !isPathBlockedByWall({ x: nx, y: ny }, { x: sideX, y: sideY }) &&
                            !Object.values(players).some(p => p.position.x === sideX && p.position.y === sideY)
                        ) {
                            validMoves.push({ x: sideX, y: sideY });
                        }
                    }
                }
            } else {
                validMoves.push({ x: nx, y: ny });
            }
        }
        return validMoves;
    };

    const movePlayer = (x: number, y: number) => {
        if (!selectedPlayer) return;
        if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) return;

        const isLegalMove = getValidMoves().some(pos => pos.x === x && pos.y === y);
        if (!isLegalMove) return;

        if (selectedPlayer.id === 1 && x === 0) {
            setVictory(true);
            players.P1.isWinner = true;
        }
        else if (selectedPlayer.id === 2 && x === BOARD_SIZE - 1) {
            setVictory(true);
            players.P2.isWinner = true;
        }

        setPlayers(prev => ({
            ...prev,
            [selectedPlayer.id === 1 ? "P1" : "P2"]: {
                ...selectedPlayer,
                position: { x, y }
            }
        }));
        setSelectedPlayer(null);
        setTurn(prev => prev === "P1" ? "P2" : "P1")
    };

    const handlePlaceWall = async (wall: Wall) => {
        const currentPlayer = players[turn];
        if (wall.playerId !== currentPlayer.id || currentPlayer.wallsRemaining <= 0) return;

        // // Vérifiez si le mur est valide dans les limites du tableau
        // const isValidHorizontal = wall.position.x >= 0 && wall.position.x < BOARD_SIZE - 1 &&
        //     wall.position.y > 0 && wall.position.y < BOARD_SIZE &&
        //     wall.orientation === HORIZONTAL;
        // const isValidVertical = wall.position.x > 0 && wall.position.x < BOARD_SIZE &&
        //     wall.position.y >= 0 && wall.position.y < BOARD_SIZE - 1 &&
        //     wall.orientation === VERTICAL;

        // // Vérifiez si le mur ne chevauche pas un autre mur
        // const isOverlappingWall = walls.some(
        //     w => (
        //         w.position.x === wall.position.x &&
        //         w.position.y === wall.position.y &&
        //         w.orientation === wall.orientation
        //     )
        // );

        // // Vérifiez si le mur croise un autre mur
        // const isCrossingWall = walls.some((w) => {
        //     if (wall.orientation === HORIZONTAL && w.orientation === VERTICAL) {
        //         // mur horizontal croise mur vertical
        //         return (
        //             (wall.position.x === w.position.x - 1 &&
        //                 wall.position.y === w.position.y + 1)
        //         );
        //     } else if (wall.orientation === VERTICAL && w.orientation === HORIZONTAL) {
        //         // mur vertical croise mur horizontal
        //         return (
        //             (wall.position.x === w.position.x + 1 &&
        //                 wall.position.y === w.position.y - 1)
        //         );
        //     }
        //     return false;
        // });

        // const isValid = (isValidHorizontal || isValidVertical) &&
        //     !isOverlappingWall &&
        //     !isCrossingWall &&
        //     players.P1.wallsRemaining > 0;

        // if (!isValid) return;

        setTemporaryWall(wall);
    };

    const handleValidateWall = async () => {
        if (!temporaryWall) return;
        try {
            const reponse = await AxiosInstance.post("/place_wall", {
                player_id: players[turn].id,
                x: temporaryWall.position.x,
                y: temporaryWall.position.y,
                orientation: temporaryWall.orientation,
                is_valid: true,
            })

            if (!reponse.data.success) {
                alert("Invalid wall placement");
                return;
            }
            else {
                setWalls(prev => [...prev, temporaryWall]);
                setPlayers(prev => ({
                    ...prev,
                    [turn]: {
                        ...prev[turn],
                        wallsRemaining: prev[turn].wallsRemaining - 1
                    }
                }));
                setTemporaryWall(null);
                setTurn(prev => prev === "P1" ? "P2" : "P1");
            }
        }
        catch (error) {
            console.error("Error validating wall:", error);
        }
    }

    const handleCancelWall = () => {
        setTemporaryWall(null);
    }

    return (
        <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "center" : "normal"}
            justifyContent={isMobile ? "center" : "normal"}
            gap={4}

        >
            <Box
                display="grid"
                gridTemplateColumns={`repeat(${BOARD_SIZE}, ${isMobile ? 30 : GRID_SIZE}px)`}
                gridTemplateRows={`repeat(${BOARD_SIZE}, ${isMobile ? 30 : GRID_SIZE}px)`}
                gap={`${isMobile ? 6 : GAP_CELLULE}px`}
                sx={{
                    position: "relative",
                    width: "max-content",
                    margin: "auto",
                    padding: `${PADDING_BOARD}px`,
                    aspectRatio: "1/1",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #bdbdbd",
                    borderRadius: "8px",
                    boxShadow: `5px 5px 10px rgb(9, 136, 92), -5px -5px 10px rgb(9, 136, 92)`,
                }}
            >
                {Array.from({ length: BOARD_SIZE }, (_, x) => (
                    Array.from({ length: BOARD_SIZE }, (_, y) => (
                        <Square
                            x={x}
                            y={y}
                            players={players}
                            selectedPlayer={selectedPlayer}
                            onSelectPlayer={handleSelectPlayer}
                            onMovePlayer={movePlayer}
                            isValidMove={getValidMoves().some(pos => pos.x === x && pos.y === y)}
                            turn={turn}
                        />
                    ))
                ))}
                {walls.map((wall, index) => (
                    <WallFix
                        key={index}
                        wall={wall}
                    />
                ))}
                {temporaryWall && (
                    <WallFix
                        wall={temporaryWall}
                        isTemporary={true}
                    />
                )}
                <WallPlacer
                    playerId={players[turn].id}
                    onPlaceWall={handlePlaceWall}
                    walls={walls}
                />
            </Box>

            {victory && <VictoryOverlay players={players} />}
            {/* {victory && <DefeatOverlay/>} */}

            <InfoPanel
                players={players}
                turn={turn}
                onValidateWall={handleValidateWall}
                onCancelWall={handleCancelWall}
                showWallControls={!!temporaryWall}
            />
        </Box>
    );
};

export default Board;