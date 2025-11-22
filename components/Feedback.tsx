'use client';

import { useMemo } from 'react';

interface FeedbackProps {
    isCorrect: boolean;
    targetWord: string;
    userInput: string;
    hint?: string;
    onNext: () => void;
}

export default function Feedback({ isCorrect, targetWord, userInput, hint, onNext }: FeedbackProps) {

    // Simple diff logic for visual feedback
    const diffDisplay = useMemo(() => {
        if (isCorrect) return null;

        const target = targetWord.toLowerCase();
        const input = userInput.toLowerCase();
        const maxLength = Math.max(target.length, input.length);

        const result = [];

        for (let i = 0; i < maxLength; i++) {
            const tChar = target[i];
            const iChar = input[i];

            if (tChar === iChar) {
                result.push(<span key={i} className="text-green-600 font-bold">{tChar}</span>);
            } else if (!tChar) {
                // User typed too much
                result.push(<span key={i} className="bg-red-200 text-red-800 line-through decoration-red-500">{iChar}</span>);
            } else if (!iChar) {
                // User missed a char
                result.push(<span key={i} className="bg-yellow-200 text-yellow-800 px-0.5 border-b-2 border-yellow-500">{tChar}</span>);
            } else {
                // Wrong char
                result.push(
                    <span key={i} className="inline-flex flex-col items-center mx-0.5">
                        <span className="text-xs text-red-400 line-through">{iChar}</span>
                        <span className="text-green-600 font-bold border-b-2 border-green-200">{tChar}</span>
                    </span>
                );
            }
        }
        return result;
    }, [isCorrect, targetWord, userInput]);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md transition-all duration-500 ease-out transform translate-y-0 opacity-100">
            <div className={`w-full p-6 rounded-2xl text-center ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-900'}`}>
                <h2 className="text-3xl font-black mb-2">
                    {isCorrect ? 'Excellent ! 🌟' : 'Aïe ! 😬'}
                </h2>

                {!isCorrect && (
                    <div className="mt-6 bg-white/80 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-3">Correction détaillée</p>
                        <div className="text-2xl font-mono flex flex-wrap justify-center items-end gap-0.5">
                            {diffDisplay}
                        </div>
                        <div className="mt-4 text-xs text-gray-400 flex gap-4 justify-center">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Correct</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span>Manquant</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full"></span>Erreur</span>
                        </div>

                        {hint && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <p className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">💡 Astuce</p>
                                <p className="text-sm text-gray-600 italic">"{hint}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <button
                onClick={onNext}
                className={`
          px-8 py-4 text-lg font-bold rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95
          ${isCorrect
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
                        : 'bg-gray-900 text-white hover:bg-black shadow-gray-300'
                    }
        `}
                autoFocus
            >
                {isCorrect ? 'Continuer ➡️' : 'Réessayer 🔄'}
            </button>
        </div>
    );
}
