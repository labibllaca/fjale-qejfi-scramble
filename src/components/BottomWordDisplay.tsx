
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
    <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg">
      {showCorrectWord && (
        <div className="mb-2 text-center text-green-600 dark:text-green-400 font-bold">
          {correctWord.toUpperCase()}
        </div>
      )}
      <div className="max-w-xl mx-auto flex justify-center space-x-1 sm:space-x-4">
        {word.split('').map((letter, index) => (
          <div 
            key={index}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded flex items-center justify-center text-lg sm:text-xl font-bold dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => onLetterClick(letter, index)}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomWordDisplay;
