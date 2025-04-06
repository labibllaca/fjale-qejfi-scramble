
import React, { useEffect } from 'react';
import Header from '../components/Header';
import GameBoard from '../components/GameBoard';

const Index = () => {
  // Add fullscreen functionality on component mount
  useEffect(() => {
    const requestFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
          .catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
          });
      }
    };

    // Try to request fullscreen on page load
    requestFullScreen();

    // Add event listener for user interaction to request fullscreen again
    const handleUserInteraction = () => {
      if (!document.fullscreenElement) {
        requestFullScreen();
        // Remove event listener after it's triggered once
        document.removeEventListener('click', handleUserInteraction);
      }
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container py-2 sm:py-6 px-0">
        <GameBoard />
      </main>
    </div>
  );
};

export default Index;
