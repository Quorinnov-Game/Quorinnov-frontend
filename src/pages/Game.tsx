import React, { useState } from 'react';
import Board from '../components/Board/Board';
import { useNavigate } from 'react-router';
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import ControlPanel from '../components/Controls/ControlPanel';


export type MODE_PLAY = "AI" | "User";
export type TYPES_COLOR = "red" | "blue";

const Game: React.FC = () => {
    const navigate = useNavigate();
    const listsDifficulty = [
        { id: 1, name: "Débutant" },
        { id: 2, name: "Intermédiaire" },
        { id: 3, name: "Avancé" },
        { id: 4, name: "Master" },
    ]
    const [openNewGame, setOpenNewGame] = useState(false);
    const [openDifficulty, setOpenDifficulty] = useState(false);
    const [openChoosePlayer, setOpenChoosePlayer] = useState(false);
    const [playerColor, setPlayerColor] = useState<TYPES_COLOR>("red");
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [openModeGame, setOpenModeGame] = useState(true);
    const [isVsAI, setIsVsAI] = useState(true)


    const handleNewGame = () => {
        setOpenNewGame(false);
        setOpenModeGame(true);
    }

    const handleResumeGame = () => {
        setOpenNewGame(false);
        navigate("/game");
    }

    const handleRetour = () => {
        setOpenNewGame(false);
        navigate("/");
    }

    const handleModeGame = (vsAI: boolean) => {
        setIsVsAI(vsAI);
        setOpenModeGame(false);
        vsAI ? setOpenDifficulty(true) : setOpenChoosePlayer(true)
    }

    const handleSelectDifficulty = () => {
        setOpenDifficulty(false);
        setOpenChoosePlayer(true);
    }

    const handleChooseColor = (color: TYPES_COLOR) => {
        setPlayerColor(color)
        setOpenChoosePlayer(false)
        setIsGameStarted(true);
        navigate("/game");
    }

    return (
        <div>
            <Dialog
                    open={openModeGame}
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
                    <DialogTitle id="alert-dialog-title-mode-game">Quel mode voulez-vous jouer ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => handleModeGame(!isVsAI)} color="primary">
                            <Typography variant="h6" fontWeight="bold">1vs1</Typography>
                        </Button>
                        <Button onClick={() => handleModeGame(isVsAI)} color="inherit">
                            <Typography variant="h6" fontWeight="bold">AI</Typography>
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
                    <DialogTitle id="alert-dialog-title-difficulty-game" sx={{ justifyContent: "space-between" }}>Choisissez le niveau de difficulté de l'IA que vous voulez.</DialogTitle>
                    <DialogActions>
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
                    <DialogTitle id="alert-dialog-title-difficulty-game" >Choisissez la couleur de votre personnage préféré</DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={() => handleChooseColor("red")}
                            color="error"
                        >
                            <Typography variant="h6" fontWeight="bold">Rouge</Typography>
                        </Button>
                        <Button
                            onClick={() => handleChooseColor("blue")}
                            color="primary"
                        >
                            <Typography variant="h6" fontWeight="bold">Bleu</Typography>
                        </Button>
                    </DialogActions>
                </Dialog>

            {
                isGameStarted &&
                <>
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            zIndex: -1,
                        }}
                    />

                    <Box display="flex" flexDirection="column">
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
                            <DialogTitle id="alert-dialog-title-start-game">Voulez-vous démarrer une nouvelle partie ou continuer la partie ?</DialogTitle>
                            <DialogActions>
                                <Button onClick={handleNewGame} color="primary">
                                    <Typography variant="h6" fontWeight="bold">Nouvelle</Typography>
                                </Button>
                                <Button onClick={handleResumeGame} color="inherit">
                                    <Typography variant="h6" fontWeight="bold">Continue</Typography>
                                </Button>
                                <Button onClick={handleRetour} color="error">
                                    <Typography variant="h6" fontWeight="bold">Retour</Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={openModeGame}
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
                            <DialogTitle id="alert-dialog-title-mode-game">Quel mode voulez-vous jouer ?</DialogTitle>
                            <DialogActions>
                                <Button onClick={() => handleModeGame(!isVsAI)} color="primary">
                                    <Typography variant="h6" fontWeight="bold">1vs1</Typography>
                                </Button>
                                <Button onClick={() => handleModeGame(isVsAI)} color="inherit">
                                    <Typography variant="h6" fontWeight="bold">AI</Typography>
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
                            <DialogTitle id="alert-dialog-title-difficulty-game" sx={{ justifyContent: "space-between" }}>Choisissez le niveau de difficulté de l'IA que vous voulez.</DialogTitle>
                            <DialogActions>
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
                            <DialogTitle id="alert-dialog-title-difficulty-game" >Choisissez la couleur de votre personnage préféré</DialogTitle>
                            <DialogActions>
                                <Button
                                    onClick={() => handleChooseColor("red")}
                                    color="error"
                                >
                                    <Typography variant="h6" fontWeight="bold">Rouge</Typography>
                                </Button>
                                <Button
                                    onClick={() => handleChooseColor("blue")}
                                    color="primary"
                                >
                                    <Typography variant="h6" fontWeight="bold">Bleu</Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Board playerColor={playerColor} />
                    </Box>
                </>
            }
        </div>
    );
}

export default Game;