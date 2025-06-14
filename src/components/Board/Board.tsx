import { Alert, Box, Snackbar, useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import Square from './Square';
import { Player } from '../../@types/player';
import InfoPanel from '../Controls/InfoPanel';
import { COLOR_P1, COLOR_P2, TYPES_COLOR } from '../../pages/Game';
import VictoryOverlay from '../Effect/VictoryOverlay';
import DefeatOverlay from '../Effect/DefeatOverlay';
import { Position, TurnHistory, TurnState, Wall } from '../../@types/game';
import WallPlacer from './WallPlacer';
import WallFix from './WallFix';
import AxiosInstance from '../../api/AxiosInstance';
import { useSound } from '../../hooks/useSound';
import { SOUND_KEYS } from '../../constants/sound';
import { useAIMove } from '../../hooks/useAIMove';

/**
 * Composant principal du plateau de jeu
 * @description 
 * Gère l'état global du jeu, incluant:
 * - La position des joueurs
 * - Le placement des murs
 * - Les tours de jeu
 * - Le mode IA
 * - L'historique des coups
 */

export const BOARD_SIZE = 9; // Taille du plateau (9x9)
export const GAP_CELLULE = 10; // Espacement entre les cellules
export const GRID_SIZE = 50; // Taille des cellules
export const PADDING_BOARD = 8; // Marge interne du plateau
export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";
export const NAME_PLAYER1 = "Player1";
export const NAME_PLAYER2 = "Player2";
export const ACTION_MOVE = "move";
export const ACTION_PLACE_WALL = "placeWall";

type BoardProps = {
    isVsAI: boolean;
    aiDifficulty: number | null;
    playerColor: TYPES_COLOR,
    gameId: number | null,
    onTurnUpdate?: (turnNumber: number) => void;
}

export interface BoardRef {
    totalTurns: number;
    updateBoardHistory: (history: TurnHistory) => void;
    resetViewMode: () => void;
}

type ActionType = "move" | "placeWall" | null;
type MessageState = {
    text: string | null;
    type: "error" | "warning";
    isVsAI?: boolean;
}

const directions = [
    { dx: -1, dy: 0 }, // Haut
    { dx: 1, dy: 0 }, // Bas
    { dx: 0, dy: -1 }, // Gauche
    { dx: 0, dy: 1 }, // Droite
];

// Using React.forwardRef to allow parent components to access the Board's methods and state
const Board = React.forwardRef<BoardRef, BoardProps>(({ playerColor, gameId, isVsAI, aiDifficulty, onTurnUpdate }, ref) => {
    const { play } = useSound();
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
    const [defeat, setDefeat] = useState(false);
    const [walls, setWalls] = useState<Wall[]>([]);
    const [temporaryWall, setTemporaryWall] = useState<Wall | null>(null);
    const [action, setAtion] = useState<ActionType>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState<MessageState>({ text: null, type: "warning" });
    const [totalTurns, setTotalTurns] = useState(0);
    const [isViewingHistory, setIsViewingHistory] = useState(false);

    // Sauvegarde de l'état actuel du jeu pour le mode historique
    const [currentGameState, setCurrentGameState] = useState<TurnState>({
        players: initialPlayers,
        walls: [],
        turn: "P1"
    });

    // Référence pour le composant Board
    useImperativeHandle(ref, () => ({
        totalTurns,
        updateBoardHistory,
        resetViewMode,
    }), [totalTurns, currentGameState]);

    const changeTurn = () => {
        setTurn(prev => prev === "P1" ? "P2" : "P1");
        setAtion(null);
        showMessage(`Transférer de tour à ${players[turn === "P1" ? "P2" : "P1"].name}`);
    }

    // Hook pour gérer les mouvements de l'IA
    useAIMove({
        isVsAI,
        isViewingHistory,
        victory,
        turn,
        players,
        gameId,
        aiDifficulty,
        onUpdatePlayers: setPlayers,
        onUpdateWalls: setWalls,
        onDefeat: () => {
            setDefeat(true);
            setPlayers(prev => ({
                ...prev,
                P2: { ...prev.P2, isWinner: true }
            }));
        },
        onChangeTurn: changeTurn,
    });

    useEffect(() => {
        if (!isViewingHistory) {
            const newGameState: TurnState = {
                players: {
                    P1: { ...players.P1 },
                    P2: { ...players.P2 }
                },
                walls: [...walls],
                turn: turn
            };
            setCurrentGameState(newGameState);
        }

        if (onTurnUpdate) {
            onTurnUpdate(totalTurns);
        }
        
    }, [totalTurns, onTurnUpdate, isViewingHistory]);

    // Gestion de la sélection d'un joueur pour le déplacement
    const handleSelectPlayer = (player: Player) => {
        if (isViewingHistory) {
            showMessage("Impossible de jouer en mode historique");
            return;
        }

        if (isVsAI && players[turn].id === 2) {
            showMessage("L'IA est en train de réfléchir, veuillez patienter");
            return;
        }

        if (action === ACTION_PLACE_WALL) {
            showMessage("Vous êtes en train de placer un mur, impossible de déplacer");
            return;
        };

        if (players[turn].id !== player.id) {
            showMessage(`C'est le tour de ${players[turn].name}`);
            return;
        }

        if (selectedPlayer && selectedPlayer.id === player.id) {
            setSelectedPlayer(null);
            setAtion(null);
        } else {
            setSelectedPlayer(player);
            setAtion(ACTION_MOVE);
        }
    };

    const isPathBlockedByWall = (currentPos: Position, targetPos: Position): boolean => {
        return walls.some(wall => {
        // Déplacer verticalement (x change, y reste constant)
            if (currentPos.y === targetPos.y) {
                const minX = Math.min(currentPos.x, targetPos.x);
                if (wall.orientation === HORIZONTAL) {
                    // Vérifier le mur horizontal
                    return (
                        wall.position.x === minX && // Mur horizontal entre la position actuelle et la position cible
                        (wall.position.y === currentPos.y || wall.position.y + 1 === currentPos.y) // Le mur peut commencer à y ou se terminer à y+1
                    );
                }
            }

        // Déplacer horizontalement (y change, x reste constant)
            if (currentPos.x === targetPos.x) {
                const minY = Math.min(currentPos.y, targetPos.y);
                if (wall.orientation === VERTICAL) {
                    // Vérifier le mur vertical
                    return (
                        wall.position.y === minY && // Mur vertical entre la position actuelle et la position cible
                        (wall.position.x === currentPos.x || wall.position.x + 1 === currentPos.x) // Le mur peut commencer à x ou se terminer à x+1
                    );
                }
            }

            return false;
        });
    };

    const getValidMoves = () => {
        if (!selectedPlayer) return [];
        const { x, y } = selectedPlayer.position;

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

                // Cas 1 : Peut sauter directement par-dessus
                if (
                    jumpX >= 0 && jumpX < BOARD_SIZE &&
                    jumpY >= 0 && jumpY < BOARD_SIZE &&
                    !isPathBlockedByWall({ x: nx, y: ny }, { x: jumpX, y: jumpY }) &&
                    !Object.values(players).some(p => p.position.x === jumpX && p.position.y === jumpY)
                ) {
                    validMoves.push({ x: jumpX, y: jumpY });
                } else {
                    // Cas 2 : Impossible de sauter directement à travers le mur, saut en diagonale autorisé
                    const isVertical = dx !== 0;
                    const sideDirs = isVertical
                        ? [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }]  // si l'adversaire est au-dessus/en dessous
                        : [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }]; // si l'adversaire se tient à gauche/droite

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

    const movePlayer = async (x: number, y: number) => {
        if (!selectedPlayer || action !== ACTION_MOVE) return;
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

        try {
            const reponse = await AxiosInstance.post("/move", {
                player_id: players[turn].id,
                x: x,
                y: y,
            })
            console.log("Move response:", reponse.data);
            setPlayers(prev => ({
                ...prev,
                [turn]: {
                    ...prev[turn],
                    position: { x, y }
                }
            }));

            setSelectedPlayer(null);
            play(SOUND_KEYS.MOVE);
            setTotalTurns(prev => prev + 1);
            changeTurn();
            console.log("totalTurns", totalTurns);
        }
        catch (error) {
            console.error("Error validating wall:", error);
        }
    };

    const handlePlaceWall = (wall: Wall) => {
        if (isViewingHistory) {
            showMessage("Impossible de placer un mur en mode historique");
            return;
        }

        if (isVsAI && players[turn].id === 2) {
            showMessage("L'IA est en train de réfléchir, veuillez patienter");
            return;
        }

        if (action === ACTION_MOVE) {
            showMessage("Vous êtes en train de déplacer, impossible de placer un mur");
            return;
        };

        if (players[turn].id !== wall.playerId) {
            showMessage(`C'est le tour de ${players[turn].name}`);
            return;
        }

        const currentPlayer = players[turn];
        if (wall.playerId !== currentPlayer.id || currentPlayer.wallsRemaining <= 0) {
            showError("Vous n'avez plus de murs à placer !");
            return;
        }

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
        setAtion(ACTION_PLACE_WALL);
        play(SOUND_KEYS.PLACE_WALL);
    };

    const handleValidateWall = async () => {
        if (!temporaryWall || action !== ACTION_PLACE_WALL) {
            console.log('No temporary wall or wrong action');
            return;
        }

        // Vérifiez le chemin pour les deux joueurs avec un nouveau mur
        const testWalls = [...walls, temporaryWall];

        const p1HasPath = hasPathToGoal(players.P1, testWalls);
        const p2HasPath = hasPathToGoal(players.P2, testWalls);

        if (!p1HasPath || !p2HasPath) {
            console.log('Wall placement blocked path!');
            console.log('P1 has path:', p1HasPath);
            console.log('P2 has path:', p2HasPath);
            showError("Le mur bloque le chemin vers l'objectif! Placement invalide.");
            setTemporaryWall(null);
            setAtion(null);
            return;
        }

        try {
            const response = await AxiosInstance.post("/place_wall", {
                player_id: players[turn].id,
                x: temporaryWall.position.x,
                y: temporaryWall.position.y,
                orientation: temporaryWall.orientation,
                is_valid: true,
            });

            if (!response.data.success) {
                showError("Invalide de mur!");
                return;
            }

            setWalls(prev => [...prev, temporaryWall]);
            play(SOUND_KEYS.CORRECT);
            setPlayers(prev => ({
                ...prev,
                [turn]: {
                    ...prev[turn],
                    wallsRemaining: prev[turn].wallsRemaining - 1
                }
            }));
            setTemporaryWall(null);
            setTotalTurns(prev => prev + 1);
            changeTurn();
        } catch (error) {
            console.error("Error validating wall:", error);
        }
    };

    const handleCancelWall = () => {
        setTemporaryWall(null);
        setAtion(null);
    }

    const showMessage = (text: string) => {
        setMessage({ text, type: "warning" });
        setOpenSnackbar(true);
        play(SOUND_KEYS.MESSAGE);
    }

    const showError = (text: string) => {
        setMessage({ text, type: "error" });
        setOpenSnackbar(true);
        play(SOUND_KEYS.ERROR);
    }

    const updateBoardHistory = (history: TurnHistory) => {
        setIsViewingHistory(true);

        setPlayers(prev => ({
            P1: {
                ...prev.P1,
                position: history.position.player1,
            },
            P2: {
                ...prev.P2,
                position: history.position.player2,
            }
        }));

        setWalls(history.walls);
        setTurn(getTurnFromNumber(history.id));
    }

    const resetViewMode = useCallback(() => {
        setIsViewingHistory(false);
        
        setPlayers({
            P1: { ...currentGameState.players.P1 },
            P2: { ...currentGameState.players.P2 }
        });
        setWalls(currentGameState.walls);
        setTurn(currentGameState.turn);

        setSelectedPlayer(null);
        setTemporaryWall(null);
        setAtion(null);
    }, [currentGameState]);

    // Fonction pour vérifier les murs bloquant le chemin
    const isBlocked = (from: Position, to: Position, wallList: Wall[]): boolean => {
        // Vérifier placement horizontal
        if (from.y === to.y) {
            const minX = Math.min(from.x, to.x);
            return wallList.some(wall =>
                wall.orientation === HORIZONTAL &&
                wall.position.x === minX &&
                (wall.position.y === from.y || wall.position.y + 1 === from.y)
            );
        }
        // Vérifier placement vertical
        if (from.x === to.x) {
            const minY = Math.min(from.y, to.y);
            return wallList.some(wall =>
                wall.orientation === VERTICAL &&
                wall.position.y === minY &&
                (wall.position.x === from.x || wall.position.x + 1 === from.x)
            );
        }
        return false;
    };

    const hasPathToGoal = (player: Player, walls: Wall[]): boolean => {
        const visited = new Set<string>();
        const queue: Position[] = [player.position];
        const targetRow = player.id === 1 ? 0 : BOARD_SIZE - 1;

        while (queue.length > 0) {
            const current = queue.shift()!;
            const posKey = `${current.x},${current.y}`;

            // Vérifier si la position actuelle est la ligne cible
            if (current.x === targetRow) {
                console.log(`Found path to goal for Player ${player.id}!`);
                return true;
            }

            if (visited.has(posKey)) continue;
            visited.add(posKey);

            for (const { dx, dy } of directions) {
                const nextPos = {
                    x: current.x + dx,
                    y: current.y + dy
                };

                // Vérifier si la position suivante est dans les limites du tableau
                if (
                    nextPos.x < 0 ||
                    nextPos.x >= BOARD_SIZE ||
                    nextPos.y < 0 ||
                    nextPos.y >= BOARD_SIZE
                ) continue;

                // Vérifier si la position suivante est bloquée par un mur
                if (!isBlocked(current, nextPos, walls)) {
                    console.log('Valid next position:', nextPos);
                    queue.push(nextPos);
                } else {
                    console.log('Blocked path at:', nextPos);
                }
            }
        }

        return false;
    };

    const getTurnFromNumber = (turnNumber: number): "P1" | "P2" => {
        return turnNumber % 2 === 0 ? "P1" : "P2";
    };

    return (
        <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "center" : "normal"}
            justifyContent={isMobile ? "center" : "normal"}
            gap={4}
            sx={{
                pointerEvents: isViewingHistory ? "none" : "auto",
                position: "relative",
            }}
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
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    background: `
                        radial-gradient(at 40% 20%, hsla(28,100%,74%,0.3) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, hsla(189,100%,56%,0.3) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, hsla(355,100%,93%,0.3) 0px, transparent 50%),
                        radial-gradient(at 80% 50%, hsla(340,100%,76%,0.3) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, hsla(22,100%,77%,0.3) 0px, transparent 50%),
                        radial-gradient(at 80% 100%, hsla(242,100%,70%,0.3) 0px, transparent 50%),
                        radial-gradient(at 0% 0%, hsla(343,100%,76%,0.3) 0px, transparent 50%)
                    `,
                    animation: "boardGradient 15s ease infinite",
                    boxShadow: `
                        0 0 15px rgba(255, 255, 255, 0.1),
                        inset 0 0 15px rgba(255, 255, 255, 0.1)
                    `,
                    backdropFilter: "blur(10px)",
                    zIndex: 0,
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
            {defeat && <DefeatOverlay/>}

            <InfoPanel
                players={players}
                turn={turn}
                onValidateWall={handleValidateWall}
                onCancelWall={handleCancelWall}
                showWallControls={!!temporaryWall}
            />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    severity={message.type}
                    variant="filled"
                    sx={{
                        width: '100%',
                        backgroundColor: message.type === "warning" ? '#af9d18' : '#d32f2f',
                        color: 'white'
                    }}
                >
                    {message.text}
                </Alert>
            </Snackbar>
        </Box>
    );
});

export default Board;