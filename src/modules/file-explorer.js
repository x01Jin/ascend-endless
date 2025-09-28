// File Explorer module for the game
// Overhauled with simplified Windows Explorer-like interface

import { createElement, createDiv, createButton } from "./ui.js";

let tree = null;
let iteration = 0;
let currentPath = []; // array of folder names representing current path
let history = []; // for back navigation
let historyIndex = -1;

function init(config) {
  tree = config.tree;
  iteration = config.iteration;
  currentPath = [];
  history = [[]];
  historyIndex = 0;
}

function render(container) {
  container.innerHTML = "";

  // Create window
  const windowDiv = createDiv("file-explorer-window", []);

  // Title bar
  const titleBar = createDiv("title-bar", [
    createElement("span", {}, [`File Explorer ${iteration}`]),
    createButton("Close", () => {
      window.dispatchEvent(new CustomEvent("quit"));
    }),
  ]);

  // Toolbar
  const toolbarDiv = createDiv("toolbar file-explorer-toolbar", [
    createButton("← Back", () => navigateBack(), {
      className: "toolbar-btn",
      "data-action": "back",
      title: "Back",
      "aria-label": "Back",
    }),
    createButton("→ Forward", () => navigateForward(), {
      className: "toolbar-btn",
      "data-action": "forward",
      title: "Forward",
      "aria-label": "Forward",
    }),
    createButton("↑ Up", () => navigateUp(), {
      className: "toolbar-btn",
      "data-action": "up",
      title: "Up",
      "aria-label": "Up",
    }),
  ]);

  // Breadcrumbs
  const breadcrumbsDiv = createDiv("breadcrumbs file-explorer-breadcrumbs", []);
  updateBreadcrumbs(breadcrumbsDiv);

  // Main content area
  const mainDiv = createDiv("file-explorer-main", []);

  // Content area
  const contentDiv = createDiv("content-area", []);
  renderContent(contentDiv);

  mainDiv.appendChild(contentDiv);

  // Live region for status updates
  const liveRegion = createDiv("sr-only", []);
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");

  windowDiv.appendChild(titleBar);
  windowDiv.appendChild(toolbarDiv);
  windowDiv.appendChild(breadcrumbsDiv);
  windowDiv.appendChild(mainDiv);
  windowDiv.appendChild(liveRegion);

  container.appendChild(windowDiv);
}

function updateBreadcrumbs(container) {
  container.innerHTML = "";
  const rootLink = createElement(
    "a",
    {
      href: "#",
      onclick: (e) => {
        e.preventDefault();
        navigateTo([]);
      },
    },
    ["Root"]
  );
  container.appendChild(rootLink);

  currentPath.forEach((segment, index) => {
    const separator = createElement(
      "span",
      { className: "breadcrumb-separator" },
      ["\uf105"]
    ); // fa-chevron-right
    container.appendChild(separator);

    const link = createElement(
      "a",
      {
        href: "#",
        onclick: (e) => {
          e.preventDefault();
          navigateTo(currentPath.slice(0, index + 1));
        },
      },
      [segment]
    );
    container.appendChild(link);
  });
}

function renderContent(container) {
  container.innerHTML = "";
  const currentNode = getNodeAtPath(currentPath);
  if (!currentNode || currentNode.type !== "folder") return;

  const items = currentNode.children || [];

  const grid = createDiv("content-grid", []);
  items.forEach((item) => {
    const card = createElement("div", {
      className: `content-card ${item.type}`,
      ondblclick: () =>
        item.type === "folder"
          ? navigateTo([...currentPath, item.name])
          : openFile(item),
    });

    const icon = createElement("i", {
      className:
        item.type === "folder" ? "fas fa-folder fa-3x" : "fas fa-file fa-3x",
    });
    card.appendChild(icon);

    const name = createElement("div", { className: "item-name" }, [item.name]);
    card.appendChild(name);

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function getNodeAtPath(path) {
  let node = tree;
  for (const segment of path) {
    if (!node.children) return null;
    node = node.children.find((child) => child.name === segment);
    if (!node) return null;
  }
  return node;
}

function navigateTo(path) {
  currentPath = path;
  history = history.slice(0, historyIndex + 1);
  history.push([...path]);
  historyIndex++;
  window.dispatchEvent(
    new CustomEvent("navigate", { detail: { path: currentPath } })
  );
  // Announce navigation
  const liveRegion = document.querySelector(".sr-only");
  if (liveRegion) {
    liveRegion.textContent = `Navigated to ${
      path.length > 0 ? path.join("/") : "Root"
    }`;
  }
  // Re-render breadcrumbs and content
  const breadcrumbsDiv = document.querySelector(".file-explorer-breadcrumbs");
  if (breadcrumbsDiv) updateBreadcrumbs(breadcrumbsDiv);
  const contentDiv = document.querySelector(".content-area");
  if (contentDiv) renderContent(contentDiv);
}

function navigateBack() {
  if (historyIndex > 0) {
    historyIndex--;
    currentPath = [...history[historyIndex]];
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: currentPath } })
    );
    const breadcrumbsDiv = document.querySelector(".file-explorer-breadcrumbs");
    if (breadcrumbsDiv) updateBreadcrumbs(breadcrumbsDiv);
    const contentDiv = document.querySelector(".content-area");
    if (contentDiv) renderContent(contentDiv);
  }
}

function navigateForward() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    currentPath = [...history[historyIndex]];
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: currentPath } })
    );
    const breadcrumbsDiv = document.querySelector(".file-explorer-breadcrumbs");
    if (breadcrumbsDiv) updateBreadcrumbs(breadcrumbsDiv);
    const contentDiv = document.querySelector(".content-area");
    if (contentDiv) renderContent(contentDiv);
  }
}

function navigateUp() {
  if (currentPath.length > 0) {
    navigateTo(currentPath.slice(0, -1));
  }
}

function openFile(file) {
  if (file.name.endsWith(".txt")) {
    window.dispatchEvent(new CustomEvent("openTextFile", { detail: file }));
  } else if (file.name === "ascend.exe") {
    window.dispatchEvent(new CustomEvent("ascend"));
  }
}

function handleEvent(event) {
  if (event.type === "navigate") {
    currentPath = event.path || [];
    // Re-render if needed
  } else if (event.type === "openFile") {
    openFile(event.file);
  } else if (event.type === "close") {
    window.dispatchEvent(new CustomEvent("quit"));
  }
}

export { init, render, handleEvent };
