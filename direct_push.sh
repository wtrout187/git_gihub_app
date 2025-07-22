#!/bin/bash

# Direct push script to ensure changes are pushed to GitHub
echo "Pushing changes directly to GitHub..."

# Add all changes
git add README.md
git add src/components/LessonViewer.jsx
git add src/components/CodingChallenge.jsx

# Commit with a clear message
git commit -m "Fix: Update README screenshots, lesson 4-1 video, and ensure lesson 1-1 coding challenge works"

# Force push to GitHub to ensure changes are applied
git push -f origin main

echo "Changes have been pushed to GitHub!"
echo "Please verify the following:"
echo "1. README now shows placeholder images"
echo "2. Lesson 4-1 video now uses a different YouTube URL"
echo "3. Lesson 1-1 coding challenge is properly defined"