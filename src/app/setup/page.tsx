'use client';

import { useState, useEffect } from 'react';
import { GameSetup, PuzzleSet } from '@/types/puzzles';
import { loadPuzzleSets } from '@/utils/loadPuzzleSets';
import { useRouter } from 'next/navigation';

export default function Setup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSet, setSelectedSet] = useState<PuzzleSet | null>(null);
  const [gameSetup, setGameSetup] = useState<GameSetup>({
    selectedPuzzleSet: '',
    locationClues: [],
    prizeLocation: ''
  });
  const [existingSetups, setExistingSetups] = useState<Record<string, GameSetup>>({});
  const [allPuzzleSets, setAllPuzzleSets] = useState<PuzzleSet[]>([]);

  // Load puzzle sets and existing setups on mount
  useEffect(() => {
    // Load all puzzle sets
    const puzzleSets = loadPuzzleSets();
    setAllPuzzleSets(puzzleSets);

    // Load existing setups
    const storedSetups = localStorage.getItem('gameSetups');
    if (storedSetups) {
      setExistingSetups(JSON.parse(storedSetups));
    }
  }, []);

  const handlePuzzleSetSelection = (puzzleSet: PuzzleSet) => {
    setSelectedSet(puzzleSet);
    
    // Check if we have existing setup for this puzzle set
    const existingSetup = existingSetups[puzzleSet.id];
    
    if (existingSetup) {
      // Use existing setup
      setGameSetup(existingSetup);
    } else {
      // Create new setup
      setGameSetup({
        selectedPuzzleSet: puzzleSet.id,
        locationClues: puzzleSet.puzzles.map(puzzle => ({
          puzzleId: puzzle.id,
          location: '',
          unlockCode: ''
        })),
        prizeLocation: ''
      });
    }
    
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
    // Add or update this setup
    const updatedSetups = {
      ...existingSetups,
      [gameSetup.selectedPuzzleSet]: gameSetup
    };

    // Save back to localStorage
    localStorage.setItem('gameSetups', JSON.stringify(updatedSetups));
    router.push('/');
  };

  const isSetupComplete = (setup: GameSetup | undefined) => {
    if (!setup) return false;
    
    // Check if all clues have locations and codes
    const hasAllClues = setup.locationClues.every(clue => 
      clue.location && clue.unlockCode
    );
    
    // Check if prize location is set
    return hasAllClues && !!setup.prizeLocation;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 p-8 pt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-8 text-gray-800 font-londrina-shadow">
          Game Setup
        </h1>

        {currentStep === 1 && (
          <div className="card p-8 rounded-lg bg-white shadow-lg">
            <h2 className="text-3xl mb-6 text-gray-700 font-londrina-solid">Choose a Puzzle Set</h2>
            <div className="grid gap-4">
              {allPuzzleSets.map(set => (
                <button
                  key={set.id}
                  onClick={() => handlePuzzleSetSelection(set)}
                  className="card p-6 text-left hover:cursor-pointer bg-white shadow-lg rounded-lg hover:shadow-xl transition-all transform hover:-translate-y-1 relative"
                >
                  <h3 className="text-2xl mb-2 text-gray-700 font-londrina-solid">{set.name}</h3>
                  <p className="text-gray-600 font-inconsolata mb-2">{set.description}</p>
                  <div className="flex items-center text-sm text-gray-500 font-inconsolata">
                    <span className="capitalize">{set.difficulty} difficulty</span>
                    <span className="mx-2">•</span>
                    <span>{set.puzzles.length} puzzles</span>
                  </div>
                  {existingSetups[set.id] && (
                    <div className={`absolute top-4 right-4 font-inconsolata flex items-center ${
                      isSetupComplete(existingSetups[set.id]) 
                        ? 'text-green-600' 
                        : 'text-amber-500'
                    }`}>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        {isSetupComplete(existingSetups[set.id]) ? (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 00-2 0zm0-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                        )}
                      </svg>
                      {isSetupComplete(existingSetups[set.id]) ? 'Configured' : 'Incomplete'}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && selectedSet && (
          <div className="card p-8 rounded-lg bg-white shadow-lg">
            <h2 className="text-3xl mb-6 text-gray-700 font-londrina-solid">
              Set Up Clue Locations for {selectedSet.name}
            </h2>
            {gameSetup.locationClues.map((clue, index) => (
              <div key={clue.puzzleId} className="mb-8">
                <h3 className="text-2xl mb-4 text-gray-700 font-londrina-solid">
                  Puzzle {index + 1}: {selectedSet.puzzles[index].title}
                </h3>
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