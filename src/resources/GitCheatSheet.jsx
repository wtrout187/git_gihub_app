import React from 'react';
import { ArrowLeft, Copy, Download, ExternalLink } from 'lucide-react';

const GitCheatSheet = ({ onBack }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const commandSections = [
    {
      title: "Setup & Configuration",
      commands: [
        { command: "git config --global user.name \"Your Name\"", description: "Set your username" },
        { command: "git config --global user.email \"your.email@example.com\"", description: "Set your email address" },
        { command: "git config --list", description: "List all configuration settings" },
        { command: "git config --global color.ui auto", description: "Enable colorized output" },
        { command: "git config --global core.editor \"code --wait\"", description: "Set VS Code as default editor" }
      ]
    },
    {
      title: "Creating & Cloning Repositories",
      commands: [
        { command: "git init", description: "Initialize a new local repository" },
        { command: "git clone https://github.com/username/repo.git", description: "Clone a remote repository" },
        { command: "git clone https://github.com/username/repo.git my-folder", description: "Clone into specific folder" },
        { command: "git clone --depth=1 https://github.com/username/repo.git", description: "Shallow clone (faster)" }
      ]
    },
    {
      title: "Basic Workflow",
      commands: [
        { command: "git status", description: "Check repository status" },
        { command: "git add filename.txt", description: "Stage a specific file" },
        { command: "git add .", description: "Stage all changes" },
        { command: "git commit -m \"Commit message\"", description: "Commit staged changes" },
        { command: "git commit -am \"Commit message\"", description: "Stage and commit all changes" },
        { command: "git rm filename.txt", description: "Remove file and stage removal" },
        { command: "git mv old.txt new.txt", description: "Rename file and stage change" }
      ]
    },
    {
      title: "Branching & Merging",
      commands: [
        { command: "git branch", description: "List all local branches" },
        { command: "git branch -a", description: "List all branches (local and remote)" },
        { command: "git branch new-branch", description: "Create a new branch" },
        { command: "git checkout branch-name", description: "Switch to a branch" },
        { command: "git checkout -b new-branch", description: "Create and switch to a new branch" },
        { command: "git merge branch-name", description: "Merge branch into current branch" },
        { command: "git branch -d branch-name", description: "Delete a branch (if merged)" },
        { command: "git branch -D branch-name", description: "Force delete a branch" }
      ]
    },
    {
      title: "Remote Repositories",
      commands: [
        { command: "git remote -v", description: "List all remotes" },
        { command: "git remote add origin https://github.com/username/repo.git", description: "Add remote repository" },
        { command: "git push origin branch-name", description: "Push branch to remote" },
        { command: "git push -u origin branch-name", description: "Push and set upstream" },
        { command: "git pull", description: "Fetch and merge changes" },
        { command: "git fetch", description: "Fetch changes without merging" },
        { command: "git remote show origin", description: "Show remote details" }
      ]
    },
    {
      title: "History & Comparison",
      commands: [
        { command: "git log", description: "Show commit history" },
        { command: "git log --oneline", description: "Show compact history" },
        { command: "git log --graph --oneline", description: "Show graphical history" },
        { command: "git diff", description: "Show unstaged changes" },
        { command: "git diff --staged", description: "Show staged changes" },
        { command: "git diff branch1..branch2", description: "Compare two branches" },
        { command: "git blame filename.txt", description: "Show who changed each line" }
      ]
    },
    {
      title: "Undoing Changes",
      commands: [
        { command: "git restore filename.txt", description: "Discard changes in working directory" },
        { command: "git restore --staged filename.txt", description: "Unstage changes" },
        { command: "git commit --amend", description: "Modify the last commit" },
        { command: "git revert commit-hash", description: "Create new commit that undoes changes" },
        { command: "git reset --soft HEAD~1", description: "Undo last commit, keep changes staged" },
        { command: "git reset --hard HEAD~1", description: "Undo last commit and all changes" },
        { command: "git clean -fd", description: "Remove untracked files and directories" }
      ]
    },
    {
      title: "Advanced Operations",
      commands: [
        { command: "git stash", description: "Stash changes temporarily" },
        { command: "git stash pop", description: "Apply and remove stashed changes" },
        { command: "git stash list", description: "List stashed changes" },
        { command: "git cherry-pick commit-hash", description: "Apply commit from another branch" },
        { command: "git rebase main", description: "Rebase current branch onto main" },
        { command: "git bisect start", description: "Start binary search for bugs" },
        { command: "git tag v1.0.0", description: "Create a tag" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
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
                <h1 className="text-2xl font-bold">Git Cheat Sheet</h1>
                <p className="text-blue-100">Quick reference for Git commands</p>
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
                This cheat sheet provides a quick reference for the most commonly used Git commands. 
                Click on any command to copy it to your clipboard.
              </p>
              <a 
                href="https://git-scm.com/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Official Git Docs
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {commandSections.map((section, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {section.commands.map((cmd, cmdIndex) => (
                    <div 
                      key={cmdIndex} 
                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
                      onClick={() => copyToClipboard(cmd.command)}
                    >
                      <div className="flex-1">
                        <pre className="font-mono text-sm text-blue-700 mb-1">{cmd.command}</pre>
                        <p className="text-sm text-gray-600">{cmd.description}</p>
                      </div>
                      <Copy className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">Pro Tips:</h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>Use <code className="bg-blue-100 px-1 rounded">git help command</code> to get detailed help for any command</li>
                <li>Create aliases for common commands in your <code className="bg-blue-100 px-1 rounded">.gitconfig</code> file</li>
                <li>Use <code className="bg-blue-100 px-1 rounded">git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short</code> for a nice log format</li>
                <li>Consider using a Git GUI client for complex operations</li>
                <li>Always create a new branch for new features or bug fixes</li>
              </ul>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">Feedback</h3>
              <p className="text-gray-700 mb-4">
                Have suggestions for improving this cheat sheet or found an error? Please send your feedback to:
              </p>
              <a 
                href="mailto:troutwayne@gmail.com" 
                className="text-blue-700 font-medium hover:text-blue-900 transition-colors"
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

export default GitCheatSheet;