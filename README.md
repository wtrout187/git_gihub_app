# Git & GitHub Mastery App

<div align="center">

![Git & GitHub Mastery App](https://img.shields.io/badge/Git%20%26%20GitHub-Mastery-blue?style=for-the-badge&logo=git)

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An interactive learning platform that teaches Git fundamentals, branching strategies, GitHub collaboration, and AI-assisted development through hands-on lessons and practical exercises. Built with React 18, Vite, and Tailwind CSS, this app provides a comprehensive learning experience for developers of all skill levels.

[View Demo](https://github.com/wtrout187/git_gihub_app) • [Report Bug](https://github.com/wtrout187/git_gihub_app/issues) • [Request Feature](https://github.com/wtrout187/git_gihub_app/issues)

</div>

## 🚀 Features

- **Interactive Learning Modules**: 4 comprehensive courses covering Git fundamentals to AI-assisted development
- **Video Tutorials**: Integrated video lessons for visual learners with each module
- **Interactive Terminal**: Hands-on practice with simulated command-line exercises and real-time feedback
- **Coding Exercises**: Interactive exercises to test your understanding with immediate feedback
- **Progress Tracking**: Monitor your learning journey with achievements and progress indicators
- **Personalized Experience**: Customized learning paths based on your experience level and goals
- **Modern UI**: Beautiful, fully responsive interface with Instagram-like feel, gradient backgrounds, dynamic theming and animations for all devices
- **AI Integration**: Learn modern AI-assisted development workflows
- **Comprehensive Resources**: In-depth Git and GitHub documentation, cheat sheets, and command reference
- **Visual Learning Path**: Clear visualization of your learning journey and progress
- **Community Wiki**: User-contributed tips, tricks, and resources for collaborative learning
- **Security Features**: Built-in protection for user data and content

## 📚 Course Structure

### 1. Git Fundamentals
- What is Git and version control
- Setting up Git configuration
- Creating repositories
- Understanding the Git workflow
- Making commits and viewing history
- Working with .gitignore
- Undoing changes and managing history
- Git best practices and workflows

### 2. Branching Mastery
- Understanding branches and their importance
- Creating and switching branches
- Merging and handling conflicts
- Advanced techniques (rebasing, cherry-picking)
- Branch management and cleanup
- Git Flow and GitHub Flow strategies
- Trunk-based development
- Feature flags and branch strategies

### 3. GitHub Collaboration
- Working with remote repositories
- Pull requests and code reviews
- Issues and project management
- Collaborative workflows
- GitHub Actions basics
- Open source contribution
- GitHub Projects and organization
- Security features and best practices

### 4. AI-Assisted Development
- AI tools for Git workflows
- AI-generated commit messages
- Code review assistance
- Integration with modern AI tools
- Best practices for AI + Git
- GitHub Copilot integration
- AI-powered documentation
- Future of AI in version control

## 📖 Comprehensive Resources

### Git Cheat Sheet
- Quick reference for all common Git commands
- Organized by workflow and use case
- Copy-to-clipboard functionality
- Links to official Git documentation
- Printable format for easy reference

### GitHub Cheat Sheet
- Quick reference for GitHub features and workflows
- Repository management, pull requests, and issues
- GitHub Actions, Pages, and Projects
- Keyboard shortcuts and pro tips
- Printable format for easy reference

### GitHub Documentation
- Curated links to official GitHub guides
- Organized by topic and feature
- Learning resources and tutorials
- Best practices and tips

### Command Reference
- Detailed explanation of Git commands
- Examples with expected output
- Advanced usage and options
- Searchable interface

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm
- **Security**: Content Security Policy, Input Sanitization, Secure Storage

## 🔒 Security Features

The Git & GitHub Mastery App includes several security features to protect users:

- **Content Security Policy (CSP)**: Prevents XSS attacks by controlling which resources can be loaded
- **Input Sanitization**: All user inputs are sanitized to prevent injection attacks
- **Secure Storage**: User data is encrypted before being stored in localStorage
- **Content Validation**: Wiki contributions are validated to ensure they don't contain malicious code
- **Rate Limiting**: Prevents abuse of API endpoints
- **Session Integrity**: Checks for session hijacking attempts

## 🏗️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wtrout187/git_gihub_app.git
   cd git_gihub_app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

### Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview the production build locally**:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

3. **Push to GitHub**:
   ```bash
   # Using the provided push script
   ./push_to_github.sh
   ```

4. **Deploy to GitHub Pages**:
   ```bash
   # Using the provided deployment script
   ./deploy.sh
   
   # Or manually
   npm run build
   # Then deploy the dist folder to GitHub Pages
   ```

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
git-github-mastery-app/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── LessonViewer.jsx
│   │   ├── InteractiveTerminal.jsx
│   │   ├── InteractiveExercise.jsx
│   │   ├── CodingChallenge.jsx
│   │   ├── OnboardingScreen.jsx
│   │   ├── UserWiki.jsx
│   │   └── WelcomeScreen.jsx
│   ├── resources/
│   │   ├── GitCheatSheet.jsx
│   │   ├── GitDocs.jsx
│   │   ├── GitHubCheatSheet.jsx
│   │   ├── GitHubDocs.jsx
│   │   └── CommandReference.jsx
│   ├── data/
│   │   └── lessons.js
│   ├── utils/
│   │   └── security.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── pull_request_template.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── deploy.sh
├── push_to_github.sh
└── README.md
```

## 🎯 Learning Objectives

By completing this course, you will:

- Master Git version control fundamentals with hands-on practice
- Understand advanced branching strategies and when to use them
- Learn collaborative development with GitHub and team workflows
- Implement modern AI-assisted development techniques
- Gain practical experience with real-world Git scenarios and challenges
- Build confidence in managing complex Git operations and resolving conflicts
- Access comprehensive reference materials for ongoing learning
- Develop a personalized workflow that matches your development style

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📸 Screenshots

<div align="center">

### Welcome Screen
<img src="./public/screenshots/WelcomeG&GA.png" alt="Welcome Screen" width="800">

### Learning Dashboard
<img src="./public/screenshots/DashboardG&GA.png" alt="Dashboard" width="800">

### Interactive Lessons
<img src="./public/screenshots/InteractiveLessonG&GA.png" alt="Interactive Lessons" width="800">

### Community Wiki
<img src="./public/screenshots/WikiG&GA.png" alt="Community Wiki" width="800">

</div>

## 💡 Roadmap

- [x] Add more interactive exercises and coding challenges
- [x] Add AI-assisted learning features
- [x] Expand the community wiki with more resources
- [x] Enhance UI with Instagram-like feel and modern design
- [x] Add real-time likes and comments functionality for community interaction
- [ ] Implement user authentication and cloud progress saving
- [ ] Create a mobile app version
- [ ] Support for multiple languages
- [ ] Add GitHub OAuth integration
- [ ] Create a real-time collaboration feature

## 🙏 Acknowledgments

- Built with modern React and Vite
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by the need for practical Git education
- Proudly part of the [AI Masters Community](https://www.skool.com/edward-honour) by Edward Honour
- **Created by [Wayne Trout](https://github.com/wtrout187)** as a portfolio project

## ❤️ Support the Project

If you find this project helpful, please consider:

- Giving it a star on GitHub ⭐
- Sharing it with friends and colleagues
- Contributing to the project

<a href="https://www.buymeacoffee.com/waynetrout" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
</a>

## 📞 Support & Feedback

If you have questions, need help, or want to provide feedback:
- Email us at troutwayne@gmail.com
- Open an issue on GitHub
- Check our documentation
- Join our community discussions

---

**Happy Learning! 🎉**

Master Git & GitHub like a pro and elevate your development workflow with AI-assisted tools.

© 2024 Wayne Trout. All rights reserved.