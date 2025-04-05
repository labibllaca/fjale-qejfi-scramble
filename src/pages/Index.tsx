
import React from 'react';
import Header from '../components/Header';
import GameBoard from '../components/GameBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-2 sm:py-6">
        <GameBoard />
      </main>
    </div>
  );
};

export default Index;
