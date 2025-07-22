import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Plus, MessageSquare, ThumbsUp, Share2, Edit, Save, X, Search, Filter, ExternalLink, Star, Award, Bookmark, Zap, Code, GitBranch, Github, Terminal } from 'lucide-react';

/**
 * User Wiki Component
 *
 * A collaborative space where users can share tips, tricks, and resources
 * related to Git and GitHub.
 */
const UserWiki = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'tips',
    author: '',
    email: ''
  });
  
  // State for comments and likes
  const [commentText, setCommentText] = useState('');
  const [activeComments, setActiveComments] = useState(null);
  const [userLikes, setUserLikes] = useState({});
  
  // Load likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('userWikiLikes');
    if (savedLikes) {
      setUserLikes(JSON.parse(savedLikes));
    }
  }, []);
  
  // Save likes to localStorage when changed
  useEffect(() => {
    localStorage.setItem('userWikiLikes', JSON.stringify(userLikes));
  }, [userLikes]);

  // Animation effect for entries
  useEffect(() => {
    const animateEntries = () => {
      const entries = document.querySelectorAll('.wiki-entry');
      entries.forEach((entry, index) => {
        setTimeout(() => {
          entry.classList.add('animate-fade-in');
          entry.style.opacity = '1';
        }, index * 100);
      });
    };
    
    animateEntries();
  }, [activeCategory, searchQuery]);

  // Sample wiki entries
  const [wikiEntries, setWikiEntries] = useState([
    {
      id: 1,
      title: 'Git Aliases for Productivity',
      content: 'Set up these Git aliases to save time:\n\n```bash\ngit config --global alias.co checkout\ngit config --global alias.br branch\ngit config --global alias.ci commit\ngit config --global alias.st status\ngit config --global alias.lg "log --graph --pretty=format:\'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset\' --abbrev-commit"\n```\n\nNow you can use `git co` instead of `git checkout`, etc. The `git lg` alias gives you a beautiful, colorized log output.',
      category: 'tips',
      author: 'Wayne Trout',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: [],
      featured: true,
      icon: <Terminal />
    },
    {
      id: 2,
      title: 'Visual Git Tools Worth Trying',
      content: 'These visual Git tools can help you understand complex repositories:\n\n1. **GitKraken** - Beautiful and intuitive Git GUI\n2. **Sourcetree** - Free Git client for Windows and Mac\n3. **GitHub Desktop** - Simple collaboration from your desktop\n4. **Git Fork** - Fast and friendly Git client\n5. **GitLens** - VS Code extension with powerful Git capabilities\n\nEach tool has its strengths, so try a few to find what works best for your workflow.',
      category: 'resources',
      author: 'Wayne Trout',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: [],
      icon: <Code />
    },
    {
      id: 3,
      title: 'Advanced Git Hooks for Team Workflows',
      content: 'Git hooks can automate and enforce team standards. Create a pre-commit hook to run linters and tests before allowing commits:\n\n```bash\n#!/bin/sh\nnpm run lint && npm test\n```\n\nSave this as `.git/hooks/pre-commit` and make it executable with `chmod +x .git/hooks/pre-commit`\n\nFor team-wide hooks, check out Husky (npm package) which makes Git hooks easy to share across your team.',
      category: 'advanced',
      author: 'Wayne Trout',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: [],
      icon: <GitBranch />
    },
    {
      id: 4,
      title: 'GitHub Actions for Automated Testing',
      content: 'Set up GitHub Actions to automatically test your code on every push or pull request. Here\'s a simple workflow file to get started:\n\n```yaml\nname: Node.js CI\n\non: [push, pull_request]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Use Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: 16\n      - run: npm ci\n      - run: npm test\n```\n\nSave this as `.github/workflows/node.js.yml` in your repository.',
      category: 'resources',
      author: 'Wayne Trout',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: [],
      featured: true,
      icon: <Github />
    },
    {
      id: 5,
      title: 'AI-Assisted Commit Messages',
      content: 'Use AI tools to generate better commit messages. Install the aicommits package:\n\n```bash\nnpm install -g aicommits\n```\n\nThen use it to generate commit messages based on your changes:\n\n```bash\ngit add .\naic\n```\n\nThe AI will analyze your changes and suggest a descriptive commit message. You can also try GitHub Copilot in your IDE for code suggestions.',
      category: 'tips',
      author: 'Wayne Trout',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: [],
      icon: <Zap />
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Posts', icon: <Star className="w-4 h-4" /> },
    { id: 'tips', name: 'Tips & Tricks', icon: <Zap className="w-4 h-4" /> },
    { id: 'resources', name: 'Resources', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'advanced', name: 'Advanced Topics', icon: <Code className="w-4 h-4" /> },
    { id: 'questions', name: 'Questions', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEntry = {
      id: wikiEntries.length + 1,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      author: newPost.author || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: []
    };
    
    setWikiEntries([newEntry, ...wikiEntries]);
    setShowAddForm(false);
    setNewPost({
      title: '',
      content: '',
      category: 'tips',
      author: '',
      email: ''
    });
  };
  
  // Handle like button click
  const handleLike = (entryId) => {
    // Toggle like status
    const newUserLikes = { ...userLikes };
    newUserLikes[entryId] = !newUserLikes[entryId];
    setUserLikes(newUserLikes);
    
    // Update entry likes count
    setWikiEntries(wikiEntries.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          likes: entry.likes + (newUserLikes[entryId] ? 1 : -1)
        };
      }
      return entry;
    }));
  };
  
  // Handle comment submission
  const handleCommentSubmit = (entryId) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: 'You',
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };
    
    setWikiEntries(wikiEntries.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          comments: [...entry.comments, newComment]
        };
      }
      return entry;
    }));
    
    setCommentText('');
  };

  const filteredEntries = wikiEntries.filter(entry => {
    const matchesCategory = activeCategory === 'all' || entry.category === activeCategory;
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format content with markdown-like syntax
  const formatContent = (content) => {
    // Split content by code blocks first
    const parts = content.split(/```(.*?)\n([\s\S]*?)```/g);
    const result = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // This is regular text
        if (parts[i]) {
          // Process regular text
          const paragraphs = parts[i].split('\n\n');
          paragraphs.forEach((paragraph, index) => {
            // Process bold text safely
            const boldProcessed = paragraph.split(/\*\*(.*?)\*\*/g).map((part, idx) => {
              return idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part;
            });
            
            // Process lists safely
            if (paragraph.match(/^\d\.\s+/)) {
              result.push(
                <ul key={`${i}-${index}`} className="list-disc pl-5 my-3">
                  <li>{boldProcessed}</li>
                </ul>
              );
            } else {
              result.push(<p key={`${i}-${index}`} className="mb-4">{boldProcessed}</p>);
            }
          });
        }
      } else if (i % 3 === 2) {
        // This is code block content
        result.push(
          <div key={`code-${i}`} className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
            {parts[i]}
          </div>
        );
      }
      // Skip the language identifier parts (i % 3 === 1)
    }
    
    return result;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Community Wiki
                </h1>
                <p className="text-blue-100 text-sm mt-1 hidden md:block">Share and discover Git tips, tricks, and resources</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-yellow-300" />
                <span>AI Masters Community</span>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-sm border border-indigo-100 p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-medium shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className={`${activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {category.icon}
                    </span>
                    {category.name}
                    {category.id === 'all' && (
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {wikiEntries.length}
                      </span>
                    )}
                    {category.id === 'tips' && (
                      <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        {wikiEntries.filter(entry => entry.category === 'tips').length}
                      </span>
                    )}
                    {category.id === 'resources' && (
                      <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        {wikiEntries.filter(entry => entry.category === 'resources').length}
                      </span>
                    )}
                    {category.id === 'advanced' && (
                      <span className="ml-auto bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                        {wikiEntries.filter(entry => entry.category === 'advanced').length}
                      </span>
                    )}
                    {category.id === 'questions' && (
                      <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                        {wikiEntries.filter(entry => entry.category === 'questions').length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-gray-800">About</h2>
                <p className="text-gray-600 mb-4">
                  This wiki is a community-driven resource where Git & GitHub Mastery App users can share tips, tricks, and helpful resources.
                </p>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <p className="text-indigo-800 font-medium">Community Spotlight</p>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      A
                    </div>
                    <div>
                      <p className="text-indigo-900 font-semibold">AI Masters Community</p>
                      <p className="text-indigo-700 text-xs">by Edward Honour</p>
                    </div>
                  </div>
                  <p className="text-indigo-700 text-sm mb-3">
                    Join our community of developers learning and growing together with AI-powered tools.
                  </p>
                  <a 
                    href="https://www.skool.com/edward-honour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-sm flex items-center gap-1 mt-2 hover:text-indigo-800 bg-white/50 px-3 py-1.5 rounded-lg w-full justify-center"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Visit Community
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Search Bar */}
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-sm border border-blue-100 p-4 mb-6 flex gap-4">
              <div className="relative flex-grow">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search wiki entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Add Entry Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Add New Wiki Entry</h2>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="tips">Tips & Tricks</option>
                      <option value="resources">Resources</option>
                      <option value="advanced">Advanced Topics</option>
                      <option value="questions">Questions</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40"
                      placeholder="Share your knowledge, tips, or resources... (Supports markdown for code blocks with ```)"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Name (Optional)</label>
                      <input
                        type="text"
                        value={newPost.author}
                        onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email (Private)</label>
                      <input
                        type="email"
                        value={newPost.email}
                        onChange={(e) => setNewPost({...newPost, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Submit Entry
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Featured Entries */}
            {activeCategory === 'all' && filteredEntries.some(entry => entry.featured) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Featured Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredEntries
                    .filter(entry => entry.featured)
                    .map(entry => (
                      <div key={entry.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6 transition-all hover:shadow-md">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                              {entry.icon || <Star className="w-5 h-5" />}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">{entry.title}</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            entry.category === 'tips' ? 'bg-green-100 text-green-800' :
                            entry.category === 'resources' ? 'bg-blue-100 text-blue-800' :
                            entry.category === 'advanced' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {entry.category === 'tips' ? 'Tips & Tricks' :
                             entry.category === 'resources' ? 'Resources' :
                             entry.category === 'advanced' ? 'Advanced' : 'Question'}
                          </span>
                        </div>
                        
                        <div className="mt-4 line-clamp-2 text-gray-600 text-sm">
                          {entry.content.split('\n')[0]}
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-blue-100">
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <span>{entry.author}</span>
                            <span>•</span>
                            <span>{entry.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-gray-500 text-xs">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{entry.likes}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
            
            {/* Wiki Entries */}
            <div className="space-y-6">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(entry => (
                  <div 
                    key={entry.id} 
                    className="wiki-entry bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm border border-blue-100 p-6 transition-all hover:shadow-md opacity-0"
                    style={{transition: 'all 0.3s ease'}}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${entry.category === 'tips' ? 'bg-gradient-to-br from-green-500 to-emerald-600' : entry.category === 'resources' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : entry.category === 'advanced' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
                          {entry.icon || (
                            entry.category === 'tips' ? <Zap className="w-5 h-5" /> :
                            entry.category === 'resources' ? <Bookmark className="w-5 h-5" /> :
                            entry.category === 'advanced' ? <Code className="w-5 h-5" /> :
                            <MessageSquare className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{entry.title}</h3>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>{entry.author}</span>
                            <span>•</span>
                            <span>{entry.date}</span>
                            {entry.featured && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-yellow-600">
                                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                  Featured
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.category === 'tips' ? 'bg-green-100 text-green-800' :
                        entry.category === 'resources' ? 'bg-blue-100 text-blue-800' :
                        entry.category === 'advanced' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {entry.category === 'tips' ? 'Tips & Tricks' :
                         entry.category === 'resources' ? 'Resources' :
                         entry.category === 'advanced' ? 'Advanced' : 'Question'}
                      </span>
                    </div>
                    
                    <div className="prose max-w-none text-gray-700 mt-4">
                      {formatContent(entry.content)}
                    </div>
                    
                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleLike(entry.id)} 
                        className={`flex items-center gap-1 ${userLikes[entry.id] ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        <ThumbsUp className="w-4 h-4" fill={userLikes[entry.id] ? 'currentColor' : 'none'} />
                        <span>{entry.likes}</span>
                      </button>
                      <button 
                        onClick={() => setActiveComments(activeComments === entry.id ? null : entry.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{entry.comments.length}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      
                      {/* Comments section */}
                      {activeComments === entry.id && (
                        <div className="w-full mt-4 pt-4 border-t border-gray-100">
                          <h4 className="font-medium text-gray-700 mb-3">Comments</h4>
                          
                          {entry.comments.length > 0 ? (
                            <div className="space-y-3 mb-4">
                              {entry.comments.map(comment => (
                                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-gray-800">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.date}</span>
                                  </div>
                                  <p className="text-gray-700">{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 italic mb-4">No comments yet. Be the first to comment!</p>
                          )}
                          
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => handleCommentSubmit(entry.id)}
                              disabled={!commentText.trim()}
                              className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 mb-4">No entries found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 text-white mt-16 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-400" />
                Git & GitHub Mastery App
              </h3>
              <p className="text-gray-300">
                An interactive Git learning platform that teaches Git fundamentals, branching strategies, 
                GitHub collaboration, and AI-assisted development.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Community
              </h3>
              <p className="text-gray-300 mb-4">
                Join our community of developers and share your knowledge and experiences.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <p className="text-blue-300 font-medium">
                    AI Masters Community
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  Created by Edward Honour
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
                Contact
              </h3>
              <p className="text-gray-300 mb-4">
                Have questions or suggestions? Reach out to us.
              </p>
              <a 
                href="mailto:troutwayne@gmail.com" 
                className="bg-white/10 hover:bg-white/20 text-blue-300 hover:text-blue-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-fit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                troutwayne@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Git & GitHub Mastery App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserWiki;