#!/bin/bash

echo "Creating screenshot files and updating GitHub Pages"
echo "=================================================="

# Create screenshots directory if it doesn't exist
mkdir -p public/screenshots

# Create placeholder PNG files
echo "Creating placeholder PNG files..."

# First create SVG files
echo "Creating SVG files..."

# Welcome Screen
cat > public/screenshots/WelcomeG\&GA.svg << EOF
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4299e1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#667eea;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#grad1)"/>
  <rect x="150" y="100" width="500" height="250" rx="10" fill="white" opacity="0.9"/>
  <text x="400" y="200" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" fill="#2d3748">Git & GitHub Mastery App</text>
  <text x="400" y="250" font-family="Arial" font-size="24" text-anchor="middle" fill="#4a5568">Welcome Screen</text>
</svg>
EOF

# Dashboard
cat > public/screenshots/DashboardG\&GA.svg << EOF
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#48bb78;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#38b2ac;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#grad2)"/>
  <rect x="50" y="80" width="700" height="300" rx="10" fill="white" opacity="0.9"/>
  <text x="400" y="200" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" fill="#2d3748">Learning Dashboard</text>
  <rect x="150" y="250" width="150" height="80" rx="5" fill="#ebf8ff"/>
  <rect x="325" y="250" width="150" height="80" rx="5" fill="#e6fffa"/>
  <rect x="500" y="250" width="150" height="80" rx="5" fill="#faf5ff"/>
</svg>
EOF

# Interactive Lesson
cat > public/screenshots/InteractiveLessonG\&GA.svg << EOF
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9f7aea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ed64a6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#grad3)"/>
  <rect x="100" y="100" width="600" height="250" rx="10" fill="white" opacity="0.9"/>
  <text x="400" y="150" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" fill="#2d3748">Interactive Lessons</text>
  <rect x="150" y="180" width="500" height="120" rx="5" fill="#2d3748"/>
  <text x="400" y="240" font-family="Arial" font-size="18" text-anchor="middle" fill="#e2e8f0">git checkout -b feature/login</text>
</svg>
EOF

# Wiki
cat > public/screenshots/WikiG\&GA.svg << EOF
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ed8936;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f56565;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#grad4)"/>
  <rect x="50" y="80" width="200" height="300" rx="10" fill="white" opacity="0.9"/>
  <rect x="270" y="80" width="480" height="300" rx="10" fill="white" opacity="0.9"/>
  <text x="150" y="120" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#2d3748">Categories</text>
  <text x="510" y="120" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" fill="#2d3748">Community Wiki</text>
</svg>
EOF

# Try to convert SVG to PNG using different methods
echo "Converting SVG to PNG..."

# Method 1: Try using convert from ImageMagick
if command -v convert &> /dev/null; then
  convert public/screenshots/WelcomeG\&GA.svg public/screenshots/WelcomeG\&GA.png
  convert public/screenshots/DashboardG\&GA.svg public/screenshots/DashboardG\&GA.png
  convert public/screenshots/InteractiveLessonG\&GA.svg public/screenshots/InteractiveLessonG\&GA.png
  convert public/screenshots/WikiG\&GA.svg public/screenshots/WikiG\&GA.png
  echo "Created PNG files using ImageMagick"
# Method 2: Try using rsvg-convert
elif command -v rsvg-convert &> /dev/null; then
  rsvg-convert -w 800 -h 450 public/screenshots/WelcomeG\&GA.svg > public/screenshots/WelcomeG\&GA.png
  rsvg-convert -w 800 -h 450 public/screenshots/DashboardG\&GA.svg > public/screenshots/DashboardG\&GA.png
  rsvg-convert -w 800 -h 450 public/screenshots/InteractiveLessonG\&GA.svg > public/screenshots/InteractiveLessonG\&GA.png
  rsvg-convert -w 800 -h 450 public/screenshots/WikiG\&GA.svg > public/screenshots/WikiG\&GA.png
  echo "Created PNG files using rsvg-convert"
# Method 3: If no conversion tools available, just copy SVG files with PNG extension
else
  echo "No SVG to PNG conversion tools found. Using SVG files with PNG extension."
  cp public/screenshots/WelcomeG\&GA.svg public/screenshots/WelcomeG\&GA.png
  cp public/screenshots/DashboardG\&GA.svg public/screenshots/DashboardG\&GA.png
  cp public/screenshots/InteractiveLessonG\&GA.svg public/screenshots/InteractiveLessonG\&GA.png
  cp public/screenshots/WikiG\&GA.svg public/screenshots/WikiG\&GA.png
fi

# Update README to use relative paths for GitHub Pages
sed -i '' 's|src="public/screenshots/|src="./screenshots/|g' README.md

# Add the files to git
git add public/screenshots/
git add README.md
git commit -m "Add screenshot images and update README paths"

# Instructions for deploying
echo "\nTo push these changes to GitHub, run:\ngit push origin main\n"
echo "Then to deploy to GitHub Pages, run:\n./deploy.sh"

echo ""
echo "Screenshot files created and README updated!"
echo "Now you can commit and push these changes to GitHub."
echo ""
echo "To deploy to GitHub Pages, run:"
echo "./deploy.sh"