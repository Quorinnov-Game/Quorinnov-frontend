import React, { useCallback, useRef, useState } from 'react';
import Board, { BOARD_SIZE, BoardRef } from '../components/Board/Board';
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';
import ControlPanel from '../components/Controls/ControlPanel';
import ChooseModeGame from '../components/Notify/ChooseModeGame';
import ChooseDifficultyGameForAI from '../components/Notify/ChooseDifficultyGameForAI';
import ChoosePlayerColorGame from '../components/Notify/ChoosePlayerColorGame';
import ChooseRestartNewGame from '../components/Notify/ChooseNewGame';
import AxiosInstance from '../api/AxiosInstance';
import { HistoryResponse } from '../@types/game';

export const COLOR_P1 = "#f8bbd0";
export const COLOR_P2 = "#77B5FE";
export type TYPES_COLOR = typeof COLOR_P1 | typeof COLOR_P2;

const difficulties = [
    { id: 1, name: "Débutant" },
    { id: 2, name: "Intermédiaire" },
    { id: 3, name: "Avancé" },
];

/**
 * Composant principal du jeu
 * Gère la logique globale et l'état du jeu
 */
const Game: React.FC = () => {
    const navigate = useNavigate();
    const [openNewGame, setOpenNewGame] = useState(false);
    const [openDifficulty, setOpenDifficulty] = useState(false);
    const [openChoosePlayer, setOpenChoosePlayer] = useState(false);
    const [playerColor, setPlayerColor] = useState<TYPES_COLOR>(COLOR_P1);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [openModeGame, setOpenModeGame] = useState(true);
    const [gameId, setGameId] = useState(null);
    const boardRef = useRef<BoardRef>(null);
    const [isVsAI, setIsVsAI] = useState(false);
    const [aiDifficulty, setAiDifficulty] = useState<number | null>(null);
    const [currentTotalTurns, setCurrentTotalTurns] = useState(0);

    const handleNewGame = () => {
        setOpenNewGame(false);
        setOpenModeGame(true);
    };

    const handleResumeGame = () => {
        setOpenNewGame(false);
        navigate("/game");
    };

    const handleCancelGame = () => {
        setOpenNewGame(true);
        setOpenModeGame(false);
    };

    const handleCancelChooseColorPlayer = () => {
        setOpenChoosePlayer(false);
        setOpenModeGame(true);
    };

    const handleCancelChooseDifficulty = () => {
        setOpenDifficulty(false);
        setOpenModeGame(true);
    };

    const handleModeGame = (m: string) => {
        setIsVsAI(m === "AI");
        setOpenModeGame(false);
        m === "AI" ? setOpenDifficulty(true) : setOpenChoosePlayer(true);
    };

    const handleSelectDifficulty = (difficultyId: number) => {
        setAiDifficulty(difficultyId);
        setOpenDifficulty(false);
        setOpenChoosePlayer(true);
    };

    const handleChooseColor = async (color: TYPES_COLOR) => {
        setPlayerColor(color);
        setOpenChoosePlayer(false);
        setIsGameStarted(true);

        try {
            const response = await AxiosInstance.post("/create_game", {
                player1: {
                    color: color,
                    position: { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) },
                    walls_left: 10,
                },
                player2: {
                    color: color === COLOR_P1 ? COLOR_P2 : COLOR_P1,
                    position: { x: 0, y: Math.floor(BOARD_SIZE / 2) },
                    walls_left: 10,
                },
                board: {
                    width: BOARD_SIZE,
                    height: BOARD_SIZE,
                }
            });
            setGameId(response.data.board_id);
            console.log("Game created successfully:", response.data);
        } catch (error) {
            console.error("Error creating game:", error);
        }

        navigate("/game");
    };

    const handleSelectTurn = async (turnNumber: number) => {
        try {
            if (turnNumber === 0) {
                if (boardRef.current) {
                    const initialState = {
                        id: 0,
                        position: {
                            player1: { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) },
                            player2: { x: 0, y: Math.floor(BOARD_SIZE / 2) }
                        },
                        walls: []
                    };
                    boardRef.current.updateBoardHistory(initialState);
                }
            } else {
                // Xử lý các turn khác
                console.log("Selected history turn:", turnNumber);
                const response = await AxiosInstance.get<HistoryResponse>(`/turns/${turnNumber}`);
                if (response.data.success && boardRef.current) {
                    console.log("Turn history fetched successfully:", response.data.history);
                    boardRef.current.updateBoardHistory(response.data.history);
                }
            }
        } catch (error) {
            console.error("Error fetching turn history:", error);
        }
    }

    const handleRedo = async () => {
        boardRef.current?.resetViewMode();
    };

    const handleTurnUpdate = useCallback((turnNumber: number) => {
        setCurrentTotalTurns(turnNumber);
    }, [])

    return (
        <div>
            <ChooseModeGame
                open={openModeGame}
                setOpenModeGame={setOpenModeGame}
                onSelectMode={handleModeGame}
                onCancelGame={() => navigate("/")}
            />

            <ChooseDifficultyGameForAI
                open={openDifficulty}
                setOpenDifficulty={setOpenDifficulty}
                onSelectDifficulty={handleSelectDifficulty}
                listDifficulty={difficulties}
                onCancelChooseDifficulty={handleCancelChooseDifficulty}
            />

            <ChoosePlayerColorGame
                open={openChoosePlayer}
                setOpenChoosePlayer={setOpenChoosePlayer}
                onSelectColor={handleChooseColor}
                onCancelChooseColorPlayer={handleCancelChooseColorPlayer}
            />

            {isGameStarted && (
                <div>
                    <Box display="flex" flexDirection="column">
                        <ControlPanel
                            onNewGame={() => setOpenNewGame(true)}
                            totalTurns={boardRef.current?.totalTurns || 0}
                            onSelectTurn={handleSelectTurn}
                            onQuit={() => navigate("/")}
                            onRedo={handleRedo}
                            isVsAI={isVsAI}
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
                            listDifficulty={difficulties}
                            onCancelChooseDifficulty={handleCancelChooseDifficulty}
                        />

                        <ChoosePlayerColorGame
                            open={openChoosePlayer}
                            setOpenChoosePlayer={setOpenChoosePlayer}
                            onSelectColor={handleChooseColor}
                            onCancelChooseColorPlayer={handleCancelChooseColorPlayer}
                        />

                        <Board
                            ref={boardRef}
                            key={gameId}
                            playerColor={playerColor}
                            gameId={gameId}
                            isVsAI={isVsAI}
                            aiDifficulty={aiDifficulty}
                            onTurnUpdate={handleTurnUpdate}
                        />
                    </Box>
                </div>
            )}
        </div>
    );
};

export default Game;
