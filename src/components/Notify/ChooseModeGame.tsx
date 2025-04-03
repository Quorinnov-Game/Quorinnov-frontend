import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"
import React from "react"

type ChooseModeGameProps = {
    open: boolean,
    onSelectMode: (ai: boolean) => void,
    setOpenModeGame: (open: boolean) => void,
    isVsAI: boolean,
    handleCancelStep:() => void;
}

const ChooseModeGame: React.FC<ChooseModeGameProps> = ({ open, onSelectMode, setOpenModeGame, isVsAI, handleCancelStep }) => {
    return (
        <Dialog
            open={open}
            onClose={(_, reason) => reason !== 'backdropClick' && reason !== 'escapeKeyDown' && setOpenModeGame(false)}
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
            <DialogTitle id="alert-dialog-title-mode-game">Voulez-vous jouer contre un joueur ou contre une IA ?</DialogTitle>
            <DialogActions>
                <Button onClick={() => onSelectMode(!isVsAI)} color="primary">
                    <Typography variant="h6" fontWeight="bold">1vs1</Typography>
                </Button>
                <Button onClick={() => onSelectMode(isVsAI)} color="inherit">
                    <Typography variant="h6" fontWeight="bold">AI</Typography>
                </Button>
                <Button onClick={() => handleCancelStep()} color="error">
                    <Typography variant="h6" fontWeight="bold">Retour</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChooseModeGame