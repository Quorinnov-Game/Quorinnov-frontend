import { useEffect } from 'react';
import { Player } from '../@types/player';
import { Wall } from '../@types/game';
import AxiosInstance from '../api/AxiosInstance';
import { BOARD_SIZE } from '../components/Board/Board';
import { SOUND_KEYS } from '../constants/sound';
import { useSound } from './useSound';

type UseAIMoveProps = {
    isVsAI: boolean;
    isViewingHistory: boolean;
    victory: boolean;
    turn: "P1" | "P2";
    players: { P1: Player, P2: Player };
    gameId: number | null;
    aiDifficulty: number | null;
    onUpdatePlayers: (updater: (prev: { P1: Player, P2: Player }) => { P1: Player, P2: Player }) => void;
    onUpdateWalls: (updater: (prev: Wall[]) => Wall[]) => void;
    onDefeat: () => void;
    onChangeTurn: () => void;
};

export const useAIMove = ({
    isVsAI,
    isViewingHistory,
    victory,
    turn,
    players,
    gameId,
    aiDifficulty,
    onUpdatePlayers,
    onUpdateWalls,
    onDefeat,
    onChangeTurn,
}: UseAIMoveProps) => {
    const { play } = useSound();

    useEffect(() => {
        const makeAIMove = async () => {
            if (isViewingHistory || !isVsAI || victory || turn !== "P2") return;

            try {
                const response = await AxiosInstance.post("/ia_play", {
                    player_id: players.P2.id,
                    game_id: gameId,
                    difficulty: aiDifficulty
                });

                if (response.data.success) {
                    const action = response.data.action;

                    if (action === "player") {
                        onUpdatePlayers(prev => ({
                            ...prev,
                            P2: {
                                ...prev.P2,
                                position: {
                                    x: response.data.x,
                                    y: response.data.y
                                }
                            }
                        }));

                        if (response.data.x === BOARD_SIZE - 1) {
                            onDefeat();
                        }

                        play(SOUND_KEYS.MOVE);
                        onChangeTurn();
                    }
                    else if (action === "wall") {
                        const newWall: Wall = {
                            playerId: players.P2.id,
                            position: {
                                x: response.data.x,
                                y: response.data.y,
                            },
                            orientation: response.data.orientation,
                        };

                        onUpdateWalls(prev => [...prev, newWall]);
                        onUpdatePlayers(prev => ({
                            ...prev,
                            P2: {
                                ...prev.P2,
                                wallsRemaining: prev.P2.wallsRemaining - 1
                            }
                        }));

                        play(SOUND_KEYS.PLACE_WALL);
                        onChangeTurn();
                    }
                }
            } catch (err) {
                console.error("AI error:", err);
                onChangeTurn();
            }
        };

        const timeout = setTimeout(makeAIMove, 1000);
        return () => clearTimeout(timeout);
    }, [
        isVsAI,
        isViewingHistory,
        victory,
        turn,
        players,
        gameId,
        aiDifficulty,
        play,
        onUpdatePlayers,
        onUpdateWalls,
        onDefeat,
        onChangeTurn,
    ]);
};