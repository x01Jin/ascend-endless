// Desktop module for the game
// Redesigned with floating icon grid, physics-inspired animations, Material Design 3 bottom app bar taskbar,
// clock widget, system tray, hover tooltips, click ripples, and accessibility features.
// Maintains event-driven architecture with custom events and preserves core functionality.

import { createDiv } from "./ui.js";

let isQuit = false;
let container = null;
let clockElement = null;
let clockInterval = null;

// Desktop icons configuration with FontAwesome icons and actions
const desktopIcons = [
  {
    name: "File Explorer",
    icon: "fa-folder",
    action: () => window.dispatchEvent(new CustomEvent("openExplorer")),
    tooltip: "Open File Explorer",
  },
  /**
   * {
   *   name: "Text Editor",
   *   icon: "fa-file-alt",
   *   action: () => window.dispatchEvent(new CustomEvent("openTextEditor")),
   *   tooltip: "Open Text Editor",
   * },
   * {
   *   name: "Settings",
   *   icon: "fa-cog",
   *   action: () => window.dispatchEvent(new CustomEvent("openSettings")),
   *   tooltip: "Open Settings",
   * },
   * {
   *   name: "Recycle Bin",
   *   icon: "fa-trash",
   *   action: () => window.dispatchEvent(new CustomEvent("openRecycleBin")),
   *   tooltip: "Open Recycle Bin",
   * },
   */
];

/**
 * Initialize the desktop module with configuration
 *
 * @param {Object} config - Configuration object
 */
function init(config) {
  // Initialize with dependencies if needed
}

/**
 * Update the clock display with current time
 */
function updateClock() {
  if (clockElement) {
    clockElement.textContent = new Date().toLocaleTimeString();
  }
}

/**
 * Create a desktop icon with FontAwesome icon, animations, and accessibility features
 * @param {Object} iconConfig - Icon configuration
 * @returns {HTMLElement} The desktop icon element
 */
function createDesktopIcon(iconConfig) {
  const icon = createDiv("desktop-icon", [], {
    role: "button",
    tabindex: "0",
    "aria-label": iconConfig.tooltip,
    title: iconConfig.tooltip,
  });

  // Add FontAwesome icon
  const faIcon = document.createElement("i");
  faIcon.className = `fas ${iconConfig.icon}`;
  faIcon.setAttribute("aria-hidden", "true");
  icon.appendChild(faIcon);

  // Add label
  const label = document.createElement("span");
  label.textContent = iconConfig.name;
  label.className = "desktop-icon-label";
  icon.appendChild(label);

  // Add Material ripple effect
  const ripple = document.createElement("md-ripple");
  icon.appendChild(ripple);

  // Add physics-inspired bobbing animation
  icon.classList.add("floating-icon");

  // Event listeners for interaction
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    iconConfig.action();
  });

  // Keyboard navigation
  icon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      iconConfig.action();
    }
  });

  // Hover effects
  icon.addEventListener("mouseenter", () => {
    icon.setAttribute("aria-expanded", "true");
  });

  icon.addEventListener("mouseleave", () => {
    icon.setAttribute("aria-expanded", "false");
  });

  return icon;
}

/**
 * Create the floating icon grid container
 * @returns {HTMLElement} The icon grid container
 */
function createIconGrid() {
  const grid = createDiv("desktop-icon-grid");
  desktopIcons.forEach((iconConfig) => {
    const icon = createDesktopIcon(iconConfig);
    grid.appendChild(icon);
  });
  return grid;
}

/**
 * Create the Material Design bottom app bar taskbar
 * @returns {HTMLElement} The taskbar element
 */
function createTaskbar() {
  const taskbar = createDiv("taskbar");

  // Start icon as decorative button with shake animation will have easter egg when clicked enough
  const startIcon = document.createElement("i");
  startIcon.className = "fab fa-windows start-icon";
  startIcon.setAttribute("aria-label", "Start Button");
  startIcon.addEventListener("click", () => {
    // Start button click handler - placeholder for future functionality
  });
  taskbar.appendChild(startIcon);

  // Spacer
  const spacer = createDiv("taskbar-spacer");
  taskbar.appendChild(spacer);

  // Clock widget
  const clock = createDiv("clock-widget");
  clockElement = clock;
  clock.setAttribute("aria-label", "Current time");
  taskbar.appendChild(clock);

  // System tray
  const systemTray = createDiv("system-tray");
  systemTray.setAttribute("aria-label", "System tray");

  // Add system tray icons (placeholder)
  const wifiIcon = document.createElement("i");
  wifiIcon.className = "fas fa-wifi";
  wifiIcon.setAttribute("aria-label", "WiFi connected");
  systemTray.appendChild(wifiIcon);

  const batteryIcon = document.createElement("i");
  batteryIcon.className = "fas fa-battery-half";
  batteryIcon.setAttribute("aria-label", "Battery level");
  systemTray.appendChild(batteryIcon);

  taskbar.appendChild(systemTray);

  // Apply compact styling
  taskbar.style.height = "40px";
  taskbar.style.padding = "0 8px";
  taskbar.style.borderRadius = "0";

  return taskbar;
}

/**
 * Render the desktop UI to the provided container
 * @param {HTMLElement} containerParam - The container element to render into
 */
function render(containerParam) {
  container = containerParam;
  container.innerHTML = "";

  // Create floating icon grid
  const iconGrid = createIconGrid();
  container.appendChild(iconGrid);

  if (isQuit) {
    // Add Highest.txt file to the icon grid
    const highScoreIcon = {
      name: "Highest.txt",
      icon: "fa-file-alt",
      action: () => window.dispatchEvent(new CustomEvent("openHighScore")),
      tooltip: "Open Highest Score File",
    };
    const icon = createDesktopIcon(highScoreIcon);
    iconGrid.appendChild(icon);
  }

  // Create bottom app bar taskbar
  const taskbar = createTaskbar();
  container.appendChild(taskbar);

  // Setup clock update
  if (clockInterval) {
    clearInterval(clockInterval);
  }
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
}

/**
 * Handle custom events for the desktop module
 * @param {Event} event - The event to handle
 */
function handleEvent(event) {
  if (event.type === "quit") {
    // Update to show achievement
    isQuit = true;
    render(container);
  }
  // Additional event handlers can be added here for new features
}

export { init, render, handleEvent };
