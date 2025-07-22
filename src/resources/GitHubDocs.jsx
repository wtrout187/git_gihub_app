import React from 'react';
import { ArrowLeft, ExternalLink, Search, Star, GitPullRequest, GitMerge, GitBranch, Github } from 'lucide-react';

const GitHubDocs = ({ onBack }) => {
  const sections = [
    {
      title: "Getting Started with GitHub",
      icon: <Github className="w-6 h-6 text-purple-600" />,
      resources: [
        {
          title: "GitHub Quickstart Guide",
          description: "Learn the basics of GitHub in just a few minutes",
          link: "https://docs.github.com/en/get-started/quickstart",
          tags: ["beginner", "setup"]
        },
        {
          title: "GitHub Flow",
          description: "Lightweight, branch-based workflow for regular deployments",
          link: "https://docs.github.com/en/get-started/quickstart/github-flow",
          tags: ["workflow", "branching"]
        },
        {
          title: "GitHub Desktop",
          description: "Simple collaboration from your desktop",
          link: "https://docs.github.com/en/desktop",
          tags: ["tools", "GUI"]
        },
        {
          title: "GitHub CLI",
          description: "Command line tool for GitHub",
          link: "https://docs.github.com/en/github-cli",
          tags: ["tools", "CLI"]
        }
      ]
    },
    {
      title: "Repositories",
      icon: <GitBranch className="w-6 h-6 text-blue-600" />,
      resources: [
        {
          title: "Creating and Managing Repositories",
          description: "Learn how to create, clone, and manage repositories",
          link: "https://docs.github.com/en/repositories",
          tags: ["repositories", "management"]
        },
        {
          title: "Repository Visibility",
          description: "Public, private, and internal repositories",
          link: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility",
          tags: ["settings", "privacy"]
        },
        {
          title: "Repository Best Practices",
          description: "Guidelines for organizing and managing repositories",
          link: "https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories",
          tags: ["best practices", "organization"]
        },
        {
          title: "GitHub Templates",
          description: "Create template repositories for your organization",
          link: "https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository",
          tags: ["templates", "organization"]
        }
      ]
    },
    {
      title: "Pull Requests",
      icon: <GitPullRequest className="w-6 h-6 text-green-600" />,
      resources: [
        {
          title: "About Pull Requests",
          description: "Collaborate on changes with pull requests",
          link: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
          tags: ["collaboration", "review"]
        },
        {
          title: "Creating Pull Requests",
          description: "How to propose changes to a repository",
          link: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request",
          tags: ["workflow", "changes"]
        },
        {
          title: "Reviewing Pull Requests",
          description: "How to review and comment on pull requests",
          link: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests",
          tags: ["review", "feedback"]
        },
        {
          title: "Addressing Review Feedback",
          description: "How to incorporate feedback from reviews",
          link: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request",
          tags: ["collaboration", "changes"]
        }
      ]
    },
    {
      title: "GitHub Actions",
      icon: <GitMerge className="w-6 h-6 text-orange-600" />,
      resources: [
        {
          title: "Understanding GitHub Actions",
          description: "Learn the basics of GitHub Actions",
          link: "https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions",
          tags: ["CI/CD", "automation"]
        },
        {
          title: "Creating Workflows",
          description: "How to create and use workflow files",
          link: "https://docs.github.com/en/actions/using-workflows",
          tags: ["workflows", "automation"]
        },
        {
          title: "Using GitHub-hosted Runners",
          description: "Run your workflows on GitHub-hosted virtual machines",
          link: "https://docs.github.com/en/actions/using-github-hosted-runners",
          tags: ["runners", "infrastructure"]
        },
        {
          title: "GitHub Actions Marketplace",
          description: "Find and share actions for your workflows",
          link: "https://github.com/marketplace?type=actions",
          tags: ["marketplace", "community"]
        }
      ]
    },
    {
      title: "GitHub Features",
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      resources: [
        {
          title: "GitHub Issues",
          description: "Track ideas, feedback, tasks, and bugs",
          link: "https://docs.github.com/en/issues",
          tags: ["project management", "tracking"]
        },
        {
          title: "GitHub Discussions",
          description: "Collaborative communication for your community",
          link: "https://docs.github.com/en/discussions",
          tags: ["community", "communication"]
        },
        {
          title: "GitHub Pages",
          description: "Host websites directly from your repository",
          link: "https://docs.github.com/en/pages",
          tags: ["hosting", "websites"]
        },
        {
          title: "GitHub Codespaces",
          description: "Cloud development environments integrated with GitHub",
          link: "https://docs.github.com/en/codespaces",
          tags: ["development", "cloud"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
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
                <h1 className="text-2xl font-bold">GitHub Documentation</h1>
                <p className="text-purple-100">Official guides and resources</p>
              </div>
            </div>
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search GitHub Docs..." 
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
              This page provides links to official GitHub documentation and resources to help you master GitHub's features and workflows.
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
                      className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200 hover:border-purple-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-800 group-hover:text-purple-800 transition-colors">
                          {resource.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 mb-3">{resource.description}</p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {resource.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full group-hover:bg-purple-200 group-hover:text-purple-800 transition-colors"
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

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-3 text-lg">GitHub Learning Resources</h3>
              <p className="text-gray-700 mb-4">
                Beyond the official documentation, GitHub offers several learning resources to help you master the platform:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <a 
                  href="https://skills.github.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-purple-100"
                >
                  <h4 className="font-semibold text-purple-700 mb-2">GitHub Skills</h4>
                  <p className="text-sm text-gray-600">Interactive courses to learn GitHub with hands-on exercises</p>
                </a>
                <a 
                  href="https://skills.github.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-purple-100"
                >
                  <h4 className="font-semibold text-purple-700 mb-2">GitHub Learning Projects</h4>
                  <p className="text-sm text-gray-600">Guided projects to build practical GitHub skills</p>
                </a>
                <a 
                  href="https://github.com/topics" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-purple-100"
                >
                  <h4 className="font-semibold text-purple-700 mb-2">GitHub Topics</h4>
                  <p className="text-sm text-gray-600">Explore repositories by topic to learn from real examples</p>
                </a>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-3 text-lg">Feedback</h3>
              <p className="text-gray-700 mb-4">
                Have suggestions for improving this documentation guide or found an error? Please send your feedback to:
              </p>
              <a 
                href="mailto:troutwayne@gmail.com" 
                className="text-purple-700 font-medium hover:text-purple-900 transition-colors"
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

export default GitHubDocs;