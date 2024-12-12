import { PuzzleSet } from '../types/puzzles';

export const stringBasicsPuzzles: PuzzleSet = {
  id: 'string-basics',
  name: 'String Adventures',
  description: 'Learn to work with text by writing simple string functions!',
  difficulty: 'easy',
  puzzles: [
    {
      id: 'say-hello',
      title: 'Saying Hello',
      question: 'Write a function that returns the string "Hello, World!"',
      hint: 'Just return the exact string in quotes',
      startingCode: 'def say_hello():\n    # Write your code here\n    pass',
      solution: 'return "Hello, World!"',
      testCases: [
        { expectedOutput: "Hello, World!" }
      ]
    },
    {
      id: 'greet-person',
      title: 'Personal Greeting',
      question: 'Write a function that takes a name and returns "Hello, [name]!"\nFor example, if name is "Alice", return "Hello, Alice!"',
      hint: 'Use an f-string: f"Hello, {name}!" to combine the greeting with the name',
      startingCode: 'def greet_person(name):\n    # Write your code here\n    pass',
      solution: 'return f"Hello, {name}!"',
      testCases: [
        { input: ['"Alice"'], expectedOutput: "Hello, Alice!" },
        { input: ['"Bob"'], expectedOutput: "Hello, Bob!" },
        { input: ['"Python"'], expectedOutput: "Hello, Python!" }
      ]
    },
    {
      id: 'shout-name',
      title: 'Shouting Names',
      question: 'Write a function that takes a name and returns it in ALL CAPS',
      hint: 'Use the .upper() method on strings',
      startingCode: 'def shout_name(name):\n    # Write your code here\n    pass',
      solution: 'return name.upper()',
      testCases: [
        { input: ['"alice"'], expectedOutput: "ALICE" },
        { input: ['"bob"'], expectedOutput: "BOB" }
      ]
    }
  ]
}; 