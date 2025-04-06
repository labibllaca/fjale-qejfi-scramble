
import React from 'react';
import WordRow from './WordRow';
import BuildWord from './BuildWord';
import Timer from './Timer';
import GameOver from './GameOver';
import BottomWordDisplay from './BottomWordDisplay';
import { useIsMobile } from '../hooks/use-mobile';
import { useGameState } from '../hooks/use-game-state';

const GAME_TIME = 5 * 60; // 5 minutes in seconds

const GameBoard: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    gameWords,
    currentWordIndex,
    selectedLetters,
    gameOver,
    currentBottomWord,
    handleLetterClick,
    handleSelectedLetterClick,
    handleClearSelection,
    handleGameOver,
  } = useGameState();

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold dark:text-white">Fjalë qejfi</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Rindërtoni fjalët e përziera</p>
        </div>
        <Timer initialTime={GAME_TIME} onTimeUp={handleGameOver} />
      </div>
      
      <BuildWord 
        selectedLetters={selectedLetters}
        onLetterClick={handleSelectedLetterClick}
        onClear={handleClearSelection}
      />
      
      <div className="space-y-2 sm:space-y-4 mb-24">
        {gameWords.map((word, index) => (
          <WordRow
            key={`word-${index}-${word.original}`}
            rowNumber={index + 1}
            word={word.original}
            shuffledWord={word.shuffled}
            onLetterClick={(letter, letterIndex) => {
              if (index === currentWordIndex) {
                handleLetterClick(letter, letterIndex);
              }
            }}
            isCompleted={word.completed}
            selectedIndices={index === currentWordIndex ? word.selectedIndices : []}
            solveTime={word.solveTime}
            showTimer={!isMobile || word.completed}
          />
        ))}
      </div>
      
      {gameOver && (
        <GameOver 
          gameWords={gameWords} 
          onRestart={() => window.location.reload()} 
        />
      )}
      
      {!gameOver && (
        <BottomWordDisplay word={currentBottomWord} />
      )}
    </div>
  );
};

export default GameBoard;
