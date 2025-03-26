import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography } from "@mui/material";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container fixed sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Quoridor Game
            </Typography>

            <Typography variant="h6" color="textSecondary">
                Play the game of Quoridor against the computer.
            </Typography>

            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    href="/game"
                    sx={{ mb: 2, width: "80%" }}
                    onClick={() => navigate("/game")}
                >
                    Play
                </Button>
            </Box>

            <Box mt={3}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    href="/rules"
                    sx={{ mb: 2, width: "80%" }}
                    onClick={() => navigate("/rules")}
                >
                    Rules
                </Button>
            </Box>

            <Box mt={3}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    href="/about"
                    sx={{ mb: 2, width: "80%" }}
                    onClick={() => navigate("/about")}
                >
                    About
                </Button>
            </Box>
        </Container>
    );
}

export default Home;