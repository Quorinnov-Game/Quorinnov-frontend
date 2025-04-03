import { Box, Typography, Divider, Stack, Button, Tooltip, IconButton, useMediaQuery } from "@mui/material";
import { Player } from "../../@types/player";
import { CheckBox, CloseOutlined } from "@mui/icons-material";

type InfoPanelProps = {
    players: { P1: Player; P2: Player };
    turn: "P1" | "P2";
    onValidateWall?: () => void;
    onCancelWall?: () => void;
    showWallControls?: boolean;
};

// const WallBar = ({ count }: { count: number }) => {
//     return (
//         <Box display="flex" flexDirection="row" gap={1} justifyContent="center" mt={1}>
//             <Box
//                 sx={{
//                     width: "53px",
//                     height: "18px",
//                     borderRadius: "2px",
//                     background: `
//                         repeating-linear-gradient(90deg, transparent, transparent 8px, #d8a08c 8px, #d8a08c 9px),
//                         repeating-linear-gradient(180deg, transparent, transparent 8px, #d8a08c 8px, #d8a08c 9px)
//                     `,
//                     backgroundColor: '#8B7355',
//                     boxShadow: "0 0 2px rgba(0,0,0,0.5)",
//                 }}
//             />
//             <Typography variant="body2" color="textSecondary">{count}</Typography>
//         </Box>
//     )
// }

const InfoPanel: React.FC<InfoPanelProps> = ({ players, turn, onValidateWall, onCancelWall, showWallControls }) => {

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
                {/* <Typography variant="body1" color="textSecondary" fontWeight="bold"><span style={{color: "red"}}>Vous</span></Typography>
                <WallBar count={players.P1.wallsRemaining ?? 0} /> */}
            </Box>

            {/* AI */}
            <Box mb={1}>
                {/* <Typography variant="body1" color="textSecondary" fontWeight="bold"><span style={{color: "blue"}}>AI</span></Typography>
                <WallBar count={players.P2.wallsRemaining ?? 0} /> */}
            </Box>

            <Divider sx={{ width: "100%", mb: 1 }} />

            {/* Turn */}
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
                {turn === "P1" ? "Votre tour" : "Tour d'IA"}
            </Typography>

            {/* --- WALL BUTTONS --- */}

            {
                turn === "P1" && showWallControls &&
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Tooltip title="Validate">
                        <IconButton color="success" onClick={onValidateWall}>
                            <CheckBox fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton color="error" onClick={onCancelWall}>
                            <CloseOutlined fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            }

        </Box>
    );
};

export default InfoPanel;
