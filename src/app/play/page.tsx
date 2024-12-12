'use client';

import { useEffect, useState } from 'react';
import { basicMathPuzzles } from '@/puzzles/basic-math';
import { GameSetup, Puzzle } from '@/types/puzzles';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const PyodideTerminal = dynamic(() => import('@/components/PyodideTerminal'), {
  ssr: false,
  loading: () => <div>Loading Python environment...</div>
});

export default function Play() {
  const [gameSetup, setGameSetup] = useState<GameSetup | null>(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showLocationClue, setShowLocationClue] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    const savedSetup = localStorage.getItem('gameSetup');
    if (savedSetup) {
      setGameSetup(JSON.parse(savedSetup));
    }
  }, []);

  const currentPuzzle = gameSetup ? 
    basicMathPuzzles.puzzles[currentPuzzleIndex] : null;

  const handleCodeSubmission = async (code: string) => {
    setShowLocationClue(true);
  };

  const handleUnlockCodeSubmit = () => {
    const correctCode = gameSetup?.locationClues[currentPuzzleIndex]?.unlockCode;
    if (unlockCode === correctCode) {
      if (currentPuzzleIndex === basicMathPuzzles.puzzles.length - 1) {
        setIsGameComplete(true);
      } else {
        setCurrentPuzzleIndex(prev => prev + 1);
        setShowLocationClue(false);
        setUnlockCode('');
      }
    }
  };

  if (!gameSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl mb-4 text-gray-800 font-londrina-shadow">No Active Game</h1>
          <p className="mb-4 text-gray-600 font-inconsolata">Please ask a parent to set up the game first.</p>
          <Link href="/setup" className="text-blue-600 hover:underline font-inconsolata">
            Go to Setup
          </Link>
        </div>
      </div>
    );
  }

  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl mb-4 text-gray-800 font-londrina-shadow">🎉 Congratulations! 🎉</h1>
          <p className="text-xl mb-8 text-gray-600 font-inconsolata">You've completed all the puzzles!</p>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl mb-4 text-gray-700 font-londrina-solid">Your Prize Awaits!</h2>
            <p className="text-lg text-gray-600 font-inconsolata">{gameSetup.prizeLocation}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-8 text-gray-800 font-londrina-shadow">
          Puzzle {currentPuzzleIndex + 1}
        </h1>

        {currentPuzzle && !showLocationClue && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl mb-4 text-gray-700 font-londrina-solid">{currentPuzzle.title}</h2>
            <p className="mb-4 text-gray-600 font-inconsolata">{currentPuzzle.question}</p>
            {currentPuzzle.hint && (
              <p className="text-sm text-gray-600 mb-4 font-inconsolata">Hint: {currentPuzzle.hint}</p>
            )}
            <PyodideTerminal
              puzzle={currentPuzzle}
              onSuccess={handleCodeSubmission}
            />
          </div>
        )}

        {showLocationClue && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl mb-4 text-gray-700 font-londrina-solid">You solved it! 🎉</h2>
            <p className="mb-6 text-gray-600 font-inconsolata">
              Find your next clue: {gameSetup.locationClues[currentPuzzleIndex].location}
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter the code you found"
                className="flex-1 p-3 rounded-lg font-inconsolata"
                value={unlockCode}
                onChange={(e) => setUnlockCode(e.target.value)}
              />
              <button
                onClick={handleUnlockCodeSubmit}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg font-londrina-solid text-xl hover:shadow-xl transition-all"
              >
                Submit Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 