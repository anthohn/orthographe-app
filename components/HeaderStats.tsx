'use client';

interface HeaderStatsProps {
    score: number;
    lives: number;
    streak: number;
}

export default function HeaderStats({ score, lives, streak }: HeaderStatsProps) {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-6 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Vies */}
            <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                    <span key={i} className={`text-2xl transition-all ${i < lives ? 'opacity-100 scale-100' : 'opacity-20 scale-90 grayscale'}`}>
                        ❤️
                    </span>
                ))}
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Score</span>
                <span className="text-2xl font-black text-gray-800">{score}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2 text-orange-500">
                <span className="text-2xl">🔥</span>
                <span className="font-bold text-xl">{streak}</span>
            </div>
        </div>
    );
}
