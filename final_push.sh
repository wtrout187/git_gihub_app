#!/bin/bash

# Final push script to ensure changes are pushed to GitHub
echo "Pushing changes to GitHub main branch..."

# Add specific files
git add README.md
git add src/components/LessonViewer.jsx

# Commit with a clear message
git commit -m "Fix: Update README screenshots and lesson 4-1 video"

# Push to GitHub main branch
git push origin main

echo "Changes have been pushed to GitHub main branch!"
echo "Please verify the following:"
echo "1. README now shows the actual screenshots from your local project"
echo "2. Lesson 4-1 video now uses a different YouTube URL (https://www.youtube.com/embed/Lf3DYRvCPFo)"