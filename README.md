# 🧠 Memory Matching Game

A fun and challenging memory matching game built with React, TypeScript, and Vite. Test your memory skills by matching pairs of adorable animal emojis within a 2-minute time limit!

## 🎮 Game Features

- **10 Unique Animal Pairs**: Match cute animal emojis including dogs, cats, foxes, bears, and more
- **2-Minute Challenge**: Race against time with a countdown timer
- **Visual Feedback**: Cards flip with smooth animations and color changes
- **Game Statistics**: Track your moves, matches, and remaining time
- **Win/Lose Conditions**: Celebrate victory or try again after time runs out
- **Responsive Design**: Beautiful gradient UI that works on all devices
- **Game Controls**: New Game and Reset buttons for easy gameplay management

## 🚀 How to Play

1. Click on any card to flip it and reveal the animal emoji
2. Click on a second card to find its matching pair
3. If the cards match, they stay flipped and turn green
4. If they don't match, they flip back after a short delay
5. Match all 10 pairs before the 2-minute timer runs out to win!
6. Use the "New Game" button to start fresh or "Reset" to restart the current game

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📦 Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd memory-matching-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Game Rules

- **Objective**: Match all 10 pairs of animal emojis
- **Time Limit**: 2 minutes (120 seconds)
- **Scoring**: Track your moves and try to complete with fewer moves
- **Warning**: Timer turns red and pulses when 30 seconds or less remain
- **Game Over**: If time runs out, a game over modal appears with your stats
- **Victory**: Complete all matches to see your winning time and move count

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features Highlights

- **Smooth Animations**: Cards flip with CSS transitions
- **Visual States**: Different colors for flipped, matched, and unmatched cards
- **Responsive Grid**: 5x4 grid layout that adapts to screen sizes
- **Modern UI**: Clean design with shadows, gradients, and hover effects
- **Accessibility**: Proper button states and keyboard navigation support

## 🏆 Challenge Yourself

Try to:
- Complete the game in the fewest moves possible
- Beat your previous time records
- Challenge friends to see who can complete it faster
- Play multiple rounds to improve your memory skills

Enjoy the game and have fun testing your memory! 🎉
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
