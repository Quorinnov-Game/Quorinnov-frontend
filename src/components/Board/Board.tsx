import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Player } from '../../@types/player';
import InfoPanel from '../Controls/InfoPanel';
import { TYPES_COLOR } from '../../pages/Game';
import VictoryOverlay from '../Effect/VictoryOverlay';
import DefeatOverlay from '../Effect/DefeatOverlay';

export const BOARD_SIZE = 9;
export const GAP_CELLULE = 10;
export const GRID_SIZE = 50;
const NAME_PLAYER = "Player 1";
type BoardProps = {
    playerColor: TYPES_COLOR,
}

const Board: React.FC<BoardProps> = ({ playerColor }) => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const initialPlayers = {
        P1: {
            id: 1,
            color: playerColor,
            name: NAME_PLAYER,
            position: { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) },
            wallsRemaining: 10,
            isWinner: false,
            isPlayer: true,
        },
        P2: {
            id: 2,
            color: playerColor === "red" ? "bleu" : "rouge",
            name: "AI",
            position: { x: 0, y: Math.floor(BOARD_SIZE / 2) },
            wallsRemaining: 10,
            isWinner: false,
            isPlayer: false,
        }
    }

    const [players, setPlayers] = useState<{ P1: Player, P2: Player }>(initialPlayers);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [turn, setTurn] = useState<"P1" | "P2">("P1")
    const [victory, setVictory] = useState(false);

    useEffect(() => {
        if (!playerColor) return;

        setPlayers({
            P1: {
                id: 1,
                color: playerColor,
                name: NAME_PLAYER,
                position: { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) },
                wallsRemaining: 10,
                isWinner: false,
                isPlayer: true,
            },
            P2: {
                id: 2,
                color: playerColor === "red" ? "blue" : "red",
                name: "AI",
                position: { x: 0, y: Math.floor(BOARD_SIZE / 2) },
                wallsRemaining: 10,
                isWinner: false,
                isPlayer: false,
            }
        });
    }, [playerColor]);

    const handleSelectPlayer = (player: Player) => {
        if (selectedPlayer && selectedPlayer.id === player.id) {
            setSelectedPlayer(null);
        }
        else {
            setSelectedPlayer(player);
        }
    };

    const getValidMoves = () => {
        if (!selectedPlayer) return [];
        const { x, y } = selectedPlayer.position;
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
        ];

        const validMoves: { x: number, y: number }[] = [];
        for (const { dx, dy } of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Si ce n'est pas sur le tableau, sautez-le
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) continue;

            // Vérifier si la cellule a un adversaire
            if (players.P2.position.x === nx && players.P2.position.y === ny) {
                const jumpX = nx + dx;
                const jumpY = ny + dy;

                // Si après P2 il y a une case vide sur le plateau, sautez par-dessus.
                if (jumpX >= 0 && jumpX < BOARD_SIZE && jumpY >= 0 && jumpY < BOARD_SIZE) {
                    validMoves.push({ x: jumpX, y: jumpY });
                }
            } else {
                // Si c'est une cellule vide normale
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

        if (x === 0) {
            setVictory(true);
            players.P1.isWinner = true;
        }
        else if ( players.P2.position.x === BOARD_SIZE - 1) {
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
                    padding: "16px",
                    aspectRatio: "1/1",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid black",
                    borderRadius: "8px",
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
            </Box>

            {victory && <VictoryOverlay players={players}/>}
            {/* {victory && <DefeatOverlay/>} */}

            <InfoPanel players={players} turn={turn} />
        </Box>
    );
};

export default Board;