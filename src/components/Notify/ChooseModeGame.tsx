import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"
import React from "react"

type ChooseModeGameProps = {
    open: boolean,
    onSelectMode: (mode: string) => void,
    onCancelGame?: () => void,
    setOpenModeGame: (open: boolean) => void,
}

const ChooseModeGame: React.FC<ChooseModeGameProps> = ({ open, onSelectMode, onCancelGame, setOpenModeGame }) => {
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
                <Button onClick={() => onSelectMode("player")} color="primary">
                    <Typography variant="h6" fontWeight="bold">1vs1</Typography>
                </Button>
                <Button onClick={() => onSelectMode("AI")} color="inherit">
                    <Typography variant="h6" fontWeight="bold">AI</Typography>
                </Button>
                <Button onClick={onCancelGame} color="error">
                    <Typography variant="h6" fontWeight="bold">Retour</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChooseModeGame