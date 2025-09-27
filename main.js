import * as gameState from "./src/modules/game-state.js";
import * as directoryGenerator from "./src/modules/directory-generator.js";
import * as desktop from "./src/modules/desktop.js";
import * as textEditor from "./src/modules/text-editor.js";
import * as fileExplorer from "./src/modules/file-explorer.js";

const app = document.getElementById("app");

const desktopDiv = document.createElement("div");
const explorerDiv = document.createElement("div");
const editorDiv = document.createElement("div");

app.appendChild(desktopDiv);
app.appendChild(explorerDiv);
app.appendChild(editorDiv);

// Set up overlay styling for windows
explorerDiv.style.position = "absolute";
explorerDiv.style.top = "0";
explorerDiv.style.left = "0";
explorerDiv.style.width = "100%";
explorerDiv.style.height = "100%";
explorerDiv.style.zIndex = "10";
explorerDiv.style.display = "none";

editorDiv.style.position = "absolute";
editorDiv.style.top = "0";
editorDiv.style.left = "0";
editorDiv.style.width = "100%";
editorDiv.style.height = "100%";
editorDiv.style.zIndex = "20";
editorDiv.style.display = "none";

desktopDiv.style.display = "block";

gameState.init({});
desktop.init({ gameState });

desktop.render(desktopDiv);
desktopDiv.style.display = "block";

window.addEventListener("openExplorer", () => {
  const currentIteration = gameState.getCurrentIteration();
  const tree = directoryGenerator.handleEvent({
    type: "generate",
    iteration: currentIteration,
  });
  fileExplorer.init({ tree, iteration: currentIteration });
  fileExplorer.render(explorerDiv);
  explorerDiv.style.display = "block";
});

window.addEventListener("ascend", () => {
  gameState.handleEvent({ type: "ascend" });
  const currentIteration = gameState.getCurrentIteration();
  const tree = directoryGenerator.handleEvent({
    type: "generate",
    iteration: currentIteration,
  });
  fileExplorer.init({ tree, iteration: currentIteration });
  fileExplorer.render(explorerDiv);
});

window.addEventListener("openTextFile", (e) => {
  textEditor.init(e.detail);
  textEditor.render(editorDiv);
  editorDiv.style.display = "block";
});

window.addEventListener("closeEditor", () => {
  editorDiv.style.display = "none";
});

window.addEventListener("openHighScore", () => {
  const highScore = gameState.getHighScore();
  textEditor.init({
    name: "Highest.txt",
    content: `Your highest iteration: ${highScore}`,
  });
  textEditor.render(editorDiv);
  editorDiv.style.display = "block";
});

window.addEventListener("quit", () => {
  gameState.handleEvent({ type: "quit" });
  desktop.handleEvent({ type: "quit" });
  desktop.render(desktopDiv);
  explorerDiv.style.display = "none";
  editorDiv.style.display = "none";
});
