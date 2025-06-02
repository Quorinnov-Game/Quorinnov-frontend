import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { TurnHistory } from "../../@types/game";

type TurnHistorySelectProps = {
    totalTurns: number;
    onSelectTurn: (turnNumber: number) => void;
};

const TurnHistorySelect: React.FC<TurnHistorySelectProps> = ({ totalTurns, onSelectTurn }) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onSelectTurn(Number(event.target.value));
    };

    return (
        <FormControl sx={{ minWidth: 120, color:"Highlight" }}>
            <InputLabel>History</InputLabel>
            <Select
                label="History"
                onChange={handleChange}
                sx={{ color: "Scrollbar"}}
                // defaultValue=""
            >
                {[...Array(totalTurns)].map((_, index) => {
                    const turnNumber = totalTurns - index;
                    return (
                        <MenuItem key={turnNumber} value={turnNumber}>
                            {`Turn ${turnNumber}`}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default TurnHistorySelect;