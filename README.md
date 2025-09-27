# Ascend: The Endless File Explorer

<div align="center">
  <p><strong>A minimalist web-based game that turns file system navigation into a challenge of memory</strong></p>

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
- [🎮 Gameplay](#-gameplay)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🛠 Technology Stack](#-technology-stack)
- [🔧 Development Setup](#-development-setup)
- [🎯 Game Mechanics](#-game-mechanics)
- [🤝 Contributing](#-contributing)
- [🔮 Future Enhancements](#-future-enhancements)
- [👏 Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Ascend** is a unique minimalist web-based game that transforms the mundane task of file system navigation into an engaging psychological challenge. Players must dive into ever-expanding procedural directory trees, hunting for a single elusive file—**ascend.exe**.

What makes this game special is its ability to turn a simple interface into an increasingly complex mental challenge. Each successful ascent doesn't just increase the difficulty—it fundamentally changes how you perceive and interact with file systems. The game cleverly exploits our cognitive patterns, memory limitations, and navigation strategies, making each playthrough a unique psychological experiment.

---

## 🎮 Gameplay

### The Core Loop

1. **Initiation**: Begin on a simulated desktop with a single "File Explorer" icon
2. **Exploration**: Navigate through procedurally generated directory structures
3. **Discovery**: Search for the elusive **ascend.exe** file hidden within the tree
4. **Ascension**: Execute the file to progress to the next iteration
5. **Escalation**: Each level introduces larger, more complex directory structures
6. **Persistence**: Track your highest iteration when you eventually exit

### Key Interactions

- **Directory Navigation**: Click folders to traverse deeper into the hierarchy
- **File Interaction**: Double-click files to open them in appropriate viewers
- **Text File Discovery**: Encounter procedurally generated content with cryptic messages
- **Progress Tracking**: Automatic saving of your highest achieved iteration

---

## ✨ Features

### 🎲 Procedural Generation

- **Dynamic Directory Trees**: Each iteration creates unique file system structures
- **Intelligent Scaling**: Complexity increases exponentially with each ascent
- **Content Variety**: Text files contain randomly generated lore, hints, and nonsense

### 💾 Persistence & State Management

- **Local Storage Integration**: Game state persists across browser sessions
- **Achievement Tracking**: Automatic recording of highest iteration reached
- **Graceful State Recovery**: Robust error handling for corrupted save data

### 🎨 User Interface

- **Clean Desktop Metaphor**: Familiar file explorer interface
- **Modal Window System**: Layered interface for different contexts
- **Responsive Design**: Adapts to various screen sizes
- **Modern Typography**: Google Fonts integration for enhanced readability

### 🔧 Technical Excellence

- **Framework-Free Architecture**: Pure vanilla JavaScript, HTML, and CSS
- **ES6 Module System**: Modern JavaScript with clean separation of concerns
- **Event-Driven Architecture**: Custom event system for component communication
- **Memory Efficient**: Optimized performance for complex directory structures

---

## 🚀 Quick Start

### Option 1: Local Development Server

```bash
# Using Python (recommended)
python -m http.server 8000
# Navigate to http://localhost:8000

# Using Node.js (if available)
npx serve .
# Or
npm run dev
```

### Option 2: Direct File Access

Simply open `index.html` in your web browser. The game runs entirely in the browser with no server requirements.

### Option 3: Live Deployment

The game is designed to work on static hosting platforms:

- **GitHub Pages**: Perfect compatibility
- **Netlify**: Zero-configuration deployment
- **Vercel**: Instant deployment
- **Any static host**: No build process required

---

## 📁 Project Structure

```structure
ascend/
├── index.html          # Main HTML entry point
├── main.js             # Application bootstrap and event coordination
├── README.md           # This file
├── plan/               # Development planning documents
│   └── plan.md         # Project roadmap and specifications
└── src/                # Source code organization
    ├── modules/                     # Core game logic modules
    │   ├── desktop.js               # Desktop interface management
    │   ├── directory-generator.js   # Procedural directory creation
    │   ├── file-explorer.js         # File system navigation UI
    │   ├── game-state.js            # Game state and persistence
    │   ├── text-editor.js           # Text file viewing/editing
    │   └── ui.js                    # Shared UI components
    └── styles/                      # CSS styling organization
        ├── desktop.css              # Desktop interface styles
        ├── file-explorer.css        # File explorer styling
        └── text-editor.css          # Text editor appearance
```

### Architecture Highlights

- **Modular Design**: Each module handles a specific aspect of the game
- **Event-Driven Communication**: Components communicate through custom events
- **Separation of Concerns**: Clear boundaries between UI, logic, and state
- **Extensible Structure**: Easy to add new features or modify existing ones

---

## 🛠 Technology Stack

### Core Technologies

- **HTML5**: Semantic markup with modern standards
- **CSS3**: Advanced styling with flexbox and grid
- **Vanilla ES6 JavaScript**: Modern JavaScript without frameworks

### External Dependencies

- **Bootstrap 5.3.8**: Utility-first CSS framework for responsive design
- **Material Web Components**: Google's material design component library
- **Font Awesome 6.4.0**: Icon library for enhanced UI elements
- **Google Fonts**: Inter and Roboto Mono for improved typography
- **Prism.js**: Syntax highlighting for code content in text files

---

## 🔧 Development Setup

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)
- Text editor or IDE

### Getting Started (Development)

1. **Clone or download** the project files
2. **Start a local server**:

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js
   npx serve .
   ```

3. **Open browser** and navigate to `http://localhost:8000`
4. **Start developing** - all changes are reflected immediately

### Development Tools

- **Live Server**: VS Code extension for automatic reloading
- **Browser DevTools**: For debugging and performance analysis
- **Local Storage Inspector**: To examine game state persistence

---

## 🎯 Game Mechanics

### Procedural Generation Algorithm

The directory generation system uses a sophisticated algorithm that:

- **Scales Complexity**: Each iteration increases depth and branching factor
- **Maintains Playability**: Ensures the target file is always reachable
- **Generates Variety**: Creates unique structures each time
- **Balances Challenge**: Gradually increases difficulty without frustration

### State Management

- **Persistent Storage**: Uses browser localStorage API
- **Graceful Degradation**: Handles corrupted or missing save data
- **Real-time Updates**: Immediate saving of progress
- **Cross-session Continuity**: Maintains progress across browser restarts

### Event System

The application uses a custom event-driven architecture:

- **Window Events**: Coordinate between different UI layers
- **State Events**: Trigger game logic updates
- **UI Events**: Handle user interactions
- **Error Events**: Manage exception handling gracefully

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to the branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Contribution Guidelines

- **Code Style**: Follow existing patterns and conventions
- **Testing**: Ensure new features don't break existing functionality
- **Documentation**: Update README and comments as needed
- **Performance**: Consider the impact on game performance
- **Accessibility**: Maintain keyboard navigation support

### Areas for Contribution

- **New Game Modes**: Alternative challenge types
- **UI Enhancements**: Visual improvements and polish
- **Performance Optimizations**: Faster directory generation
- **Accessibility Features**: Better support for screen readers
- **Mobile Responsiveness**: Touch-friendly interface
- **Additional Content**: More varied text file content

---

## 🔮 Future Enhancements

### Technical Improvements

- **Service Worker**: Offline functionality
- **Progressive Web App**: Install as native app
- **Performance Monitoring**: Built-in analytics
- **Code Splitting**: Lazy loading for faster initial load
- **TypeScript Migration**: Enhanced type safety

### Content Expansion

- **More File Types**: Images, audio, and other media files
- **Rich Text Content**: Markdown and formatted text support
- **Interactive Elements**: Clickable links and embedded content
- **Dynamic Content**: Context-aware file generation

---

## 👏 Acknowledgments

### Technologies & Libraries

- **Bootstrap**: For the responsive design system
- **Material Web Components**: For enhanced UI elements
- **Font Awesome**: For the beautiful iconography
- **Google Fonts**: For the typography
- **Prism.js**: For syntax highlighting

### Inspiration

This project draws inspiration from classic minimalist games and experimental software that challenge our relationship with technology interfaces.

### Development Philosophy

Built with the belief that sometimes the most engaging experiences come from the simplest mechanics, carefully crafted and refined.

---

<div align="center">
  <p><strong>Ready to get lost in the endless directories?</strong></p>
  <p>🌟 <a href="#-quick-start">Get Started</a> | 📖 <a href="#-gameplay">Learn to Play</a> | 🤝 <a href="#-contributing">Contribute</a></p>
</div>
