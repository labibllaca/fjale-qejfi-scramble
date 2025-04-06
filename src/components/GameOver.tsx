
import React from 'react';
import { GameWord } from '../types/game';

interface GameOverProps {
  gameWords: GameWord[];
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ gameWords, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Loja mbaroi!</h2>
        <p className="dark:text-gray-300">Ke zgjidhur {gameWords.filter(word => word.completed).length} fjalë.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600"
          onClick={onRestart}
        >
          Luaj përsëri
        </button>
      </div>
    </div>
  );
};

export default GameOver;
