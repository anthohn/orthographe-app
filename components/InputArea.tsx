'use client';

import { useState, FormEvent } from 'react';

interface InputAreaProps {
    onSubmit: (text: string) => void;
    disabled?: boolean;
}

export default function InputArea({ onSubmit, disabled = false }: InputAreaProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={disabled}
                    placeholder="Écrivez ce que vous entendez..."
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
            </div>
            <button
                type="submit"
                disabled={disabled || !input.trim()}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
                Vérifier
            </button>
        </form>
    );
}
