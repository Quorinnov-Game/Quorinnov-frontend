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
            <Typography variant="h6" fontWeight="bold" color="textPrimary" mb={1}>Players</Typography>
            <Divider sx={{ width: "100%", mb: 1 }} />

            {/* Player */}
            <Box mb={1}>
                <Typography variant="body1" color="textSecondary">You ({players.P1.color})</Typography>
                <Typography variant="body2" color="textSecondary">Walls: {players.P1.wallsRemaining}</Typography>
            </Box>

            {/* AI */}
            <Box mb={1}>
                <Typography variant="body1" color="textSecondary">AI ({players.P2.color})</Typography>
                <Typography variant="body2" color="textSecondary">Walls: {players.P2.wallsRemaining}</Typography>
            </Box>

            <Divider sx={{ width: "100%", mb: 1 }} />

            {/* Turn */}
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
                {turn === "P1" ? "Your Turn" : "AI's Turn"}
            </Typography>
        </Box>
    );
};

export default InfoPanel;
