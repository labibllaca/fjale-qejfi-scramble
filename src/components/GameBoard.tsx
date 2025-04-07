
import React, { useState } from 'react';
import WordRow from './WordRow';
import BuildWord from './BuildWord';
import Timer from './Timer';
import GameOver from './GameOver';
import BottomWordDisplay from './BottomWordDisplay';
import { useIsMobile } from '../hooks/use-mobile';
import { useGameState } from '../hooks/use-game-state';
import { shuffleWord } from '../utils/wordUtils';

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

  const [showCorrectWord, setShowCorrectWord] = useState(false);

  // Function to handle bottom word letter click
  const handleBottomLetterClick = (letter: string, index: number) => {
    handleLetterClick(letter, index);
    
    // Check if the word is completed after this letter
    const currentWord = gameWords[currentWordIndex];
    const newSelectedWord = [...selectedLetters, letter].join('').toLowerCase();
    
    if (newSelectedWord === currentWord?.original.toLowerCase()) {
      // If correct word assembled, show the correct word briefly
      setShowCorrectWord(true);
      setTimeout(() => setShowCorrectWord(false), 2000); // Show for 2 seconds
    }
  };

  // Function to randomize the bottom word when a letter is clicked
  const handleRandomizeBottomLetter = (letter: string, index: number) => {
    // First add the letter to selected letters
    handleBottomLetterClick(letter, index);
    
    // Then shuffle the remaining letters in the bottom display
    // This is handled automatically by the game state as we're using the same
    // letter indices tracking mechanism
  };

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold dark:text-white animate-fade-in">Fjalë qejfi</h1>
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
        <BottomWordDisplay 
          word={currentBottomWord} 
          onLetterClick={handleRandomizeBottomLetter}
          showCorrectWord={showCorrectWord}
          correctWord={gameWords[currentWordIndex]?.original || ""}
        />
      )}
    </div>
  );
};

export default GameBoard;
