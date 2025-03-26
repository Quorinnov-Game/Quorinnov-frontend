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

    useEffect(() => {
        setPlayer(player);
    }, [player]);

    const handleSelectPlayer = (player: Player) => {
        setSelectedPlayer(player);
    };

    const movePlayer = (x: number, y: number) => {
        if (selectedPlayer) {
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
                    />
                ))
            ))}
        </Box>
    );
};

export default Board;