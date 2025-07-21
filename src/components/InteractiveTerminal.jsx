import React, { useState } from 'react';
import { Play, Copy, X } from 'lucide-react';

const InteractiveTerminal = ({ command, expectedOutput, onRun }) => {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Copy command to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Simulate terminal output
  const simulateTerminalOutput = () => {
    setIsRunning(true);
    setOutput('');
    
    const outputLines = expectedOutput.split('\n');
    
    outputLines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => prev + (prev ? '\n' : '') + line);
        if (index === outputLines.length - 1) {
          setIsRunning(false);
          if (onRun) onRun();
        }
      }, 300 * (index + 1));
    });
  };

  return (
    <div className="mb-8 bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-2">Interactive Terminal</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => copyToClipboard(command)}
            className="text-gray-400 hover:text-white p-1 rounded"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={simulateTerminalOutput}
            className="text-gray-400 hover:text-white p-1 rounded"
            title="Run command"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Command Section */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-gray-400 text-sm mb-2">Command to Run:</h3>
        <div className="relative">
          <div className="font-mono text-green-400 text-sm">
            <span className="text-blue-400">$</span> <pre className="inline whitespace-pre-wrap">{command}</pre>
          </div>
          {copied && (
            <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 rounded text-xs">
              Copied!
            </div>
          )}
        </div>
      </div>

      {/* Output Section */}
      <div className="p-6">
        <h3 className="text-gray-400 text-sm mb-2">Output:</h3>
        <div className="min-h-[100px] max-h-[300px] overflow-y-auto">
          {output ? (
            <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{output}</pre>
          ) : isRunning ? (
            <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">Running command...</pre>
          ) : (
            <div className="flex items-center justify-center h-24 text-gray-500">
              <button
                onClick={simulateTerminalOutput}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Click to Run Command
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;