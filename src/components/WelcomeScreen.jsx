import React from 'react';
import { GitBranch, Star, Rocket, ChevronRight, Code, Users, Award, Terminal, Github, Zap } from 'lucide-react';

/**
 * Welcome Screen Component
 *
 * The landing page that introduces users to the Git Mastery App
 * and encourages them to start their learning journey.
 */
const WelcomeScreen = ({ onGetStarted }) => {
  const features = [
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Master Git Fundamentals",
      description: "Learn version control from basics to advanced techniques"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Interactive Learning",
      description: "Hands-on exercises with real Git commands and feedback"
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: "GitHub Collaboration",
      description: "Master pull requests, issues, and team workflows"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Branching Strategies",
      description: "Learn Git Flow, GitHub Flow, and trunk-based development"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Assisted Development",
      description: "Modern workflows with AI tools and best practices"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-world Scenarios",
      description: "Practice with common team collaboration challenges"
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-500/10 animate-pulse"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 shadow-lg shadow-blue-500/20 p-5">
              <GitBranch className="w-14 h-14" />
            </div>
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Git Mastery
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Elevate your development workflow with interactive Git lessons,
              hands-on practice, and modern AI-assisted techniques
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="btn-primary bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Start Your Git Journey
                <ChevronRight className="w-5 h-5" />
              </button>
              <a 
                href="#features" 
                className="btn-secondary bg-white/20 hover:bg-white/30 border border-white/20 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-200 text-white"
              >
                Explore Features
              </a>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 bg-blue-900/30 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Trusted by 10,000+ developers worldwide</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-400 mb-2">40+</div>
              <div className="text-gray-400">Interactive Lessons</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-400 mb-2">4</div>
              <div className="text-gray-400">Learning Modules</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-400">Hands-on Practice</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-400">Learning Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Learning Experience</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From Git fundamentals to advanced AI-assisted workflows, master every aspect of modern version control
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-left hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/50 rounded-xl mb-6 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Learning Path Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl p-10 border border-white/10 mb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Your Path to Git Mastery</h3>
              <p className="text-gray-300 mb-6">Our structured learning path takes you from Git novice to collaboration expert through four comprehensive modules.</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-semibold">Git Fundamentals</h4>
                    <p className="text-gray-400">Master the core concepts and commands</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-semibold">Branching Mastery</h4>
                    <p className="text-gray-400">Learn advanced branching strategies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-semibold">GitHub Collaboration</h4>
                    <p className="text-gray-400">Master team workflows and tools</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="text-xl font-semibold">AI-Assisted Development</h4>
                    <p className="text-gray-400">Leverage AI to enhance your Git workflow</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl transform rotate-3"></div>
              <div className="relative bg-gray-800 rounded-xl p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400">terminal</div>
                </div>
                <div className="font-mono text-sm">
                  <p className="text-gray-400">$ <span className="text-white">git branch</span></p>
                  <p className="text-green-400">* main</p>
                  <p className="text-white">  feature/login</p>
                  <p className="text-white">  feature/dashboard</p>
                  <p className="text-gray-400 mt-2">$ <span className="text-white">git checkout -b feature/notifications</span></p>
                  <p className="text-green-400">Switched to a new branch 'feature/notifications'</p>
                  <p className="text-gray-400 mt-2">$ <span className="text-white">git status</span></p>
                  <p className="text-green-400">On branch feature/notifications</p>
                  <p className="text-white">Nothing to commit, working tree clean</p>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-12 border border-white/10">
          <h2 className="text-4xl font-bold mb-6">Ready to Master Git?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join our community of developers and level up your version control skills today
          </p>
          <button
            onClick={onGetStarted}
            className="btn-primary bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            Start Your Git Journey
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-gray-400 mt-6">
            Free forever • No credit card required • Learn at your own pace
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Git Mastery App. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;