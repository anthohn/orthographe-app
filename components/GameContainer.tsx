'use client';

import { useGameEngine } from '@/hooks/useGameEngine';
import AudioPlayer from './AudioPlayer';
import InputArea from './InputArea';
import Feedback from './Feedback';
import HeaderStats from './HeaderStats';
import WelcomeScreen from './WelcomeScreen';

export default function GameContainer() {
    const {
        currentWord,
        currentIndex,
        status,
        userInput,
        isCorrect,
        score,
        highScore,
        lives,
        streak,
        isLoaded,
        totalWords,
        remainingWords,
        startGame,
        submitAnswer,
        nextWord,
        resetGame
    } = useGameEngine();

    if (!isLoaded) return null;

    // 1. Idle State -> Welcome Screen
    if (status === 'idle') {
        return <WelcomeScreen highScore={highScore} onStart={startGame} />;
    }

    // 2. Game Over State
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
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    // 3. Victory State
    if (status === 'victory') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-6 text-center animate-in zoom-in duration-300">
                <div className="text-6xl mb-4">🏆</div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">Victoire !</h1>
                <p className="text-gray-500 mb-8">Tu as maîtrisé tous les mots !</p>

                <div className="bg-white p-6 rounded-2xl shadow-lg w-full mb-8 border border-gray-100">
                    <p className="text-sm text-gray-400 uppercase font-bold">Score Final</p>
                    <p className="text-5xl font-black text-blue-600">{score}</p>
                </div>

                <button
                    onClick={resetGame}
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-xl"
                >
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    // 4. Playing / Feedback State
    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] w-full max-w-2xl mx-auto p-4">
            <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Niveau {currentWord.level} • Reste {remainingWords} mots
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

                        <InputArea onSubmit={submitAnswer} />
                    </>
                ) : (
                    <Feedback
                        isCorrect={isCorrect}
                        targetWord={currentWord.text}
                        userInput={userInput}
                        hint={currentWord.hint} // Pass the hint
                        onNext={nextWord}
                    />
                )}
            </div>

            <HeaderStats score={score} lives={lives} streak={streak} />
        </div>
    );
}
