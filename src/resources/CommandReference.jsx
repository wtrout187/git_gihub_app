import React, { useState } from 'react';
import { ArrowLeft, Search, Terminal, Copy, ChevronDown, ChevronRight } from 'lucide-react';

const CommandReference = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const commandCategories = [
    {
      id: "setup",
      title: "Setup and Configuration",
      commands: [
        {
          command: "git config --global user.name \"Your Name\"",
          description: "Set the name that will be attached to your commits",
          example: "git config --global user.name \"John Doe\"",
          output: "No output, sets the configuration"
        },
        {
          command: "git config --global user.email \"your.email@example.com\"",
          description: "Set the email that will be attached to your commits",
          example: "git config --global user.email \"john.doe@example.com\"",
          output: "No output, sets the configuration"
        },
        {
          command: "git config --list",
          description: "List all configuration settings",
          example: "git config --list",
          output: "user.name=John Doe\nuser.email=john.doe@example.com\ncolor.ui=auto"
        },
        {
          command: "git config --global core.editor \"editor-name\"",
          description: "Set the default text editor",
          example: "git config --global core.editor \"code --wait\"",
          output: "No output, sets VS Code as the default editor"
        },
        {
          command: "git config --global alias.alias-name \"command\"",
          description: "Create a shortcut for a Git command",
          example: "git config --global alias.st \"status\"",
          output: "No output, creates an alias 'st' for 'status'"
        }
      ]
    },
    {
      id: "basics",
      title: "Basic Commands",
      commands: [
        {
          command: "git init",
          description: "Initialize a new Git repository",
          example: "git init",
          output: "Initialized empty Git repository in /path/to/repository/.git/"
        },
        {
          command: "git clone [url]",
          description: "Clone a repository from a remote source",
          example: "git clone https://github.com/username/repository.git",
          output: "Cloning into 'repository'...\nremote: Counting objects: 100, done.\nremote: Compressing objects: 100% (80/80), done.\nReceiving objects: 100% (100/100), 15.81 KiB | 0 bytes/s, done."
        },
        {
          command: "git status",
          description: "Show the working tree status",
          example: "git status",
          output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n\n\tmodified:   file.txt\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")"
        },
        {
          command: "git add [file]",
          description: "Add file contents to the index",
          example: "git add file.txt",
          output: "No output, stages the file"
        },
        {
          command: "git add .",
          description: "Add all changed files to the index",
          example: "git add .",
          output: "No output, stages all changes"
        },
        {
          command: "git commit -m \"[message]\"",
          description: "Record changes to the repository with a message",
          example: "git commit -m \"Add new feature\"",
          output: "[main 5d6e8a1] Add new feature\n 1 file changed, 10 insertions(+), 2 deletions(-)"
        },
        {
          command: "git log",
          description: "Show commit logs",
          example: "git log",
          output: "commit 5d6e8a1b3d4c2f1e0a9b8c7d6e5f4a3b2c1d0e9\nAuthor: John Doe <john.doe@example.com>\nDate:   Mon Jan 01 12:00:00 2023 -0500\n\n    Add new feature\n\ncommit 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9\nAuthor: John Doe <john.doe@example.com>\nDate:   Sun Dec 31 12:00:00 2022 -0500\n\n    Initial commit"
        }
      ]
    },
    {
      id: "branching",
      title: "Branching and Merging",
      commands: [
        {
          command: "git branch",
          description: "List all local branches",
          example: "git branch",
          output: "* main\n  feature-branch\n  bugfix-branch"
        },
        {
          command: "git branch [branch-name]",
          description: "Create a new branch",
          example: "git branch new-feature",
          output: "No output, creates the branch"
        },
        {
          command: "git checkout [branch-name]",
          description: "Switch to a branch",
          example: "git checkout feature-branch",
          output: "Switched to branch 'feature-branch'"
        },
        {
          command: "git checkout -b [branch-name]",
          description: "Create and switch to a new branch",
          example: "git checkout -b new-feature",
          output: "Switched to a new branch 'new-feature'"
        },
        {
          command: "git merge [branch-name]",
          description: "Merge a branch into the current branch",
          example: "git merge feature-branch",
          output: "Updating 5d6e8a1..2c3d4e5\nFast-forward\n file.txt | 12 ++++++++++--\n 1 file changed, 10 insertions(+), 2 deletions(-)"
        },
        {
          command: "git branch -d [branch-name]",
          description: "Delete a branch",
          example: "git branch -d feature-branch",
          output: "Deleted branch feature-branch (was 2c3d4e5)."
        },
        {
          command: "git branch -m [old-name] [new-name]",
          description: "Rename a branch",
          example: "git branch -m old-feature new-feature",
          output: "No output, renames the branch"
        }
      ]
    },
    {
      id: "remote",
      title: "Remote Repositories",
      commands: [
        {
          command: "git remote",
          description: "List remote repositories",
          example: "git remote",
          output: "origin"
        },
        {
          command: "git remote -v",
          description: "List remote repositories with URLs",
          example: "git remote -v",
          output: "origin  https://github.com/username/repository.git (fetch)\norigin  https://github.com/username/repository.git (push)"
        },
        {
          command: "git remote add [name] [url]",
          description: "Add a new remote repository",
          example: "git remote add upstream https://github.com/original/repository.git",
          output: "No output, adds the remote"
        },
        {
          command: "git push [remote] [branch]",
          description: "Push commits to a remote repository",
          example: "git push origin main",
          output: "Counting objects: 5, done.\nDelta compression using up to 8 threads.\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (5/5), 456 bytes | 456.00 KiB/s, done.\nTotal 5 (delta 2), reused 0 (delta 0)\nTo https://github.com/username/repository.git\n   5d6e8a1..2c3d4e5  main -> main"
        },
        {
          command: "git pull [remote] [branch]",
          description: "Fetch and merge changes from a remote repository",
          example: "git pull origin main",
          output: "Updating 5d6e8a1..2c3d4e5\nFast-forward\n file.txt | 12 ++++++++++--\n 1 file changed, 10 insertions(+), 2 deletions(-)"
        },
        {
          command: "git fetch [remote]",
          description: "Download objects and refs from a remote repository",
          example: "git fetch origin",
          output: "remote: Counting objects: 5, done.\nremote: Compressing objects: 100% (3/3), done.\nremote: Total 5 (delta 2), reused 5 (delta 2), pack-reused 0\nUnpacking objects: 100% (5/5), done.\nFrom https://github.com/username/repository\n   5d6e8a1..2c3d4e5  main     -> origin/main"
        }
      ]
    },
    {
      id: "changes",
      title: "Inspecting and Comparing Changes",
      commands: [
        {
          command: "git diff",
          description: "Show changes between working directory and staging area",
          example: "git diff",
          output: "diff --git a/file.txt b/file.txt\nindex 1234567..abcdefg 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1,5 +1,5 @@\n Line 1\n-Line 2\n+Modified Line 2\n Line 3\n Line 4\n Line 5"
        },
        {
          command: "git diff --staged",
          description: "Show changes between staging area and last commit",
          example: "git diff --staged",
          output: "diff --git a/file.txt b/file.txt\nindex 1234567..abcdefg 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1,5 +1,5 @@\n Line 1\n-Line 2\n+Modified Line 2\n Line 3\n Line 4\n Line 5"
        },
        {
          command: "git diff [commit1] [commit2]",
          description: "Show changes between two commits",
          example: "git diff 5d6e8a1 2c3d4e5",
          output: "diff --git a/file.txt b/file.txt\nindex 1234567..abcdefg 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1,5 +1,5 @@\n Line 1\n-Line 2\n+Modified Line 2\n Line 3\n Line 4\n Line 5"
        },
        {
          command: "git show [commit]",
          description: "Show a specific commit",
          example: "git show 5d6e8a1",
          output: "commit 5d6e8a1b3d4c2f1e0a9b8c7d6e5f4a3b2c1d0e9\nAuthor: John Doe <john.doe@example.com>\nDate:   Mon Jan 01 12:00:00 2023 -0500\n\n    Add new feature\n\ndiff --git a/file.txt b/file.txt\nindex 1234567..abcdefg 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1,5 +1,5 @@\n Line 1\n-Line 2\n+Modified Line 2\n Line 3\n Line 4\n Line 5"
        },
        {
          command: "git blame [file]",
          description: "Show who changed what and when in a file",
          example: "git blame file.txt",
          output: "5d6e8a1b (John Doe 2023-01-01 12:00:00 -0500 1) Line 1\n2c3d4e5f (Jane Smith 2023-01-02 12:00:00 -0500 2) Modified Line 2\n5d6e8a1b (John Doe 2023-01-01 12:00:00 -0500 3) Line 3\n5d6e8a1b (John Doe 2023-01-01 12:00:00 -0500 4) Line 4\n5d6e8a1b (John Doe 2023-01-01 12:00:00 -0500 5) Line 5"
        }
      ]
    },
    {
      id: "undoing",
      title: "Undoing Changes",
      commands: [
        {
          command: "git restore [file]",
          description: "Discard changes in working directory",
          example: "git restore file.txt",
          output: "No output, restores the file"
        },
        {
          command: "git restore --staged [file]",
          description: "Unstage changes",
          example: "git restore --staged file.txt",
          output: "No output, unstages the file"
        },
        {
          command: "git reset [commit]",
          description: "Reset current HEAD to the specified commit",
          example: "git reset 5d6e8a1",
          output: "Unstaged changes after reset:\nM\tfile.txt"
        },
        {
          command: "git reset --hard [commit]",
          description: "Reset current HEAD to the specified commit and discard all changes",
          example: "git reset --hard 5d6e8a1",
          output: "HEAD is now at 5d6e8a1 Add new feature"
        },
        {
          command: "git revert [commit]",
          description: "Create a new commit that undoes changes from a specific commit",
          example: "git revert 5d6e8a1",
          output: "[main 6f7g8h9] Revert \"Add new feature\"\n 1 file changed, 2 insertions(+), 10 deletions(-)"
        },
        {
          command: "git commit --amend",
          description: "Modify the most recent commit",
          example: "git commit --amend -m \"Updated feature\"",
          output: "[main 7g8h9i0] Updated feature\n Date: Mon Jan 01 12:00:00 2023 -0500\n 1 file changed, 10 insertions(+), 2 deletions(-)"
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Operations",
      commands: [
        {
          command: "git stash",
          description: "Stash changes in a dirty working directory",
          example: "git stash",
          output: "Saved working directory and index state WIP on main: 5d6e8a1 Add new feature"
        },
        {
          command: "git stash pop",
          description: "Apply and remove the most recent stash",
          example: "git stash pop",
          output: "On branch main\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n\n\tmodified:   file.txt\n\nDropped refs/stash@{0} (5d6e8a1b3d4c2f1e0a9b8c7d6e5f4a3b2c1d0e9)"
        },
        {
          command: "git cherry-pick [commit]",
          description: "Apply the changes from a specific commit",
          example: "git cherry-pick 5d6e8a1",
          output: "[main 8h9i0j1] Add new feature\n Date: Mon Jan 01 12:00:00 2023 -0500\n 1 file changed, 10 insertions(+), 2 deletions(-)"
        },
        {
          command: "git rebase [branch]",
          description: "Reapply commits on top of another base",
          example: "git rebase main",
          output: "First, rewinding head to replay your work on top of it...\nApplying: Add new feature"
        },
        {
          command: "git bisect start",
          description: "Start a binary search to find a commit that introduced a bug",
          example: "git bisect start\ngit bisect bad\ngit bisect good 5d6e8a1",
          output: "Bisecting: 5 revisions left to test after this (roughly 3 steps)\n[6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3] Add another feature"
        },
        {
          command: "git tag [tag-name]",
          description: "Create a tag",
          example: "git tag v1.0.0",
          output: "No output, creates the tag"
        },
        {
          command: "git submodule add [url] [path]",
          description: "Add a submodule to the repository",
          example: "git submodule add https://github.com/username/library.git lib",
          output: "Cloning into '/path/to/repository/lib'...\nremote: Counting objects: 100, done.\nremote: Compressing objects: 100% (80/80), done.\nReceiving objects: 100% (100/100), 15.81 KiB | 0 bytes/s, done."
        }
      ]
    }
  ];

  // Filter commands based on search term
  const filteredCategories = commandCategories.map(category => {
    const filteredCommands = category.commands.filter(cmd => 
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...category,
      commands: filteredCommands,
      hasMatches: filteredCommands.length > 0
    };
  }).filter(category => category.hasMatches);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
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
                <h1 className="text-2xl font-bold">Git Command Reference</h1>
                <p className="text-gray-300">Detailed guide to Git commands with examples</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search commands..." 
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                {searchTerm ? `Showing results for "${searchTerm}"` : "Search for Git commands by name or description"}
              </p>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Terminal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No commands found</h3>
                <p className="text-gray-500">Try a different search term</p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="mb-8">
                  <button 
                    className="flex items-center justify-between w-full text-left py-3 border-b border-gray-200"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-gray-600" />
                      {category.title}
                      <span className="text-sm font-normal text-gray-500">
                        ({category.commands.length} commands)
                      </span>
                    </h2>
                    {expandedCategories[category.id] ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedCategories[category.id] && (
                    <div className="mt-4 space-y-6">
                      {category.commands.map((cmd, cmdIndex) => (
                        <div 
                          key={cmdIndex} 
                          className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                        >
                          <div 
                            className="p-4 cursor-pointer hover:bg-gray-100 transition-colors flex items-start justify-between group"
                            onClick={() => copyToClipboard(cmd.command)}
                          >
                            <div>
                              <div className="font-mono text-gray-800 font-semibold mb-2 flex items-center gap-2">
                                <span className="text-green-600">$</span> {cmd.command}
                                <Copy className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-gray-600">{cmd.description}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 p-4 bg-gray-100">
                            <div className="mb-3">
                              <h4 className="text-sm font-semibold text-gray-700 mb-1">Example:</h4>
                              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                                $ {cmd.example}
                              </pre>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-1">Output:</h4>
                              <pre className="bg-gray-800 text-gray-300 p-3 rounded text-sm overflow-x-auto">
                                {cmd.output}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
            
            {filteredCategories.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Feedback</h3>
                <p className="text-gray-700 mb-4">
                  Have suggestions for improving this command reference or found an error? Please send your feedback to:
                </p>
                <a 
                  href="mailto:troutwayne@gmail.com" 
                  className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  troutwayne@gmail.com
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandReference;