import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Terminal, CheckCircle, Copy, ArrowRight, MessageSquare, AlertCircle, Award, ChevronRight, ChevronDown, Code, Play, X, Video, ExternalLink, RefreshCw } from 'lucide-react';
import InteractiveTerminal from './InteractiveTerminal';
import InteractiveExercise from './InteractiveExercise';
import CodingChallenge from './CodingChallenge';

/**
 * Lesson Viewer Component
 *
 * Displays individual lessons with theory, practice exercises, and quizzes.
 * Provides an interactive learning experience with progress tracking.
 */
const LessonViewer = ({
  lesson,
  lessonsData,
  completedLessons,
  markLessonComplete,
  onBack,
  showConfetti
}) => {
  const [currentTab, setCurrentTab] = useState('theory');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [showTerminalOutput, setShowTerminalOutput] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const isCompleted = completedLessons.has(lesson.id);

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setShowQuizResults(false);
    setShowHint(false);
    setTerminalOutput('');
    setShowTerminalOutput(false);
  }, [lesson.id]);

  // Copy command to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Simulate terminal output
  const simulateTerminalOutput = () => {
    setShowTerminalOutput(true);
    setTerminalOutput('');
    
    const expectedOutput = lesson.content.practice.expectedOutput;
    const outputLines = expectedOutput.split('\n');
    
    outputLines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => prev + (prev ? '\n' : '') + line);
      }, 300 * (index + 1));
    });
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    if (!isCompleted) {
      markLessonComplete(lesson.id);
    }
  };

  // Check if quiz is complete
  const isQuizComplete = () => {
    return lesson.content.quiz?.every((_, index) =>
      quizAnswers[index] !== undefined
    );
  };

  // Calculate quiz score
  const getQuizScore = () => {
    if (!lesson.content.quiz) return 0;
    const correct = lesson.content.quiz.filter((question, index) =>
      quizAnswers[index] === question.correct
    ).length;
    return Math.round((correct / lesson.content.quiz.length) * 100);
  };

  // Get module color based on lesson ID
  const getModuleColor = () => {
    const moduleId = lesson.id.split('-')[0];
    const colors = {
      '1': 'blue',
      '2': 'green',
      '3': 'purple',
      '4': 'orange'
    };
    return colors[moduleId] || 'blue';
  };

  const moduleColor = getModuleColor();
  const moduleColorClasses = {
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      lightText: 'text-blue-800'
    },
    green: {
      bg: 'bg-green-600',
      hover: 'hover:bg-green-700',
      text: 'text-green-600',
      light: 'bg-green-50',
      border: 'border-green-200',
      lightText: 'text-green-800'
    },
    purple: {
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
      text: 'text-purple-600',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      lightText: 'text-purple-800'
    },
    orange: {
      bg: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
      text: 'text-orange-600',
      light: 'bg-orange-50',
      border: 'border-orange-200',
      lightText: 'text-orange-800'
    }
  };

  const colors = moduleColorClasses[moduleColor];

  // Confetti component for celebrations
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          🎉
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'theory', label: 'Theory', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Terminal className="w-4 h-4" /> },
    ...(lesson.content.quiz ? [{ id: 'quiz', label: 'Quiz', icon: <MessageSquare className="w-4 h-4" /> }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-blue-50">
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className={`${colors.bg} text-white`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div>
                <div className="text-sm text-white/80 mb-1">
                  Lesson {lesson.id}
                </div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
              </div>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                  currentTab === tab.id
                    ? `${colors.text} ${moduleColor === 'blue' ? 'border-blue-600' : moduleColor === 'green' ? 'border-green-600' : moduleColor === 'purple' ? 'border-purple-600' : 'border-orange-600'}`
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tab Content */}
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200">
            {/* Theory Tab */}
            {currentTab === 'theory' && (
              <div className="p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Understanding the Concepts</h2>
                
                {/* Video Tutorial Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
                      <Video className={`w-5 h-5 ${colors.text}`} />
                      Video Tutorial
                    </h3>
                    <button
                      onClick={() => setShowVideo(!showVideo)}
                      className={`text-sm flex items-center gap-1 px-3 py-1.5 rounded-lg ${colors.light} ${colors.lightText} font-medium`}
                    >
                      {showVideo ? (
                        <>
                          <X className="w-3 h-3" />
                          Hide Video
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" />
                          Watch Video
                        </>
                      )}
                    </button>
                  </div>
                  
                  {showVideo && (
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-4">
                      <div className="aspect-w-16 aspect-h-9">
                        {/* Video embed based on lesson ID */}
                        {lesson.id === "1-1" && (
                          <iframe 
                            className="w-full h-96"
                            src="https://www.youtube.com/embed/hwP7WQkmECE" 
                            title="What is Git?" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                        {lesson.id === "1-2" && (
                          <iframe 
                            className="w-full h-96"
                            src="https://www.youtube.com/embed/SWYqp7iY_Tc?start=165&end=512" 
                            title="Setting Up Git" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                        {lesson.id === "1-3" && (
                          <iframe 
                            className="w-full h-96"
                            src="https://www.youtube.com/embed/SWYqp7iY_Tc?start=512&end=789" 
                            title="Creating Your First Repository" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                        {lesson.id === "2-1" && (
                          <iframe 
                            className="w-full h-96"
                            src="https://www.youtube.com/embed/QV0kVNvkMxc" 
                            title="Understanding Branches" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                        {lesson.id === "3-1" && (
                          <iframe 
                            className="w-full h-96"
                            src="https://www.youtube.com/embed/RGOj5yH7evk?start=1422&end=1800" 
                            title="Introduction to GitHub" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                        {lesson.id === "4-1" && (
                          <iframe 
                            className="w-full h-96"
                            src="https://www.youtube.com/embed/Lf3DYRvCPFo" 
                            title="AI Tools for Git" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!showVideo && (
                    <div className={`${colors.light} border ${colors.border} rounded-lg p-6 flex items-center justify-between`}>
                      <div>
                        <h4 className={`font-semibold ${colors.lightText} mb-1`}>Visual learner?</h4>
                        <p className="text-gray-600">Watch a short video explanation of this concept</p>
                      </div>
                      <button
                        onClick={() => setShowVideo(true)}
                        className={`${colors.bg} ${colors.hover} text-white px-4 py-2 rounded-lg flex items-center gap-2`}
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                    {lesson.content.theory.split('\n\n').map((paragraph, index) => {
                      // Check if this is a heading (starts with # or has : at the end)
                      if (paragraph.startsWith('#')) {
                        // Handle markdown headings
                        const level = paragraph.match(/^#+/)[0].length;
                        const text = paragraph.replace(/^#+\s+/, '');
                        if (level === 1) {
                          return <h2 key={index} className={`text-2xl font-bold mb-4 ${colors.text}`}>{text}</h2>;
                        } else if (level === 2) {
                          return <h3 key={index} className={`text-xl font-bold mb-3 ${colors.text}`}>{text}</h3>;
                        } else {
                          return <h4 key={index} className={`text-lg font-bold mb-2 ${colors.text}`}>{text}</h4>;
                        }
                      } else if (paragraph.startsWith('•')) {
                        return (
                          <div key={index} className="flex items-start gap-2 mb-2">
                            <div className={moduleColor === 'blue' ? 'text-blue-500 font-bold' : moduleColor === 'green' ? 'text-green-500 font-bold' : moduleColor === 'purple' ? 'text-purple-500 font-bold' : 'text-orange-500 font-bold'}>•</div>
                            <div>{paragraph.substring(1).trim()}</div>
                          </div>
                        );
                      } else if (paragraph.includes(':') && !paragraph.includes('\n')) {
                        const [heading, content] = paragraph.split(':');
                        return (
                          <div key={index} className="mb-4">
                            <h3 className={`font-bold text-xl mb-2 ${moduleColor === 'blue' ? 'text-blue-700' : moduleColor === 'green' ? 'text-green-700' : moduleColor === 'purple' ? 'text-purple-700' : 'text-orange-700'}`}>{heading.trim()}:</h3>
                            <p>{content.trim()}</p>
                          </div>
                        );
                      } else if (paragraph.startsWith('```')) {
                        // Handle code blocks
                        const code = paragraph.replace(/```(\w*)\n([\s\S]*)```/, '$2');
                        return (
                          <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4 shadow-lg border border-gray-700">
                            <pre>{code}</pre>
                          </div>
                        );
                      } else {
                        return <p key={index} className="mb-4">{paragraph}</p>;
                      }
                    })}
                  </div>
                </div>
                
                {/* Interactive diagram for branching lessons */}
                {lesson.id === "2-1" && (
                  <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-lg mb-4">Interactive Branch Visualization</h3>
                    <div className="relative h-64 overflow-hidden bg-white p-4 border border-gray-200 rounded-lg">
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                      
                      {/* Main branch */}
                      <div className="absolute left-1/2 top-16 transform -translate-x-1/2 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-mono text-xs">C1</div>
                        <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">main</div>
                      </div>
                      
                      {/* Feature branch */}
                      <div className="absolute left-1/2 top-48 transform translate-x-12 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-mono text-xs">C2</div>
                        <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">feature</div>
                      </div>
                      
                      {/* Branch line */}
                      <svg className="absolute left-1/2 top-16 w-24 h-32" style={{ overflow: 'visible' }}>
                        <path d="M 0,0 Q 24,16 24,32" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                      </svg>
                      
                      <button 
                        className="absolute bottom-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                        onClick={() => alert('This would be an interactive diagram in the full version!')}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Animate
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <a 
                    href={`https://git-scm.com/docs/${lesson.id.startsWith('1-') ? 'git-init' : lesson.id.startsWith('2-') ? 'git-branch' : 'git-remote'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Official Documentation
                  </a>
                  
                  <button
                    onClick={() => setCurrentTab('practice')}
                    className={`btn-primary ${colors.bg} ${colors.hover} flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-colors`}
                  >
                    Try It Out
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Practice Tab */}
            {currentTab === 'practice' && lesson.content.practice && (
              <div className="p-8 bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-xl">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{lesson.content.practice.title}</h2>
                <p className="text-gray-600 mb-8 text-lg">{lesson.content.practice.description}</p>

                <div className="practice-container">
                  {/* Interactive Terminal */}
                  <InteractiveTerminal 
                    command={lesson.content.practice.command}
                    expectedOutput={lesson.content.practice.expectedOutput}
                    onRun={() => {
                      // This would track progress in a real app
                    }}
                  />
                  
                  {/* Interactive Exercise */}
                  <InteractiveExercise 
                    lessonId={lesson.id}
                    colors={colors}
                  />
                  
                  {/* Coding Challenge - only shown for applicable lessons */}
                  <CodingChallenge 
                    lessonId={lesson.id}
                    colors={colors}
                  />
                </div>

                {/* Hint */}
                {lesson.content.practice.hint && (
                  <div className="mb-8">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-2 text-gray-700 font-medium mb-2"
                    >
                      {showHint ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      <span>Need a hint?</span>
                    </button>
                    
                    {showHint && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-amber-800 mb-2">💡 Hint:</h4>
                        <p className="text-amber-700">{lesson.content.practice.hint}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentTab('theory')}
                    className="btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Theory
                  </button>
                  {lesson.content.quiz && (
                    <button
                      onClick={() => {
                        if (!isCompleted) {
                          setCurrentTab('quiz');
                        } else {
                          markLessonComplete(lesson.id);
                          onBack();
                        }
                      }}
                      className={`btn-primary ${colors.bg} ${colors.hover} flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-colors`}
                    >
                      {lesson.content.quiz ? (
                        <>
                          Take Quiz
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Complete Lesson
                          <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {currentTab === 'quiz' && lesson.content.quiz && (
              <div className="p-8 bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Test Your Knowledge</h2>
                <p className="text-gray-600 mb-8">Answer the following questions to complete this lesson</p>

                {!showQuizResults ? (
                  <div className="space-y-8">
                    {lesson.content.quiz.map((question, questionIndex) => (
                      <div key={questionIndex} className="border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4 text-gray-800">
                          {questionIndex + 1}. {question.question}
                        </h3>
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <label
                              key={optionIndex}
                              className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                                quizAnswers[questionIndex] === optionIndex
                                  ? `${colors.light} ${colors.border}`
                                  : 'hover:bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                value={optionIndex}
                                checked={quizAnswers[questionIndex] === optionIndex}
                                onChange={() => setQuizAnswers({
                                  ...quizAnswers,
                                  [questionIndex]: optionIndex
                                })}
                                className="mr-3"
                              />
                              <span className="text-gray-800">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentTab('practice')}
                        className="btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Practice
                      </button>
                      <button
                        onClick={handleQuizSubmit}
                        disabled={!isQuizComplete()}
                        className={`btn-primary ${colors.bg} ${colors.hover} flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-colors ${
                          !isQuizComplete() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Submit Quiz
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Quiz Results
                  <div className="space-y-8">
                    <div className="text-center py-8">
                      <div className={`text-6xl mb-6 ${
                        getQuizScore() >= 80 ? 'text-green-600' :
                        getQuizScore() >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {getQuizScore() >= 80 ? '🎉' : getQuizScore() >= 60 ? '👍' : '📚'}
                      </div>
                      <h3 className="text-3xl font-bold mb-3 text-gray-800">Quiz Complete!</h3>
                      <div className="text-xl text-gray-600 mb-6">
                        You scored <span className="font-bold">{getQuizScore()}%</span> ({lesson.content.quiz.filter((_, index) =>
                          quizAnswers[index] === lesson.content.quiz[index].correct
                        ).length}/{lesson.content.quiz.length})
                      </div>
                      
                      <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                        <Award className="w-4 h-4 text-yellow-500" />
                        {getQuizScore() >= 80 ? 'Excellent work!' : getQuizScore() >= 60 ? 'Good job!' : 'Keep practicing!'}
                      </div>
                    </div>

                    {/* Question Results */}
                    <div className="space-y-6">
                      <h3 className="font-semibold text-lg text-gray-700">Review Your Answers</h3>
                      
                      {lesson.content.quiz.map((question, index) => {
                        const isCorrect = quizAnswers[index] === question.correct;
                        return (
                          <div key={index} className={`p-6 rounded-xl border ${
                            isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                          }`}>
                            <div className="flex items-start gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${
                                isCorrect ? 'bg-green-600' : 'bg-red-600'
                              }`}>
                                {isCorrect ? '✓' : '✗'}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-3 text-gray-800">{question.question}</h4>
                                {!isCorrect && (
                                  <div className="mb-4 space-y-2">
                                    <p className="text-red-700 flex items-center gap-2">
                                      <X className="w-4 h-4" />
                                      <span>Your answer: {question.options[quizAnswers[index]]}</span>
                                    </p>
                                    <p className="text-green-700 flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4" />
                                      <span>Correct answer: {question.options[question.correct]}</span>
                                    </p>
                                  </div>
                                )}
                                <div className={`text-sm p-3 rounded-lg ${
                                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  <strong>Explanation:</strong> {question.explanation}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-center pt-4">
                      <button
                        onClick={onBack}
                        className={`btn-primary ${colors.bg} ${colors.hover} flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-white transition-colors mx-auto`}
                      >
                        Continue Learning
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;