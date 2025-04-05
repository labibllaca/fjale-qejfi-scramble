
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <button 
      onClick={onClick}
      className={`
        w-12 h-14 sm:w-16 sm:h-20 flex items-center justify-center text-xl sm:text-3xl font-bold
        rounded-md transition-all flex-shrink-0
        ${isCompleted ? 'bg-gameGreen text-white' : 
          isSelected ? 'bg-gray-200 text-gray-700' : 'bg-white border-2 border-gray-200 text-black'}
      `}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordTile;
