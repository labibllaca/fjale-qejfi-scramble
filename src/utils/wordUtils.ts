
// Albanian words up to 5 letters
const ALBANIAN_WORDS = [
  "kafe", "shtëpi", "qen", "mace", "bukë", 
  "lule", "diell", "hënë", "det", "mal",
  "dritë", "natë", "ujë", "zjarr", "tokë",
  "dashuri", "punë", "lojë", "fjalë", "qejf",
  "buka", "mami", "babi", "dora", "koka",
  "syri", "gojë", "fund", "film", "mirë",
  "keq", "nxënës", "mësues", "luftë", "paqe",
  "këngë", "valle", "shi", "borë", "erë"
];

// Filter out words longer than 5 letters
export const WORD_LIST = ALBANIAN_WORDS.filter(word => word.length <= 5);

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
