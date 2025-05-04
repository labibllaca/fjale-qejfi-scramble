
import React from 'react';
import { GameWord } from '../types/game';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface GameOverProps {
  gameWords: GameWord[];
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ gameWords, onRestart }) => {
  const completedWords = gameWords.filter(word => word.completed).length;
  const totalWords = gameWords.length;
  const percentage = Math.round((completedWords / totalWords) * 100);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm mx-auto shadow-lg border border-gray-100 dark:border-gray-700 animate-scale-in">
        <h2 className="text-3xl font-bold mb-4 dark:text-white text-center">Loja mbaroi!</h2>
        
        <div className="flex flex-col items-center mb-4">
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {completedWords}/{totalWords}
          </div>
          <p className="dark:text-gray-300 mt-2">Ke zgjidhur {completedWords} nga {totalWords} fjalë.</p>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <Button 
          className="mt-4 py-6 text-lg w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          onClick={onRestart}
        >
          <RefreshCw className="w-5 h-5" />
          Luaj përsëri
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
