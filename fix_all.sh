#!/bin/bash

echo "Fixing GitHub Pages and PNG issues"
echo "=================================="

# Create screenshots directory if it doesn't exist
mkdir -p public/screenshots

# Create placeholder PNG files
echo "Creating placeholder PNG files..."
convert -size 800x450 gradient:blue-purple public/screenshots/WelcomeG\&GA.png
convert -size 800x450 gradient:green-blue public/screenshots/DashboardG\&GA.png
convert -size 800x450 gradient:purple-pink public/screenshots/InteractiveLessonG\&GA.png
convert -size 800x450 gradient:orange-yellow public/screenshots/WikiG\&GA.png

# If ImageMagick is not available, create empty files
if [ $? -ne 0 ]; then
  echo "ImageMagick not found, creating empty PNG files..."
  touch public/screenshots/WelcomeG\&GA.png
  touch public/screenshots/DashboardG\&GA.png
  touch public/screenshots/InteractiveLessonG\&GA.png
  touch public/screenshots/WikiG\&GA.png
fi

# Switch to main branch
git checkout main

# Add the new files
git add public/screenshots/
git commit -m "Add placeholder screenshot PNG files"

# Build the project
npm run build

# Switch to gh-pages branch
git checkout gh-pages

# Copy the built files
cp -r dist/* .
cp -r dist/.* . 2>/dev/null || :

# Make sure the screenshots directory exists in gh-pages
mkdir -p screenshots
cp -r public/screenshots/* screenshots/

# Update image paths in README.md to use absolute URLs
sed -i '' 's|src="public/screenshots/|src="https://wtrout187.github.io/git_gihub_app/screenshots/|g' README.md

# Add all changes
git add .
git commit -m "Fix PNG paths and re-deploy after visibility change"

# Push changes
git push origin gh-pages

# Switch back to main branch
git checkout main

echo ""
echo "All fixes applied!"
echo "Please wait a few minutes for GitHub Pages to update."
echo "Your site should be available at: https://wtrout187.github.io/git_gihub_app/"
echo ""
echo "Note: Security alerts in GitHub may take some time to update."
echo "You can manually dismiss them if you've verified the fixes."