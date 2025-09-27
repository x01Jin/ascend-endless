function randomAlphanum(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateLorem() {
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
  let text = '';
  const numWords = 10 + Math.floor(Math.random() * 20);
  for (let i = 0; i < numWords; i++) {
    text += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return text.trim();
}

function generateTree(depth, maxDepth, maxBreadth) {
  if (depth > maxDepth) return null;
  if (depth === maxDepth) {
    const isTxt = Math.random() < 0.4;
    const ext = isTxt ? '.txt' : '.exe';
    const content = isTxt ? generateLorem() : undefined;
    return {
      name: randomAlphanum(5 + Math.floor(Math.random() * 5)) + ext,
      type: 'file',
      content
    };
  } else {
    const children = [];
    const numChildren = Math.floor(Math.random() * maxBreadth) + 1;
    for (let i = 0; i < numChildren; i++) {
      const child = generateTree(depth + 1, maxDepth, maxBreadth);
      if (child) children.push(child);
    }
    return {
      name: randomAlphanum(5 + Math.floor(Math.random() * 5)),
      type: 'folder',
      children
    };
  }
}

function addAscend(root, maxDepth) {
  const deepFolders = [];
  function traverse(node, depth) {
    if (node.type === 'folder') {
      if (depth === maxDepth - 1) deepFolders.push(node);
      node.children.forEach(child => traverse(child, depth + 1));
    }
  }
  traverse(root, 0);
  if (deepFolders.length > 0) {
    const folder = deepFolders[Math.floor(Math.random() * deepFolders.length)];
    folder.children.push({ name: 'ascend.exe', type: 'file' });
  }
}

function generate(iteration) {
  const maxDepth = iteration + 2;
  const maxBreadth = iteration + 2;
  const root = generateTree(0, maxDepth, maxBreadth);
  addAscend(root, maxDepth);
  return root;
}

let config = {};

function init(c) {
  config = c;
}

function render(container) {
  // no-op
}

function handleEvent(event) {
  if (event.type === 'generate') {
    return generate(event.iteration);
  }
}

export { init, render, handleEvent };