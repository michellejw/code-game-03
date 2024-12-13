import { PuzzleSet } from '../types/puzzles';

export const moreMathPuzzles: PuzzleSet = {
  id: 'more-math',
  name: 'More Math Fun',
  description: 'Even more fun with numbers! Practice basic math operations.',
  difficulty: 'easy',
  puzzles: [
    {
      id: 'double-number',
      title: 'Double It!',
      question: 'Write a function that doubles a number (multiplies it by 2).',
      hint: 'Multiply the input number by 2',
      startingCode: 'def double_number(n):\n    # Write your code here\n    pass',
      solution: 'return n * 2',
      testCases: [
        { input: [4], expectedOutput: 8 },
        { input: [10], expectedOutput: 20 }
      ]
    },
    {
      id: 'add-three',
      title: 'Add Three Numbers',
      question: 'Write a function that adds three numbers together.',
      hint: 'Use the + operator twice to add all three numbers',
      startingCode: 'def add_three(a, b, c):\n    # Write your code here\n    pass',
      solution: 'return a + b + c',
      testCases: [
        { input: [1, 2, 3], expectedOutput: 6 },
        { input: [5, 5, 5], expectedOutput: 15 }
      ]
    },
    {
      id: 'remainder',
      title: 'Find the Remainder',
      question: 'Write a function that returns the remainder when dividing a number by 2.',
      hint: 'Use the % operator to find the remainder',
      startingCode: 'def get_remainder(n):\n    # Write your code here\n    pass',
      solution: 'return n % 2',
      testCases: [
        { input: [5], expectedOutput: 1 },
        { input: [8], expectedOutput: 0 }
      ]
    },
    {
      id: 'sum-digits',
      title: 'Sum the Digits',
      question: 'Write a function that takes a two-digit number and returns the sum of its digits.',
      hint: 'Use // for tens digit and % for ones digit',
      startingCode: 'def sum_digits(n):\n    # Write your code here\n    pass',
      solution: 'return (n // 10) + (n % 10)',
      testCases: [
        { input: [25], expectedOutput: 7 },
        { input: [43], expectedOutput: 7 }
      ]
    }
  ]
}; 