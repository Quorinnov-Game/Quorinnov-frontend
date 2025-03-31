import React, { useState } from 'react';
import Board from '../components/Board/Board';
import { useNavigate } from 'react-router';
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import ControlPanel from '../components/Controls/ControlPanel';

const Game: React.FC = () => {
    const navigate = useNavigate();
    const listsDifficulty = [
        { id: 1, name: "Easy" },
        { id: 2, name: "Medium" },
        { id: 3, name: "Hard" },
        { id: 4, name: "Very Hard" },
    ]
    const [openNewGame, setOpenNewGame] = useState(false);
    const [openDifficulty, setOpenDifficulty] = useState(false);
    const [openChoosePlayer, setOpenChoosePlayer] = useState(false);
    const [playerColor, setPlayerColor] = useState<"red" | "blue">("red");
    const [isGameStarted, setIsGameStarted] = useState(false);


    const handleNewGame = () => {
        setOpenNewGame(false);
        setOpenDifficulty(true);
        setIsGameStarted(true);
    }

    const handleResumeGame = () => {
        setOpenNewGame(false);
        navigate("/game");
    }

    const handleCancel = () => {
        setOpenNewGame(false);
        navigate("/");
    }

    const handleSelectDifficulty = () => {
        setOpenDifficulty(false);
        setOpenChoosePlayer(true);
    }

    const handleChooseColor = (color: "red" | "blue") => {
        setPlayerColor(color)
        setOpenChoosePlayer(false)
        navigate("/game");
    }

    return (
        <div>
            <Box display="flex" flexDirection="column" alignItems="center">
                <ControlPanel
                    onNewGame={() => setOpenNewGame(true)}
                >

                </ControlPanel>
                <Dialog
                    open={openNewGame}
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
                    <DialogTitle id="alert-dialog-title-difficulty-game" sx={{ justifyContent: "space-between" }}>Choose level AI difficulty</DialogTitle>
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
                    <DialogActions sx={{ textAlign: "center" }}>
                        <Button
                            onClick={() => handleChooseColor("red")}
                            color="error"
                        >
                            <Typography variant="h6" fontWeight="bold">Red</Typography>
                        </Button>
                        <Button
                            onClick={() => handleChooseColor("blue")}
                            color="primary"
                        >
                            <Typography variant="h6" fontWeight="bold">Blue</Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
                <Board playerColor={playerColor} isGameStarted={isGameStarted}/>
            </Box>
        </div>
    );
}

export default Game;