'use client';

import { useEffect, useState } from 'react';
import { Puzzle } from '@/types/puzzles';

interface PyodideTerminalProps {
  puzzle: Puzzle;
  onSuccess: (code: string) => void;
}

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function PyodideTerminal({ puzzle, onSuccess }: PyodideTerminalProps) {
  const [code, setCode] = useState(puzzle.startingCode || '');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pyodide, setPyodide] = useState<any>(null);

  useEffect(() => {
    const loadPyodideScript = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = async () => {
          try {
            const pyodideInstance = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            setPyodide(pyodideInstance);
            setIsLoading(false);
          } catch (error) {
            console.error('Failed to initialize Pyodide:', error);
            setOutput('Failed to initialize Python environment. Please refresh the page.');
          }
        };
      } catch (error) {
        console.error('Failed to load Pyodide script:', error);
        setOutput('Failed to load Python environment. Please refresh the page.');
      }
    };

    loadPyodideScript();

    return () => {
      const script = document.querySelector('script[src*="pyodide.js"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const runCode = async () => {
    if (!pyodide) return;

    try {
      setOutput('Running...');

      await pyodide.runPython('globals().clear()');
      await pyodide.runPython(code);

      let allTestsPassed = true;
      let testOutput = '';

      for (const testCase of puzzle.testCases || []) {
        const { input, expectedOutput } = testCase;
        
        const functionName = code.split('def ')[1].split('(')[0];
        const testInput = input ? input.join(', ') : '';
        const testCall = `${functionName}(${testInput})`;

        try {
          const result = await pyodide.runPython(testCall);
          const passed = result === expectedOutput;
          
          testOutput += `Test case: ${testCall}\n`;
          testOutput += `Expected: ${expectedOutput}\n`;
          testOutput += `Got: ${result}\n`;
          testOutput += passed ? '✅ Passed!\n\n' : '❌ Failed!\n\n';

          if (!passed) allTestsPassed = false;
        } catch (error: any) {
          testOutput += `Error running test case: ${error.message}\n\n`;
          allTestsPassed = false;
        }
      }

      setOutput(testOutput);

      if (allTestsPassed) {
        onSuccess(code);
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
        <div className="h-8 w-20 bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-40 p-4 font-inconsolata text-sm bg-gray-50 border rounded-lg"
          placeholder="Write your Python code here (don't forget to delete the `pass` statement!)..."
        />
      </div>

      <button
        onClick={runCode}
        className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg font-londrina-solid text-xl hover:shadow-xl transition-all mb-4"
      >
        Run Code
      </button>

      {output && (
        <pre className="p-4 bg-gray-50 rounded-lg font-inconsolata text-sm whitespace-pre-wrap text-gray-600">
          {output}
        </pre>
      )}
    </div>
  );
} 