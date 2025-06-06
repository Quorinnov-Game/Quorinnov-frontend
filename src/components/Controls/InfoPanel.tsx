import { Box, Typography, Divider, Stack, Tooltip, IconButton } from "@mui/material";
import { Player } from "../../@types/player";
import { CheckBox, CloseOutlined } from "@mui/icons-material";
import { NAME_PLAYER1, NAME_PLAYER2 } from "../Board/Board";
import TurnDisplay from "../../config/TurnDisplay";

type InfoPanelProps = {
    players: { P1: Player; P2: Player };
    turn: "P1" | "P2";
    onValidateWall?: () => void;
    onCancelWall?: () => void;
    showWallControls?: boolean;
};

/**
 * Composant affichant la barre de murs restants
 * @param {number} count - Nombre de murs restants
 */
const WallBar = ({ count }: { count: number }) => {
    return (
        <Box display="flex" flexDirection="row" gap={1} justifyContent="center" mt={1}>
            <Box
                sx={{
                    width: "53px",
                    height: "18px",
                    borderRadius: "2px",
                    background: `
                        linear-gradient(180deg, #a3d977 25%, #8bbf5c 25%, #8bbf5c 50%, #a3d977 50%, #a3d977 75%, #8bbf5c 75%, #8bbf5c 100%),
                        linear-gradient(90deg, #8bbf5c 25%, #a3d977 25%, #a3d977 50%, #8bbf5c 50%, #8bbf5c 75%, #a3d977 75%, #a3d977 100%)
                    `,
                    backgroundColor: '#5c5244',
                    boxShadow: "0 0 2px rgba(0,0,0,0.5)",
                }}
            />
            <Typography variant="body2" color="textSecondary">{count}</Typography>
        </Box>
    )
}

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

            <Box mb={1}>
                <Typography variant="body1" color="textSecondary" fontWeight="bold"><span style={{ color: players.P1.color }}>{NAME_PLAYER1}</span></Typography>
                <WallBar count={players.P1.wallsRemaining ?? 0} />
            </Box>

            <Box mb={1}>
                <Typography variant="body1" color="textSecondary" fontWeight="bold"><span style={{ color: players.P2.color }}>{NAME_PLAYER2}</span></Typography>
                <WallBar count={players.P2.wallsRemaining ?? 0} />
            </Box>

            <Divider sx={{ width: "100%", mb: 1 }} />

            {/* Turn */}
            <TurnDisplay players={players} turn={turn} />

            {/* --- WALL BUTTONS --- */}

            {
                showWallControls &&
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
