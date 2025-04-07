
import React from 'react';

interface BottomWordDisplayProps {
  word: string;
  onLetterClick: (letter: string, index: number) => void;
  showCorrectWord: boolean;
  correctWord: string;
}

const BottomWordDisplay: React.FC<BottomWordDisplayProps> = ({ 
  word, 
  onLetterClick,
  showCorrectWord,
  correctWord
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-5 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border-t dark:border-gray-700 shadow-lg animate-slide-in-bottom">
      {showCorrectWord && (
        <div className="mb-3 text-center font-bold text-xl sm:text-2xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent animate-scale-in">
          {correctWord.toUpperCase()}
        </div>
      )}
      <div className="max-w-xl mx-auto flex justify-center space-x-2 sm:space-x-4">
        {word.split('').map((letter, index) => (
          <div 
            key={index}
            className="w-11 h-11 sm:w-14 sm:h-14 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold dark:text-white cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors hover:scale-110 transform transition-transform animate-pop-in shadow-md hover:shadow-lg active:scale-95"
            onClick={() => onLetterClick(letter, index)}
            style={{ fontSize: 'calc(1.25rem * var(--letter-size-scale, 100) / 100)', animationDelay: `${index * 50}ms` }}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomWordDisplay;
