import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Player } from '../../@types/player';

const BOARD_SIZE = 9;


const Board: React.FC = () => {
    const initialPlayer: Player = {
        id: "1",
        color: "red",
        position: { x: (BOARD_SIZE - 1), y: Math.floor(BOARD_SIZE / 2) },
    };

    const [player, setPlayer] = useState<Player>(initialPlayer);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const handleSelectPlayer = (player: Player) => {
        if(selectedPlayer && selectedPlayer.id === player.id) {
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
        if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) {
            return;
        }
        if (selectedPlayer) {
            const playerPosition = selectedPlayer.position;
            const dx = Math.abs(playerPosition.x - x);
            const dy = Math.abs(playerPosition.y - y);
            const isAjacent = (dx+dy === 1);
            if (!isAjacent) {
                return;
            }

            if (playerPosition.x === x && playerPosition.y === y) {
                setSelectedPlayer(null);
                return;
            }

            setPlayer((prev) => ({
                ...prev,
                position: { x: x, y: y },
            }));
            setSelectedPlayer(null);
        }
    };

    

    return (
        <Box display="grid"
            gridTemplateColumns={`repeat(${BOARD_SIZE}, 50px)`}
            gridTemplateRows={`repeat(${BOARD_SIZE}, 50px)`}
            gap="4px"
            sx={{
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
                        player={player}
                        selectedPlayer={selectedPlayer}
                        onSelectPlayer={handleSelectPlayer}
                        onMovePlayer={movePlayer}
                        isValidMove={getValidMoves().some(pos => pos.x === x && pos.y === y)}
                    />
                ))
            ))}
        </Box>
    );
};

export default Board;