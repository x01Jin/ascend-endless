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

/**
 * Appends a child element to a parent
 * @param {Element} parent - The parent element
 * @param {Element} child - The child element to append
 */
export function appendChild(parent, child) {
  parent.appendChild(child);
}

/**
 * Sets the text content of an element
 * @param {Element} element - The element to modify
 * @param {string} text - The text content
 */
export function setText(element, text) {
  element.textContent = text;
}

/**
 * Adds a CSS class to an element
 * @param {Element} element - The element to modify
 * @param {string} className - The class name to add
 */
export function addClass(element, className) {
  element.classList.add(className);
}

/**
 * Removes a CSS class from an element
 * @param {Element} element - The element to modify
 * @param {string} className - The class name to remove
 */
export function removeClass(element, className) {
  element.classList.remove(className);
}

/**
 * Adds an event listener to an element
 * @param {Element} element - The element to attach the listener to
 * @param {string} event - The event type
 * @param {Function} handler - The event handler function
 */
export function addEventListener(element, event, handler) {
  element.addEventListener(event, handler);
}

/**
 * Removes an event listener from an element
 * @param {Element} element - The element to remove the listener from
 * @param {string} event - The event type
 * @param {Function} handler - The event handler function
 */
export function removeEventListener(element, event, handler) {
  element.removeEventListener(event, handler);
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

/**
 * Creates a span element with text
 * @param {string} text - The text content
 * @returns {Element} The span element
 */
export function createSpan(text) {
  return createElement("span", {}, [text]);
}

/**
 * Creates an input element
 * @param {string} type - The input type
 * @param {string} placeholder - The placeholder text
 * @returns {Element} The input element
 */
export function createInput(type, placeholder) {
  return createElement("input", { type, placeholder });
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
