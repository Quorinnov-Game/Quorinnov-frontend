import { Box, Button } from "@mui/material";
import TurnHistorySelect from "./TurnHistorySelect";
import { useEffect } from "react";

type ControlPanelProps = {
    onNewGame?: () => void,
    gameId: string | null;
    totalTurns: number;
    onSelectTurn: (turnNumber: number) => void;
    onRedo?: () => void,
    onQuit?: () => void,
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNewGame, gameId, totalTurns, onSelectTurn, onRedo, onQuit }) => {
    useEffect(() => {
        console.log("ControlPanel rendered with totalTurns:", totalTurns);
    }), [totalTurns]

    return (
        <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary" onClick={onNewGame}>Nouvelle partie</Button>
            {/* <Button variant="contained" color="success" onClick={onUndo}>Undo</Button> */}
            <TurnHistorySelect 
                totalTurns={totalTurns}
                onSelectTurn={onSelectTurn}
                key={totalTurns}
            />
            <Button variant="contained" color="warning" onClick={onRedo} disabled={!totalTurns}>Actuelle</Button>
            <Button variant="contained" color="error" onClick={onQuit}>Quitter</Button>
        </Box>
    );
}

export default ControlPanel;