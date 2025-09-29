// UI utilities for DOM manipulation and component creation

/**
 * Creates a DOM element.
 * @param {string} tag - HTML tag name
 * @param {object} props - Element properties
 * @param {Array} children - Child elements or text
 * @returns {Element} The DOM element
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

// Button factory
/**
 * Create a button.
 * @param {string|object} textOrOptions
 * @param {Function} onClick
 * @returns {Element}
 */
export function createButton(textOrOptions, onClick) {
  let buttonText = "";
  let iconClass = null;
  let buttonProps = {};

  // Support two signatures: createButton(text, onClick) or createButton(options, onClick)
  if (typeof textOrOptions === "string") {
    buttonText = textOrOptions;
    buttonProps.onClick = onClick;
  } else if (typeof textOrOptions === "object" && textOrOptions !== null) {
    const options = textOrOptions;
    buttonText = options.text || "";
    iconClass = options.icon || null;
    buttonProps.onClick = onClick || options.onClick;

    // Copy other option fields as attributes
    Object.assign(buttonProps, options);

    // Remove handled keys
    delete buttonProps.text;
    delete buttonProps.icon;
  }

  const children = [];

  // Add icon if provided
  if (iconClass) {
    const icon = createElement("i", {
      className: iconClass,
      "aria-hidden": "true",
    });
    children.push(icon);

    // Space between icon and text
    if (buttonText) {
      children.push(" ");
    }
  }

  // Add text if specified
  if (buttonText) {
    children.push(buttonText);
  }

  return createElement("button", buttonProps, children);
}

/**
 * Creates a div element.
 * @param {string} className - CSS class name
 * @param {Array} children - Child elements
 * @returns {Element} The div element
 */
export function createDiv(className, children = []) {
  return createElement("div", { className }, children);
}

// Standardized functions (no-ops)

/**
 * Initializes the UI module.
 * @param {object} config - Configuration
 */
export function init(config) {
  // No-op
}

/**
 * Renders the UI to a container.
 * @param {Element} container - Container element
 */
export function render(container) {
  // No-op
}

/**
 * Handles UI events.
 * @param {Event} event - Event object
 */
export function handleEvent(event) {
  // No-op
}
