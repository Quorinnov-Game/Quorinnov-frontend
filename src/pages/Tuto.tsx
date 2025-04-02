import { Box, Typography } from "@mui/material";
import React from "react";
import videoTuto from "../assets/videos/Tutoquoridor.mp4"

const Tuto: React.FC = () => {
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    zIndex: -1,
                }}
            />
            <Box>
                <Typography variant="h2" fontWeight="bold" mb={2} >Tutoriel</Typography>
                <video controls width="70%" style={{ borderRadius: '8px' }}>
                    <source src={videoTuto} type="video/mp4"></source>
                </video>
            </Box>
        </>
    )
}

export default Tuto;