import { Box, Button } from "@mui/material";
import {useNavigate} from "react-router";

type ControlPanelProps = {
    onNewGame?: () => void,
    onUndo?: () => void,
    onRedo?: () => void,
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNewGame, onUndo, onRedo }) => {
    const navigate = useNavigate();
    return (
        <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
                Retour
            </Button>
            <Button variant="contained" color="primary" onClick={onNewGame}>Nouvelle partie</Button>
            <Button variant="contained" color="success" onClick={onUndo}>Undo</Button>
            <Button variant="contained" color="warning" onClick={onRedo}>Redo</Button>
        </Box>
    );
}

export default ControlPanel;