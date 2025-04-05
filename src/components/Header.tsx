
import React from 'react';
import { Clock, Calendar, HelpCircle, Sun, Moon } from "lucide-react";
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="flex justify-between items-center p-2 sm:p-4 border-b dark:border-gray-700 dark:bg-gray-800">
      <div>
        <h1 className="text-xl sm:text-3xl font-bold dark:text-white">Fjalë qejfi</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
        </button>
        <button className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
        </button>
        <button 
          onClick={toggleTheme} 
          className="p-1 sm:p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
