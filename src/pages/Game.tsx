import React, { useState } from 'react';
import Board, { BOARD_SIZE } from '../components/Board/Board';
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';
import ControlPanel from '../components/Controls/ControlPanel';
import ChooseModeGame from '../components/Notify/ChooseModeGame';
import ChooseDifficultyGameForAI from '../components/Notify/ChooseDifficultyGameForAI';
import ChoosePlayerColorGame from '../components/Notify/ChoosePlayerColorGame';
import ChooseRestartNewGame from '../components/Notify/ChooseNewGame';
import AxiosInstance from '../api/AxiosInstance';

export type TYPES_COLOR = "red" | "blue";
const difficulties = [
    { id: 1, name: "Débutant" },
    { id: 2, name: "Intermédiaire" },
    { id: 3, name: "Avancé" },
    { id: 4, name: "Master" },
]

const Game: React.FC = () => {
    const navigate = useNavigate();
    const listsDifficulty = difficulties;
    const [openNewGame, setOpenNewGame] = useState(false);
    const [openDifficulty, setOpenDifficulty] = useState(false);
    const [openChoosePlayer, setOpenChoosePlayer] = useState(false);
    const [playerColor, setPlayerColor] = useState<TYPES_COLOR>("red");
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [openModeGame, setOpenModeGame] = useState(true);

    const handleNewGame = () => {
        setOpenNewGame(false);
        setOpenModeGame(true);
    }

    const handleResumeGame = () => {
        setOpenNewGame(false);
        navigate("/game");
    }

    const handleCancelGame = () => {
        setOpenNewGame(true);
        setOpenModeGame(false);
    }

    const handleCancelChooseColorPlayer = () => {
        setOpenChoosePlayer(false);
        setOpenModeGame(true);
    }

    const handleCancelChooseDifficulty = () => {
        setOpenDifficulty(false);
        setOpenModeGame(true);
    }

    const handleModeGame = (m: string) => {
        setOpenModeGame(false);
        m === "AI" ? setOpenDifficulty(true) : setOpenChoosePlayer(true)
    }

    const handleSelectDifficulty = () => {
        setOpenDifficulty(false);
        setOpenChoosePlayer(true);
    }

    const handleChooseColor = async (color: TYPES_COLOR) => {
        setPlayerColor(color)
        setOpenChoosePlayer(false)
        setIsGameStarted(true);

        try {
            const reponse = await AxiosInstance.post("/create_game", {
                player1: {
                    color: color,
                    position: { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) },
                    walls_left: 10,
                },
                player2: {
                    color: color === "red" ? "blue" : "red",
                    position: { x: 0, y: Math.floor(BOARD_SIZE / 2) },
                    walls_left: 10,
                },
                board: {
                    width: BOARD_SIZE,
                    height: BOARD_SIZE,
                }
            });
            console.log("Game created successfully:", reponse.data);
        } catch (error) {
            console.error("Error creating game:", error);
        }

        navigate("/game");
    }

    return (
        <div>
            <ChooseModeGame
                open={openModeGame}
                setOpenModeGame={setOpenModeGame}
                onSelectMode={handleModeGame}
                onCancelGame={() => navigate("/")} // Back to home
            />

            <ChooseDifficultyGameForAI
                open={openDifficulty}
                setOpenDifficulty={setOpenDifficulty}
                onSelectDifficulty={handleSelectDifficulty}
                listDifficulty={listsDifficulty}
                onCancelChooseDifficulty={handleCancelChooseDifficulty}
            />

            <ChoosePlayerColorGame
                open={openChoosePlayer}
                setOpenChoosePlayer={setOpenChoosePlayer}
                onSelectColor={handleChooseColor}
                onCancelChooseColorPlayer={handleCancelChooseColorPlayer}
            />

            {
                isGameStarted &&
                <div>
                    <Box display="flex" flexDirection="column">
                        <ControlPanel
                            onNewGame={() => setOpenNewGame(true)}
                        />

                        <ChooseRestartNewGame
                            open={openNewGame}
                            setOpenNewGame={setOpenNewGame}
                            onSelectNewGame={handleNewGame}
                            onSelectResumeGame={handleResumeGame}
                        />

                        <ChooseModeGame
                            open={openModeGame}
                            setOpenModeGame={setOpenModeGame}
                            onSelectMode={handleModeGame}
                            onCancelGame={handleCancelGame}
                        />

                        <ChooseDifficultyGameForAI
                            open={openDifficulty}
                            setOpenDifficulty={setOpenDifficulty}
                            onSelectDifficulty={handleSelectDifficulty}
                            listDifficulty={listsDifficulty}
                            onCancelChooseDifficulty={handleCancelChooseDifficulty}
                        />

                        <ChoosePlayerColorGame
                            open={openChoosePlayer}
                            setOpenChoosePlayer={setOpenChoosePlayer}
                            onSelectColor={handleChooseColor}
                            onCancelChooseColorPlayer={handleCancelChooseColorPlayer}
                        />

                        <Board playerColor={playerColor} />
                    </Box>
                </div>
            }
        </div>
    );
}

export default Game;