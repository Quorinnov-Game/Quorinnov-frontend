import React, { useState } from 'react';
import Board from '../components/Board/Board';
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';
import ControlPanel from '../components/Controls/ControlPanel';
import ChooseModeGame from '../components/Notify/ChooseModeGame';
import ChooseDifficultyGameForAI from '../components/Notify/ChooseDifficultyGameForAI';
import ChoosePlayerColorGame from '../components/Notify/ChoosePlayerColorGame';
import ChooseRestartNewGame from '../components/Notify/ChooseNewGame';
import BlurBackground from '../config/BlurBackground';


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

    const [stepList, setStepList] = useState<string[]>(['mode']);




    const handleNewGame = () => {
        setOpenNewGame(false);
        setOpenModeGame(true);
        setIsVsAI(true);

    }

    const handleResumeGame = () => {
        setOpenNewGame(false);
        navigate("/game");
    }

    const handleCancelGame = () => {
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
    const handleCancelStep = () => {

        navigate('/');
    };
    const goToStep = (step: string) => {
        setStepList(prev => [...prev, step]);
    };





    return (
        <div>
            <ChooseModeGame
                open={openModeGame}
                setOpenModeGame={setOpenModeGame}
                onSelectMode={handleModeGame}
                isVsAI={isVsAI}
                handleCancelStep={handleCancelStep}

            />

            <ChooseDifficultyGameForAI
                open={openDifficulty}
                setOpenDifficulty={setOpenDifficulty}
                onSelectDifficulty={handleSelectDifficulty}
                listDifficulty={listsDifficulty}
                handleCancelStep={handleCancelStep}

            />

            <ChoosePlayerColorGame
                open={openChoosePlayer}
                setOpenChoosePlayer={setOpenChoosePlayer}
                onSelectColor={handleChooseColor}
                handleCancelStep={handleCancelStep}

            />

            {
                isGameStarted &&
                <>
                    <BlurBackground />

                    <Box display="flex" flexDirection="column">
                        <ControlPanel
                            onNewGame={() => setOpenNewGame(true)}
                        />

                        <ChooseRestartNewGame
                            open={openNewGame}
                            setOpenNewGame={setOpenNewGame}
                            onSelectNewGame={handleNewGame}
                            onSelectResumeGame={handleResumeGame}
                            onSelectCancelGame={handleCancelGame}

                        />

                        <ChooseModeGame
                            open={openModeGame}
                            setOpenModeGame={setOpenModeGame}
                            onSelectMode={handleModeGame}
                            isVsAI={isVsAI}
                            handleCancelStep={handleCancelStep}

                        />

                        <ChooseDifficultyGameForAI
                            open={openDifficulty}
                            setOpenDifficulty={setOpenDifficulty}
                            onSelectDifficulty={handleSelectDifficulty}
                            listDifficulty={listsDifficulty}
                            handleCancelStep={handleCancelStep}

                        />

                        <ChoosePlayerColorGame
                            open={openChoosePlayer}
                            setOpenChoosePlayer={setOpenChoosePlayer}
                            onSelectColor={handleChooseColor}
                            handleCancelStep={handleCancelStep}
                        />

                        <Board playerColor={playerColor} />
                    </Box>
                </>
            }
        </div>
    );
}

export default Game;