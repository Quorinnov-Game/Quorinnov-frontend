import { Box, Button } from "@mui/material";

type ControlPanelProps = {
    onNewGame?: () => void,
    onUndo?: () => void,
    onRedo?: () => void,
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNewGame, onUndo, onRedo }) => {
    return (
        <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary" onClick={onNewGame}>Nouvelle partie</Button>
            <Button variant="contained" color="success" onClick={onUndo}>Retour pion</Button>
            <Button variant="contained" color="warning" onClick={onRedo}>Arrivé pion</Button>
        </Box>
    );
}

export default ControlPanel;