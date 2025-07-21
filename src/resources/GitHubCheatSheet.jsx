import React from 'react';
import { ArrowLeft, Copy, Download, ExternalLink } from 'lucide-react';

const GitHubCheatSheet = ({ onBack }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const sections = [
    {
      title: "Repository Management",
      items: [
        {
          action: "Create a new repository",
          description: "Click the '+' icon in the top right corner and select 'New repository'",
          shortcut: "https://github.com/new"
        },
        {
          action: "Fork a repository",
          description: "Click the 'Fork' button in the top right of any repository page",
          shortcut: null
        },
        {
          action: "Clone a repository",
          description: "Click the 'Code' button and copy the URL",
          command: "git clone https://github.com/username/repository.git"
        },
        {
          action: "Add a README",
          description: "Create a file named README.md in the root directory",
          shortcut: null
        },
        {
          action: "Add a license",
          description: "Click 'Add file' > 'Create new file' and name it LICENSE",
          shortcut: null
        },
        {
          action: "Add a .gitignore",
          description: "Click 'Add file' > 'Create new file' and name it .gitignore",
          shortcut: null
        }
      ]
    },
    {
      title: "Pull Requests",
      items: [
        {
          action: "Create a pull request",
          description: "Navigate to the 'Pull requests' tab and click 'New pull request'",
          shortcut: null
        },
        {
          action: "Compare across forks",
          description: "Click 'compare across forks' link on the pull request page",
          shortcut: null
        },
        {
          action: "Request a review",
          description: "In the right sidebar of the pull request, click on the gear icon next to 'Reviewers'",
          shortcut: null
        },
        {
          action: "Draft pull request",
          description: "Click the dropdown arrow next to 'Create pull request' and select 'Create draft pull request'",
          shortcut: null
        },
        {
          action: "Link an issue to a PR",
          description: "In the PR description, type '#' followed by the issue number",
          shortcut: null
        },
        {
          action: "Merge a pull request",
          description: "Click the 'Merge pull request' button at the bottom of the PR",
          shortcut: null
        }
      ]
    },
    {
      title: "Issues",
      items: [
        {
          action: "Create an issue",
          description: "Navigate to the 'Issues' tab and click 'New issue'",
          shortcut: "Press 'i' on any repository page"
        },
        {
          action: "Close an issue",
          description: "Click 'Close issue' at the bottom of the issue",
          shortcut: null
        },
        {
          action: "Reopen an issue",
          description: "Click 'Reopen issue' at the bottom of the closed issue",
          shortcut: null
        },
        {
          action: "Add labels",
          description: "Click on 'Labels' in the right sidebar",
          shortcut: null
        },
        {
          action: "Assign an issue",
          description: "Click on 'Assignees' in the right sidebar",
          shortcut: null
        },
        {
          action: "Link a PR to an issue",
          description: "In a PR description or comment, type 'Closes #123' to link and auto-close issue #123",
          shortcut: null
        }
      ]
    },
    {
      title: "GitHub Actions",
      items: [
        {
          action: "Create a workflow",
          description: "Click on the 'Actions' tab and select a workflow template or 'set up a workflow yourself'",
          shortcut: null
        },
        {
          action: "View workflow runs",
          description: "Navigate to the 'Actions' tab to see all workflow runs",
          shortcut: null
        },
        {
          action: "Re-run a workflow",
          description: "Click on a failed workflow run and select 'Re-run jobs'",
          shortcut: null
        },
        {
          action: "Create a secret",
          description: "Go to repository settings > Secrets > Actions > New repository secret",
          shortcut: null
        },
        {
          action: "Use a marketplace action",
          description: "Add the action to your workflow YAML file with 'uses: owner/repo@version'",
          shortcut: null
        }
      ]
    },
    {
      title: "GitHub Pages",
      items: [
        {
          action: "Enable GitHub Pages",
          description: "Go to repository settings > Pages and select a source branch",
          shortcut: null
        },
        {
          action: "Use a theme",
          description: "Click 'Choose a theme' button on the Pages settings page",
          shortcut: null
        },
        {
          action: "Custom domain",
          description: "Enter your domain in the 'Custom domain' field on the Pages settings page",
          shortcut: null
        },
        {
          action: "Enforce HTTPS",
          description: "Check 'Enforce HTTPS' on the Pages settings page",
          shortcut: null
        }
      ]
    },
    {
      title: "GitHub Projects",
      items: [
        {
          action: "Create a project",
          description: "Click on the 'Projects' tab and select 'New project'",
          shortcut: null
        },
        {
          action: "Add issues to a project",
          description: "In an issue, click on 'Projects' in the right sidebar",
          shortcut: null
        },
        {
          action: "Create a project board",
          description: "In a project, click 'Add view' and select 'Board'",
          shortcut: null
        },
        {
          action: "Automate project cards",
          description: "Click on the three dots in a column header and select 'Manage automation'",
          shortcut: null
        }
      ]
    },
    {
      title: "Keyboard Shortcuts",
      items: [
        {
          action: "Show all shortcuts",
          description: "Display all available keyboard shortcuts",
          shortcut: "Press '?'"
        },
        {
          action: "Go to code",
          description: "Navigate to the code tab",
          shortcut: "Press 'g' then 'c'"
        },
        {
          action: "Go to issues",
          description: "Navigate to the issues tab",
          shortcut: "Press 'g' then 'i'"
        },
        {
          action: "Go to pull requests",
          description: "Navigate to the pull requests tab",
          shortcut: "Press 'g' then 'p'"
        },
        {
          action: "Search",
          description: "Focus the search bar",
          shortcut: "Press '/'"
        },
        {
          action: "New issue",
          description: "Create a new issue",
          shortcut: "Press 'i'"
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
                <h1 className="text-2xl font-bold">GitHub Cheat Sheet</h1>
                <p className="text-blue-100">Quick reference for GitHub features and workflows</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                This cheat sheet provides a quick reference for common GitHub tasks and features.
                Click on any command to copy it to your clipboard.
              </p>
              <a 
                href="https://docs.github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Official GitHub Docs
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Action</th>
                        <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">How To</th>
                        {section.items.some(item => item.command || item.shortcut) && (
                          <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Command/Shortcut</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, itemIndex) => (
                        <tr 
                          key={itemIndex} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-gray-800">{item.action}</td>
                          <td className="py-3 px-4 text-gray-600">{item.description}</td>
                          {(section.items.some(item => item.command || item.shortcut)) && (
                            <td className="py-3 px-4">
                              {item.command ? (
                                <div 
                                  className="font-mono text-sm bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors inline-block"
                                  onClick={() => copyToClipboard(item.command)}
                                >
                                  {item.command}
                                </div>
                              ) : item.shortcut ? (
                                <div className="font-mono text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded inline-block">
                                  {item.shortcut}
                                </div>
                              ) : null}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-2">Pro Tips:</h3>
              <ul className="list-disc pl-5 text-purple-700 space-y-1">
                <li>Press <code className="bg-purple-100 px-1 rounded">?</code> on any GitHub page to see all available keyboard shortcuts</li>
                <li>Use GitHub's built-in editor by pressing <code className="bg-purple-100 px-1 rounded">.</code> in any repository</li>
                <li>Add <code className="bg-purple-100 px-1 rounded">.diff</code> or <code className="bg-purple-100 px-1 rounded">.patch</code> to the end of a PR URL to get the diff in plain text</li>
                <li>Use <code className="bg-purple-100 px-1 rounded">t</code> to activate the file finder in repositories</li>
                <li>Add <code className="bg-purple-100 px-1 rounded">?w=1</code> to a diff URL to ignore whitespace changes</li>
              </ul>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-3 text-lg">Feedback</h3>
              <p className="text-gray-700 mb-4">
                Have suggestions for improving this cheat sheet or found an error? Please send your feedback to:
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

export default GitHubCheatSheet;