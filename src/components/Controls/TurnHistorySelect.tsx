import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

type TurnHistorySelectProps = {
    totalTurns: number;
    onSelectTurn: (turnNumber: number) => void;
    isVsAI?: boolean;
};

const TurnHistorySelect: React.FC<TurnHistorySelectProps> = ({ totalTurns, onSelectTurn, isVsAI }) => {

    const handleChange = (event: SelectChangeEvent<number>) => {
        const turnNumber = Number(event.target.value);
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
                    color: "black",
                    backgroundColor: "lightgoldenrodyellow",
                }}
            >
                {[...Array(totalTurns + 1)].map((_, index) => (
                    <MenuItem 
                        key={index} 
                        value={index}
                    >
                        {index === 0 ? "Initiale" : `Turn${index} (${!isVsAI && index % 2 === 0 ? "P2" : "P1"})`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TurnHistorySelect;