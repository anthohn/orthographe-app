'use client';

import { useState, useEffect } from 'react';

interface AudioPlayerProps {
    text: string;
    targetWord?: string;
    autoPlay?: boolean;
}

export default function AudioPlayer({ text, targetWord, autoPlay = false }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setSupported(true);
        }
    }, []);

    useEffect(() => {
        if (autoPlay && supported) {
            speak();
        }
    }, [text, targetWord, autoPlay, supported]);

    const speak = () => {
        if (!supported) return;

        window.speechSynthesis.cancel();

        // 1. Speak the context (sentence)
        const sentenceUtterance = new SpeechSynthesisUtterance(text);
        sentenceUtterance.lang = 'fr-FR';
        sentenceUtterance.rate = 0.9;
        sentenceUtterance.onstart = () => setIsPlaying(true);

        if (targetWord) {
            // If we have a target word, chain it after the sentence
            sentenceUtterance.onend = () => {
                // Small pause is automatic between utterances in the queue
                const wordUtterance = new SpeechSynthesisUtterance(targetWord);
                wordUtterance.lang = 'fr-FR';
                wordUtterance.rate = 0.8; // Slower for the target word
                wordUtterance.onend = () => setIsPlaying(false);
                wordUtterance.onerror = () => setIsPlaying(false);
                window.speechSynthesis.speak(wordUtterance);
            };
        } else {
            sentenceUtterance.onend = () => setIsPlaying(false);
        }

        sentenceUtterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(sentenceUtterance);
    };

    if (!supported) {
        return <span className="text-red-500 text-sm">Audio non supporté</span>;
    }

    return (
        <button
            onClick={speak}
            disabled={isPlaying}
            className={`
        px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2
        ${isPlaying
                    ? 'bg-blue-100 text-blue-600 cursor-wait'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-md'
                }
      `}
            aria-label="Écouter le mot"
        >
            {isPlaying ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Écoute...
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Écouter
                </>
            )}
        </button>
    );
}
