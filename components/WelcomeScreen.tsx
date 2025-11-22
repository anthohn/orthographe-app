'use client';

interface WelcomeScreenProps {
    highScore: number;
    onStart: () => void;
}

export default function WelcomeScreen({ highScore, onStart }: WelcomeScreenProps) {

    // Calculate Rank
    const getRank = (score: number) => {
        if (score >= 1000) return { title: 'Maître des Mots 👑', color: 'text-purple-600' };
        if (score >= 500) return { title: 'Expert 🎓', color: 'text-red-600' };
        if (score >= 200) return { title: 'Écrivain ✍️', color: 'text-blue-600' };
        if (score >= 50) return { title: 'Apprenti 🎒', color: 'text-green-600' };
        return { title: 'Débutant 🌱', color: 'text-gray-500' };
    };

    const rank = getRank(highScore);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-md mx-auto p-6 text-center animate-in fade-in duration-700">

            {/* Logo / Icon */}
            <div className="mb-8 relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
                <span className="relative text-8xl">📚</span>
            </div>

            <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
                Orthographe
            </h1>
            <p className="text-xl text-gray-500 mb-12 font-medium">
                Deviens un maître de la dictée.
            </p>

            {/* Stats Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full mb-10 border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-2">Ton Meilleur Score</p>
                <p className="text-6xl font-black text-gray-800 mb-4">{highScore}</p>

                <div className="flex items-center justify-center gap-2 bg-gray-50 py-2 px-4 rounded-full mx-auto w-fit">
                    <span className="text-sm text-gray-500 font-semibold">Rang :</span>
                    <span className={`text-lg font-bold ${rank.color}`}>{rank.title}</span>
                </div>
            </div>

            <button
                onClick={onStart}
                className="w-full py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all shadow-blue-200 shadow-lg"
            >
                JOUER MAINTENANT
            </button>

            <p className="mt-6 text-xs text-gray-400">
                50 mots • Mode Infini • Progression sauvegardée
            </p>
        </div>
    );
}
