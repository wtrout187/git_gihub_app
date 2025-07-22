#!/bin/bash

# Simple script to fix the video in lesson 4-1
echo "Fixing video in lesson 4-1..."

# Set git pull strategy to merge
git config pull.rebase false

# Pull latest changes
git pull origin main

# Add the modified LessonViewer.jsx file
git add src/components/LessonViewer.jsx

# Commit with a clear message
git commit -m "Fix: Update video URL for lesson 4-1"

# Push to main branch
git push origin main

echo "Video URL has been updated for lesson 4-1!"
echo "Please check your app to verify the video now works."