
import React from 'react';
import WordTile from './WordTile';
import { formatSmallTime } from '../utils/wordUtils';
import { useIsMobile } from '../hooks/use-mobile';

interface WordRowProps {
  rowNumber: number;
  word: string;
  shuffledWord: string;
  onLetterClick: (letter: string, index: number) => void;
  isCompleted: boolean;
  selectedIndices: number[];
  solveTime?: number;
}

const WordRow: React.FC<WordRowProps> = ({
  rowNumber,
  word,
  shuffledWord,
  onLetterClick,
  isCompleted,
  selectedIndices,
  solveTime
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-4">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gameGreen text-white rounded-full flex items-center justify-center text-sm sm:text-xl font-bold flex-shrink-0">
        {rowNumber}
      </div>
      <div className="flex space-x-1 flex-1 overflow-x-auto pb-1 scrollbar-hide">
        {shuffledWord.split('').map((letter, index) => (
          <WordTile
            key={index}
            letter={letter}
            isSelected={selectedIndices.includes(index)}
            isCompleted={isCompleted}
            onClick={() => onLetterClick(letter, index)}
          />
        ))}
      </div>
      <div className="w-12 sm:w-16 h-8 sm:h-10 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full flex items-center justify-center text-sm sm:text-lg font-semibold flex-shrink-0">
        {isCompleted && solveTime !== undefined ? formatSmallTime(solveTime) : ""}
      </div>
    </div>
  );
};

export default WordRow;
