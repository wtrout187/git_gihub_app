#!/bin/bash

# Simple script to update gh-pages branch
echo "Updating gh-pages branch with latest changes..."

# First, pull the latest changes from main
git pull origin main

# Add the modified files
git add README.md
git add .github/workflows/pages.yml

# Commit with a clear message
git commit -m "Fix: Update README images and GitHub Pages workflow"

# Switch to gh-pages branch
git checkout gh-pages

# Pull latest changes from gh-pages
git pull origin gh-pages

# Copy the README with fixed images to gh-pages
git checkout main -- README.md

# Commit the changes to gh-pages
git add README.md
git commit -m "Update README with fixed images"

# Push to gh-pages
git push origin gh-pages

# Switch back to main branch
git checkout main

# Push main branch changes
git push origin main

echo "Changes have been pushed to both branches!"
echo "Please check your GitHub repository to verify the changes."