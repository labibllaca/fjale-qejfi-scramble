
import React, { useState, useEffect, useCallback } from 'react';
import WordRow from './WordRow';
import BuildWord from './BuildWord';
import Timer from './Timer';
import { getRandomWord, shuffleWord } from '../utils/wordUtils';
import { toast } from '../components/ui/use-toast';

interface GameWord {
  original: string;
  shuffled: string;
  completed: boolean;
  selectedIndices: number[];
  solveTime?: number;
  startTime?: number;
}

const GAME_TIME = 5 * 60; // 5 minutes in seconds

const GameBoard: React.FC = () => {
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterIndices, setLetterIndices] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);

  // Generate initial set of words
  useEffect(() => {
    const words: GameWord[] = [];
    for (let i = 0; i < 4; i++) {
      const word = getRandomWord();
      words.push({
        original: word,
        shuffled: shuffleWord(word),
        completed: false,
        selectedIndices: [],
      });
    }
    setGameWords(words);
  }, []);

  // Start timer for the first word
  useEffect(() => {
    if (gameWords.length > 0 && currentWordIndex === 0 && !gameWords[0].startTime) {
      setGameWords(prevWords => {
        const updatedWords = [...prevWords];
        if (updatedWords[0]) {
          updatedWords[0] = {
            ...updatedWords[0],
            startTime: Date.now(),
          };
        }
        return updatedWords;
      });
    }
  }, [gameWords, currentWordIndex]);

  const handleLetterClick = useCallback((letter: string, index: number) => {
    const currentWord = gameWords[currentWordIndex];
    
    if (currentWord.completed) {
      return;
    }
    
    // Check if this index is already selected
    if (currentWord.selectedIndices.includes(index)) {
      // Find the position in selectedLetters
      const letterPosition = currentWord.selectedIndices.indexOf(index);
      
      // Remove the letter
      const newSelectedLetters = [...selectedLetters];
      newSelectedLetters.splice(letterPosition, 1);
      setSelectedLetters(newSelectedLetters);
      
      // Remove the index
      const newIndices = [...letterIndices];
      newIndices.splice(letterPosition, 1);
      setLetterIndices(newIndices);
      
      // Update the game word
      setGameWords(prevWords => {
        const updatedWords = [...prevWords];
        const updatedSelectedIndices = [...updatedWords[currentWordIndex].selectedIndices];
        updatedSelectedIndices.splice(letterPosition, 1);
        
        updatedWords[currentWordIndex] = {
          ...updatedWords[currentWordIndex],
          selectedIndices: updatedSelectedIndices,
        };
        
        return updatedWords;
      });
    } else {
      // Add the new letter
      setSelectedLetters([...selectedLetters, letter]);
      setLetterIndices([...letterIndices, index]);
      
      // Update the game word
      setGameWords(prevWords => {
        const updatedWords = [...prevWords];
        updatedWords[currentWordIndex] = {
          ...updatedWords[currentWordIndex],
          selectedIndices: [...updatedWords[currentWordIndex].selectedIndices, index],
        };
        
        return updatedWords;
      });
      
      // Check if the word is complete after adding this letter
      const newWord = [...selectedLetters, letter].join('').toLowerCase();
      if (newWord === currentWord.original.toLowerCase()) {
        const solveTime = Math.floor((Date.now() - (currentWord.startTime || Date.now())) / 1000);
        
        // Mark word as complete
        setGameWords(prevWords => {
          const updatedWords = [...prevWords];
          updatedWords[currentWordIndex] = {
            ...updatedWords[currentWordIndex],
            completed: true,
            solveTime,
          };
          
          // Start timer for the next word if available
          if (currentWordIndex < updatedWords.length - 1) {
            updatedWords[currentWordIndex + 1] = {
              ...updatedWords[currentWordIndex + 1],
              startTime: Date.now(),
            };
          }
          
          return updatedWords;
        });
        
        toast({
          title: "Good job!",
          description: `You solved "${currentWord.original}" correctly!`,
        });
        
        // Reset selected letters for next word
        setSelectedLetters([]);
        setLetterIndices([]);
        
        // Move to next word if available
        if (currentWordIndex < gameWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          // Generate a new word
          const newWord = getRandomWord();
          setGameWords(prevWords => [
            ...prevWords,
            {
              original: newWord,
              shuffled: shuffleWord(newWord),
              completed: false,
              selectedIndices: [],
              startTime: Date.now(),
            },
          ]);
          setCurrentWordIndex(currentWordIndex + 1);
        }
      }
    }
  }, [gameWords, currentWordIndex, selectedLetters, letterIndices]);

  const handleSelectedLetterClick = (index: number) => {
    // Remove letter from selection
    const newSelectedLetters = [...selectedLetters];
    newSelectedLetters.splice(index, 1);
    setSelectedLetters(newSelectedLetters);
    
    // Remove index from selection
    const removedIndex = letterIndices[index];
    const newIndices = [...letterIndices];
    newIndices.splice(index, 1);
    setLetterIndices(newIndices);
    
    // Update the game word
    setGameWords(prevWords => {
      const updatedWords = [...prevWords];
      const updatedSelectedIndices = [...updatedWords[currentWordIndex].selectedIndices];
      const indexToRemove = updatedSelectedIndices.indexOf(removedIndex);
      if (indexToRemove !== -1) {
        updatedSelectedIndices.splice(indexToRemove, 1);
      }
      
      updatedWords[currentWordIndex] = {
        ...updatedWords[currentWordIndex],
        selectedIndices: updatedSelectedIndices,
      };
      
      return updatedWords;
    });
  };

  const handleClearSelection = () => {
    setSelectedLetters([]);
    setLetterIndices([]);
    
    // Clear selected indices for current word
    setGameWords(prevWords => {
      const updatedWords = [...prevWords];
      updatedWords[currentWordIndex] = {
        ...updatedWords[currentWordIndex],
        selectedIndices: [],
      };
      return updatedWords;
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    toast({
      title: "Time's up!",
      description: "Game over! You can start a new game.",
      variant: "destructive",
    });
  };

  const currentBottomWord = gameWords[gameWords.length - 1]?.shuffled.toLowerCase() || "";
  
  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">Fjalë qejfi</h1>
          <p className="text-gray-500 mt-2">Unscramble the hidden words</p>
        </div>
        <Timer initialTime={GAME_TIME} onTimeUp={handleGameOver} />
      </div>
      
      <BuildWord 
        selectedLetters={selectedLetters}
        onLetterClick={handleSelectedLetterClick}
        onClear={handleClearSelection}
      />
      
      <div className="space-y-4">
        {gameWords.map((word, index) => (
          <WordRow
            key={index}
            rowNumber={index + 1}
            word={word.original}
            shuffledWord={word.shuffled}
            onLetterClick={(letter, letterIndex) => handleLetterClick(letter, letterIndex)}
            isCompleted={word.completed}
            selectedIndices={word.selectedIndices}
            solveTime={word.solveTime}
          />
        ))}
      </div>
      
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p>You solved {gameWords.filter(word => word.completed).length} words.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      
      {!gameOver && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
          <div className="max-w-xl mx-auto flex justify-center space-x-4">
            {currentBottomWord.split('').map((letter, index) => (
              <div 
                key={index}
                className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center text-xl font-bold"
              >
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
