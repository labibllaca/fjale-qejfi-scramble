
import React from 'react';
import WordTile from './WordTile';
import { formatSmallTime } from '../utils/wordUtils';

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
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="w-10 h-10 bg-gameGreen text-white rounded-full flex items-center justify-center text-xl font-bold">
        {rowNumber}
      </div>
      <div className="flex space-x-1 flex-1">
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
      <div className="w-16 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-lg font-semibold">
        {isCompleted && solveTime !== undefined ? formatSmallTime(solveTime) : ""}
      </div>
    </div>
  );
};

export default WordRow;
