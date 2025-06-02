import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"
import React from "react"

type ChooseDifficultyGameForAIProps = {
    open: boolean,
    onSelectDifficulty: (difficultyId: number) => void;
    setOpenDifficulty: (open: boolean) => void,
    listDifficulty: { id: number, name: string}[],
    onCancelChooseDifficulty?: () => void,
}

const ChooseDifficultyGameForAI: React.FC<ChooseDifficultyGameForAIProps> = ({ open, onSelectDifficulty, setOpenDifficulty, listDifficulty, onCancelChooseDifficulty }) => {
    return (
        <Dialog
            open={open}
            onClose={(_, reason) => reason !== 'backdropClick' && reason !== 'escapeKeyDown' && setOpenDifficulty(false)}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '12px',
                    padding: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    minWidth: '320px',
                    backgroundColor: '#fff',
                }
            }}
        >
            <DialogTitle id="alert-dialog-title-difficulty-game" sx={{ justifyContent: "space-between" }}>Choisissez le niveau de difficulté de l'IA que vous voulez.</DialogTitle>
            <DialogActions>
                {listDifficulty.map((difficulty) => (
                    <Button key={difficulty.id} onClick={() => onSelectDifficulty(difficulty.id)} color="primary">

                        <Typography variant="h6" fontWeight="bold">{difficulty.name}</Typography>
                    </Button>
                ))}
                <Button onClick={onCancelChooseDifficulty} color="error">
                    <Typography variant="h6" fontWeight="bold">Retour</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChooseDifficultyGameForAI;