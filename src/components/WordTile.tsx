
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
        rounded-md transition-all transform hover:scale-105 
        shadow-md hover:shadow-lg active:scale-95
        animate-pop-in
        ${isCompleted 
          ? 'bg-gradient-to-br from-emerald-400 to-gameGreen text-white' 
          : isSelected 
            ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-200 ring-2 ring-blue-400 dark:ring-blue-500' 
            : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-black dark:text-white hover:border-blue-300 dark:hover:border-blue-400'}
      `}
      style={{ fontSize: `calc(${isMobile ? '1.25rem' : '1.875rem'} * var(--letter-size-scale, 100) / 100)` }}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordTile;
