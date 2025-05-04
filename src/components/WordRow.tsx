
import React from 'react';
import WordTile from './WordTile';
import { formatSmallTime } from '../utils/wordUtils';
import { useIsMobile } from '../hooks/use-mobile';

interface WordRowProps {
  word: string;
  shuffledWord: string;
  onLetterClick: (letter: string, index: number) => void;
  isCompleted: boolean;
  selectedIndices: number[];
  solveTime?: number;
  showTimer?: boolean;
}

const WordRow: React.FC<WordRowProps> = ({
  word,
  shuffledWord,
  onLetterClick,
  isCompleted,
  selectedIndices,
  solveTime,
  showTimer = true
}) => {
  const isMobile = useIsMobile();

  // Only show timer on mobile for completed words, always show on desktop
  const shouldShowTimer = (isMobile ? isCompleted : showTimer) && solveTime !== undefined;
  
  // Display the correct word if completed, otherwise show the shuffled word
  const displayWord = isCompleted ? word : shuffledWord;
  
  return (
    <div className="flex items-center mb-2 sm:mb-4 w-full">
      <div className="flex flex-wrap gap-1 sm:gap-2 flex-1 min-w-0">
        {displayWord.split('').map((letter, index) => (
          <WordTile 
            key={index} 
            letter={letter} 
            isSelected={!isCompleted && selectedIndices.includes(index)} 
            isCompleted={isCompleted} 
            onClick={() => onLetterClick(letter, index)} 
          />
        ))}
      </div>
      {shouldShowTimer && (
        <div className="timer bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg text-sm font-medium animate-fade-in ml-2 flex-shrink-0">
          {formatSmallTime(solveTime)}
        </div>
      )}
    </div>
  );
};

export default WordRow;
