import { createDiv } from "../../modules/ui.js";

const MILESTONES = [50, 100, 150, 200];

let modal = null;
let emojiElement = null;
let counterElement = null;
let clickCount = 0;
let milestoneMessage = null;
let isOpen = false;
let outsideClickHandler = null;
let keydownHandler = null;

function init() {
  // Create modal structure
  modal = createDiv("clicker-modal", [
    createDiv("clicker-modal-content", [
      createDiv("clicker-emoji-container", [
        document.createElement("span"), // emoji will be set in render
      ]),
      createDiv("clicker-counter", [document.createTextNode("Clicks: 0")]),
      createDiv("clicker-milestone", []), // for milestone messages
    ]),
  ]);

  // Get elements
  emojiElement = modal.querySelector("span");
  counterElement = modal.querySelector(".clicker-counter");
  milestoneMessage = modal.querySelector(".clicker-milestone");

  // Handlers are defined but attached only when modal is open
  outsideClickHandler = (e) => {
    // Ignore clicks that are inside the modal or on the start button itself
    if (
      modal.contains(e.target) ||
      (e.target && e.target.closest && e.target.closest(".start-icon"))
    ) {
      return;
    }
    closeModal();
  };

  keydownHandler = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };
}

function render() {
  if (!modal) init();

  // Reset state
  clickCount = 0;
  emojiElement.textContent = "😂";
  emojiElement.className = "clicker-emoji";
  counterElement.textContent = "Clicks: 0";
  milestoneMessage.textContent = "";

  // Add click handler to emoji
  emojiElement.onclick = handleEmojiClick;

  // Show modal
  if (!modal.isConnected) {
    document.body.appendChild(modal);
  }
  modal.style.display = "flex";

  // Set open state and attach global handlers after the current call stack
  isOpen = true;
  setTimeout(() => {
    document.addEventListener("click", outsideClickHandler);
    document.addEventListener("keydown", keydownHandler);
  }, 0);
}

function handleEmojiClick() {
  clickCount++;
  counterElement.textContent = `Clicks: ${clickCount}`;

  // Add click indicator
  emojiElement.classList.add("clicked");
  setTimeout(() => {
    emojiElement.classList.remove("clicked");
  }, 100);

  // Check milestones
  if (MILESTONES.includes(clickCount)) {
    milestoneMessage.textContent = "Milestone reached! Great job!";
  } else if (clickCount > 200 && clickCount % 50 === 0) {
    milestoneMessage.textContent = "Amazing! Keep going!";
  } else {
    milestoneMessage.textContent = "";
  }
}

function closeModal() {
  if (!modal || !isOpen) return;
  // Hide and remove from DOM
  modal.style.display = "none";
  if (modal.isConnected) {
    modal.remove();
  }
  // Remove global handlers
  document.removeEventListener("click", outsideClickHandler);
  document.removeEventListener("keydown", keydownHandler);
  isOpen = false;
}

function toggle() {
  if (isOpen) {
    closeModal();
  } else {
    render();
  }
}

export { init, render, toggle };
