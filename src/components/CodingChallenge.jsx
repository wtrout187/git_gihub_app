import React, { useState, useEffect } from 'react';
import { Code, CheckCircle, X, Play, Zap, MessageSquare, Lightbulb, Award } from 'lucide-react';

const CodingChallenge = ({ lessonId, colors }) => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  
  // Load completion status from localStorage
  useEffect(() => {
    const savedCompletion = localStorage.getItem(`codingChallenge-${lessonId}`);
    if (savedCompletion === 'completed') {
      setChallengeCompleted(true);
    }
    
    // Initialize code with initial value if empty
    if (!code && challenges[lessonId]) {
      setCode(challenges[lessonId].initialCode);
    }
  }, [lessonId]);

  // Challenges based on lesson ID
  const challenges = {
    '1-3': {
      title: 'Create a .gitignore File',
      description: 'Write a .gitignore file that ignores node_modules directory, .env files, and all .log files.',
      initialCode: '# Write your .gitignore rules here\n',
      solution: '# Node modules\nnode_modules/\n\n# Environment variables\n.env\n.env.local\n.env.development\n.env.test\n.env.production\n\n# Log files\n*.log\nlogs/\n',
      validate: (input) => {
        const hasNodeModules = input.includes('node_modules');
        const hasEnv = input.includes('.env');
        const hasLogs = input.includes('*.log') || input.includes('.log');
        return hasNodeModules && hasEnv && hasLogs;
      }
    },
    '2-1': {
      title: 'Git Branching Script',
      description: 'Write a bash script that creates a new branch called "feature/login" and switches to it.',
      initialCode: '#!/bin/bash\n# Write your Git commands here\n',
      solution: '#!/bin/bash\n\n# Create and switch to a new branch\ngit checkout -b feature/login\n\n# Alternative approach:\n# git branch feature/login\n# git checkout feature/login\n',
      validate: (input) => {
        return (input.includes('git checkout -b feature/login') || 
                (input.includes('git branch feature/login') && 
                 input.includes('git checkout feature/login')));
      }
    },
    '3-1': {
      title: 'Pull Request Template',
      description: 'Create a pull request template for your repository.',
      initialCode: '# Pull Request Template\n\n# Write your template here\n',
      solution: '# Pull Request Template\n\n## Description\n\nPlease include a summary of the change and which issue is fixed. Include relevant motivation and context.\n\n## Type of change\n\n- [ ] Bug fix (non-breaking change which fixes an issue)\n- [ ] New feature (non-breaking change which adds functionality)\n- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)\n\n## How Has This Been Tested?\n\nPlease describe the tests that you ran to verify your changes.\n\n## Checklist:\n\n- [ ] My code follows the style guidelines of this project\n- [ ] I have performed a self-review of my own code\n- [ ] I have commented my code, particularly in hard-to-understand areas\n- [ ] I have made corresponding changes to the documentation\n- [ ] My changes generate no new warnings\n',
      validate: (input) => {
        return input.includes('Description') && 
               input.includes('change') && 
               (input.includes('Test') || input.includes('test')) &&
               input.includes('Checklist') || input.includes('checklist');
      }
    },
    '4-1': {
      title: 'AI-Assisted Commit Message Script',
      description: 'Write a simple script that uses the OpenAI API to generate commit messages based on git diff.',
      initialCode: '#!/bin/bash\n\n# This script generates commit messages using AI\n# You would need an OpenAI API key in practice\n\n# Get the git diff\n',
      solution: '#!/bin/bash\n\n# This script generates commit messages using AI\n# You would need an OpenAI API key in practice\n\n# Get the git diff\ngit_diff=$(git diff --staged)\n\n# In a real script, you would send this to OpenAI API\necho "Generating commit message based on changes..."\necho "AI suggests: feat: implement user authentication feature"\n\n# You could then use this message to commit\n# git commit -m "feat: implement user authentication feature"\n',
      validate: (input) => {
        return input.includes('git diff') && 
               input.includes('commit message');
      }
    }
  };

  const challenge = challenges[lessonId];
  
  // If no challenge for this lesson, don't render anything
  if (!challenge) return null;

  // AI suggestion generator (simulated)
  const generateAiSuggestion = () => {
    setIsGeneratingSuggestion(true);
    setShowAiSuggestion(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const suggestions = {
        '1-3': "Consider adding patterns for common build directories like 'dist/' and 'build/'. Also, don't forget OS-specific files like .DS_Store for macOS.",
        '2-1': "You might want to add a comment explaining what the feature branch is for. Also consider adding '--track' to set up tracking with the remote branch.",
        '3-1': "A good PR template should include sections for testing instructions and screenshots if UI changes are involved.",
        '4-1': "Consider adding error handling for when the diff is empty. You might also want to limit the diff size sent to the API."
      };
      
      setAiSuggestion(suggestions[lessonId] || "Try to make your solution more comprehensive and follow best practices.");
      setIsGeneratingSuggestion(false);
      setShowAiSuggestion(true);
    }, 1500);
  };
  
  const runCode = () => {
    const isValid = challenge.validate(code);
    setResult(isValid);
    
    if (isValid) {
      setChallengeCompleted(true);
      localStorage.setItem(`codingChallenge-${lessonId}`, 'completed');
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
          <Code className={`w-5 h-5 ${colors.text}`} />
          Coding Challenge
        </h3>
        {challengeCompleted && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        )}
      </div>
      
      <div className={`bg-white border ${challengeCompleted ? 'border-green-200' : 'border-gray-200'} rounded-lg shadow-sm overflow-hidden ${challengeCompleted ? 'ring-1 ring-green-100' : ''}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-lg">{challenge.title}</h4>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">AI-Enhanced</span>
          </div>
          <p className="text-gray-700 mb-4">{challenge.description}</p>
          
          {challengeCompleted && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Challenge completed!</p>
                <p className="text-green-700 text-sm">Great job solving this coding challenge. You can continue to experiment with the code or move on to the next lesson.</p>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 font-mono text-sm p-4 bg-gray-900 text-gray-100 rounded-lg"
              placeholder="Write your code here..."
              defaultValue={challenge.initialCode}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={runCode}
              className={`px-4 py-2 ${colors.bg} text-white rounded-lg flex items-center gap-2`}
            >
              <Play className="w-4 h-4" />
              Run Code
            </button>
            
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
            
            <button
              onClick={generateAiSuggestion}
              disabled={isGeneratingSuggestion}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {isGeneratingSuggestion ? 'Generating...' : 'AI Suggestion'}
            </button>
          </div>
          
          {result !== null && (
            <div className={`mt-4 p-4 rounded-lg ${result ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-2">
                {result ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-green-800 block">Challenge completed successfully!</span>
                      <span className="text-green-700 text-sm">
                        Your solution meets all the requirements. Great job!
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-red-800 block">Not quite right. Try again!</span>
                      <span className="text-red-700 text-sm">
                        Your solution doesn't meet all requirements. Check the challenge description and try again.
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {showAiSuggestion && (
            <div className="mt-4 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-indigo-800 block">AI Suggestion:</span>
                  <p className="text-indigo-700 text-sm mt-1">{aiSuggestion}</p>
                </div>
              </div>
            </div>
          )}
          
          {showSolution && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-700 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Solution:
                </h5>
                <span className="text-xs text-gray-500">Reference implementation</span>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {challenge.solution}
              </pre>
              <p className="mt-2 text-sm text-gray-600">Note: This is one possible solution. There may be other valid approaches.</p>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Zap className="w-4 h-4 text-indigo-500" />
              AI-assisted learning
            </div>
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://github.com/features/copilot', '_blank');
              }}
            >
              Learn more about AI coding tools
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;