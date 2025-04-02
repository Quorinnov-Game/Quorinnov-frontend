import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography } from "@mui/material";
import Logo from "../assets/img/Logo.jpeg"

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container
            maxWidth="sm"
            sx={{ textAlign: "center", py: 5 }}
        >
            <Box
                component="img"
                src={Logo}
                alt="Quoridor Logo"
                sx={{
                    width: { xs: "120px", sm: "180px", md: "200px" }, // responsive
                    height: "auto",
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
            />

            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Quoridor Game
            </Typography>

            <Box display="flex" flexDirection="column" gap={2} alignItems="center" mt={4}>
                <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => navigate("/game")}>Jouer</Button>
                <Button fullWidth variant="outlined" color="primary" size="medium" onClick={() => navigate("/rules")}>Règles</Button>
                <Button fullWidth variant="outlined" color="primary" size="medium" onClick={() => navigate("/about")}>À propos</Button>
                <Button fullWidth variant="outlined" color="primary" size="medium" onClick={() => navigate("/tuto")}>Tutoriel</Button>
            </Box>
        </Container>
    );
}

export default Home;