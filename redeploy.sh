#!/bin/bash

echo "Re-deploying GitHub Pages after visibility change"
echo "================================================"

# Switch to main branch
git checkout main

# Create a small change to trigger deployment
echo "<!-- Deployment trigger: $(date) -->" >> index.html

# Commit and push the change
git add index.html
git commit -m "Trigger GitHub Pages deployment after visibility change"
git push origin main

# Build and deploy to GitHub Pages
npm run build
git checkout gh-pages
cp -r dist/* .
git add .
git commit -m "Re-deploy GitHub Pages after visibility change"
git push origin gh-pages

echo ""
echo "GitHub Pages re-deployment triggered!"
echo "Please wait a few minutes for the changes to propagate."
echo "Your site should be available at: https://wtrout187.github.io/git_gihub_app/"