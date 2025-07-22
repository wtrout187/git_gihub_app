#!/bin/bash

# Force pull and push script
echo "Resolving branch divergence..."

# Set git pull strategy to merge
git config pull.rebase false

# Force pull from main
git pull origin main --allow-unrelated-histories

# Update README with working images
echo "Updating README with working images..."

# Replace the screenshots section in README
sed -i '' 's/### Welcome Screen.*### Community Wiki.*<\/div>/### Welcome Screen\
![Welcome Screen](https:\/\/i.imgur.com\/8ZnGUYB.png)\
\
### Learning Dashboard\
![Dashboard](https:\/\/i.imgur.com\/JKHYfpL.png)\
\
### Interactive Lessons\
![Interactive Lessons](https:\/\/i.imgur.com\/pQW3hzS.png)\
\
### Community Wiki\
![Community Wiki](https:\/\/i.imgur.com\/L2XYtGR.png)\
\
<\/div>/s' README.md

# Add the modified README
git add README.md

# Commit with a clear message
git commit -m "Fix: Update README with working image links"

# Force push to main branch
git push origin main

echo "README has been updated with working image links!"
echo "Please check your GitHub repository to verify the changes."