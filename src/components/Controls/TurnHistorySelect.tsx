import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";

type TurnHistorySelectProps = {
    totalTurns: number;
    onSelectTurn: (turnNumber: number) => void;
};

const TurnHistorySelect: React.FC<TurnHistorySelectProps> = ({ totalTurns, onSelectTurn }) => {
    const [selectedTurn, setSelectedTurn] = useState<number>(totalTurns);

    const handleChange = (event: SelectChangeEvent<number>) => {
        const turnNumber = Number(event.target.value);
        setSelectedTurn(turnNumber);
        onSelectTurn(turnNumber);
    };

    console.log("TurnHistorySelect rendered with totalTurns:", totalTurns);

    return (
        <FormControl sx={{ minWidth: 120, color:"Highlight" }}>
            <InputLabel>History</InputLabel>
            <Select
                label="History"
                onChange={handleChange}
                sx={{ 
                    color: "Scrollbar",
                    backgroundColor: "lightgoldenrodyellow",
                }}
            >
                {[...Array(totalTurns + 1)].map((_, index) => (
                    <MenuItem 
                        key={index} 
                        value={index}
                    >
                        {index === 0 ? "Initial State" : `Turn ${index}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TurnHistorySelect;