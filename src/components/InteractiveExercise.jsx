import React, { useState, useEffect } from 'react';
import { CheckCircle, X, ArrowLeft, ArrowRight, Award, Terminal, Code, GitBranch, Github } from 'lucide-react';

const InteractiveExercise = ({ lessonId, colors }) => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);
  
  // Load completed exercises from localStorage
  useEffect(() => {
    const savedExercises = localStorage.getItem(`completedExercises-${lessonId}`);
    if (savedExercises) {
      const parsed = JSON.parse(savedExercises);
      setCompletedExercises(parsed);
      
      // Check if all exercises are completed
      const exerciseSet = exercises[lessonId] || exercises['1-1'];
      if (parsed.length === exerciseSet.length) {
        setAllCompleted(true);
      }
    }
  }, [lessonId]);
  
  // Save completed exercises to localStorage
  useEffect(() => {
    if (completedExercises.length > 0) {
      localStorage.setItem(`completedExercises-${lessonId}`, JSON.stringify(completedExercises));
      
      // Check if all exercises are completed
      const exerciseSet = exercises[lessonId] || exercises['1-1'];
      if (completedExercises.length === exerciseSet.length) {
        setAllCompleted(true);
      }
    }
  }, [completedExercises, lessonId]);

  // Exercise data based on lesson ID
  const exercises = {
    '1-1': [
      {
        question: 'What version of Git do you have installed?',
        placeholder: 'e.g., 2.34.1',
        validator: (input) => /^\d+\.\d+\.\d+$/.test(input),
        hint: 'Enter a valid version number (e.g., 2.34.1)'
      },
      {
        question: 'What does VCS stand for in the context of Git?',
        placeholder: 'e.g., Version...',
        validator: (input) => input.toLowerCase().includes('version control system'),
        hint: 'Version Control System'
      },
      {
        question: 'Is Git a centralized or distributed version control system?',
        placeholder: 'centralized or distributed',
        validator: (input) => input.toLowerCase().trim() === 'distributed',
        hint: 'Git allows every developer to have a complete copy of the repository'
      }
    ],
    '1-2': [
      {
        question: 'What command would you use to set your Git username?',
        placeholder: 'git config...',
        validator: (input) => input.includes('git config') && input.includes('user.name'),
        hint: 'The command should include "git config" and "user.name"'
      },
      {
        question: 'What command shows all your Git configuration settings?',
        placeholder: 'git...',
        validator: (input) => input.trim() === 'git config --list',
        hint: 'The command is "git config --list"'
      },
      {
        question: 'What flag makes a Git config setting apply to all repositories?',
        placeholder: '--...',
        validator: (input) => input.trim() === '--global',
        hint: 'The flag is "--global"'
      }
    ],
    '1-3': [
      {
        question: 'What command initializes a new Git repository?',
        placeholder: 'git...',
        validator: (input) => input.trim() === 'git init',
        hint: 'The command is "git init"'
      },
      {
        question: 'What hidden directory is created when you initialize a Git repository?',
        placeholder: '...',
        validator: (input) => input.trim() === '.git',
        hint: 'It starts with a dot (.git)'
      },
      {
        question: 'What command clones an existing repository?',
        placeholder: 'git...',
        validator: (input) => input.startsWith('git clone'),
        hint: 'The command starts with "git clone"'
      }
    ],
    '2-1': [
      {
        question: 'What command creates a new branch called "feature"?',
        placeholder: 'git...',
        validator: (input) => input === 'git branch feature' || input === 'git checkout -b feature',
        hint: 'Either "git branch feature" or "git checkout -b feature" is correct'
      },
      {
        question: 'What command switches to an existing branch?',
        placeholder: 'git...',
        validator: (input) => input.startsWith('git checkout') || input.startsWith('git switch'),
        hint: 'Either "git checkout [branch]" or "git switch [branch]" works'
      },
      {
        question: 'What does the asterisk (*) indicate when you run "git branch"?',
        placeholder: 'The...',
        validator: (input) => input.toLowerCase().includes('current') && input.toLowerCase().includes('branch'),
        hint: 'It shows which branch you are currently on'
      }
    ],
    '3-1': [
      {
        question: 'What command clones a remote repository?',
        placeholder: 'git...',
        validator: (input) => input.startsWith('git clone'),
        hint: 'The command starts with "git clone"'
      },
      {
        question: 'What GitHub feature is used to propose changes to a repository?',
        placeholder: 'Pull...',
        validator: (input) => input.toLowerCase().includes('pull request') || input.toLowerCase().includes('pull requests'),
        hint: 'Pull Request'
      },
      {
        question: 'What command pushes your local changes to a remote repository?',
        placeholder: 'git...',
        validator: (input) => input.startsWith('git push'),
        hint: 'The command starts with "git push"'
      }
    ],
    '4-1': [
      {
        question: 'What GitHub tool provides AI code suggestions?',
        placeholder: 'GitHub...',
        validator: (input) => input.toLowerCase().includes('copilot'),
        hint: 'It starts with "GitHub Co..."'
      },
      {
        question: 'What AI tool can help generate commit messages?',
        placeholder: 'e.g., ai...',
        validator: (input) => input.toLowerCase().includes('aicommits') || input.toLowerCase().includes('commitgpt'),
        hint: 'Tools like "aicommits" or "commitGPT"'
      },
      {
        question: 'What company developed GitHub Copilot?',
        placeholder: 'e.g., Microsoft...',
        validator: (input) => input.toLowerCase().includes('microsoft') || input.toLowerCase().includes('openai'),
        hint: 'Microsoft and OpenAI collaborated on this tool'
      }
    ]
  };

  const exerciseSet = exercises[lessonId] || exercises['1-1'];
  const exercise = exerciseSet[currentExerciseIndex];
  const totalExercises = exerciseSet.length;

  const checkAnswer = () => {
    if (!answer.trim()) return; // Don't check empty answers
    
    const result = exercise.validator(answer);
    setIsCorrect(result);
    setAttempts(attempts + 1);
    
    if (result) {
      // If correct, add to completed exercises
      if (!completedExercises.includes(currentExerciseIndex)) {
        const newCompleted = [...completedExercises, currentExerciseIndex];
        setCompletedExercises(newCompleted);
        
        // Check if this was the last exercise
        const exerciseSet = exercises[lessonId] || exercises['1-1'];
        if (newCompleted.length === exerciseSet.length) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    }
  };
  
  const nextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setAnswer('');
      setIsCorrect(null);
      setAttempts(0);
    }
  };
  
  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setAnswer('');
      setIsCorrect(null);
      setAttempts(0);
    }
  };

  // Get the appropriate icon for the lesson
  const getLessonIcon = () => {
    if (lessonId.startsWith('1-')) return <Terminal className="w-5 h-5" />;
    if (lessonId.startsWith('2-')) return <GitBranch className="w-5 h-5" />;
    if (lessonId.startsWith('3-')) return <Github className="w-5 h-5" />;
    if (lessonId.startsWith('4-')) return <Code className="w-5 h-5" />;
    return <Terminal className="w-5 h-5" />;
  };
  
  // Confetti component for celebrations
  const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti text-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          {['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mb-8 relative">
      {showCelebration && <Confetti />}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
          {getLessonIcon()}
          Interactive Exercises
        </h3>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">
            Exercise {currentExerciseIndex + 1} of {totalExercises}
          </div>
          {allCompleted && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
      </div>
      
      <div className={`bg-white border ${allCompleted ? 'border-green-200' : 'border-gray-200'} rounded-lg shadow-sm overflow-hidden ${allCompleted ? 'ring-1 ring-green-100' : ''}`}>
        <div className="p-6">
          <p className="text-gray-700 mb-4">Try the command yourself and check your understanding:</p>
          
          {allCompleted && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">All exercises completed!</p>
                <p className="text-green-700 text-sm">Great job mastering these concepts. You can revisit any exercise to practice more.</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">{exercise.question}</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Terminal className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder={exercise.placeholder}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="flex-1 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  />
                  {completedExercises.includes(currentExerciseIndex) && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
                <button 
                  onClick={checkAnswer}
                  className={`px-4 py-2 ${colors?.bg || 'bg-blue-600'} text-white rounded-lg hover:${colors?.hover || 'bg-blue-700'} transition-colors flex items-center gap-2`}
                >
                  <span>Check</span>
                  {isCorrect && <CheckCircle className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {isCorrect !== null && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-green-800 block">Correct! Well done!</span>
                        <span className="text-green-700 text-sm">
                          {lessonId.startsWith('1-') && 'You\'re mastering Git fundamentals!'}
                          {lessonId.startsWith('2-') && 'Your branching skills are growing!'}
                          {lessonId.startsWith('3-') && 'Great GitHub collaboration knowledge!'}
                          {lessonId.startsWith('4-') && 'You\'re becoming an AI-Git expert!'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-red-800 block">Not quite right. Try again!</span>
                        {attempts >= 1 && (
                          <p className="mt-1 text-sm text-red-700">Hint: {exercise.hint}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
                {isCorrect && currentExerciseIndex < totalExercises - 1 && (
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={nextExercise}
                      className={`${colors?.bg || 'bg-blue-600'} ${colors?.hover || 'hover:bg-blue-700'} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors`}
                    >
                      Next Exercise
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Exercise Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={prevExercise}
              disabled={currentExerciseIndex === 0}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 ${currentExerciseIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalExercises }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentExerciseIndex(index);
                    setAnswer('');
                    setIsCorrect(null);
                    setAttempts(0);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative
                    ${index === currentExerciseIndex 
                      ? `${colors.bg} text-white` 
                      : completedExercises.includes(index) 
                        ? `${colors.light} ${colors.lightText}` 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  aria-label={`Exercise ${index + 1}`}
                >
                  {index + 1}
                  {completedExercises.includes(index) && index !== currentExerciseIndex && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextExercise}
              disabled={currentExerciseIndex === totalExercises - 1}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 ${currentExerciseIndex === totalExercises - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full ${colors.bg}`}
              style={{ width: `${(completedExercises.length / totalExercises) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExercise;