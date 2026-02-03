# QuizMaster

> The ultimate quiz platform to test and expand your knowledge across multiple topics and difficulty levels.

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 🎯 Overview

QuizMaster is a modern, production-ready quiz application built with React, Vite, and Tailwind CSS. Challenge yourself with carefully curated questions across multiple topics, test your skills at different difficulty levels, and compete on our global leaderboard!

## ✨ Key Features

### 🧠 Smart Learning

- Comprehensive quiz questions across **6+ topics**
- Carefully crafted questions designed to test real knowledge
- Instant feedback with detailed explanations for every answer

### 🎚️ Difficulty Levels

- **Easy** - Perfect for beginners learning the basics
- **Moderate** - Challenge yourself with intermediate questions
- **Hard** - Master advanced topics and concepts

### 📊 Progress Tracking

- Real-time quiz progress indicator
- Immediate score feedback with percentage breakdown
- Answer review showing correct answers and explanations
- Performance comparison across different difficulty levels

### 🏆 Global Leaderboard

- Compete with quiz enthusiasts worldwide
- Filter leaderboard by topic or difficulty level
- Medal recognition for top 3 performers
- Detailed ranking with scores and completion dates

### 🎨 Modern Design

- Beautiful, responsive user interface
- Works seamlessly on desktop, tablet, and mobile
- Smooth animations and transitions
- Dark mode support (built-in with Tailwind CSS)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quiz-master

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📚 Available Topics

1. **Science** - General knowledge about physics, chemistry, and biology
2. **History** - Historical events, dates, and famous figures
3. **Technology** - Programming, computers, and modern tech
4. **Geography** - Countries, capitals, and world knowledge
5. **Literature** - Books, authors, and literary works
6. **Sports** - Athletic events, rules, and famous athletes

## 📋 How to Use

### Taking a Quiz

1. Navigate to the **Quiz** page from the home page
2. Select your preferred **Topic** from the 6 available options
3. Choose your **Difficulty Level** (Easy, Moderate, or Hard)
4. Click **Start Quiz** to begin
5. Answer each question by selecting one of the four options
6. Click **Next Question** to proceed
7. View your results with score breakdown and answer review

### Viewing the Leaderboard

1. Go to the **Leaderboard** page
2. View all scores or filter by:
   - **Topic** - See rankings for specific topics
   - **Difficulty Level** - Compare performance across difficulty levels
3. Check statistics including total entries, average score, and highest score

## 🛠️ Project Structure

```
quiz-master/
├── client/
│   ├── pages/
│   │   ├── Index.tsx          # Home page with features showcase
│   │   ├── Quiz.tsx           # Quiz interface with questions
│   │   ├── Leaderboard.tsx    # Global leaderboard
│   │   └── NotFound.tsx       # 404 page
│   ├── components/
│   │   ├── Layout.tsx         # Global layout with header/footer
│   │   └── ui/                # Pre-built Radix UI components
│   ├── App.tsx                # App entry point and routing
│   ├── global.css             # TailwindCSS theme and globals
│   └── vite-env.d.ts
├── public/                     # Static assets
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🎨 Customization

### Adding New Questions

Edit the `QUESTIONS_DATABASE` object in `client/pages/Quiz.tsx`:

```typescript
const QUESTIONS_DATABASE: Record<string, Record<string, Question[]>> = {
  science: {
    easy: [
      {
        id: 1,
        question: "Your question here?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0, // Index of correct answer
        explanation: "Explanation of why this is correct.",
      },
      // Add more questions...
    ],
  },
};
```

### Adding New Topics

1. Add a new topic to `TOPICS` array in `client/pages/Quiz.tsx`
2. Add corresponding questions to `QUESTIONS_DATABASE`
3. Update the topics section on the homepage if needed

### Customizing Colors

Edit `client/global.css` and `tailwind.config.ts` to change the color scheme:

```css
/* client/global.css */
:root {
  --primary: 262 80% 50%; /* Main accent color */
  --secondary: 28 95% 58%; /* Secondary color */
  /* ... other colors ... */
}
```

## 🚀 Building for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## 📊 Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 7.1
- **Styling**: TailwindCSS 3.4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Routing**: React Router 6
- **Language**: TypeScript
- **State Management**: React Hooks

## 🔧 Available Scripts

```bash
pnpm dev           # Start development server with hot reload
pnpm build         # Build for production
pnpm start         # Start production server
pnpm test          # Run Vitest tests
pnpm typecheck     # Run TypeScript type checking
pnpm format.fix    # Format code with Prettier
```

## 📱 Responsive Design

QuizMaster is fully responsive and tested on:

- Desktop (1920px and above)
- Tablet (768px to 1024px)
- Mobile (320px to 767px)

All features work seamlessly across all screen sizes!

## 🎓 Features in Development

- User authentication and profiles
- Persistent leaderboard with database
- Timed quizzes with countdown timer
- Quiz creation and sharing
- Advanced analytics and statistics
- Achievement badges and awards
- Social features and quiz sharing

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide React](https://lucide.dev/) - Beautiful icon library

## 📞 Support

For support, email support@quizmaster.app or open an issue in the repository.

---

<div align="center">

**Made with ❤️ by Quiz Master Team**

[Website](#) • [Twitter](#) • [Discord](#) • [Email](#)

</div>
