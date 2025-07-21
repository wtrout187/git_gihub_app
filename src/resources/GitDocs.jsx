import React from 'react';
import { ArrowLeft, ExternalLink, Search, Book, GitBranch, GitCommit, GitMerge, Terminal } from 'lucide-react';

const GitDocs = ({ onBack }) => {
  const sections = [
    {
      title: "Getting Started with Git",
      icon: <Book className="w-6 h-6 text-green-600" />,
      resources: [
        {
          title: "Git Documentation",
          description: "Official Git documentation and reference",
          link: "https://git-scm.com/doc",
          tags: ["official", "reference"]
        },
        {
          title: "Git Book",
          description: "Comprehensive guide to Git concepts and commands",
          link: "https://git-scm.com/book/en/v2",
          tags: ["book", "comprehensive"]
        },
        {
          title: "Git Installation",
          description: "How to install Git on various platforms",
          link: "https://git-scm.com/downloads",
          tags: ["setup", "installation"]
        },
        {
          title: "First-Time Git Setup",
          description: "Configure Git for first-time use",
          link: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup",
          tags: ["setup", "configuration"]
        }
      ]
    },
    {
      title: "Core Git Concepts",
      icon: <GitCommit className="w-6 h-6 text-blue-600" />,
      resources: [
        {
          title: "Git Basics",
          description: "Learn the fundamental Git operations",
          link: "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository",
          tags: ["basics", "fundamentals"]
        },
        {
          title: "Recording Changes",
          description: "How to track and commit changes to your repository",
          link: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository",
          tags: ["commits", "tracking"]
        },
        {
          title: "Viewing History",
          description: "How to view the commit history of your project",
          link: "https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History",
          tags: ["history", "log"]
        },
        {
          title: "Undoing Things",
          description: "How to undo changes and recover from mistakes",
          link: "https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things",
          tags: ["recovery", "undo"]
        }
      ]
    },
    {
      title: "Branching and Merging",
      icon: <GitBranch className="w-6 h-6 text-purple-600" />,
      resources: [
        {
          title: "Branches in a Nutshell",
          description: "Understanding Git's branching model",
          link: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell",
          tags: ["branching", "concepts"]
        },
        {
          title: "Basic Branching and Merging",
          description: "How to create, switch, and merge branches",
          link: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
          tags: ["branching", "merging"]
        },
        {
          title: "Branch Management",
          description: "How to manage and organize branches",
          link: "https://git-scm.com/book/en/v2/Git-Branching-Branch-Management",
          tags: ["organization", "workflow"]
        },
        {
          title: "Branching Workflows",
          description: "Common branching strategies and workflows",
          link: "https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows",
          tags: ["strategies", "teamwork"]
        }
      ]
    },
    {
      title: "Remote Repositories",
      icon: <GitMerge className="w-6 h-6 text-indigo-600" />,
      resources: [
        {
          title: "Working with Remotes",
          description: "How to collaborate with other repositories",
          link: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes",
          tags: ["collaboration", "remote"]
        },
        {
          title: "Distributed Workflows",
          description: "Common patterns for collaborating via Git",
          link: "https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows",
          tags: ["teamwork", "patterns"]
        },
        {
          title: "Contributing to Projects",
          description: "How to contribute to Git projects",
          link: "https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project",
          tags: ["contribution", "open source"]
        },
        {
          title: "Maintaining Projects",
          description: "How to maintain Git projects",
          link: "https://git-scm.com/book/en/v2/Distributed-Git-Maintaining-a-Project",
          tags: ["maintenance", "management"]
        }
      ]
    },
    {
      title: "Advanced Git",
      icon: <Terminal className="w-6 h-6 text-red-600" />,
      resources: [
        {
          title: "Git Tools",
          description: "Advanced tools and techniques in Git",
          link: "https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection",
          tags: ["advanced", "tools"]
        },
        {
          title: "Interactive Staging",
          description: "How to stage parts of files and hunks",
          link: "https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging",
          tags: ["staging", "advanced"]
        },
        {
          title: "Stashing and Cleaning",
          description: "How to save work in progress and clean your workspace",
          link: "https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning",
          tags: ["stash", "workflow"]
        },
        {
          title: "Rewriting History",
          description: "How to modify commits and rewrite history",
          link: "https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History",
          tags: ["history", "advanced"]
        },
        {
          title: "Reset Demystified",
          description: "Understanding the git reset command",
          link: "https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified",
          tags: ["reset", "concepts"]
        },
        {
          title: "Advanced Merging",
          description: "Complex merge scenarios and strategies",
          link: "https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging",
          tags: ["merging", "conflicts"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-teal-800 text-white">
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
                <h1 className="text-2xl font-bold">Git Documentation</h1>
                <p className="text-green-100">Official guides and resources</p>
              </div>
            </div>
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search Git Docs..." 
                className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 w-64 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="w-4 h-4 text-white/60 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-600 mb-8">
              This page provides links to official Git documentation and resources to help you master Git's features and workflows.
              Click on any resource to open it in a new tab.
            </p>

            {sections.map((section, index) => (
              <div key={index} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 flex-1">
                    {section.title}
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {section.resources.map((resource, resIndex) => (
                    <a 
                      key={resIndex} 
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors border border-gray-200 hover:border-green-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-800 group-hover:text-green-800 transition-colors">
                          {resource.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 mb-3">{resource.description}</p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {resource.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full group-hover:bg-green-200 group-hover:text-green-800 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100">
              <h3 className="font-bold text-green-800 mb-3 text-lg">Git Learning Resources</h3>
              <p className="text-gray-700 mb-4">
                Beyond the official documentation, here are additional resources to help you master Git:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <a 
                  href="https://learngitbranching.js.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-100"
                >
                  <h4 className="font-semibold text-green-700 mb-2">Learn Git Branching</h4>
                  <p className="text-sm text-gray-600">Interactive visual tutorial for learning Git branching</p>
                </a>
                <a 
                  href="https://git-scm.com/videos" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-100"
                >
                  <h4 className="font-semibold text-green-700 mb-2">Git Videos</h4>
                  <p className="text-sm text-gray-600">Official Git video tutorials and presentations</p>
                </a>
                <a 
                  href="https://git-scm.com/docs/gittutorial" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-100"
                >
                  <h4 className="font-semibold text-green-700 mb-2">Git Tutorial</h4>
                  <p className="text-sm text-gray-600">Step-by-step tutorial for Git beginners</p>
                </a>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100">
              <h3 className="font-bold text-green-800 mb-3 text-lg">Feedback</h3>
              <p className="text-gray-700 mb-4">
                Have suggestions for improving this documentation guide or found an error? Please send your feedback to:
              </p>
              <a 
                href="mailto:troutwayne@gmail.com" 
                className="text-green-700 font-medium hover:text-green-900 transition-colors"
              >
                troutwayne@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitDocs;