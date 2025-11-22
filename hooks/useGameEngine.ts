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
    // State
    const [deck, setDeck] = useState<string[]>([]);
    const [currentWordId, setCurrentWordId] = useState<string | null>(null);

    const [status, setStatus] = useState<GameStatus>('idle'); // Start in idle
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0); // New High Score
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize
    useEffect(() => {
        const savedHighScore = localStorage.getItem('ortho_highscore');
        if (savedHighScore) setHighScore(parseInt(savedHighScore));

        // We don't auto-load the game state in 'idle' mode, only high score
        // But if we want to resume a game, we could check for saved state
        const savedDeck = localStorage.getItem('ortho_deck');
        if (savedDeck && JSON.parse(savedDeck).length > 0) {
            // Optional: Resume logic could go here, but for now let's stick to clean start or manual resume
            // For simplicity in this phase, we start at 'idle' unless we implement a "Resume" button
        }

        setIsLoaded(true);
    }, []);

    // Save Persistence
    useEffect(() => {
        if (!isLoaded) return;
        if (status === 'idle') return; // Don't save empty state over good state if idle

        localStorage.setItem('ortho_deck', JSON.stringify(deck));
        if (currentWordId) localStorage.setItem('ortho_current_id', currentWordId);
        localStorage.setItem('ortho_score', score.toString());
        localStorage.setItem('ortho_lives', lives.toString());
        localStorage.setItem('ortho_streak', streak.toString());

        // Update High Score
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('ortho_highscore', score.toString());
        }
    }, [deck, currentWordId, score, lives, streak, isLoaded, status, highScore]);

    const currentWord = words.find(w => w.id === currentWordId) || words[0];

    const startGame = useCallback(() => {
        // Reset and Start
        setScore(0);
        setLives(3);
        setStreak(0);

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
            setScore(prev => prev + 10 + (streak * 2));
            setStreak(prev => prev + 1);
            playSuccess();
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
            setStreak(0);
            playError();
        }

        if (lives > 0 || correct) {
            setStatus('feedback');
        }
    }, [currentWord, streak, lives]);

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
        setStatus('idle'); // Go back to welcome screen
        localStorage.removeItem('ortho_deck');
        localStorage.removeItem('ortho_current_id');
        localStorage.removeItem('ortho_score');
        localStorage.removeItem('ortho_lives');
        localStorage.removeItem('ortho_streak');
    }, []);

    return {
        currentWord,
        currentIndex: words.length - deck.length + 1,
        status,
        userInput,
        isCorrect,
        score,
        highScore, // Export High Score
        lives,
        streak,
        isLoaded,
        totalWords: words.length,
        remainingWords: deck.length,
        startGame, // Export Start Action
        submitAnswer,
        nextWord,
        resetGame
    };
}
