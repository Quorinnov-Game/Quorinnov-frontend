import soundPlaceWall from '../assets/sounds/placeWallClick.wav';
import soundMove from '../assets/sounds/MoveSound.wav';
import soundError from '../assets/sounds/errorSound.wav';
import soundNotification from '../assets/sounds/notificationSound.wav';
import soundCorrect from '../assets/sounds/correctSound.wav';

export const SOUND_KEYS = {
    ERROR: 'ERROR',
    MOVE: 'MOVE',
    PLACE_WALL: 'PLACE_WALL',
    VICTORY: 'VICTORY',
    CORRECT: 'CORRECT',
    MESSAGE: 'MESSAGE',
} as const;

export const SOUNDS = {
    [SOUND_KEYS.ERROR]: soundError,
    [SOUND_KEYS.MOVE]: soundMove,
    [SOUND_KEYS.PLACE_WALL]: soundPlaceWall,
    [SOUND_KEYS.VICTORY]: 'https://particles.js.org/audio/explosion0.mp3',
    [SOUND_KEYS.CORRECT]: soundCorrect,
    [SOUND_KEYS.MESSAGE]: soundNotification,
} as const;