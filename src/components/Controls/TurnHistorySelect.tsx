import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

/**
 * Props pour le sélecteur d'historique des tours
 * @typedef {Object} TurnHistorySelectProps
 * @property {number} totalTurns - Nombre total de tours joués
 * @property {Function} onSelectTurn - Fonction appelée lors de la sélection d'un tour
 * @property {boolean} isVsAI - Indique si le mode est contre l'IA
 */
type TurnHistorySelectProps = {
    totalTurns: number;
    onSelectTurn: (turnNumber: number) => void;
    isVsAI?: boolean;
};

/**
 * Composant permettant de naviguer dans l'historique des tours
 * @param {TurnHistorySelectProps} props - Les propriétés du composant
 */
const TurnHistorySelect: React.FC<TurnHistorySelectProps> = ({ totalTurns, onSelectTurn, isVsAI }) => {

    /**
     * Gère le changement de tour sélectionné
     * @param {SelectChangeEvent<number>} event - L'événement de changement
     */
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
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflow: 'auto'
                        }
                    },
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