
import React from 'react';

interface BuildWordProps {
  selectedLetters: string[];
  onLetterClick: (index: number) => void;
  onClear: () => void;
}

const BuildWord: React.FC<BuildWordProps> = ({ selectedLetters, onLetterClick, onClear }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex-1 min-h-16 flex items-center">
          {selectedLetters.length > 0 ? (
            <div className="flex space-x-2">
              {selectedLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => onLetterClick(index)}
                  className="text-2xl font-bold text-gray-700"
                >
                  {letter.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 text-2xl">Build your word here</span>
          )}
        </div>
        <button 
          onClick={onClear}
          className="ml-4 px-6 py-4 bg-gray-100 text-gray-600 rounded-lg text-xl font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default BuildWord;
