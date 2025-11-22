'use client';

import { useState, useEffect } from 'react';
import { words } from '@/data/words';
import AudioPlayer from './AudioPlayer';
import InputArea from './InputArea';
import Feedback from './Feedback';
import HeaderStats from './HeaderStats';

export default function GameContainer() {
    // Game State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [status, setStatus] = useState<'playing' | 'feedback' | 'gameover'>('playing');
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    // Stats State
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedScore = localStorage.getItem('ortho_score');
        const savedLives = localStorage.getItem('ortho_lives');
        const savedStreak = localStorage.getItem('ortho_streak');
        const savedIndex = localStorage.getItem('ortho_index');

        if (savedScore) setScore(parseInt(savedScore));
        if (savedLives) setLives(parseInt(savedLives));
        if (savedStreak) setStreak(parseInt(savedStreak));
        if (savedIndex) setCurrentIndex(parseInt(savedIndex));

        setIsLoaded(true);
    }, []);

    // Save state to localStorage on change
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem('ortho_score', score.toString());
        localStorage.setItem('ortho_lives', lives.toString());
        localStorage.setItem('ortho_streak', streak.toString());
        localStorage.setItem('ortho_index', currentIndex.toString());
    }, [score, lives, streak, currentIndex, isLoaded]);

    const currentWord = words[currentIndex];

    const handleSubmit = (text: string) => {
        const normalizedInput = text.trim().toLowerCase();
        const normalizedTarget = currentWord.text.trim().toLowerCase();

        const correct = normalizedInput === normalizedTarget;

        setUserInput(text);
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 10 + (streak * 2)); // Bonus for streak
            setStreak(prev => prev + 1);
        } else {
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) setStatus('gameover');
                return newLives;
            });
            setStreak(0);
        }

        if (lives > 0 || correct) {
            setStatus('feedback');
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStatus('playing');
            setUserInput('');
        } else {
            // Victory / End of content logic
            alert('Bravo ! Tu as terminé tous les mots disponibles !');
            resetGame();
        }
    };

    const resetGame = () => {
        setScore(0);
        setLives(3);
        setStreak(0);
        setCurrentIndex(0);
        setStatus('playing');
        setUserInput('');
        localStorage.clear();
    };

    if (!isLoaded) return null; // Prevent hydration mismatch

    if (status === 'gameover') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-6 text-center animate-in zoom-in duration-300">
                <div className="text-6xl mb-4">💀</div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">Game Over</h1>
                <p className="text-gray-500 mb-8">Tu n'as plus de vies...</p>

                <div className="bg-white p-6 rounded-2xl shadow-lg w-full mb-8 border border-gray-100">
                    <p className="text-sm text-gray-400 uppercase font-bold">Score Final</p>
                    <p className="text-5xl font-black text-blue-600">{score}</p>
                </div>

                <button
                    onClick={resetGame}
                    className="w-full py-4 bg-black text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-xl"
                >
                    Recommencer une partie
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] w-full max-w-2xl mx-auto p-4">

            <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Niveau {currentWord.level} • Mot {currentIndex + 1} / {words.length}
                </span>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 p-8 w-full flex flex-col items-center gap-8 border border-white ring-1 ring-gray-100">
                {status === 'playing' ? (
                    <>
                        <div className="flex flex-col items-center gap-4 w-full">
                            <AudioPlayer
                                text={currentWord.context || currentWord.text}
                                targetWord={currentWord.text}
                                autoPlay={true}
                            />

                            {currentWord.context ? (
                                <div className="text-xl text-center font-medium text-gray-700 my-4 leading-relaxed">
                                    {(() => {
                                        const parts = currentWord.context.split(new RegExp(`(${currentWord.text})`, 'gi'));
                                        return parts.map((part, i) =>
                                            part.toLowerCase() === currentWord.text.toLowerCase() ? (
                                                <span key={i} className="inline-block border-b-4 border-blue-500 min-w-[100px] mx-1 bg-blue-50/50 rounded-t">
                                                    &nbsp;
                                                </span>
                                            ) : (
                                                <span key={i}>{part}</span>
                                            )
                                        );
                                    })()}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">
                                    (Écoutez le mot)
                                </p>
                            )}
                        </div>

                        <InputArea onSubmit={handleSubmit} />
                    </>
                ) : (
                    <Feedback
                        isCorrect={isCorrect}
                        targetWord={currentWord.text}
                        userInput={userInput}
                        onNext={handleNext}
                    />
                )}
            </div>
            <HeaderStats score={score} lives={lives} streak={streak} />
        </div>
    );
}
