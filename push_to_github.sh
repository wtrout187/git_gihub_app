#!/bin/bash
# Script to push Git & GitHub Mastery App to GitHub

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Git & GitHub Mastery App - GitHub Push Script ===${NC}"
echo -e "${BLUE}=== by Wayne Trout ===${NC}"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo -e "${GREEN}Initializing Git repository...${NC}"
    git init
    echo "Git repository initialized."
else
    echo "Git repository already initialized."
fi

# Add all files to git
echo -e "${GREEN}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${GREEN}Committing changes...${NC}"
echo "Enter commit message (or press Enter for default message):"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update Git & GitHub Mastery App with enhanced UI and features"
fi

git commit -m "$commit_message"

# Check if remote origin exists
if git remote | grep -q "origin"; then
    echo "Remote origin already exists."
else
    echo -e "${GREEN}Adding remote origin...${NC}"
    echo "Adding remote origin: https://github.com/wtrout187/git_gihub_app.git"
    git remote add origin https://github.com/wtrout187/git_gihub_app.git
fi

# Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
echo "Choose branch to push to (or press Enter for 'main'):"
read branch_name

if [ -z "$branch_name" ]; then
    branch_name="main"
fi

git push -u origin $branch_name

echo ""
echo -e "${BLUE}=== Push completed! ===${NC}"
echo -e "Your code is now available at: ${GREEN}https://github.com/wtrout187/git_gihub_app${NC}"
echo ""
echo "To deploy to GitHub Pages, run: ./deploy.sh"