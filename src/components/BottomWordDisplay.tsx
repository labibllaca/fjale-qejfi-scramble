import React from 'react';
interface BottomWordDisplayProps {
  word: string;
  onLetterClick: (letter: string, index: number) => void;
  showCorrectWord: boolean;
  correctWord: string;
}
const BottomWordDisplay: React.FC<BottomWordDisplayProps> = ({
  word,
  onLetterClick,
  showCorrectWord,
  correctWord
}) => {
  return;
};
export default BottomWordDisplay;