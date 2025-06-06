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
    isVsAI?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNewGame, gameId, totalTurns, onSelectTurn, onRedo, onQuit, isVsAI }) => {
    useEffect(() => {
        console.log("ControlPanel rendered with totalTurns:", totalTurns);
    }), [totalTurns]

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