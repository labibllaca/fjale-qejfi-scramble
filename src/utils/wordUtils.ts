
// Import the Albanian words list from the data file
import { WORD_LIST } from '../data/albanianWords';

// Shuffle the letters of a word
export const shuffleWord = (word: string): string => {
  const arr = word.split('');
  
  // Fisher-Yates shuffle algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  // Make sure the shuffled word is different from the original
  const shuffled = arr.join('');
  if (shuffled === word && word.length > 1) {
    return shuffleWord(word); // Try again if the shuffled word is the same
  }
  
  return shuffled;
};

// Get a random word from the list
export const getRandomWord = (): string => {
  const index = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[index];
};

// Format time as MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Format small time display as 0:SS
export const formatSmallTime = (seconds: number): string => {
  return `0:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Format just seconds
export const formatSeconds = (seconds: number): string => {
  return `${seconds}s`;
};

// Get all unique dates that have played words
export const getPlayedDates = (): string[] => {
  const playedWordsStr = localStorage.getItem('playedWords');
  
  if (playedWordsStr) {
    const playedWords = JSON.parse(playedWordsStr);
    return Object.keys(playedWords);
  }
  
  return [];
};

// Check if a specific date has played words
export const hasPlayed = (dateStr: string): boolean => {
  const playedWordsStr = localStorage.getItem('playedWords');
  
  if (playedWordsStr) {
    const playedWords = JSON.parse(playedWordsStr);
    return !!playedWords[dateStr] && playedWords[dateStr].length > 0;
  }
  
  return false;
};

// Get played words for a specific date
export const getPlayedWordsForDate = (dateStr: string): any[] => {
  const playedWordsStr = localStorage.getItem('playedWords');
  
  if (playedWordsStr) {
    const playedWords = JSON.parse(playedWordsStr);
    return playedWords[dateStr] || [];
  }
  
  return [];
};
