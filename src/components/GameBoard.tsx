
import React, { useState, useEffect, useCallback } from 'react';
import WordRow from './WordRow';
import BuildWord from './BuildWord';
import Timer from './Timer';
import { getRandomWord, shuffleWord } from '../utils/wordUtils';
import { toast } from '../components/ui/use-toast';
import { useIsMobile } from '../hooks/use-mobile';
import { WORD_LIST } from '../data/albanianWords';

interface GameWord {
  original: string;
  shuffled: string;
  completed: boolean;
  selectedIndices: number[];
  solveTime?: number;
  startTime?: number;
  date?: string; // Add date field to track when this word was played
}

const GAME_TIME = 5 * 60; // 5 minutes in seconds

const GameBoard: React.FC = () => {
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterIndices, setLetterIndices] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [playedWords, setPlayedWords] = useState<Record<string, GameWord[]>>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const isMobile = useIsMobile();

  // Load played words from localStorage
  useEffect(() => {
    const savedWords = localStorage.getItem('playedWords');
    if (savedWords) {
      setPlayedWords(JSON.parse(savedWords));
    }
  }, []);

  // Save played words to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('playedWords', JSON.stringify(playedWords));
  }, [playedWords]);

  // Generate initial set of words avoiding previously played words for today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysPlayedWords = playedWords[today] || [];
    const playedWordTexts = todaysPlayedWords.map(w => w.original);
    
    const words: GameWord[] = [];
    const usedWords = new Set(playedWordTexts);
    
    for (let i = 0; i < 4; i++) {
      // Try to find a word that hasn't been played today
      let attempts = 0;
      let word;
      
      while (attempts < 50) {
        word = getRandomWord();
        if (!usedWords.has(word)) {
          break;
        }
        attempts++;
      }
      
      // If we couldn't find a new word after 50 attempts, just use any word
      if (!word || usedWords.has(word)) {
        word = getRandomWord();
      }
      
      usedWords.add(word);
      
      words.push({
        original: word,
        shuffled: shuffleWord(word),
        completed: false,
        selectedIndices: [],
        date: today
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
        const today = new Date().toISOString().split('T')[0];
        
        // Mark word as complete
        setGameWords(prevWords => {
          const updatedWords = [...prevWords];
          updatedWords[currentWordIndex] = {
            ...updatedWords[currentWordIndex],
            completed: true,
            solveTime,
            date: today
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
        
        // Save the completed word to playedWords
        setPlayedWords(prevPlayedWords => {
          const today = new Date().toISOString().split('T')[0];
          const todayWords = prevPlayedWords[today] || [];
          return {
            ...prevPlayedWords,
            [today]: [...todayWords, {
              ...currentWord,
              completed: true,
              solveTime,
              date: today
            }]
          };
        });
        
        toast({
          title: "Shumë mirë!",
          description: `Ke zgjidhur "${currentWord.original}" saktësisht!`,
        });
        
        // Reset selected letters for next word
        setSelectedLetters([]);
        setLetterIndices([]);
        
        // Move to next word if available
        if (currentWordIndex < gameWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          // Generate a new word
          const today = new Date().toISOString().split('T')[0];
          const todaysPlayedWords = playedWords[today] || [];
          const usedWords = new Set(todaysPlayedWords.map(w => w.original));
          
          // Try to find a word that hasn't been played today
          let attempts = 0;
          let newWord;
          
          while (attempts < 50) {
            newWord = getRandomWord();
            if (!usedWords.has(newWord)) {
              break;
            }
            attempts++;
          }
          
          // If we couldn't find a new word after 50 attempts, just use any word
          if (!newWord || usedWords.has(newWord)) {
            newWord = getRandomWord();
          }
          
          setGameWords(prevWords => [
            ...prevWords,
            {
              original: newWord,
              shuffled: shuffleWord(newWord),
              completed: false,
              selectedIndices: [],
              startTime: Date.now(),
              date: today
            }
          ]);
        }
      }
    }
  }, [gameWords, currentWordIndex, selectedLetters, letterIndices, playedWords]);

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
      title: "Koha mbaroi!",
      description: "Loja mbaroi! Mund të fillosh një lojë të re.",
      variant: "destructive",
    });
  };

  // Display words (with new words added at the bottom)
  const currentBottomWord = gameWords[currentWordIndex]?.shuffled.toLowerCase() || "";
  
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
      
      <div className="space-y-2 sm:space-y-4">
        {gameWords.map((word, index) => (
          <WordRow
            key={index}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Loja mbaroi!</h2>
            <p className="dark:text-gray-300">Ke zgjidhur {gameWords.filter(word => word.completed).length} fjalë.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Luaj përsëri
            </button>
          </div>
        </div>
      )}
      
      {!gameOver && (
        <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg">
          <div className="max-w-xl mx-auto flex justify-center space-x-1 sm:space-x-4">
            {currentBottomWord.split('').map((letter, index) => (
              <div 
                key={index}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded flex items-center justify-center text-lg sm:text-xl font-bold dark:text-white"
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
