#!/bin/bash
# Script to deploy Git & GitHub Mastery App to GitHub Pages

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Git & GitHub Mastery App - GitHub Pages Deployment Script ===${NC}"
echo -e "${BLUE}=== by Wayne Trout ===${NC}"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Build the project
echo -e "${GREEN}Building the project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo "Build completed successfully."

# Create or update gh-pages branch
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Save the current branch name
current_branch=$(git symbolic-ref --short HEAD)

# Create and switch to a temporary branch
git checkout --orphan temp-gh-pages

# Add the dist folder
git --work-tree=dist add --all

# Commit the changes
git --work-tree=dist commit -m "Deploy to GitHub Pages"

# Delete the gh-pages branch if it exists
git branch -D gh-pages 2> /dev/null || true

# Rename the temporary branch to gh-pages
git branch -m gh-pages

# Force push to the gh-pages branch
git push -f origin gh-pages

# Return to the original branch
git checkout $current_branch

# Clean up
git worktree prune

echo ""
echo -e "${BLUE}=== Deployment completed! ===${NC}"
echo -e "Your app is now available at: ${GREEN}https://wtrout187.github.io/git_gihub_app/${NC}"
echo ""
echo "Note: It may take a few minutes for the changes to be visible."