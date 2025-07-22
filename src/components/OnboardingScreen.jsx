import React, { useState } from 'react';
import { User, TrendingUp, Code, Target, ArrowRight, ArrowLeft, GitBranch, Terminal, Github, Zap, CheckCircle, Clock, Award } from 'lucide-react';

/**
 * Onboarding Screen Component
 *
 * Collects user information to personalize the learning experience
 * including experience level, goals, and learning preferences.
 */
const OnboardingScreen = ({ userProfile, setUserProfile, onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(userProfile);

  const questions = [
    {
      id: 'name',
      title: "What's your name?",
      subtitle: "We'll personalize your learning experience",
      type: 'text',
      placeholder: 'Enter your name...',
      icon: <User className="w-6 h-6" />
    },
    {
      id: 'experience',
      title: "How would you describe your Git experience?",
      subtitle: "We'll tailor the content to your level",
      type: 'choice',
      icon: <TrendingUp className="w-6 h-6" />,
      options: [
        { value: 'beginner', label: 'Complete Beginner', desc: 'Never used Git before' },
        { value: 'basic', label: 'Some Basics', desc: 'Used git add, commit, push' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Comfortable with branching' },
        { value: 'advanced', label: 'Advanced', desc: 'Know rebasing, complex workflows' }
      ]
    },
    {
      id: 'environment',
      title: "What's your development environment?",
      subtitle: "This helps us tailor examples to your setup",
      type: 'choice',
      icon: <Code className="w-6 h-6" />,
      options: [
        { value: 'windows', label: 'Windows', desc: 'Command Prompt, PowerShell, or WSL' },
        { value: 'mac', label: 'macOS', desc: 'Terminal with Zsh or Bash' },
        { value: 'linux', label: 'Linux', desc: 'Various distributions' },
        { value: 'mixed', label: 'Multiple', desc: 'I work on different systems' }
      ]
    },
    {
      id: 'goals',
      title: "What do you want to achieve?",
      subtitle: "Select all that apply to focus your learning",
      type: 'multiple',
      icon: <Target className="w-6 h-6" />,
      options: [
        { value: 'fundamentals', label: 'Master Git Fundamentals', icon: <GitBranch className="w-5 h-5" /> },
        { value: 'collaboration', label: 'Learn Team Collaboration', icon: <User className="w-5 h-5" /> },
        { value: 'workflows', label: 'Understand Git Workflows', icon: <Terminal className="w-5 h-5" /> },
        { value: 'github', label: 'GitHub Mastery', icon: <Github className="w-5 h-5" /> },
        { value: 'ai', label: 'AI-Assisted Development', icon: <Zap className="w-5 h-5" /> },
        { value: 'career', label: 'Advance My Career', icon: <Award className="w-5 h-5" /> }
      ]
    }
  ];

  const currentQuestion = questions[step];

  const handleAnswer = (value) => {
    let newAnswers;

    if (currentQuestion.type === 'multiple') {
      const currentGoals = answers.goals || [];
      newAnswers = {
        ...answers,
        [currentQuestion.id]: currentGoals.includes(value)
          ? currentGoals.filter(g => g !== value)
          : [...currentGoals, value]
      };
    } else {
      newAnswers = { ...answers, [currentQuestion.id]: value };
    }

    setAnswers(newAnswers);

    // Auto-advance for single-choice questions
    if (currentQuestion.type !== 'multiple' && currentQuestion.type !== 'text') {
      setTimeout(() => {
        if (step < questions.length - 1) {
          setStep(step + 1);
        } else {
          completeOnboarding(newAnswers);
        }
      }, 500);
    }
  };

  const completeOnboarding = (finalAnswers) => {
    setUserProfile(finalAnswers);
    onComplete();
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding(answers);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'text') {
      return answer && answer.trim().length > 0;
    }
    if (currentQuestion.type === 'multiple') {
      return answer && answer.length > 0;
    }
    return answer;
  };

  // Background patterns based on step
  const backgrounds = [
    'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800',
    'bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800',
    'bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800',
    'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800'
  ];

  return (
    <div className={`min-h-screen ${backgrounds[step]} text-white`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <GitBranch className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Git Mastery</h1>
          <p className="text-blue-200">Personalize your learning experience</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-200">
              Step {step + 1} of {questions.length}
            </span>
            <span className="text-sm text-blue-200">
              {Math.round(((step + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full">
            <div
              className="h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl mb-4">
                  {currentQuestion.icon}
                </div>
                <h2 className="text-3xl font-bold mb-2">{currentQuestion.title}</h2>
                <p className="text-blue-200">{currentQuestion.subtitle}</p>
              </div>

              {/* Question Content */}
              {currentQuestion.type === 'text' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              )}

              {currentQuestion.type === 'choice' && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        answers[currentQuestion.id] === option.value
                          ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 shadow-lg border border-white/20'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-lg">{option.label}</div>
                          {option.desc && (
                            <div className="text-sm text-blue-200 mt-1">{option.desc}</div>
                          )}
                        </div>
                        {answers[currentQuestion.id] === option.value && (
                          <CheckCircle className="w-6 h-6 text-blue-300" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'multiple' && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        answers[currentQuestion.id]?.includes(option.value)
                          ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 shadow-lg border border-white/20'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/10 p-2 rounded-lg">
                            {option.icon}
                          </div>
                          <div className="font-semibold">{option.label}</div>
                        </div>
                        {answers[currentQuestion.id]?.includes(option.value) && (
                          <CheckCircle className="w-6 h-6 text-blue-300" />
                        )}
                      </div>
                    </button>
                  ))}
                  <p className="text-sm text-blue-200 text-center mt-4">
                    Selected: {answers[currentQuestion.id]?.length || 0} goals
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-white/5 border-t border-white/10 p-6 flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  step === 0
                    ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex items-center gap-2">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === step ? 'bg-blue-400 w-4' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                    : 'opacity-50 cursor-not-allowed bg-white/10 text-white/50'
                }`}
              >
                {step === questions.length - 1 ? 'Get Started' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Skip for now */}
          <div className="text-center mt-6">
            <button 
              onClick={onComplete}
              className="text-blue-200 hover:text-white text-sm"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;