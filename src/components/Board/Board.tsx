import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Player } from '../../@types/player';
import InfoPanel from '../Controls/InfoPanel';

export const BOARD_SIZE = 9;
export const GAP_CELLULE = 10;
export const GRID_SIZE = 50;
const NAME_PLAYER = "Player 1";
type BoardProps = {
    playerColor: "red" | "blue",
    isGameStarted: boolean,
}

const Board: React.FC<BoardProps> = ({ playerColor, isGameStarted }) => {
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
            color: playerColor === "red" ? "blue" : "red",
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
        const moves = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 }
        ];
        return moves.filter(pos =>
            pos.x >= 0 && pos.x < BOARD_SIZE &&
            pos.y >= 0 && pos.y < BOARD_SIZE
        );
    };

    const movePlayer = (x: number, y: number) => {
        if (!selectedPlayer || !selectedPlayer.isPlayer || turn !== "P1") return;
        if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) return;
        if (selectedPlayer) {
            const playerPosition = selectedPlayer.position;
            const dx = Math.abs(playerPosition.x - x);
            const dy = Math.abs(playerPosition.y - y);
            const isAjacent = (dx + dy === 1);
            if (!isAjacent) {
                return;
            }

            if (playerPosition.x === x && playerPosition.y === y) {
                setSelectedPlayer(null);
                return;
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
        }
    };



    return (
        <Box display="flex" gap={4}>
            <Box 
                display="grid"
                gridTemplateColumns={`repeat(${BOARD_SIZE}, ${GRID_SIZE}px)`}
                gridTemplateRows={`repeat(${BOARD_SIZE}, ${GRID_SIZE}px)`}
                gap={`${GAP_CELLULE}px`}
                sx={{
                    position: "relative",
                    width: "max-content",
                    margin: "auto",
                    padding: "16px",
                    aspectRatio: "1/1",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid black",
                    borderRadius: "4px",
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
                            isGameStarted={isGameStarted}
                            turn={turn}
                        />
                    ))
                ))}
            </Box>

            <InfoPanel players={players} turn={turn} />
        </Box>
    );
};

export default Board;