import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { useCallback, useEffect, useState } from "react";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { Player } from "../../@types/player";
import { NAME_PLAYER1, NAME_PLAYER2 } from "../Board/Board";
import { useSound } from "../../hooks/useSound";
import { SOUND_KEYS } from "../../constants/sound";
import { useNavigate } from "react-router";

type VictoryOverlayProps = {
    players: { P1: Player, P2: Player };
};

const VictoryOverlay: React.FC<VictoryOverlayProps> = ({ players }) => {
    const navigate = useNavigate();
    const [showExitButton, setShowExitButton] = useState(false);
    const [showFireworks, setShowFireworks] = useState(true);
    const { play } = useSound();

    useEffect(() => {
        play(SOUND_KEYS.VICTORY);
        
        const timer = setTimeout(() => {
            setShowFireworks(false);
        }, 3000); // 30 seconds

        setShowExitButton(true);
        return () => clearTimeout(timer);
    }, []);

    const particlesInit = useCallback(async (engine: any) => {
        await loadFireworksPreset(engine);
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            {
                showFireworks &&
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        preset: "fireworks",
                        fullScreen: false,
                    }}
                    style={{ position: "absolute", inset: 0 }}
                />
            }

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: "fixed"
                }}
            >
                <Typography
                    variant="h2"
                    color="yellow"
                    fontWeight="bold"
                    sx={{
                        textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                    }}>
                    {players.P1.isWinner ? `${NAME_PLAYER1} avez gagné!` : `${NAME_PLAYER2} avez gagné!`}
                </Typography>

                {showExitButton && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/")}
                            sx={{
                                fontSize: "1.2rem",
                                padding: "12px 24px",
                                backgroundColor: "#d32f2f",
                                '&:hover': {
                                    backgroundColor: "#b71c1c"
                                }
                            }}
                        >
                            Quitter
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </Box>
    );
};

export default VictoryOverlay;
