#!/bin/bash

# Push script to fix README images and GitHub Pages deployment
echo "Fixing README images and GitHub Pages deployment..."

# Add the modified files
git add README.md
git add .github/workflows/pages.yml

# Commit with a clear message
git commit -m "Fix: Update README images and GitHub Pages workflow"

# Push to GitHub main branch
git push origin main

# Now let's update the gh-pages branch
echo "Updating gh-pages branch..."
git checkout gh-pages
git merge main
git push origin gh-pages

# Switch back to main branch
git checkout main

echo "Changes have been pushed to both main and gh-pages branches!"
echo "Please check your GitHub repository to verify the changes."