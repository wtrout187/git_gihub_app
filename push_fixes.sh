#!/bin/bash

echo "Pushing security fixes and practice module fixes to GitHub"
echo "========================================================"

# Add all changes
git add src/utils/security.js
git add src/components/UserWiki.jsx
git add .github/workflows/ci.yml
git add src/components/CodingChallenge.jsx
git add src/components/InteractiveExercise.jsx
git add src/components/LessonViewer.jsx

# Commit the changes
git commit -m "Fix security issues and practice module blue screen problems"

# Push to GitHub
git push origin main

echo ""
echo "Changes pushed successfully!"
echo ""
echo "Summary of fixes:"
echo "1. Fixed regex pattern in security.js to properly match script and iframe tags"
echo "2. Replaced dangerouslySetInnerHTML with safe React components in UserWiki.jsx"
echo "3. Added explicit permissions to GitHub Actions workflow"
echo "4. Fixed blue screen issues in practice modules for lessons 2-1, 3-1, and 4-1"
echo "   - Added missing ArrowRight icon import in CodingChallenge.jsx"
echo "   - Added fallback colors in InteractiveExercise.jsx and CodingChallenge.jsx"
echo "   - Added container div in LessonViewer.jsx"