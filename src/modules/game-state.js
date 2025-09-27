const STORAGE_KEY = "ascend-game-state";

let state = {
  currentIteration: 0,
  highScore: 0,
};

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function init(config) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (
        typeof parsed.currentIteration === "number" &&
        typeof parsed.highScore === "number"
      ) {
        state = parsed;
      }
    } catch (e) {
      // Invalid data, use defaults
    }
  }
  // config is ignored as per spec
}

function render(container) {
  // No UI, no-op
}

function handleEvent(event) {
  if (event.type === "ascend") {
    state.currentIteration++;
    if (state.currentIteration > state.highScore) {
      state.highScore = state.currentIteration;
    }
    persist();
  } else if (event.type === "quit") {
    persist();
  }
}

function getCurrentIteration() {
  return state.currentIteration;
}

function setCurrentIteration(value) {
  state.currentIteration = value;
  persist();
}

function getHighScore() {
  return state.highScore;
}

function setHighScore(value) {
  state.highScore = value;
  persist();
}

export {
  init,
  render,
  handleEvent,
  getCurrentIteration,
  setCurrentIteration,
  getHighScore,
  setHighScore,
};
