/**
 * Comprehensive Git Learning Lessons Data
 *
 * This file contains all the structured lesson content for the Git Mastery App.
 * Organized into 4 main modules with interactive theory, practice, and quizzes.
 */

export const lessonsData = {
  1: {
    title: "Git Fundamentals",
    description: "Master the basics of version control with Git",
    icon: "📚",
    color: "from-blue-500 to-indigo-600",
    lessons: [
      {
        id: "1-1",
        title: "What is Git?",
        content: {
          theory: `# Understanding Git

Git is a distributed version control system that helps you track changes in your code over time. Think of it as a time machine for your code that lets you navigate through the history of your project!

## Key Concepts

### Version Control
- Track every change made to your files
- Maintain a complete history of modifications
- Revert to previous states when needed
- Compare different versions of your code

### Distributed System
- Every developer has a complete copy of the project history
- Work offline with full functionality
- No single point of failure
- Multiple backups of the entire repository

### Collaboration
- Work with others without stepping on each other's toes
- Merge changes from multiple developers
- Resolve conflicts when they arise
- Maintain parallel development streams

## Why Git?

- **Speed**: Git operations are lightning fast
- **Data Integrity**: Git uses checksums to ensure data integrity
- **Branching**: Create lightweight branches for features, experiments, and fixes
- **Flexibility**: Works with any type of project, not just code
- **Industry Standard**: Used by millions of developers worldwide

## Git vs. Other Version Control Systems

Unlike older centralized systems (like SVN), Git doesn't need constant connection to a central server. This distributed nature gives Git significant advantages in speed, flexibility, and reliability.`,

          practice: {
            title: "Check if Git is installed",
            description: "Let's verify Git is installed on your system and check its version",
            command: "git --version",
            expectedOutput: "git version 2.x.x",
            hint: "If Git isn't installed, visit git-scm.com to download it. For macOS, you can also install it via Homebrew with 'brew install git'."
          },

          quiz: [
            {
              question: "What type of system is Git?",
              options: ["Centralized version control", "Distributed version control", "File storage system", "Code editor"],
              correct: 1,
              explanation: "Git is a distributed version control system where every developer has a full copy of the repository"
            },
            {
              question: "Which of the following is NOT a benefit of Git?",
              options: ["Fast operations", "Requires constant server connection", "Data integrity", "Flexible branching"],
              correct: 1,
              explanation: "Git does NOT require a constant server connection - that's actually one of its advantages as a distributed system."
            },
            {
              question: "Who created Git?",
              options: ["Linus Torvalds", "Bill Gates", "Mark Zuckerberg", "Tim Berners-Lee"],
              correct: 0,
              explanation: "Git was created by Linus Torvalds in 2005 for development of the Linux kernel."
            }
          ]
        }
      },
      {
        id: "1-2",
        title: "Setting Up Git",
        content: {
          theory: `# Setting Up Git

Before using Git effectively, you need to configure it with your identity and preferences. This initial setup ensures your commits are properly attributed and Git works optimally for your workflow.

## Identity Configuration

Your identity information will be attached to every commit you make, creating a permanent record in the project history:

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

## Configuration Levels

Git offers three configuration levels, each with different scopes:

### System Level
- Applies to all users on the system
- Stored in /etc/gitconfig
- Requires admin privileges
- Command: \`git config --system\`

### Global Level
- Applies to all your projects
- Stored in ~/.gitconfig or ~/.config/git/config
- Most commonly used for personal settings
- Command: \`git config --global\`

### Local Level
- Applies to a specific project only
- Stored in .git/config in the repository
- Overrides global and system settings
- Command: \`git config\` (without flags)

## Essential Configurations

### Default Editor
\`git config --global core.editor "code --wait"\` (for VS Code)

### Default Branch Name
\`git config --global init.defaultBranch main\`

### Line Ending Preferences
- Windows: \`git config --global core.autocrlf true\`
- macOS/Linux: \`git config --global core.autocrlf input\`

### Color Output
\`git config --global color.ui auto\`

## Viewing Your Configuration

To see your current configuration:
\`git config --list\`

To see a specific setting:
\`git config user.name\`

## Git Aliases

Create shortcuts for common commands:

\`\`\`bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
\`\`\`

Now you can use \`git co\` instead of \`git checkout\`, etc.`,

          practice: {
            title: "Configure your Git identity",
            description: "Set up your name and email for Git commits, then verify the configuration",
            command: `git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --list | grep user`,
            expectedOutput: "user.name=Your Name\nuser.email=your.email@example.com",
            hint: "Use your real name and email - these will be visible in your commits and part of your developer identity"
          },

          quiz: [
            {
              question: "Which command sets your email for all Git projects?",
              options: ["git config user.email", "git config --global user.email", "git set email", "git email --global"],
              correct: 1,
              explanation: "The --global flag sets the configuration for all your Git projects"
            },
            {
              question: "Where is the global Git configuration stored?",
              options: ["/etc/gitconfig", "~/.gitconfig", ".git/config", "/usr/git/config"],
              correct: 1,
              explanation: "Global Git configuration is stored in ~/.gitconfig in your home directory"
            },
            {
              question: "What does the command 'git config --global alias.co checkout' do?",
              options: ["Creates a checkout file", "Sets up a Git alias", "Configures a remote repository", "Changes the default branch"],
              correct: 1,
              explanation: "This command creates an alias 'co' for the 'checkout' command, allowing you to type 'git co' instead of 'git checkout'"
            }
          ]
        }
      },
      {
        id: "1-3",
        title: "Creating Your First Repository",
        content: {
          theory: `# Creating Git Repositories

A Git repository (repo) is a directory that Git tracks. It contains all your project files and the entire history of changes. The repository includes a special hidden directory called \`.git\` that stores all the version control information.

## Creating a New Repository

There are two primary ways to create a Git repository:

### Method 1: Initialize a New Repository (git init)

Use this method when starting a project from scratch or adding Git to an existing project:

\`\`\`bash
# Create a new directory for your project
mkdir my-project
cd my-project

# Initialize the Git repository
git init
\`\`\`

After running \`git init\`, Git creates the hidden \`.git\` directory that contains all the necessary repository files. Your project is now a Git repository!

#### What's in the .git directory?

The \`.git\` directory contains:
- Object database (stores all versions of files)
- Configuration settings
- References to commits (branches and tags)
- HEAD pointer (indicates the current branch)
- Staging area (index)

### Method 2: Clone an Existing Repository (git clone)

Use this method when you want to work with an existing project:

\`\`\`bash
# Clone a repository from GitHub
git clone https://github.com/username/repository.git

# Clone to a specific folder
git clone https://github.com/username/repository.git my-folder

# Clone a specific branch
git clone -b branch-name https://github.com/username/repository.git
\`\`\`

When you clone a repository, Git:
1. Downloads the entire repository history
2. Sets up a remote connection to the original repository (called "origin")
3. Creates a working copy of the latest version
4. Sets up tracking branches

## Bare vs. Non-Bare Repositories

- **Non-bare repository**: Has a working directory where you can edit files (default)
- **Bare repository**: No working directory, used for centralized sharing (like on servers)
  - Create with: \`git init --bare\`

## Best Practices

- Initialize Git at the root of your project
- Use a \`.gitignore\` file to exclude unnecessary files
- Add a README.md file to describe your project
- Consider adding a LICENSE file for open-source projects
- Make an initial commit after initialization`,

          practice: {
            title: "Initialize a new repository",
            description: "Create your first Git repository and make an initial commit",
            command: `mkdir my-first-repo
cd my-first-repo
git init
echo "# My First Git Repository" > README.md
git add README.md
git commit -m "Initial commit with README"`,
            expectedOutput: "Initialized empty Git repository in .../my-first-repo/.git/\n[main (root-commit) xxxxxxx] Initial commit with README\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md",
            hint: "The .git folder contains all the Git tracking information. The initial commit creates your first history point."
          },

          quiz: [
            {
              question: "What does 'git init' do?",
              options: ["Downloads a repository", "Creates a new Git repository", "Deletes a repository", "Updates Git"],
              correct: 1,
              explanation: "git init initializes a new Git repository in the current directory"
            },
            {
              question: "What is stored in the .git directory?",
              options: ["Only the latest version of files", "Repository configuration and version history", "User credentials only", "Operating system files"],
              correct: 1,
              explanation: "The .git directory contains the object database, configuration, references, and all information needed for version control"
            },
            {
              question: "What's the difference between 'git init' and 'git clone'?",
              options: [
                "They are identical commands", 
                "git init creates a new repository, while git clone copies an existing one", 
                "git init is only for GitHub, git clone is for GitLab", 
                "git init is deprecated, git clone is the modern approach"
              ],
              correct: 1,
              explanation: "git init creates a brand new repository, while git clone makes a copy of an existing repository including its history"
            },
            {
              question: "What is a bare repository?",
              options: [
                "A repository without any commits", 
                "A repository without a working directory, typically used on servers", 
                "A repository with only one branch", 
                "A repository without remote connections"
              ],
              correct: 1,
              explanation: "A bare repository has no working directory and is typically used as a central repository on servers"
            }
          ]
        }
      },
      // Additional lessons truncated for brevity - would include all 8 lessons
    ]
  },

  2: {
    title: "Branching Mastery",
    description: "Learn advanced branching strategies and workflows",
    icon: "🌳",
    color: "from-green-500 to-emerald-600",
    lessons: [
      {
        id: "2-1",
        title: "Understanding Branches",
        content: {
          theory: `# Understanding Git Branches

Branches are one of Git's most powerful features. A branch is simply a movable pointer to a commit.

## Key Branch Concepts

### Main/Master Branch
- The default branch in your repository
- Traditionally called "master", now often renamed to "main"
- Should always contain stable, working code
- Protected in many workflows to prevent direct changes

### Feature Branches
- Created for developing new features
- Isolated from the main codebase
- Allow experimentation without affecting stable code
- Merged back to main when complete and tested

### HEAD Pointer
- Special pointer that indicates your current branch
- Points to the latest commit on your current branch
- Moves when you make new commits
- Changes when you switch branches with checkout/switch

### Parallel Development
- Multiple developers can work on different features simultaneously
- Each branch can evolve independently
- Changes can be integrated when ready
- Conflicts are isolated to merge time

Think of branches as parallel universes for your code - each one can evolve independently until you decide to merge them back together!

## Branch Visualization

\`\`\`
            feature-login
                 ↓
C1 --- C2 --- C3
       ↑
      main
\`\`\`

In this diagram:
- C1, C2, C3 are commits
- main points to C2
- feature-login points to C3
- Both branches share history up to C2`,

          practice: {
            title: "View and create branches",
            description: "Explore Git branching by creating a new branch and viewing all branches",
            command: `git branch
git branch feature-login
git branch`,
            expectedOutput: "* main\n  feature-login",
            hint: "The asterisk (*) shows your current branch. You've created a new branch but haven't switched to it yet."
          },

          quiz: [
            {
              question: "What is a Git branch?",
              options: [
                "A copy of the entire repository",
                "A movable pointer to a commit",
                "A separate folder for code",
                "A backup of your project"
              ],
              correct: 1,
              explanation: "A branch is simply a lightweight movable pointer to a commit"
            },
            {
              question: "What does the HEAD pointer indicate?",
              options: [
                "The first commit in the repository",
                "Your current branch and commit",
                "The main branch",
                "The remote repository"
              ],
              correct: 1,
              explanation: "HEAD is a special pointer that indicates your current branch and commit position"
            },
            {
              question: "What happens when you create a new branch?",
              options: [
                "Git copies all files into a new directory",
                "Git creates a new pointer to the current commit",
                "Git automatically switches to the new branch",
                "Git connects to the remote repository"
              ],
              correct: 1,
              explanation: "Creating a branch simply creates a new pointer to the current commit - it's very lightweight and fast"
            }
          ]
        }
      },
      // Additional branching lessons would be included here
    ]
  },

  3: {
    title: "GitHub Collaboration",
    description: "Master team collaboration with GitHub workflows",
    icon: "🤝",
    color: "from-purple-500 to-pink-600",
    lessons: [
      {
        id: "3-1",
        title: "Introduction to GitHub",
        content: {
          theory: `# Introduction to GitHub

GitHub is a web-based platform for version control and collaboration built on Git. It extends Git's capabilities with a rich web interface and collaboration tools that make team development more efficient and organized.

## Key GitHub Features

### Remote Repository Hosting
- Store your Git repositories in the cloud
- Access your code from anywhere
- Automatic backups and redundancy
- Public and private repository options

### Pull Requests
- Propose changes to a repository
- Request code reviews from teammates
- Discuss code line-by-line
- Merge changes when approved
- Enforce code quality standards

### Issues
- Track bugs, features, and tasks
- Assign work to team members
- Set priorities and milestones
- Link issues to code changes
- Create project roadmaps

### GitHub Actions (CI/CD)
- Automate workflows
- Run tests automatically
- Deploy code to production
- Build and release software
- Custom automation workflows

### Social Coding Features
- Follow developers
- Star repositories
- Fork projects
- Contribute to open source
- Build a coding portfolio

### Project Management
- Project boards
- Milestones
- Wiki documentation
- Release management
- Team permissions

## GitHub vs. Other Platforms

While GitHub is the most popular Git hosting platform, alternatives include GitLab, Bitbucket, and Azure DevOps. GitHub stands out for its large community, extensive integrations, and robust feature set.

GitHub is where the world builds software - from small personal projects to the largest open-source collaborations!`,

          practice: {
            title: "Create a GitHub account",
            description: "Join the world's largest developer community",
            command: `# Visit github.com
# Sign up with:
# - Username (choose wisely!)
# - Email
# - Password

# Verify your email
# Complete profile setup`,
            expectedOutput: "GitHub account created successfully",
            hint: "Your username becomes part of your professional identity. Choose something professional that you'll be comfortable sharing with employers."
          },

          quiz: [
            {
              question: "What is GitHub?",
              options: [
                "A code editor",
                "A web-based Git repository hosting service",
                "A programming language",
                "A local Git GUI"
              ],
              correct: 1,
              explanation: "GitHub is a web platform that hosts Git repositories and adds collaboration features"
            },
            {
              question: "What is a Pull Request?",
              options: [
                "A way to download code from GitHub",
                "A request to pull the latest changes from the main branch",
                "A proposed change to a repository that others can review",
                "A way to request access to a private repository"
              ],
              correct: 2,
              explanation: "A Pull Request is a way to propose changes to a repository and request that someone review and merge them"
            },
            {
              question: "Which of these is NOT a feature of GitHub?",
              options: [
                "Issue tracking",
                "Continuous integration",
                "Local-only repositories",
                "Wiki documentation"
              ],
              correct: 2,
              explanation: "GitHub is a cloud-based platform - local-only repositories would defeat its collaborative purpose"
            }
          ]
        }
      },
      // Additional GitHub lessons would be included here
    ]
  },

  4: {
    title: "AI-Assisted Development",
    description: "Learn modern AI-powered development workflows",
    icon: "🤖",
    color: "from-orange-500 to-red-600",
    lessons: [
      {
        id: "4-1",
        title: "AI Tools for Git",
        content: {
          theory: `# AI-Assisted Git Development

Artificial Intelligence is revolutionizing Git workflows, making developers more productive and helping teams collaborate more effectively. Modern AI tools can assist with many aspects of the Git development process.

## AI-Powered Tools

### GitHub Copilot
- AI pair programmer that suggests code as you type
- Understands context from your codebase
- Generates complete functions and algorithms
- Learns from your coding style
- Works in your IDE (VS Code, JetBrains, etc.)

### AI Commit Messages
- Generate meaningful commit messages automatically
- Analyze code changes to describe what was modified
- Maintain consistent commit message style
- Save time on routine commits
- Tools like Commitizen and aicommits

### Automated PR Descriptions
- Summarize changes in pull requests
- Highlight key modifications
- Generate documentation updates
- Identify potential issues
- Improve review efficiency

### Smart Conflict Resolution
- AI suggestions for resolving merge conflicts
- Analyze both versions to propose solutions
- Learn from previous conflict resolutions
- Reduce manual conflict resolution time
- Maintain code consistency

### Code Review Assistance
- Automated code quality checks
- Security vulnerability detection
- Performance optimization suggestions
- Style and convention enforcement
- Reduce human review burden

## Benefits of AI in Git Workflows

### Faster Development
- Reduce time spent on routine tasks
- Get unstuck with AI suggestions
- Automate repetitive operations
- Focus on creative problem-solving

### Better Commit Messages
- More descriptive and consistent
- Capture intent, not just changes
- Improve repository history quality
- Make future maintenance easier

### Improved Code Quality
- Catch issues before they're committed
- Follow best practices automatically
- Consistent style across the codebase
- Reduce technical debt

### Learning Assistance
- Learn from AI suggestions
- Discover new patterns and techniques
- Understand unfamiliar codebases faster
- Improve your Git skills over time

AI tools don't replace developer skills - they enhance them, allowing you to focus on the most creative and valuable aspects of software development.`,

          practice: {
            title: "Set up AI tools",
            description: "Configure AI assistants for Git workflows",
            command: `# GitHub Copilot setup
# 1. Install VS Code extension
# 2. Sign in with GitHub
# 3. Enable for your repositories

# AI commit message tool
npm install -g aicommits
aicommits config set openai-key YOUR_KEY

# Generate commit message
git add .
aicommits`,
            expectedOutput: "AI tools configured",
            hint: "AI tools augment, not replace, your Git skills. Always review AI-generated content before using it."
          },

          quiz: [
            {
              question: "What can AI help with in Git workflows?",
              options: [
                "Only writing code",
                "Commit messages, PR descriptions, code review",
                "Deleting repositories",
                "Managing GitHub accounts"
              ],
              correct: 1,
              explanation: "AI assists with commit messages, PR descriptions, code review, and more"
            },
            {
              question: "What is GitHub Copilot?",
              options: [
                "A tool that automatically commits your code",
                "An AI pair programmer that suggests code as you type",
                "A GitHub feature that manages pull requests",
                "A tool that automatically resolves merge conflicts"
              ],
              correct: 1,
              explanation: "GitHub Copilot is an AI pair programmer that suggests code completions as you type"
            },
            {
              question: "How can AI improve commit messages?",
              options: [
                "By making them shorter",
                "By analyzing code changes to generate descriptive messages",
                "By adding emojis automatically",
                "By translating them to different languages"
              ],
              correct: 1,
              explanation: "AI can analyze your code changes to generate descriptive commit messages that explain what was modified"
            }
          ]
        }
      },
      // Additional AI lessons would be included here
    ]
  }
};