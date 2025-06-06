import { useCallback, useEffect, useRef } from 'react';
import { SOUNDS, SOUND_KEYS } from '../constants/sound';

type SoundKey = keyof typeof SOUND_KEYS;

export const useSound = () => {
    const audioRefs = useRef<{ [K in SoundKey]?: HTMLAudioElement }>({});

    useEffect(() => {
        // Initialiser tous les sons
        Object.entries(SOUNDS).forEach(([key, path]) => {
            const audio = new Audio(path);
            audio.volume = 0.5; // Volume par défaut
            audioRefs.current[key as SoundKey] = audio;
        });

        // Cleanup quand unmount
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        };
    }, []);

    const play = useCallback((soundKey: SoundKey) => {
        const audio = audioRefs.current[soundKey];
        if (audio) {
            audio.currentTime = 0; // Reset le son à zéro
            audio.play().catch(err => console.error('Error playing sound:', err));
        }
    }, []);

    const setVolume = useCallback((volume: number) => {
        Object.values(audioRefs.current).forEach(audio => {
            if (audio) {
                audio.volume = Math.max(0, Math.min(1, volume));
            }
        });
    }, []);

    return { play, setVolume };
};