// Enhanced theory content for lesson 1-3
const enhancedTheory = `# Creating Git Repositories

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
- Make an initial commit after initialization`;

console.log(enhancedTheory);