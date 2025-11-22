import GameContainer from '@/components/GameContainer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-bold text-xl text-gray-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">O</span>
          Orthographe
        </div>
        <nav>
          {/* Placeholder for future nav */}
        </nav>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <GameContainer />
      </div>

      <footer className="p-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Orthographe App - Entraînez-vous quotidiennement
      </footer>
    </main>
  );
}
