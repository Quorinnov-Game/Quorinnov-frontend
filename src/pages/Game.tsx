import React from 'react';
import Board from '../components/Board/Board';
import { useNavigate } from 'react-router';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';

const Game: React.FC = () => {
    const navigate = useNavigate();
    const listsDifficulty = [
        { id: 1, name: "Easy" },
        { id: 2, name: "Medium" },
        { id: 3, name: "Hard" },
        { id: 4, name: "Very Hard" },
    ]
    const [openGame, setOpenGame] = React.useState(true);
    const [openDifficulty, setOpenDifficulty] = React.useState(false);
    const [openChoosePlayer, setOpenChoosePlayer] = React.useState(false);

    const handleNewGame = () => {
        setOpenGame(false);
        setOpenDifficulty(true);
    }

    const handleResumeGame = () => {
        setOpenGame(false);
        navigate("/game");
    }

    const handleCancel = () => {
        setOpenGame(false);
        navigate("/");
    }

    const handleSelectDifficulty = () => {
        setOpenDifficulty(false);
        setOpenChoosePlayer(true);
    }

    const handleSelectPlayer = () => {
        setOpenChoosePlayer(false);
        navigate("/game");
    }

    return (
        <div>
            <Board />
            <Dialog
                open={openGame}
                onClose={(_, reason) => reason !== 'backdropClick' && reason !== 'escapeKeyDown' && setOpenGame(false)}
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
                <DialogTitle id="alert-dialog-title-start-game">Do you want to start a new game or continue game</DialogTitle> 
                <DialogActions sx={{ textAlign: "center" }}>
                    <Button onClick={handleNewGame} color="primary">
                        <Typography variant="h6" fontWeight="bold">New</Typography>
                    </Button>
                    <Button onClick={handleResumeGame} color="inherit">
                        <Typography variant="h6" fontWeight="bold">Continue</Typography>
                    </Button>
                    <Button onClick={handleCancel} color="error">
                        <Typography variant="h6" fontWeight="bold">Cancel</Typography>
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDifficulty}
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
                <DialogTitle id="alert-dialog-title-difficulty-game" sx={{justifyContent: "space-between"}}>Choose level AI difficulty</DialogTitle>
                <DialogActions sx={{ textAlign: "center" }}>
                    {listsDifficulty.map((difficulty) => (
                        <Button key={difficulty.id} onClick={handleSelectDifficulty} color="success">
                            <Typography variant="h6" fontWeight="bold">{difficulty.name}</Typography>
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>

            <Dialog
                open={openChoosePlayer}
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
                <DialogTitle id="alert-dialog-title-difficulty-game" >Choose color your player</DialogTitle>
                <DialogActions sx={{ textAlign:"center" }}>
                    <Button onClick={handleSelectPlayer} color="error">
                        <Typography variant="h6" fontWeight="bold">Red</Typography>
                    </Button>
                    <Button onClick={handleSelectPlayer} color="primary">
                        <Typography variant="h6" fontWeight="bold">Blue</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Game;