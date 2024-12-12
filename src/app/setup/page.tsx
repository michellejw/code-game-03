'use client';

import { useState } from 'react';
import { basicMathPuzzles } from '@/puzzles/basic-math';
import { GameSetup } from '@/types/puzzles';
import { useRouter } from 'next/navigation';

export default function Setup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [gameSetup, setGameSetup] = useState<GameSetup>({
    selectedPuzzleSet: '',
    locationClues: [],
    prizeLocation: ''
  });

  const handlePuzzleSetSelection = (puzzleSetId: string) => {
    setGameSetup(prev => ({
      ...prev,
      selectedPuzzleSet: puzzleSetId,
      locationClues: basicMathPuzzles.puzzles.map(puzzle => ({
        puzzleId: puzzle.id,
        location: '',
        unlockCode: ''
      }))
    }));
    setCurrentStep(2);
  };

  const handleLocationClueUpdate = (index: number, field: 'location' | 'unlockCode', value: string) => {
    setGameSetup(prev => ({
      ...prev,
      locationClues: prev.locationClues.map((clue, i) => 
        i === index ? { ...clue, [field]: value } : clue
      )
    }));
  };

  const handlePrizeLocationUpdate = (location: string) => {
    setGameSetup(prev => ({ ...prev, prizeLocation: location }));
  };

  const finishSetup = () => {
    localStorage.setItem('gameSetup', JSON.stringify(gameSetup));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-8 text-gray-800 font-londrina-shadow">
          Game Setup
        </h1>

        {currentStep === 1 && (
          <div className="card p-8 rounded-lg bg-white shadow-lg">
            <h2 className="text-3xl mb-6 text-gray-700 font-londrina-solid">Choose a Puzzle Set</h2>
            <div className="grid gap-4">
              <button
                onClick={() => handlePuzzleSetSelection(basicMathPuzzles.id)}
                className="card p-6 text-left hover:cursor-pointer bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl mb-2 text-gray-700 font-londrina-solid">{basicMathPuzzles.name}</h3>
                <p className="text-gray-600 font-inconsolata">{basicMathPuzzles.description}</p>
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="card p-8 rounded-lg bg-white shadow-lg">
            <h2 className="text-3xl mb-6 text-gray-700 font-londrina-solid">Set Up Clue Locations</h2>
            {gameSetup.locationClues.map((clue, index) => (
              <div key={clue.puzzleId} className="mb-8">
                <h3 className="text-2xl mb-4 text-gray-700 font-londrina-solid">Puzzle {index + 1}</h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Enter location hint (e.g., 'Under the couch')"
                    className="w-full p-3 rounded-lg font-inconsolata"
                    value={clue.location}
                    onChange={(e) => handleLocationClueUpdate(index, 'location', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter unlock code for next puzzle"
                    className="w-full p-3 rounded-lg font-inconsolata"
                    value={clue.unlockCode}
                    onChange={(e) => handleLocationClueUpdate(index, 'unlockCode', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <div className="mt-8">
              <h3 className="text-2xl mb-4 text-gray-700 font-londrina-solid">Final Prize Location</h3>
              <input
                type="text"
                placeholder="Enter where the final prize will be hidden"
                className="w-full p-3 rounded-lg font-inconsolata"
                value={gameSetup.prizeLocation}
                onChange={(e) => handlePrizeLocationUpdate(e.target.value)}
              />
            </div>

            <button
              onClick={finishSetup}
              className="btn mt-8 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-lg w-full font-londrina-solid text-xl hover:shadow-xl transition-all"
            >
              Finish Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 