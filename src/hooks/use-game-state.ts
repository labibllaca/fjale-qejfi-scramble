
import { useState, useEffect, useCallback } from 'react';
import { getRandomWord, shuffleWord } from '../utils/wordUtils';
import { GameWord, PlayedWordsRecord } from '../types/game';
import { toast } from '../components/ui/use-toast';

export const useGameState = () => {
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterIndices, setLetterIndices] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [playedWords, setPlayedWords] = useState<PlayedWordsRecord>({});

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
    
    if (currentWord?.completed) {
      return;
    }
    
    // Check if this index is already selected
    if (currentWord?.selectedIndices.includes(index)) {
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
      if (newWord === currentWord?.original.toLowerCase()) {
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
          // Generate a new word and add it at the END of the array
          const today = new Date().toISOString().split('T')[0];
          const todaysPlayedWords = playedWords[today] || [];
          const usedWords = new Set([...todaysPlayedWords.map(w => w.original), ...gameWords.map(w => w.original)]);
          
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
          
          // Add the new word at the end of the array
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
          
          // Focus on the new word
          setCurrentWordIndex(prevIndex => prevIndex + 1);
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

  return {
    gameWords,
    currentWordIndex,
    selectedLetters,
    gameOver,
    currentBottomWord: gameWords[currentWordIndex]?.shuffled.toLowerCase() || "",
    handleLetterClick,
    handleSelectedLetterClick,
    handleClearSelection,
    handleGameOver,
  };
};
