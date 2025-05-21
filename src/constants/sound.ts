import soundPlaceWall from '../assets/sounds/placeWallClick.wav';
import soundMove from '../assets/sounds/MoveClick.wav';

export const SOUND_KEYS = {
    ERROR: 'ERROR',
    MOVE: 'MOVE',
    PLACE_WALL: 'PLACE_WALL',
    VICTORY: 'VICTORY',
    TURN_CHANGE: 'TURN_CHANGE',
} as const;

export const SOUNDS = {
    [SOUND_KEYS.ERROR]: '/sounds/error.mp3',
    [SOUND_KEYS.MOVE]: soundMove,
    [SOUND_KEYS.PLACE_WALL]: soundPlaceWall,
    [SOUND_KEYS.VICTORY]: '/sounds/victory.mp3',
    [SOUND_KEYS.TURN_CHANGE]: '/sounds/turn-change.mp3',
} as const;