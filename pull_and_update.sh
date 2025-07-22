#!/bin/bash

# Simple pull and update script
echo "Pulling latest changes from GitHub..."

# Set git pull strategy to merge
git config pull.rebase false

# Pull from main
git pull origin main

# Update README with working images
echo "Updating README with working images..."

# Add the modified README
git add README.md

# Commit with a clear message
git commit -m "Fix: Update README with working image links"

# Push to main branch
git push origin main

echo "README has been updated with working image links!"
echo "Please check your GitHub repository to verify the changes."