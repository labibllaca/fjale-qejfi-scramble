
import React from 'react';

interface WordTileProps {
  letter: string;
  isSelected?: boolean;
  onClick: () => void;
  isCompleted?: boolean;
}

const WordTile: React.FC<WordTileProps> = ({ 
  letter, 
  isSelected = false, 
  onClick, 
  isCompleted = false 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`
        w-16 h-20 flex items-center justify-center text-3xl font-bold
        rounded-md transition-all
        ${isCompleted ? 'bg-gameGreen text-white' : 
          isSelected ? 'bg-gray-200 text-gray-700' : 'bg-white border-2 border-gray-200 text-black'}
      `}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordTile;
