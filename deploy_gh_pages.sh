#!/bin/bash

echo "Deploying Git & GitHub Mastery App to GitHub Pages"
echo "================================================="

# Create a dist directory if it doesn't exist
mkdir -p dist

# Copy the screenshots to the dist directory
mkdir -p dist/screenshots
cp -r public/screenshots/* dist/screenshots/

# Copy the README.md to the dist directory
cp README.md dist/

# Create a simple index.html that redirects to GitHub repository
cat > dist/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Git & GitHub Mastery App</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #4299e1, #667eea);
      color: #2d3748;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    .container {
      background-color: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      width: 100%;
    }
    h1 {
      margin-top: 0;
      color: #2d3748;
    }
    p {
      color: #4a5568;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      background-color: #4299e1;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #3182ce;
    }
    .screenshots {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .screenshot {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .screenshot img {
      width: 100%;
      height: auto;
      display: block;
    }
    .screenshot-title {
      background-color: #f7fafc;
      padding: 10px;
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Git & GitHub Mastery App</h1>
    <p>An interactive learning platform that teaches Git fundamentals, branching strategies, GitHub collaboration, and AI-assisted development through hands-on lessons and practical exercises.</p>
    <a href="https://github.com/wtrout187/git_gihub_app" class="btn">View on GitHub</a>
    
    <div class="screenshots">
      <div class="screenshot">
        <div class="screenshot-title">Welcome Screen</div>
        <img src="./screenshots/WelcomeG&GA.png" alt="Welcome Screen">
      </div>
      <div class="screenshot">
        <div class="screenshot-title">Learning Dashboard</div>
        <img src="./screenshots/DashboardG&GA.png" alt="Dashboard">
      </div>
      <div class="screenshot">
        <div class="screenshot-title">Interactive Lessons</div>
        <img src="./screenshots/InteractiveLessonG&GA.png" alt="Interactive Lessons">
      </div>
      <div class="screenshot">
        <div class="screenshot-title">Community Wiki</div>
        <img src="./screenshots/WikiG&GA.png" alt="Community Wiki">
      </div>
    </div>
  </div>
</body>
</html>
EOF

# Create a 404.html page
cat > dist/404.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Git & GitHub Mastery App</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #4299e1, #667eea);
      color: #2d3748;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    .container {
      background-color: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      width: 100%;
    }
    h1 {
      margin-top: 0;
      color: #2d3748;
    }
    p {
      color: #4a5568;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      background-color: #4299e1;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #3182ce;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    <a href="/" class="btn">Go to Homepage</a>
  </div>
</body>
</html>
EOF

# Switch to gh-pages branch
git checkout gh-pages

# Remove existing files
rm -rf *.html *.js *.css *.json *.svg *.png assets screenshots

# Copy dist contents to root
cp -r dist/* .
cp -r dist/.* . 2>/dev/null || :

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

echo ""
echo "Deployment complete!"
echo "Your site should be available at: https://wtrout187.github.io/git_gihub_app/"
echo ""
echo "Note: It may take a few minutes for the changes to propagate."