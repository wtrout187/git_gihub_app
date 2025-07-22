#!/bin/bash

# Final push script to fix GitHub Actions and README images
echo "Pushing fixes for GitHub Actions and README images..."

# Add specific files
git add README.md
git add .github/workflows/pages.yml

# Commit with a clear message
git commit -m "Fix: Update GitHub Actions workflow and README image paths"

# Push to GitHub main branch
git push origin main

echo "Changes have been pushed to GitHub main branch!"
echo "Please verify the following:"
echo "1. README now shows the images using absolute URLs"
echo "2. GitHub Actions workflow now uses the latest versions of all actions"