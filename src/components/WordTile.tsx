
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
          isSelected ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200' : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-black dark:text-white'}
      `}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordTile;
