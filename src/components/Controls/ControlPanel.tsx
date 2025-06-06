import { Box, Button } from "@mui/material";
import TurnHistorySelect from "./TurnHistorySelect";

type ControlPanelProps = {
    onNewGame?: () => void,
    totalTurns: number;
    onSelectTurn: (turnNumber: number) => void;
    onRedo?: () => void,
    onQuit?: () => void,
    isVsAI?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNewGame, totalTurns, onSelectTurn, onRedo, onQuit, isVsAI }) => {
    return (
        <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary" onClick={onNewGame}>Nouvelle partie</Button>
            <TurnHistorySelect 
                totalTurns={totalTurns}
                onSelectTurn={onSelectTurn}
                key={totalTurns}
                isVsAI={isVsAI}
            />
            <Button variant="contained" color="warning" onClick={onRedo}>Actuelle</Button>
            <Button variant="contained" color="error" onClick={onQuit}>Quitter</Button>
        </Box>
    );
}

export default ControlPanel;