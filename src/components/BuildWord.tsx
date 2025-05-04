
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { RefreshCw } from 'lucide-react';

interface BuildWordProps {
  selectedLetters: string[];
  onLetterClick: (index: number) => void;
  onClear: () => void;
}

const BuildWord: React.FC<BuildWordProps> = ({ selectedLetters, onLetterClick, onClear }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-4 sm:mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-2 gap-2">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 sm:p-4 flex-1 min-h-16 sm:min-h-20 flex items-center justify-center transition-all hover:border-blue-300 dark:hover:border-blue-500 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm glass-effect">
          {selectedLetters.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
              {selectedLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => onLetterClick(index)}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all px-3 py-1 rounded-md shadow-sm"
                >
                  {letter.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 dark:text-gray-500 text-lg sm:text-2xl animate-pulse">Ndërto fjalën këtu</span>
          )}
        </div>
        <button 
          onClick={onClear}
          className="ml-2 h-16 sm:h-20 px-4 py-2 sm:px-6 sm:py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-lg sm:text-xl font-semibold transition-all hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          aria-label="Pastro"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="hidden sm:inline">Pastro</span>
        </button>
      </div>
    </div>
  );
};

export default BuildWord;
