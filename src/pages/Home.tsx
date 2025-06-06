import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container } from "@mui/material";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container
            maxWidth="sm"
            sx={{ textAlign: "center", py: 5 }}
        >
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