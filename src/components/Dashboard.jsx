import React, { useState } from 'react';
import { Trophy, Star, BookOpen, Play, Settings, RefreshCw, GitBranch, Terminal, Github, Zap, CheckCircle, Clock, Target, Award, ChevronRight, ArrowRight, FileText, Users } from 'lucide-react';

/**
 * Dashboard Component
 *
 * Main learning hub showing progress, available modules, and achievements.
 * Acts as the central navigation point for the learning experience.
 */
const Dashboard = ({
  userProfile,
  lessonsData,
  completedLessons,
  achievements,
  onStartLesson,
  onResetProgress,
  setCurrentStep
}) => {
  const [activeTab, setActiveTab] = useState('modules');

  // Calculate overall progress
  const totalLessons = Object.values(lessonsData).reduce((acc, module) =>
    acc + module.lessons.length, 0
  );
  const completedCount = completedLessons.size;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  // Calculate module progress
  const getModuleProgress = (moduleData) => {
    const moduleCompletedCount = moduleData.lessons.filter(lesson =>
      completedLessons.has(lesson.id)
    ).length;
    return Math.round((moduleCompletedCount / moduleData.lessons.length) * 100);
  };

  // Get next recommended lesson
  const getNextLesson = () => {
    for (const moduleKey of Object.keys(lessonsData)) {
      const module = lessonsData[moduleKey];
      for (const lesson of module.lessons) {
        if (!completedLessons.has(lesson.id)) {
          return { module: moduleKey, lesson };
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();

  // Get recently completed lessons
  const getRecentCompletions = () => {
    // This would normally use timestamps, but for demo we'll just return some completed lessons
    return Array.from(completedLessons).slice(0, 3).map(lessonId => {
      const [moduleId, lessonNum] = lessonId.split('-');
      const module = lessonsData[moduleId];
      const lesson = module?.lessons.find(l => l.id === lessonId);
      return { moduleId, module, lesson };
    }).filter(item => item.lesson);
  };

  const recentCompletions = getRecentCompletions();

  // Calculate streak (would normally use actual dates)
  const currentStreak = 5; // Demo value

  const moduleIcons = {
    1: <GitBranch className="w-6 h-6" />,
    2: <Terminal className="w-6 h-6" />,
    3: <Github className="w-6 h-6" />,
    4: <Zap className="w-6 h-6" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6 py-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {userProfile.name}! 👋
              </h1>
              <p className="text-blue-100">
                Continue your Git mastery journey
              </p>
            </div>
            <button
              onClick={onResetProgress}
              className="btn-secondary bg-white/20 hover:bg-white/30 border-white/20"
              title="Reset Progress"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Progress Overview */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-blue-500/30 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-blue-200" />
                </div>
                <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Progress</span>
              </div>
              <div className="text-3xl font-bold">{progressPercentage}%</div>
              <div className="text-blue-200 text-sm">Overall Completion</div>
              <div className="mt-3 w-full bg-blue-900/50 rounded-full h-1.5">
                <div 
                  className="bg-blue-400 h-1.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-green-500/30 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-200" />
                </div>
                <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Completed</span>
              </div>
              <div className="text-3xl font-bold">{completedCount}</div>
              <div className="text-blue-200 text-sm">of {totalLessons} Lessons</div>
              <div className="mt-3 text-xs text-blue-200">
                {Math.round((completedCount / totalLessons) * 100)}% Complete
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-yellow-500/30 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-200" />
                </div>
                <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Achievements</span>
              </div>
              <div className="text-3xl font-bold">{achievements.length}</div>
              <div className="text-blue-200 text-sm">Badges Earned</div>
              <div className="mt-3 text-xs text-blue-200">
                {achievements.length > 0 ? 'Great progress!' : 'Complete lessons to earn badges'}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-purple-500/30 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-200" />
                </div>
                <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Streak</span>
              </div>
              <div className="text-3xl font-bold">{currentStreak}</div>
              <div className="text-blue-200 text-sm">Days in a Row</div>
              <div className="mt-3 text-xs text-blue-200">
                Keep it up!
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'modules'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Learning Modules
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'achievements'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'profile'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Your Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'modules' && (
              <>
                {/* Continue Learning */}
                {nextLesson && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800">
                        <Play className="w-6 h-6 text-blue-600" />
                        Continue Learning
                      </h2>
                      <p className="text-gray-600 mb-6">Pick up where you left off</p>
                      
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                {moduleIcons[nextLesson.module]}
                              </div>
                              <span className="text-sm font-medium text-blue-600">
                                Module {nextLesson.module}: {lessonsData[nextLesson.module].title}
                              </span>
                            </div>
                            <h3 className="font-semibold text-xl mb-3 text-gray-800">
                              {nextLesson.lesson.title}
                            </h3>
                            <button
                              onClick={() => onStartLesson(nextLesson.lesson)}
                              className="btn-primary bg-blue-600 hover:bg-blue-700"
                            >
                              <Play className="w-4 h-4" />
                              Continue Learning
                            </button>
                          </div>
                          <div className="text-5xl hidden md:block">
                            {lessonsData[nextLesson.module].icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {recentCompletions.length > 0 && (
                      <div className="p-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Recently Completed</h3>
                        <div className="space-y-3">
                          {recentCompletions.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">{item.lesson.title}</div>
                                <div className="text-xs text-gray-500">Module {item.moduleId}: {item.module.title}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Learning Modules */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Learning Modules
                  </h2>
                  <div className="grid gap-8">
                    {Object.entries(lessonsData).map(([moduleKey, moduleData]) => {
                      const progress = getModuleProgress(moduleData);
                      const isStarted = progress > 0;
                      const isCompleted = progress === 100;
                      
                      // Determine module color scheme
                      const colorSchemes = {
                        '1': {
                          bg: 'bg-blue-50',
                          border: 'border-blue-200',
                          icon: 'text-blue-600',
                          progress: 'bg-blue-500'
                        },
                        '2': {
                          bg: 'bg-green-50',
                          border: 'border-green-200',
                          icon: 'text-green-600',
                          progress: 'bg-green-500'
                        },
                        '3': {
                          bg: 'bg-purple-50',
                          border: 'border-purple-200',
                          icon: 'text-purple-600',
                          progress: 'bg-purple-500'
                        },
                        '4': {
                          bg: 'bg-orange-50',
                          border: 'border-orange-200',
                          icon: 'text-orange-600',
                          progress: 'bg-orange-500'
                        }
                      };
                      
                      const colors = colorSchemes[moduleKey] || colorSchemes['1'];

                      return (
                        <div
                          key={moduleKey}
                          className={`rounded-xl border-2 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden ${
                            isCompleted
                              ? 'bg-green-50 border-green-200'
                              : isStarted
                              ? colors.bg + ' ' + colors.border
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colors.bg} ${colors.icon}`}>
                                {moduleData.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-bold text-gray-800">{moduleData.title}</h3>
                                  {isCompleted && (
                                    <div className="text-green-600">
                                      <Trophy className="w-6 h-6" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-4">{moduleData.description}</p>
                                
                                {/* Progress Bar */}
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>{moduleData.lessons.filter(l => completedLessons.has(l.id)).length} of {moduleData.lessons.length} lessons completed</span>
                                    <span>{progress}%</span>
                                  </div>
                                  <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                      className={`h-2 rounded-full ${
                                        isCompleted ? 'bg-green-500' : colors.progress
                                      }`}
                                      style={{ width: `${progress}%` }}
                                    />
                                  </div>
                                </div>
                                
                                {/* Lesson List */}
                                <div className="mb-4 space-y-1">
                                  {moduleData.lessons.slice(0, 3).map((lesson) => (
                                    <div 
                                      key={lesson.id} 
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      {completedLessons.has(lesson.id) ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <div className="w-4 h-4 rounded-full border border-gray-300" />
                                      )}
                                      <span className={completedLessons.has(lesson.id) ? 'text-gray-500' : 'text-gray-700'}>
                                        {lesson.title}
                                      </span>
                                    </div>
                                  ))}
                                  {moduleData.lessons.length > 3 && (
                                    <div className="text-sm text-gray-500 pl-6">
                                      +{moduleData.lessons.length - 3} more lessons
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <button
                              onClick={() => {
                                const firstIncompleteLesson = moduleData.lessons.find(lesson =>
                                  !completedLessons.has(lesson.id)
                                ) || moduleData.lessons[0];
                                onStartLesson(firstIncompleteLesson);
                              }}
                              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium ${
                                isCompleted
                                  ? 'bg-gray-200 text-gray-700'
                                  : isStarted
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-800 text-white hover:bg-gray-900'
                              }`}
                            >
                              {isCompleted ? (
                                <>
                                  <Trophy className="w-4 h-4" />
                                  Review Module
                                </>
                              ) : isStarted ? (
                                <>
                                  <Play className="w-4 h-4" />
                                  Continue Module
                                </>
                              ) : (
                                <>
                                  <BookOpen className="w-4 h-4" />
                                  Start Module
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'achievements' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  Your Achievements
                </h2>
                
                {achievements.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-5xl mb-4">🏆</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">No Achievements Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Complete lessons and modules to earn achievements and showcase your Git mastery!
                    </p>
                    <button
                      onClick={() => setActiveTab('modules')}
                      className="btn-primary bg-blue-600 hover:bg-blue-700"
                    >
                      Start Learning
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{achievement.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{achievement.title}</h3>
                            <p className="text-gray-600 mb-2">{achievement.description}</p>
                            <div className="text-xs text-gray-500">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <Settings className="w-6 h-6 text-gray-600" />
                  Your Profile
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                        <div className="text-gray-800 font-medium">{userProfile.name}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Experience Level</label>
                        <div className="text-gray-800 font-medium capitalize">{userProfile.experience}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Development Environment</label>
                        <div className="text-gray-800 font-medium capitalize">{userProfile.environment}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Learning Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.goals?.map((goal) => (
                        <span 
                          key={goal} 
                          className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {goal.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700">Learning Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500 mb-1">Completion Rate</div>
                          <div className="text-2xl font-bold text-gray-800">{progressPercentage}%</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500 mb-1">Lessons Completed</div>
                          <div className="text-2xl font-bold text-gray-800">{completedCount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Path */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Target className="w-5 h-5 text-blue-600" />
                Learning Path
              </h3>
              
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {Object.entries(lessonsData).map(([moduleKey, moduleData], index) => {
                  const progress = getModuleProgress(moduleData);
                  const isCompleted = progress === 100;
                  const isActive = progress > 0 && progress < 100;
                  const isLocked = progress === 0 && index > 0 && getModuleProgress(lessonsData[index]) < 100;
                  
                  return (
                    <div key={moduleKey} className="relative pl-9 pb-6">
                      {/* Status indicator */}
                      <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600' 
                          : isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="font-medium">{moduleKey}</span>
                        )}
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold ${
                          isLocked ? 'text-gray-400' : 'text-gray-800'
                        }`}>
                          {moduleData.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                            <div 
                              className={`h-1.5 rounded-full ${
                                isCompleted ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Achievements
                </h3>
                {achievements.length > 0 && (
                  <button 
                    onClick={() => setActiveTab('achievements')}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All
                  </button>
                )}
              </div>
              
              {achievements.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Complete lessons to earn achievements!
                </p>
              ) : (
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-semibold text-sm">{achievement.title}</div>
                        <div className="text-xs text-gray-600">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                  {achievements.length > 3 && (
                    <div className="text-center text-sm text-gray-500">
                      +{achievements.length - 3} more achievements
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Resources */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Resources
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setCurrentStep('gitCheatSheet')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Git Cheat Sheet</div>
                    <div className="text-xs text-gray-500">Quick reference guide</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setCurrentStep('githubCheatSheet')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">GitHub Cheat Sheet</div>
                    <div className="text-xs text-gray-500">Features and workflows</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setCurrentStep('gitDocs')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Git Documentation</div>
                    <div className="text-xs text-gray-500">Official guides</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setCurrentStep('githubDocs')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">GitHub Documentation</div>
                    <div className="text-xs text-gray-500">Official guides</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setCurrentStep('commandReference')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Command Reference</div>
                    <div className="text-xs text-gray-500">All Git commands</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setCurrentStep('userWiki')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Community Wiki</div>
                    <div className="text-xs text-gray-500">Tips and resources from users</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;