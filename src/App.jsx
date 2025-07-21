import React, { useState, useEffect } from 'react';
import { secureStore, secureRetrieve, sanitizeInput } from './utils/security';
import {
  ChevronRight,
  Code,
  Terminal,
  Zap,
  Award,
  BookOpen,
  Users,
  GitBranch,
  Star,
  Trophy,
  CheckCircle,
  ArrowRight,
  Github,
  Play,
  User,
  Settings,
  TrendingUp,
  Target,
  Lightbulb,
  Coffee,
  Clock,
  Rocket,
  ArrowLeft,
  Check,
  X,
  Copy,
  RefreshCw,
  FileText,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

// Import components
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingScreen from './components/OnboardingScreen';
import Dashboard from './components/Dashboard';
import LessonViewer from './components/LessonViewer';
import UserWiki from './components/UserWiki';

// Import resources
import GitCheatSheet from './resources/GitCheatSheet';
import GitDocs from './resources/GitDocs';
import GitHubDocs from './resources/GitHubDocs';
import GitHubCheatSheet from './resources/GitHubCheatSheet';
import CommandReference from './resources/CommandReference';

// Import data
import { lessonsData } from './data/lessons';

/**
 * Main Git & GitHub Mastery App Component
 *
 * This is an interactive learning platform that teaches Git fundamentals,
 * branching strategies, GitHub collaboration, and AI-assisted development.
 * Created by Wayne Trout as part of the AI Masters Community.
 * 
 * GitHub Repository: https://github.com/wtrout187/git_gihub_app
 *
 * Features:
 * - 4 comprehensive learning modules
 * - Interactive lessons with practice exercises
 * - Progress tracking and achievements
 * - Personalized learning experience
 * - Modern React + Tailwind CSS UI
 * - Community Wiki for sharing tips and resources
 * - Mobile-responsive design
 */
const GitGitHubMasteryApp = () => {
  // Core application state
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState({
    name: '',
    experience: '',
    environment: '',
    goals: [],
    style: ''
  });

  // Learning progress state
  const [progress, setProgress] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [achievements, setAchievements] = useState([]);

  // UI state
  const [showConfetti, setShowConfetti] = useState(false);

  /**
   * Trigger celebratory confetti animation
   */
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  /**
   * Load user progress from localStorage on mount using secure retrieval
   */
  useEffect(() => {
    const savedProgress = secureRetrieve('gitGitHubMasteryProgress');
    const savedProfile = secureRetrieve('gitGitHubMasteryProfile');
    const savedCompletedLessons = secureRetrieve('gitGitHubMasteryCompletedLessons');
    const savedAchievements = secureRetrieve('gitGitHubMasteryAchievements');

    if (savedProgress) {
      setProgress(savedProgress);
    }
    if (savedProfile) {
      // Sanitize user profile data for security
      if (savedProfile.name) {
        savedProfile.name = sanitizeInput(savedProfile.name);
      }
      setUserProfile(savedProfile);
      setCurrentStep('dashboard');
    }
    if (savedCompletedLessons) {
      setCompletedLessons(new Set(savedCompletedLessons));
    }
    if (savedAchievements) {
      setAchievements(savedAchievements);
    }
  }, []);

  /**
   * Save progress to localStorage when state changes using secure storage
   */
  useEffect(() => {
    secureStore('gitGitHubMasteryProgress', progress);
  }, [progress]);

  useEffect(() => {
    secureStore('gitGitHubMasteryProfile', userProfile);
  }, [userProfile]);

  useEffect(() => {
    secureStore('gitGitHubMasteryCompletedLessons', [...completedLessons]);
  }, [completedLessons]);

  useEffect(() => {
    secureStore('gitGitHubMasteryAchievements', achievements);
  }, [achievements]);

  /**
   * Mark a lesson as completed and update progress
   */
  const markLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    triggerConfetti();

    // Check for achievements
    checkAchievements(lessonId);
  };

  /**
   * Check and award achievements based on progress
   */
  const checkAchievements = (lessonId) => {
    const newAchievements = [];

    // First lesson achievement
    if (lessonId === '1-1' && !achievements.find(a => a.id === 'first-lesson')) {
      newAchievements.push({
        id: 'first-lesson',
        title: 'Git Beginner',
        description: 'Completed your first Git lesson!',
        icon: '🎯',
        date: new Date().toISOString()
      });
    }

    // Module completion achievements
    const moduleAchievements = {
      '1-8': { id: 'git-fundamentals', title: 'Git Master', description: 'Mastered Git fundamentals!', icon: '⭐' },
      '2-12': { id: 'branching-expert', title: 'Branch Ninja', description: 'Became a branching expert!', icon: '🥷' },
      '3-10': { id: 'collaboration-pro', title: 'Team Player', description: 'Mastered GitHub collaboration!', icon: '🤝' },
      '4-6': { id: 'ai-developer', title: 'AI Pioneer', description: 'Learned AI-assisted development!', icon: '🤖' }
    };

    if (moduleAchievements[lessonId] && !achievements.find(a => a.id === moduleAchievements[lessonId].id)) {
      newAchievements.push({
        ...moduleAchievements[lessonId],
        date: new Date().toISOString()
      });
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  /**
   * Reset all progress (for demo purposes)
   */
  const resetProgress = () => {
    localStorage.clear();
    setCurrentStep('welcome');
    setUserProfile({
      name: '',
      experience: '',
      environment: '',
      goals: [],
      style: ''
    });
    setProgress({});
    setCompletedLessons(new Set());
    setAchievements([]);
    setSelectedLesson(null);
    setCurrentLessonIndex(0);
  };

  // Render current screen based on application state
  if (currentStep === 'welcome') {
    return (
      <div className="app-container">
        <WelcomeScreen
          onGetStarted={() => setCurrentStep('onboarding')}
        />
      </div>
    );
  }

  if (currentStep === 'onboarding') {
    return (
      <div className="app-container">
        <OnboardingScreen
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onComplete={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }

  if (currentStep === 'lesson' && selectedLesson) {
    return (
      <div className="app-container">
        <LessonViewer
          lesson={selectedLesson}
          lessonsData={lessonsData}
          completedLessons={completedLessons}
          markLessonComplete={markLessonComplete}
          onBack={() => setCurrentStep('dashboard')}
          showConfetti={showConfetti}
        />
      </div>
    );
  }

  if (currentStep === 'dashboard') {
    return (
      <div className="app-container">
        <Dashboard
          userProfile={userProfile}
          lessonsData={lessonsData}
          completedLessons={completedLessons}
          achievements={achievements}
          onStartLesson={(lesson) => {
            setSelectedLesson(lesson);
            setCurrentStep('lesson');
          }}
          onResetProgress={resetProgress}
          showConfetti={showConfetti}
          setCurrentStep={setCurrentStep}
        />
      </div>
    );
  }
  
  if (currentStep === 'gitCheatSheet') {
    return (
      <div className="app-container">
        <GitCheatSheet
          onBack={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }
  
  if (currentStep === 'gitDocs') {
    return (
      <div className="app-container">
        <GitDocs
          onBack={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }
  
  if (currentStep === 'githubDocs') {
    return (
      <div className="app-container">
        <GitHubDocs
          onBack={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }
  
  if (currentStep === 'githubCheatSheet') {
    return (
      <div className="app-container">
        <GitHubCheatSheet
          onBack={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }
  
  if (currentStep === 'commandReference') {
    return (
      <div className="app-container">
        <CommandReference
          onBack={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }
  
  if (currentStep === 'userWiki') {
    return (
      <div className="app-container">
        <UserWiki
          onBack={() => setCurrentStep('dashboard')}
        />
      </div>
    );
  }

  // Default fallback to welcome screen
  return (
    <div className="app-container">
      <WelcomeScreen
        onGetStarted={() => setCurrentStep('onboarding')}
      />
    </div>
  );
};

export default GitGitHubMasteryApp;
