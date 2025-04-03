import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"
import React from "react"

type ChooseRestartNewGameProps = {
    open: boolean,
    onSelectNewGame: () => void,
    onSelectResumeGame: () => void,
    onSelectCancelGame: () => void,
    setOpenNewGame: (open: boolean) => void,
}

const ChooseRestartNewGame: React.FC<ChooseRestartNewGameProps> = ({ open, onSelectNewGame, onSelectResumeGame, onSelectCancelGame, setOpenNewGame }) => {
    return (
        <Dialog
            open={open}
            onClose={(_, reason) => reason !== 'backdropClick' && reason !== 'escapeKeyDown' && setOpenNewGame(false)}
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
            <DialogTitle id="alert-dialog-title-start-game">Voulez-vous démarrer une nouvelle partie ou continuer la partie ?</DialogTitle>
            <DialogActions>
                <Button onClick={onSelectNewGame} color="primary">
                    <Typography variant="h6" fontWeight="bold">Nouvelle</Typography>
                </Button>
                <Button onClick={onSelectResumeGame} color="inherit">
                    <Typography variant="h6" fontWeight="bold">Continue</Typography>
                </Button>
                <Button onClick={onSelectCancelGame} color="error">
                    <Typography variant="h6" fontWeight="bold">Retour</Typography>
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default ChooseRestartNewGame;