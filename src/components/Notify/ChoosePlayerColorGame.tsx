import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material"
import React from "react"
import { COLOR_P1, COLOR_P2, TYPES_COLOR } from "../../pages/Game"

type ChoosePlayerColorGameProps = {
    open: boolean,
    onSelectColor: (color: TYPES_COLOR) => void,
    setOpenChoosePlayer: (open: boolean) => void,
    onCancelChooseColorPlayer?: () => void,
}

const ChoosePlayerColorGame: React.FC<ChoosePlayerColorGameProps> = ({ open, onSelectColor, setOpenChoosePlayer, onCancelChooseColorPlayer }) => {
    return (
        <Dialog
            open={open}
            onClose={(_, reason) => reason !== 'backdropClick' && reason !== 'escapeKeyDown' && setOpenChoosePlayer(false)}
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
            <DialogTitle id="alert-dialog-title-difficulty-game" >Choisissez la couleur de votre personnage préféré</DialogTitle>
            <DialogActions>
                <Button onClick={() => onSelectColor(COLOR_P1)} color="error">
                    <Typography variant="h6" fontWeight="bold">Rouge</Typography>
                </Button>
                <Button onClick={() => onSelectColor(COLOR_P2)} color="primary">
                    <Typography variant="h6" fontWeight="bold">Bleu</Typography>
                </Button>
                <Button onClick={onCancelChooseColorPlayer} color="inherit">
                    <Typography variant="h6" fontWeight="bold">Retour</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChoosePlayerColorGame;