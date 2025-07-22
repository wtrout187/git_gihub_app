#!/bin/bash

# Simple script to update README with working images
echo "Updating README with working images..."

# First, pull the latest changes from main
git pull origin main

# Add the modified README
git add README.md

# Commit with a clear message
git commit -m "Fix: Update README with working image links"

# Push to main branch
git push origin main

echo "README has been updated with working image links!"
echo "Please check your GitHub repository to verify the changes."