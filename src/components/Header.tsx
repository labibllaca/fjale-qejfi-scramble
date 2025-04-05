
import React from 'react';
import { Clock, Calendar, HelpCircle, User } from "lucide-react";
import { useIsMobile } from '../hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="flex justify-between items-center p-2 sm:p-4 border-b">
      <div>
        <h1 className="text-xl sm:text-3xl font-bold">What's it?</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </button>
        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </button>
        <button className="p-1 sm:p-2 bg-blue-500 rounded-full">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
