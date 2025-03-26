import { Box } from '@mui/material';
import React from 'react';
import { Player } from '../../@types/player';

const PlayerShow: React.FC<Player> = ({ color }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: color,
            }}
        />
    );
}

export default PlayerShow;