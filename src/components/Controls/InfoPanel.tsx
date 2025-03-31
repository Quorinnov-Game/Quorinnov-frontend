import { Box, Typography, Divider } from "@mui/material";
import { Player } from "../../@types/player";

type InfoPanelProps = {
    players: { P1: Player; P2: Player };
    turn: "P1" | "P2";
};

const InfoPanel: React.FC<InfoPanelProps> = ({ players, turn }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                width: "200px",
                height: "100%"
            }}
        >
            <Typography variant="h6" fontWeight="bold" color="textPrimary" mb={1}>Joueurs</Typography>
            <Divider sx={{ width: "100%", mb: 1 }} />

            {/* Player */}
            <Box mb={1}>
                <Typography variant="body1" color="textSecondary">Vous (<span style={{color: "red"}}>Rouge</span>)</Typography>
                <Typography variant="body2" color="textSecondary">Murs: {players.P1.wallsRemaining}</Typography>
            </Box>

            {/* AI */}
            <Box mb={1}>
                <Typography variant="body1" color="textSecondary">AI (<span style={{color: "blue"}}>Bleu</span>)</Typography>
                <Typography variant="body2" color="textSecondary">Murs: {players.P2.wallsRemaining}</Typography>
            </Box>

            <Divider sx={{ width: "100%", mb: 1 }} />

            {/* Turn */}
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
                {turn === "P1" ? "Votre tour" : "Tour d'IA"}
            </Typography>
        </Box>
    );
};

export default InfoPanel;
