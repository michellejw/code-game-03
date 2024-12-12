import { PuzzleSet } from '@/types/puzzles';
import * as basicMath from '@/puzzles/basic-math';
import * as stringBasics from '@/puzzles/string-basics';
import * as moreMath from '@/puzzles/more-math';

export function loadPuzzleSets(): PuzzleSet[] {
  const modules = [basicMath, stringBasics, moreMath];
  const puzzleSets: PuzzleSet[] = [];

  for (const module of modules) {
    for (const [key, value] of Object.entries(module)) {
      if (key.toLowerCase().includes('puzzles')) {
        puzzleSets.push(value as PuzzleSet);
      }
    }
  }

  return puzzleSets;
} 