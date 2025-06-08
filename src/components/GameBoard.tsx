import React, { useState, useEffect } from 'react';
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
  const [gameStarted, setGameStarted] = useState(false);
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

  // Start the game when the user makes the first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!gameStarted) {
        setGameStarted(true);
        // Remove event listeners after the game has started
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    // Add event listeners for user interactions
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    // Clean up on unmount
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [gameStarted]);

  // Function to handle bottom word letter click
  const handleBottomLetterClick = (letter: string, index: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    handleLetterClick(letter, index);
    
    // Check if the word is completed after this letter
    const currentWord = gameWords[currentWordIndex];
    if (!currentWord) return;
    
    const newSelectedWord = [...selectedLetters, letter].join('').toLowerCase();
    
    if (newSelectedWord === currentWord.original.toLowerCase()) {
      // If correct word assembled, show the correct word briefly
      setShowCorrectWord(true);
      setTimeout(() => setShowCorrectWord(false), 2000); // Show for 2 seconds
    }
  };

  // Function to randomize the bottom word when a letter is clicked
  const handleRandomizeBottomLetter = (letter: string, index: number) => {
    // First add the letter to selected letters
    handleBottomLetterClick(letter, index);
  };

  // Restart game function
  const handleRestartGame = () => {
    window.location.reload();
  };

  const currentWord = gameWords[currentWordIndex];

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-fade-in">Fjalë qejfi</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Rindërtoni fjalët e përziera</p>
        </div>
        <Timer 
          initialTime={GAME_TIME} 
          onTimeUp={handleGameOver} 
          isGameStarted={gameStarted}
        />
      </div>
      
      <BuildWord 
        selectedLetters={selectedLetters}
        onLetterClick={handleSelectedLetterClick}
        onClear={handleClearSelection}
        wrongAttempts={currentWord?.wrongAttempts || 0}
        hintUsed={currentWord?.hintUsed || false}
      />
      
      <div className="space-y-2 sm:space-y-4 mb-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-lg">
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
          onRestart={handleRestartGame} 
        />
      )}
      
      {!gameOver && currentWordIndex < gameWords.length && (
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
