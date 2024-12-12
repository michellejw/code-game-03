'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isGameSetup, setIsGameSetup] = useState(false);

  useEffect(() => {
    const gameSetup = localStorage.getItem('gameSetup');
    setIsGameSetup(!!gameSetup);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl text-center mb-12 text-gray-800 font-londrina-shadow">
          Code Challenge Scavenger Hunt
        </h1>
        
        <div className="flex flex-col gap-8 mt-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="font-londrina-solid text-white text-xl">1</span>
            </div>
            <Link href="/setup" 
                  className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <h2 className="text-3xl text-gray-700 mb-3 font-londrina-solid">🎮 Set up clues!</h2>
              <p className="text-gray-600 font-inconsolata mb-2">
                Set up a new game, choose puzzle sets, and place clues around the house.
              </p>
              {isGameSetup && (
                <div className="mt-3 text-green-600 font-inconsolata flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Game is ready!
                </div>
              )}
            </Link>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="font-londrina-solid text-white text-xl">2</span>
            </div>
            <div className={`relative ${!isGameSetup ? 'opacity-50' : ''}`}>
              {!isGameSetup && (
                <div className="absolute inset-0 bg-gray-50 bg-opacity-90 rounded-lg flex items-center justify-center z-10">
                  <p className="text-gray-600 font-inconsolata">
                    ⏳ Get a parent or other adult to setup the game first!
                  </p>
                </div>
              )}
              <Link href={isGameSetup ? "/play" : "#"}
                    className={`block p-8 bg-white rounded-lg shadow-lg transition-all ${
                      isGameSetup ? 'hover:shadow-xl transform hover:-translate-y-1' : 'cursor-not-allowed'
                    }`}>
                <h2 className="text-3xl text-gray-700 mb-3 font-londrina-solid">🚀 Start Playing</h2>
                <p className="text-gray-600 font-inconsolata">
                  Ready to solve puzzles to find the hidden treasure? Start your adventure here!
                </p>
              </Link>
            </div>
          </div>

          {/* Visual connection between steps */}
          <div className="absolute left-[20px] top-[180px] w-0.5 h-[200px] bg-gradient-to-b from-blue-500 to-teal-500"></div>
        </div>
      </div>
    </main>
  );
}
