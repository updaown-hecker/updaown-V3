// Animate background spheres to float around randomly
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function animateSphere(sphere, bounds, state) {
  // Use initial screen size for bounds
  if (!state.init) {
    state.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    state.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const sphereRect = sphere.getBoundingClientRect();
    state.sphereW = (sphereRect.width / state.vw) * 100;
    state.sphereH = (sphereRect.height / state.vh) * 100;
    // Start at a random position inside bounds
    // Only allow 90%-100% of sphere visible
    state.x = randomFloat(bounds.xMin + state.sphereW * 0.1, bounds.xMax - state.sphereW);
    state.y = randomFloat(bounds.yMin + state.sphereH * 0.1, bounds.yMax - state.sphereH);
    // Set a random target
    state.targetX = randomFloat(bounds.xMin + state.sphereW * 0.1, bounds.xMax - state.sphereW);
    state.targetY = randomFloat(bounds.yMin + state.sphereH * 0.1, bounds.yMax - state.sphereH);
    state.init = true;
  }
  // Move towards target
  const speed = 0.8 + Math.random() * 0.7;
  let dx = state.targetX - state.x;
  let dy = state.targetY - state.y;
  let dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < 1) {
    // Pick a new random target
    state.targetX = randomFloat(bounds.xMin + state.sphereW * 0.1, bounds.xMax - state.sphereW);
    state.targetY = randomFloat(bounds.yMin + state.sphereH * 0.1, bounds.yMax - state.sphereH);
  } else {
    state.x += dx / dist * speed;
    state.y += dy / dist * speed;
  }
  // Bounce if >90% off screen
  let bounced = false;
  if (state.x < bounds.xMin + state.sphereW * 0.1) {
    state.x = bounds.xMin + state.sphereW * 0.1;
    bounced = true;
    state.targetX = randomFloat(bounds.xMin + state.sphereW * 0.1, bounds.xMax - state.sphereW);
  }
  if (state.x > bounds.xMax - state.sphereW) {
    state.x = bounds.xMax - state.sphereW;
    bounced = true;
    state.targetX = randomFloat(bounds.xMin + state.sphereW * 0.1, bounds.xMax - state.sphereW);
  }
  if (state.y < bounds.yMin + state.sphereH * 0.1) {
    state.y = bounds.yMin + state.sphereH * 0.1;
    bounced = true;
    state.targetY = randomFloat(bounds.yMin + state.sphereH * 0.1, bounds.yMax - state.sphereH);
  }
  if (state.y > bounds.yMax - state.sphereH) {
    state.y = bounds.yMax - state.sphereH;
    bounced = true;
    state.targetY = randomFloat(bounds.yMin + state.sphereH * 0.1, bounds.yMax - state.sphereH);
  }
  // Ripple effect on bounce
  if (bounced) {
    sphere.style.transition = 'transform 0.25s cubic-bezier(.4,2,.2,1)';
    sphere.style.transform = `translate(${state.x}vw, ${state.y}vh) scale(1.15)`;
    setTimeout(() => {
      sphere.style.transition = 'transform 0.3s cubic-bezier(.4,.2,.2,1)';
      sphere.style.transform = `translate(${state.x}vw, ${state.y}vh) scale(1)`;
    }, 250);
  } else {
    sphere.style.transition = 'transform 1.2s cubic-bezier(.4,.2,.2,1)';
    sphere.style.transform = `translate(${state.x}vw, ${state.y}vh)`;
  }
  setTimeout(() => animateSphere(sphere, bounds, state), 40);
}

function createSphere(size, index) {
  const sphere = document.createElement('div');
  sphere.className = `sphere sphere${index}`;
  sphere.style.width = `${size}px`;
  sphere.style.height = `${size}px`;
  return sphere;
}

document.addEventListener('DOMContentLoaded', () => {
  // Get container and calculate bounds
  const container = document.querySelector('.spheres-container');
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  
  // Calculate number of spheres based on screen width
  const numSpheres = Math.max(2, Math.min(6, Math.floor(vw / 400))); // 1 sphere per 400px width, min 2, max 6
  
  // Create spheres with different sizes
  const spheres = [];
  for(let i = 0; i < numSpheres; i++) {
    const size = 220 - (i * 20); // Decreasing sizes: 220px, 200px, 180px, etc.
    const sphere = createSphere(size, i + 1);
    container.appendChild(sphere);
    spheres.push({
      el: sphere,
      bounds: { xMin: 10, xMax: 70, yMin: 10, yMax: 70 }
    });
  }
  
  spheres.forEach(s => {
    if (s.el) animateSphere(s.el, s.bounds, {});
  });
});
