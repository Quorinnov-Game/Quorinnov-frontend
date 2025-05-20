import { Box, Typography, keyframes } from "@mui/material";
import { Player } from "../@types/player";

type TurnDisplayProps = {
    players: { P1: Player; P2: Player };
    turn: "P1" | "P2";
};

// Định nghĩa keyframes cho animation
const fadeIn = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const TurnDisplay = ({ players, turn }: TurnDisplayProps) => {
    const currentPlayer = players[turn];

    return (
        <Box
            sx={{
                padding: "12px 4px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${currentPlayer.color}22, ${currentPlayer.color}44)`,
                border: `2px solid ${currentPlayer.color}`,
                boxShadow: `0 0 10px ${currentPlayer.color}33`,
                animation: `${fadeIn} 0.5s ease`,
                transition: "all 0.3s ease",
                marginY: 2,
                width: "100%",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${currentPlayer.color}40`,
                }
            }}
        >
            <Typography 
                variant="subtitle1" 
                fontWeight="bold"
                sx={{
                    textAlign: "center",
                    color: "black",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
            >
                {`Tour du ${currentPlayer.name}`}
            </Typography>
        </Box>
    );
};

export default TurnDisplay;