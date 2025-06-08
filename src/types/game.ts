
export interface GameWord {
  original: string;
  shuffled: string;
  completed: boolean;
  selectedIndices: number[];
  solveTime?: number;
  startTime?: number;
  date?: string;
  wrongAttempts?: number;
  hintUsed?: boolean;
}

export type PlayedWordsRecord = Record<string, GameWord[]>;
