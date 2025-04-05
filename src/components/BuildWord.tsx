
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface BuildWordProps {
  selectedLetters: string[];
  onLetterClick: (index: number) => void;
  onClear: () => void;
}

const BuildWord: React.FC<BuildWordProps> = ({ selectedLetters, onLetterClick, onClear }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-4 sm:mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 sm:p-4 flex-1 min-h-12 sm:min-h-16 flex items-center">
          {selectedLetters.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {selectedLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => onLetterClick(index)}
                  className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200"
                >
                  {letter.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 dark:text-gray-500 text-lg sm:text-2xl">Ndërto fjalën këtu</span>
          )}
        </div>
        <button 
          onClick={onClear}
          className="ml-2 sm:ml-4 px-3 py-2 sm:px-6 sm:py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-lg sm:text-xl font-semibold"
        >
          Pastro
        </button>
      </div>
    </div>
  );
};

export default BuildWord;
