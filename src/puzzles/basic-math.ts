import { PuzzleSet } from '../types/puzzles';

export const basicMathPuzzles: PuzzleSet = {
  id: 'basic-math',
  name: 'Basic Math Adventures',
  description: 'Simple and fun math puzzles for young coders!',
  difficulty: 'easy',
  puzzles: [
    {
      id: 'sum-numbers',
      title: 'Adding Numbers',
      question: 'Write a function that adds two numbers together.',
      hint: 'Use the + operator to add numbers',
      startingCode: 'def add_numbers(a, b):\n    # Write your code here\n    pass',
      solution: 'return a + b',
      testCases: [
        { input: [2, 3], expectedOutput: 5 },
        { input: [5, 5], expectedOutput: 10 }
      ]
    },
    {
      id: 'multiply-numbers',
      title: 'Multiplication Magic',
      question: 'Write a function that multiplies two numbers.',
      hint: 'Use the * operator to multiply numbers',
      startingCode: 'def multiply_numbers(a, b):\n    # Write your code here\n    pass',
      solution: 'return a * b',
      testCases: [
        { input: [2, 3], expectedOutput: 6 },
        { input: [5, 5], expectedOutput: 25 }
      ]
    }
  ]
}; 