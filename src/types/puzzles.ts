export interface Puzzle {
  id: string;
  title: string;
  question: string;
  hint?: string;
  startingCode?: string;
  solution: string;
  testCases?: Array<{
    input?: any;
    expectedOutput: any;
  }>;
}

export interface PuzzleSet {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  puzzles: Puzzle[];
}

export interface GameSetup {
  selectedPuzzleSet: string;
  locationClues: Array<{
    puzzleId: string;
    location: string;
    unlockCode: string;
  }>;
  prizeLocation: string;
} 