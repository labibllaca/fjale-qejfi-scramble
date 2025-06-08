
import React from 'react';
import { X, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuildWordProps {
  selectedLetters: string[];
  onLetterClick: (index: number) => void;
  onClear: () => void;
  wrongAttempts?: number;
  hintUsed?: boolean;
}

const BuildWord: React.FC<BuildWordProps> = ({ 
  selectedLetters, 
  onLetterClick, 
  onClear,
  wrongAttempts = 0,
  hintUsed = false
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 border border-purple-100 dark:border-gray-600 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Ndërtoni fjalën
        </h3>
        
        <div className="flex items-center gap-2">
          {wrongAttempts > 0 && (
            <div className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
              <span className="font-medium">{wrongAttempts}/5</span>
              {wrongAttempts >= 5 && hintUsed && (
                <Lightbulb className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            disabled={selectedLetters.length === 0}
            className="flex items-center gap-1 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Pastro</span>
          </Button>
        </div>
      </div>
      
      <div className="min-h-[60px] flex items-center justify-center">
        {selectedLetters.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            Zgjidhni shkronjat për të ndërtuar fjalën
          </p>
        ) : (
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
            {selectedLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => onLetterClick(index)}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg sm:text-xl rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {wrongAttempts >= 3 && wrongAttempts < 5 && (
        <div className="mt-3 text-center">
          <p className="text-sm text-orange-600 dark:text-orange-400">
            {5 - wrongAttempts} tentativa të gabuara deri te ndihmësa
          </p>
        </div>
      )}
      
      {wrongAttempts >= 5 && hintUsed && (
        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center flex items-center justify-center gap-1">
            <Lightbulb className="w-4 h-4" />
            Ndihmësa u përdor
          </p>
        </div>
      )}
    </div>
  );
};

export default BuildWord;
