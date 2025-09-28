// Text Editor module for the game
// Simple notepad functionality with save and close capabilities

import { createElement, createDiv, createButton } from "./ui.js";

let currentFile = null;
let content = "";

function init(config) {
  currentFile = config;
  content = config.content || "";
}

function render(container) {
  container.innerHTML = "";

  if (!currentFile) return;

  const windowDiv = createDiv("text-editor-window", []);

  // Title bar with filename and close button
  const titleBar = createDiv("title-bar", [
    createElement("span", {}, [
      `Text Editor - ${currentFile.name || "Untitled"}`,
    ]),
    createButton("Close", () =>
      window.dispatchEvent(new CustomEvent("closeEditor"))
    ),
  ]);

  // Toolbar
  const toolbar = createDiv("toolbar text-editor-toolbar", []);

  // Main content area with textarea
  const mainArea = createDiv("text-editor-main", []);
  const textarea = document.createElement("textarea");

  Object.assign(textarea, {
    value: content,
    className: "editor-textarea",
    "aria-label": "Text editor content",
    oninput: (e) => (content = e.target.value),
  });

  mainArea.appendChild(textarea);

  windowDiv.appendChild(titleBar);
  windowDiv.appendChild(toolbar);
  windowDiv.appendChild(mainArea);
  container.appendChild(windowDiv);
}

function handleEvent(event) {
  if (event.type === "close") {
    window.dispatchEvent(new CustomEvent("closeEditor"));
  }
}

export { init, render, handleEvent };
