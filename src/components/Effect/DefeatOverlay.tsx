import { useEffect, useState, useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const DefeatOverlay = () => {
    const [showParticles, setShowParticles] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowParticles(false);
        }, 3000); // Show particles for 3s
        return () => clearTimeout(timer);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <>
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
                    showParticles &&
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        options={{
                            fullScreen: false,
                            particles: {
                                number: {
                                    value: 40,
                                },
                                color: {
                                    value: "#ff4444",
                                },
                                shape: {
                                    type: "circle",
                                },
                                opacity: {
                                    value: 0.5,
                                },
                                size: {
                                    value: { min: 5, max: 10 },
                                },
                                move: {
                                    direction: "bottom",
                                    enable: true,
                                    outModes: { default: "out" },
                                    speed: 2,
                                },
                            },
                            detectRetina: true,
                        }}

                        // options={{
                        //     fullScreen: false,
                        //     background: {
                        //         color: "transparent",
                        //     },
                        //     particles: {
                        //         number: {
                        //             value: 60,
                        //             density: {
                        //                 enable: false,
                        //             },
                        //         },
                        //         color: {
                        //             value: "#111827",
                        //         },
                        //         opacity: {
                        //             value: 0.1,
                        //             animation: {
                        //                 enable: true,
                        //                 speed: 0.2,
                        //                 minimumValue: 0.05,
                        //                 sync: false,
                        //             },
                        //         },
                        //         size: {
                        //             value: { min: 80, max: 160 },
                        //             animation: {
                        //                 enable: true,
                        //                 speed: 10,
                        //                 minimumValue: 60,
                        //                 sync: false,
                        //             },
                        //         },
                        //         move: {
                        //             enable: true,
                        //             speed: 0.2,
                        //             direction: "none",
                        //             random: true,
                        //             outModes: {
                        //                 default: "bounce",
                        //             },
                        //         },
                        //         shape: {
                        //             type: "circle",
                        //         },
                        //     },
                        //     detectRetina: true,
                        // }}

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
                        color="#ee2400"
                        fontWeight="bold"
                    >
                        Vous avez perdu!
                    </Typography>
                </motion.div>
            </Box>
        </>
    )
};

export default DefeatOverlay;