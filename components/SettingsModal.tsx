'use client';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        soundEnabled: boolean;
        voiceSpeed: number;
    };
    onUpdate: (newSettings: any) => void;
}

export default function SettingsModal({ isOpen, onClose, settings, onUpdate }: SettingsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Paramètres ⚙️</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Sound Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔊</span>
                            <div>
                                <p className="font-medium text-gray-900">Bruitages</p>
                                <p className="text-xs text-gray-500">Sons de victoire et d'erreur</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onUpdate({ soundEnabled: !settings.soundEnabled })}
                            className={`w-12 h-7 rounded-full transition-colors relative ${settings.soundEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Voice Speed */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">🗣️</span>
                            <div>
                                <p className="font-medium text-gray-900">Vitesse de la voix</p>
                                <p className="text-xs text-gray-500">Ajuste la rapidité de lecture</p>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="1.2"
                            step="0.1"
                            value={settings.voiceSpeed}
                            onChange={(e) => onUpdate({ voiceSpeed: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Lent</span>
                            <span>Normal</span>
                            <span>Rapide</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}
