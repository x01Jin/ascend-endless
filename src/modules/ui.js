// UI module for the game
// Provides DOM manipulation utilities and component factories

/**
 * Creates a DOM element with properties and children
 * @param {string} tag - The HTML tag name
 * @param {object} props - Properties to set on the element
 * @param {Array} children - Child elements or text nodes
 * @returns {Element} The created DOM element
 */
export function createElement(tag, props = {}, children = []) {
  const element = document.createElement(tag);

  // Set properties
  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      element.className = value;
    } else if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  }

  // Append children
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
}

// Factory functions for common components

/**
 * Creates a button element
 * @param {string} text - The button text
 * @param {Function} onClick - The click handler
 * @returns {Element} The button element
 */
export function createButton(text, onClick) {
  return createElement("button", { onClick }, [text]);
}

/**
 * Creates a div element
 * @param {string} className - The CSS class name
 * @param {Array} children - Child elements
 * @returns {Element} The div element
 */
export function createDiv(className, children = []) {
  return createElement("div", { className }, children);
}

// Standardized functions (no-op implementations)

/**
 * Initializes the UI module
 * @param {object} config - Configuration object
 */
export function init(config) {
  // No-op
}

/**
 * Renders the UI to a container
 * @param {Element} container - The container element
 */
export function render(container) {
  // No-op
}

/**
 * Handles UI events
 * @param {Event} event - The event object
 */
export function handleEvent(event) {
  // No-op
}
