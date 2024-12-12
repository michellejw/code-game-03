'use client';

import { useEffect, useState } from 'react';
import { GameSetup, PuzzleSet } from '@/types/puzzles';
import { loadPuzzleSets } from '@/utils/loadPuzzleSets';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const PyodideTerminal = dynamic(() => import('@/components/PyodideTerminal'), {
  ssr: false,
  loading: () => <div className="text-gray-600 font-inconsolata">Loading Python environment...</div>
});

export default function Play() {
  const [gameSetup, setGameSetup] = useState<GameSetup | null>(null);
  const [currentPuzzleSet, setCurrentPuzzleSet] = useState<PuzzleSet | null>(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showLocationClue, setShowLocationClue] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    // Get the selected puzzle set ID
    const selectedSetId = localStorage.getItem('currentGameSet');
    if (!selectedSetId) {
      return;
    }

    // Load all puzzle sets and find the selected one
    const allPuzzleSets = loadPuzzleSets();
    const puzzleSet = allPuzzleSets.find(set => set.id === selectedSetId);
    if (!puzzleSet) {
      return;
    }
    setCurrentPuzzleSet(puzzleSet);

    // Get the game setup for this puzzle set
    const storedSetups = localStorage.getItem('gameSetups');
    if (storedSetups) {
      const setups = JSON.parse(storedSetups);
      const setup = setups[selectedSetId];
      if (setup) {
        setGameSetup(setup);
      }
    }
  }, []);

  const handleCodeSubmission = async (code: string) => {
    setShowLocationClue(true);
  };

  const handleUnlockCodeSubmit = () => {
    if (!gameSetup || !currentPuzzleSet) return;

    const correctCode = gameSetup.locationClues[currentPuzzleIndex]?.unlockCode;
    if (unlockCode === correctCode) {
      if (currentPuzzleIndex === currentPuzzleSet.puzzles.length - 1) {
        setIsGameComplete(true);
      } else {
        setCurrentPuzzleIndex(prev => prev + 1);
        setShowLocationClue(false);
        setUnlockCode('');
      }
    }
  };

  if (!gameSetup || !currentPuzzleSet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl mb-4 text-gray-800 font-londrina-shadow">No Active Game</h1>
          <p className="mb-4 text-gray-600 font-inconsolata">Please select a game to play first.</p>
          <Link href="/select-set" className="text-blue-600 hover:underline font-inconsolata">
            Choose a Game
          </Link>
        </div>
      </div>
    );
  }

  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8 pt-16">
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

  const currentPuzzle = currentPuzzleSet.puzzles[currentPuzzleIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8 pt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-8 text-gray-800 font-londrina-shadow">
          {currentPuzzleSet.name}: Puzzle {currentPuzzleIndex + 1}
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