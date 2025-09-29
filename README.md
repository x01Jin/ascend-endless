# Ascend: The Endless File Explorer

<div align="center">
  <p><strong>A minimalist web-based concept that turns file system navigation into an exploration of memory</strong></p>

  <p>
    <a href="https://x01jin.github.io/ascend-endless/">
      <img src="https://img.shields.io/badge/▶️%20Try%20it%20Out!-blue?style=for-the-badge" alt="Try it out!" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status">
    <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
    <img src="https://img.shields.io/badge/platform-web-yellow" alt="Platform">
  </p>
</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [💡 Concept](#-concept)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🛠 Technology Stack](#-technology-stack)
- [🔧 Development Setup](#-development-setup)
- [🧩 Concept Mechanics](#-concept-mechanics)
- [🤝 Contributing](#-contributing)
- [👏 Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Ascend** is a minimalist web-based concept that transforms file system navigation into an engaging memory exploration. Users navigate through procedurally generated directory trees of increasing complexity, searching for a hidden **ascend.exe** file to progress to the next level.

The concept explores spatial memory and navigation skills as each level creates deeper, more complex directory structures. Users must remember paths, avoid dead ends, and maintain focus to find the target file before the cognitive load becomes overwhelming.

---

## 💡 Concept

### The Core Experience

1. **Start**: Begin on a desktop with a "File Explorer" icon
2. **Navigate**: Click through procedurally generated folder structures
3. **Search**: Look for the hidden **ascend.exe** file in the deepest level
4. **Progress**: Execute the file to advance to the next iteration
5. **Exploration**: Each level increases complexity with deeper nesting
6. **Progress Tracking**: Track your highest iteration reached

### Key Interactions

- **Folder Navigation**: Click folders to explore deeper levels
- **File Discovery**: Double-click text files to read random content
- **Progression**: Execute **ascend.exe** to advance to the next level
- **Progress Tracking**: Automatic saving of your highest iteration

---

## ✨ Features

### 🎲 Procedural Generation

- **Dynamic Directory Trees**: Each iteration creates unique file structures
- **Scaling Complexity**: Depth and breadth increase with each level
- **Random Content**: Text files contain procedurally generated content
- **Hidden Target**: The **ascend.exe** file is randomly placed in deep folders

### 💾 Persistence

- **Local Storage**: progress persists across browser sessions
- **Progress Tracking**: Records your highest iteration reached
- **Graceful Recovery**: Handles corrupted save data

### 🎨 User Interface

- **Desktop Metaphor**: Familiar file explorer interface
- **Material Design 3**: Modern dark theme with custom styling
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

### 🔧 Technical Features

- **Vanilla JavaScript**: No external frameworks required
- **ES6 Modules**: Clean code organization and separation
- **Event-Driven**: Custom event system for component communication
- **Lightweight**: Optimized for fast loading and smooth performance

---

## 🚀 Quick Start

### Running the Concept

#### Option 1: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000
# Then open http://localhost:8000

# Using Node.js
npx serve .
```

#### Option 2: Live Deployment

Deploy to any static hosting service:

- **GitHub Pages**: Direct deployment support
- **Netlify**: Drag and drop deployment
- **Vercel**: Zero configuration required

---

## 📁 Project Structure

```directory
ascend/
├── index.html              # Main HTML entry point
├── README.md               # This documentation
├── LICENSE                 # MIT license file
├── .gitignore              # Git ignore patterns
└── src/                    # Source code modules
    ├── main.js                 # Application bootstrap and coordination
    ├── modules/                # Core game logic
    │   ├── desktop.js                # Desktop interface management
    │   ├── directory-generator.js    # Procedural directory creation
    │   ├── file-explorer.js          # File system navigation UI
    │   ├── game-state.js             # Game state and persistence
    │   ├── text-editor.js            # Text file viewer
    │   ├── ui.js                     # Shared UI components
    │   └── wallpaper.js              # Desktop background
    └── styles/                       # Styling and themes
        ├── variables.css             # Material Design 3 color variables
        ├── desktop.css               # Desktop interface styles
        ├── file-explorer.css         # File explorer styling
        └── text-editor.css           # Text editor appearance
```

### Architecture

- **Modular Design**: Each module handles a specific game aspect
- **Event Communication**: Components communicate via custom events
- **Clean Separation**: UI, logic, and state management are distinct
- **Maintainable**: Easy to extend and modify

---

## 🛠 Technology Stack

### Core Technologies

- **HTML5**: Modern semantic markup
- **CSS3**: Custom Material Design 3 implementation with CSS variables
- **Vanilla ES6 JavaScript**: Pure JavaScript without frameworks

### External Resources

- **Font Awesome 6.4.0**: Icons for UI elements
- **Google Fonts**: Inter font family for typography
- **Material Design 3**: Color system and design tokens (custom implementation)

### Dependencies

The project uses **no build process** and minimal external dependencies. All styling is custom CSS implementing Material Design 3 principles.

---

## 🔧 Development Setup

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE
- Optional: Local web server for development

### Getting Started

1. **Clone or download** the project files
2. **Start a local server** (optional but recommended):

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if available)
   npx serve .
   ```

3. **Open browser** to `http://localhost:8000` or open `index.html` directly
4. **Start exploring** - It runs entirely in the browser

### Development Notes

- All changes are reflected immediately (no build process)
- Use browser DevTools for debugging
- Check localStorage to inspect game state
- All source code is in the `src/` directory

---

## 🧩 Concept Mechanics

### Procedural Generation

The directory generation algorithm:

- **Increases Depth**: Each level adds more nested folders
- **Random Structure**: Creates varied branching patterns
- **Guaranteed Solution**: The **ascend.exe** file is always reachable
- **Balanced Exploration**: Gradually increases difficulty

### State Management

- **Browser Storage**: Uses localStorage API for persistence
- **Real-time Saving**: Progress saved immediately on ascension
- **Error Handling**: Graceful recovery from corrupted data
- **Cross-session**: Maintains progress across browser restarts

### Event System

Custom event-driven architecture:

- **Navigation Events**: Handle folder traversal
- **Concept Events**: Manage level progression
- **UI Events**: Coordinate interface updates
- **State Events**: Trigger concept logic changes

---

## 🤝 Contributing

Contributions are welcome for improvement!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your improvements
4. **Test** thoroughly
5. **Submit** a pull request

### Contribution Ideas

- **New Features**: Additional game modes or mechanics
- **UI Polish**: Visual improvements and animations
- **Performance**: Optimization for larger directory trees
- **Accessibility**: Enhanced screen reader support
- **Mobile**: Touch-friendly interface improvements
- **Content**: More varied text file content

### Guidelines

- Follow existing code patterns and style
- Test new features don't break existing functionality
- Update documentation for significant changes
- Consider performance impact of additions

---

## 👏 Acknowledgments

### Resources Used

- **Font Awesome**: Beautiful icons for the interface
- **Google Fonts**: Inter typeface for improved readability
- **Material Design 3**: Design system inspiration and color tokens

### Design Philosophy

Built with the principle that engaging experiences can emerge from simple mechanics, carefully crafted and thoughtfully implemented.

---

<div align="center">
  <p><strong>Ready to test your file system navigation skills?</strong></p>
  <p>🌟 <a href="#-quick-start">Get Started</a> | 📖 <a href="#-concept">Learn to Explore</a> | 🤝 <a href="#-contributing">Contribute</a></p>
</div>
