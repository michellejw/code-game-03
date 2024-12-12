'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PuzzleSet } from '@/types/puzzles';
import { loadPuzzleSets } from '@/utils/loadPuzzleSets';

interface StoredGameSetup {
  selectedPuzzleSet: string;
  locationClues: Array<{
    puzzleId: string;
    location: string;
    unlockCode: string;
  }>;
  prizeLocation: string;
}

export default function SelectSet() {
  const router = useRouter();
  const [availableSets, setAvailableSets] = useState<PuzzleSet[]>([]);

  useEffect(() => {
    // Get all stored game setups
    const storedSetups = localStorage.getItem('gameSetups');
    const setups: Record<string, StoredGameSetup> = storedSetups ? JSON.parse(storedSetups) : {};

    // Get all puzzle sets and filter for ones with complete setups
    const allPuzzleSets = loadPuzzleSets();
    console.log('All puzzle sets:', allPuzzleSets);

    const completeSets = allPuzzleSets.filter(set => {
      const setup = setups[set.id];
      console.log(`\nChecking set ${set.id}:`);
      console.log('Setup:', setup);
      
      if (!setup) {
        console.log('No setup found');
        return false;
      }

      // Check if all puzzles have locations and codes
      const incompleteClues = setup.locationClues.filter(clue => 
        !clue.location || !clue.unlockCode
      );
      
      if (incompleteClues.length > 0) {
        console.log('Incomplete clues:', incompleteClues);
        return false;
      }

      // Check if prize location is set
      if (!setup.prizeLocation) {
        console.log('Missing prize location');
        return false;
      }

      console.log('Set is complete!');
      return true;
    });

    console.log('\nComplete sets:', completeSets);
    setAvailableSets(completeSets);
  }, []);

  const startGame = (setId: string) => {
    localStorage.setItem('currentGameSet', setId);
    router.push('/play');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8 pt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-12 text-gray-800 font-londrina-shadow">
          Choose Your Adventure!
        </h1>

        {availableSets.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-2xl mb-4 text-gray-700 font-londrina-solid">No Games Ready Yet</h2>
            <p className="text-gray-600 font-inconsolata mb-6">
              Ask a parent or teacher to set up some puzzle locations first!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {availableSets.map(set => (
              <button
                key={set.id}
                onClick={() => startGame(set.id)}
                className="bg-white p-6 rounded-lg shadow-lg text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <h2 className="text-3xl mb-2 text-gray-700 font-londrina-solid">
                  {set.name}
                </h2>
                <p className="text-gray-600 font-inconsolata mb-2">
                  {set.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 font-inconsolata">
                  <span className="capitalize">Level: {set.difficulty}</span>
                  <span className="mx-2">•</span>
                  <span>{set.puzzles.length} puzzles</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 