// Wallpaper module for water effect simulation
// Provides interactive water smear effects on mouse movement

import { createDiv } from "./ui.js";

// Constants for water simulation parameters
const SCALE = 0.5;
const DAMPING = 0.98; // Higher damping for shorter-lived waves focusing on cursor
const WAKE_RADIUS = 20;
const WAKE_STEPS = 30;
const WAKE_AMOUNT = 40;
const REFRACTION_FACTOR = 1.9;
const INTENSITY_DECAY = 3;

let canvas = null;
let ctx = null;
let backgroundCanvas = null;
let bgCtx = null;
let bgImageData = null;
let width = 0;
let height = 0;
let buffer1 = [];
let buffer2 = [];
let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let prevTime = 0;
let circles = [];

/**
 * Initialize water simulation buffers
 */
function initWater() {
  buffer1 = new Array(width * height).fill(0);
  buffer2 = new Array(width * height).fill(0);
}

/**
 * Get index in buffer
 */
function getIndex(x, y) {
  return y * width + x;
}

/**
 * Update water simulation
 */
function updateWater() {
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = getIndex(x, y);
      const neighbors =
        buffer1[getIndex(x - 1, y)] +
        buffer1[getIndex(x + 1, y)] +
        buffer1[getIndex(x, y - 1)] +
        buffer1[getIndex(x, y + 1)];
      buffer2[idx] = (neighbors / 2 - buffer2[idx]) * DAMPING;
    }
  }
  [buffer1, buffer2] = [buffer2, buffer1];
}

/**
 * Disturb water at position
 */
function disturbWater(x, y, amount) {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    buffer1[getIndex(x, y)] += amount;
  }
}

/**
 * Disturb water in semicircular waves (U shape around cursor)
 */
function disturbWake(x, y, vx, vy, amount) {
  const len = Math.sqrt(vx * vx + vy * vy);
  if (len === 0) return;

  // Get velocity angle
  const theta = Math.atan2(vy, vx);

  // Create semicircle perpendicular to velocity
  for (let i = 0; i <= WAKE_STEPS; i++) {
    const angle = theta - Math.PI / 2 + (Math.PI * i) / WAKE_STEPS; // from theta - 90° to theta + 90°
    const distX = x + Math.cos(angle) * WAKE_RADIUS;
    const distY = y + Math.sin(angle) * WAKE_RADIUS;
    const intensity =
      amount * Math.exp(-Math.abs(i - WAKE_STEPS / 2) / INTENSITY_DECAY); // Gaussian decay from center
    disturbWater(Math.floor(distX), Math.floor(distY), intensity);
  }
}

/**
 * Render water effect
 */
function renderWater() {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const bgData = bgImageData.data;

  for (let i = 0; i < buffer1.length; i++) {
    const x = i % width;
    const y = Math.floor(i / width);
    const h = buffer1[i];

    // Calculate refraction offset
    const offsetX = Math.max(0, Math.min(width - 1, x + h * REFRACTION_FACTOR));
    const offsetY = Math.max(
      0,
      Math.min(height - 1, y + h * REFRACTION_FACTOR)
    );

    // Sample background at offset position
    const bgIndex = (Math.floor(offsetY) * width + Math.floor(offsetX)) * 4;

    data[i * 4] = bgData[bgIndex]; // R
    data[i * 4 + 1] = bgData[bgIndex + 1]; // G
    data[i * 4 + 2] = bgData[bgIndex + 2]; // B
    data[i * 4 + 3] = 255; // Alpha
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Handle mouse movement on canvas
 */
function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  const currentTime = Date.now();
  const timeDelta = currentTime - prevTime;
  mouseX = (e.clientX - rect.left) * SCALE;
  mouseY = (e.clientY - rect.top) * SCALE;

  // Calculate velocity
  const dx = mouseX - prevMouseX;
  const dy = mouseY - prevMouseY;
  const vx = (dx / timeDelta) * 1000; // pixels per second
  const vy = (dy / timeDelta) * 1000;

  // Disturb water with wake effect when moving
  if (timeDelta > 0 && Math.sqrt(vx * vx + vy * vy) > 10) {
    disturbWake(Math.floor(mouseX), Math.floor(mouseY), vx, vy, WAKE_AMOUNT);
  }

  // Update previous values
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevTime = currentTime;
}

/**
 * Initialize animated circles
 */
function initCircles() {
  circles = [];
  for (let i = 0; i < 20; i++) {
    const minSpeed = 0.05;
    const maxSpeed = 0.3;
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    const angle = Math.random() * Math.PI * 2;
    circles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 80 + 10,
      opacity: 1,
      fadeState: "normal",
    });
  }
}

/**
 * Update circle positions
 */
function updateCircles() {
  circles.forEach((circle) => {
    circle.x += circle.vx;
    circle.y += circle.vy;

    if (circle.fadeState === "normal") {
      if (
        circle.x < 0 ||
        circle.x > width ||
        circle.y < 0 ||
        circle.y > height
      ) {
        circle.fadeState = "fading_out";
      }
    } else if (circle.fadeState === "fading_out") {
      circle.opacity -= 0.05;
      if (circle.opacity <= 0) {
        if (circle.x < 0) circle.x = width;
        else if (circle.x > width) circle.x = 0;
        if (circle.y < 0) circle.y = height;
        else if (circle.y > height) circle.y = 0;
        circle.opacity = 0;
        circle.fadeState = "fading_in";
      }
    } else if (circle.fadeState === "fading_in") {
      circle.opacity += 0.05;
      if (circle.opacity >= 1) {
        circle.opacity = 1;
        circle.fadeState = "normal";
      }
    }
  });
}

/**
 * Draw background with circles
 */
function drawBackground() {
  bgCtx.fillStyle = "#000000";
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.filter = "blur(5px)";
  circles.forEach((circle) => {
    bgCtx.fillStyle = "rgba(255, 255, 255, " + 0.2 * circle.opacity + ")";
    bgCtx.beginPath();
    bgCtx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    bgCtx.fill();
  });
  bgCtx.filter = "none";
  bgImageData = bgCtx.getImageData(0, 0, width, height);
}

/**
 * Create the wallpaper element with water effect
 * @returns {HTMLElement} The wallpaper element
 */
export function createWallpaper() {
  const wallpaper = createDiv("wallpaper");

  // Create canvas for water effect
  canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  ctx = canvas.getContext("2d");

  // Create background canvas for refraction
  backgroundCanvas = document.createElement("canvas");
  bgCtx = backgroundCanvas.getContext("2d");

  // Set canvas size with higher resolution for zoom effect
  width = Math.floor(window.innerWidth * SCALE);
  height = Math.floor(window.innerHeight * SCALE);
  canvas.width = width;
  canvas.height = height;
  backgroundCanvas.width = width;
  backgroundCanvas.height = height;

  // Initialize circles and draw initial background
  initCircles();
  drawBackground();

  // Initialize water simulation
  initWater();

  // Initialize mouse tracking
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevTime = Date.now();

  // Add canvas to wallpaper
  wallpaper.appendChild(canvas);

  // Add mouse event listeners to wallpaper
  wallpaper.addEventListener("mousemove", handleMouseMove);

  // Start animation loop
  function animate() {
    updateCircles();
    drawBackground();
    updateWater();
    renderWater();
    requestAnimationFrame(animate);
  }
  animate();

  return wallpaper;
}
