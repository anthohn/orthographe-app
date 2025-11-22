import { useState, useEffect, useCallback } from 'react';
import { words } from '@/data/words';
import { playSuccess, playError } from '@/utils/sounds';
import confetti from 'canvas-confetti';

export type GameStatus = 'idle' | 'playing' | 'feedback' | 'gameover' | 'victory';

// Fisher-Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function useGameEngine() {
    // Game State
    const [deck, setDeck] = useState<string[]>([]);
    const [currentWordId, setCurrentWordId] = useState<string | null>(null);
    const [status, setStatus] = useState<GameStatus>('idle');
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    // Stats
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(0); // Renamed 'streak' to 'combo' for in-game
    const [dailyStreak, setDailyStreak] = useState(0); // New Daily Streak

    // Settings
    const [settings, setSettings] = useState({
        soundEnabled: true,
        voiceSpeed: 1.0 // 0.8 (Slow) to 1.2 (Fast)
    });

    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize
    useEffect(() => {
        // Load Stats
        const savedHighScore = localStorage.getItem('ortho_highscore');
        if (savedHighScore) setHighScore(parseInt(savedHighScore));

        // Load Settings
        const savedSettings = localStorage.getItem('ortho_settings');
        if (savedSettings) setSettings(JSON.parse(savedSettings));

        // Load Daily Streak Logic
        const lastPlayedDate = localStorage.getItem('ortho_last_played');
        const savedDailyStreak = localStorage.getItem('ortho_daily_streak');
        const today = new Date().toDateString();

        if (savedDailyStreak) {
            const streakCount = parseInt(savedDailyStreak);
            if (lastPlayedDate === today) {
                // Already played today, keep streak
                setDailyStreak(streakCount);
            } else {
                // Check if played yesterday
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastPlayedDate === yesterday.toDateString()) {
                    // Played yesterday, streak continues!
                    // We don't increment here, we increment when they finish a game or answer correctly
                    setDailyStreak(streakCount);
                } else {
                    // Missed a day (or more), reset
                    setDailyStreak(0);
                }
            }
        }

        setIsLoaded(true);
    }, []);

    // Save Persistence
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem('ortho_settings', JSON.stringify(settings));

        if (status === 'idle') return;

        localStorage.setItem('ortho_score', score.toString());
        localStorage.setItem('ortho_highscore', highScore.toString());

        // Update Daily Streak on activity
        const today = new Date().toDateString();
        const lastPlayedDate = localStorage.getItem('ortho_last_played');

        if (lastPlayedDate !== today) {
            // First activity of the day!
            const newStreak = dailyStreak + 1;
            setDailyStreak(newStreak);
            localStorage.setItem('ortho_daily_streak', newStreak.toString());
            localStorage.setItem('ortho_last_played', today);
        }

    }, [score, highScore, settings, isLoaded, status, dailyStreak]);

    const currentWord = words.find(w => w.id === currentWordId) || words[0];

    const updateSettings = (newSettings: Partial<typeof settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const startGame = useCallback(() => {
        setScore(0);
        setLives(3);
        setCombo(0);

        const allIds = words.map(w => w.id);
        const shuffled = shuffleArray(allIds);
        setDeck(shuffled);
        setCurrentWordId(shuffled[0]);

        setStatus('playing');
        setUserInput('');
    }, []);

    const submitAnswer = useCallback((text: string) => {
        const normalizedInput = text.trim().toLowerCase();
        const normalizedTarget = currentWord.text.trim().toLowerCase();

        const correct = normalizedInput === normalizedTarget;

        setUserInput(text);
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 10 + (combo * 2));
            setCombo(prev => prev + 1);
            if (settings.soundEnabled) playSuccess();
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#3b82f6', '#eab308']
            });
        } else {
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) setStatus('gameover');
                return newLives;
            });
            setCombo(0);
            if (settings.soundEnabled) playError();
        }

        if (lives > 0 || correct) {
            setStatus('feedback');
        }
    }, [currentWord, combo, lives, settings.soundEnabled]);

    const nextWord = useCallback(() => {
        if (isCorrect) {
            const newDeck = deck.filter(id => id !== currentWordId);
            setDeck(newDeck);

            if (newDeck.length === 0) {
                setStatus('victory');
                return;
            }
            setCurrentWordId(newDeck[0]);
        } else {
            const newDeck = deck.filter(id => id !== currentWordId);
            newDeck.push(currentWordId!);
            setDeck(newDeck);
            setCurrentWordId(newDeck[0]);
        }

        setStatus('playing');
        setUserInput('');
    }, [deck, currentWordId, isCorrect]);

    const resetGame = useCallback(() => {
        setStatus('idle');
    }, []);

    return {
        currentWord,
        currentIndex: words.length - deck.length + 1,
        status,
        userInput,
        isCorrect,
        score,
        highScore,
        lives,
        combo,
        dailyStreak,
        settings,
        updateSettings,
        isLoaded,
        totalWords: words.length,
        remainingWords: deck.length,
        startGame,
        submitAnswer,
        nextWord,
        resetGame
    };
}
