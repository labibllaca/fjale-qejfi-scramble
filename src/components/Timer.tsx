
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../utils/wordUtils';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onTimeUp]);
  
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
      <Clock className="w-5 h-5 mr-2 dark:text-gray-300" />
      <span className="text-2xl font-semibold dark:text-white">{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
