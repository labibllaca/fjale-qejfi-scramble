
import React, { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../utils/wordUtils';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  isGameStarted: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, isGameStarted }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const timerIntervalRef = useRef<number | null>(null);
  const timerInitializedRef = useRef(false);
  
  useEffect(() => {
    // Load custom game time if available
    const savedGameTime = localStorage.getItem('gameTime');
    const gameTimeMinutes = savedGameTime ? parseInt(savedGameTime) : 5;
    const gameTimeSeconds = gameTimeMinutes * 60;
    
    if (savedGameTime && !timerInitializedRef.current) {
      setTimeRemaining(gameTimeSeconds);
    }
    
    // Start the timer when isGameStarted becomes true
    if (isGameStarted && !timerIntervalRef.current) {
      timerInitializedRef.current = true;
      
      timerIntervalRef.current = window.setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    // Clean up interval on component unmount
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isGameStarted, onTimeUp]);
  
  return (
    <div className="flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 p-3 rounded-lg animate-fade-in shadow-md">
      <Clock className="w-5 h-5 mr-2 dark:text-gray-300 text-gray-700" />
      <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};

export default Timer;
