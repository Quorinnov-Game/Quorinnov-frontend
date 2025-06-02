import { Box, Button } from "@mui/material";
import TurnHistorySelect from "./TurnHistorySelect";
import { HistoryResponse, TurnHistory } from "../../@types/game";
import AxiosInstance from "../../api/AxiosInstance";

type ControlPanelProps = {
    onNewGame?: () => void,
    gameId: string | null;
    totalTurns: number;
    onHistoryUpdate: (history: TurnHistory) => void;
    onRedo?: () => void,
    onQuit?: () => void,
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onNewGame, gameId, totalTurns, onHistoryUpdate, onRedo, onQuit }) => {
    const handleSelectTurn = async (turnNumber: number) => {
        try {
            const response = await AxiosInstance.get<HistoryResponse>(
                `/game_history/${gameId}/${turnNumber}`
            );
            
            if (response.data.success) {
                onHistoryUpdate(response.data.history);
            }
        } catch (error) {
            console.error("Error fetching turn history:", error);
        }
    }
    return (
        <Box display="flex" gap={2} mb={2}>
            <Button variant="contained" color="primary" onClick={onNewGame}>Nouvelle partie</Button>
            {/* <Button variant="contained" color="success" onClick={onUndo}>Undo</Button> */}
            <TurnHistorySelect 
                totalTurns={totalTurns}
                onSelectTurn={handleSelectTurn}
            />
            <Button variant="contained" color="warning" onClick={onRedo}>Actuelle</Button>
            <Button variant="contained" color="error" onClick={onQuit}>Quitter</Button>
        </Box>
    );
}

export default ControlPanel;