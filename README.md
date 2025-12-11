# Koenig Learning Portal

A modern, SCORM-compliant learner dashboard for IT certification courses. Built with Next.js 15, React 19, TypeScript, and TailwindCSS.

![Koenig Learning Portal](https://img.shields.io/badge/Koenig-Learning%20Portal-06b6d4?style=for-the-badge)

## Features

### Course Content
- **Module-based Learning**: Organized course content with expandable modules
- **Video Lessons**: Interactive video player with progress tracking
- **Auto-progression**: Automatically moves to next lesson after completion
- **Resume Support**: Pick up where you left off with saved progress

### Knowledge Checks
- **Module Quizzes**: Test your understanding after each module
- **Multiple Question Types**: Single choice, multiple choice, true/false
- **Instant Feedback**: See your score and review answers
- **Retry Support**: Retake quizzes to improve your score
- **Timer Support**: Optional time limits for quizzes

### Qubits Practice Tests
- **Randomized Questions**: Practice with randomly selected questions
- **Module Selection**: Choose specific modules to focus on
- **Progress Tracking**: Track your accuracy and improvement
- **Achievement Badges**: Request acclaim badges for high scores

### Progress Tracking
- **Real-time Progress**: Live updates as you complete content
- **Visual Dashboard**: See modules, lessons, and quiz completion
- **Time Tracking**: Monitor time spent learning
- **Score Analytics**: Track your quiz performance

### Additional Features
- **Resources Library**: Access study guides, lab environments, and more
- **Trainer Support**: Direct messaging to your assigned trainer
- **Certificate System**: Unlock certificate upon course completion
- **Exam Voucher**: View and manage included exam vouchers
- **Notifications**: Stay updated with reminders and achievements

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **State**: React Hooks

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development

```bash
# Run with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main learner dashboard
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── CourseHeader.tsx  # Course info banner
│   ├── TabNavigation.tsx # Content tabs
│   ├── ModuleList.tsx    # Course modules
│   ├── VideoPlayer.tsx   # Video player modal
│   ├── QuizModal.tsx     # Quiz interface
│   ├── QubitsSection.tsx # Practice tests
│   ├── ResourcesSection.tsx
│   ├── SupportSection.tsx
│   ├── CertificateSection.tsx
│   └── ProgressSidebar.tsx
├── data/
│   └── mockData.ts       # Sample data
├── lib/
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript definitions
```

## SCORM Compliance

This portal is designed with SCORM compatibility in mind:

- **Progress Tracking**: Tracks completion status for each lesson
- **Score Reporting**: Reports quiz scores and pass/fail status
- **Bookmark Support**: Saves last position in video content
- **Time Tracking**: Records time spent on each content item
- **Status Reporting**: Maintains not_started, in_progress, completed states

## Customization

### Adding Courses
Edit `src/data/mockData.ts` to add new courses, modules, and lessons.

### Styling
Modify `src/app/globals.css` and TailwindCSS classes for custom branding.

### Types
Extend types in `src/types/index.ts` for additional data structures.

## Screenshots

The portal includes:
- Course overview with progress indicators
- Interactive video player with completion tracking
- Quiz interface with instant scoring
- Qubits practice test system
- Resource library
- Trainer support messaging
- Certificate unlock system

## License

MIT License - Koenig Solutions

## Support

For support, contact support@koenig-solutions.com
