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
  showTimer?: boolean;
}
const WordRow: React.FC<WordRowProps> = ({
  rowNumber,
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
  const shouldShowTimer = isMobile ? isCompleted : showTimer;
  return <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-4">
      
      <div className="flex space-x-1 flex-1 overflow-x-auto pb-1 scrollbar-hide">
        {shuffledWord.split('').map((letter, index) => <WordTile key={index} letter={letter} isSelected={selectedIndices.includes(index)} isCompleted={isCompleted} onClick={() => onLetterClick(letter, index)} />)}
      </div>
      {shouldShowTimer}
    </div>;
};
export default WordRow;