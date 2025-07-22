#!/bin/bash

# Push script to update GitHub Actions to v4
echo "Updating GitHub Actions to use v4 of upload-pages-artifact..."

# Add the workflow file
git add .github/workflows/pages.yml

# Commit with a clear message
git commit -m "Fix: Update GitHub Actions to use v4 of upload-pages-artifact"

# Push to GitHub main branch
git push origin main

echo "Changes have been pushed to GitHub main branch!"
echo "GitHub Actions workflow now uses v4 of upload-pages-artifact"