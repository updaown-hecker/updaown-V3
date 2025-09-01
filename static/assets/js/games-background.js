// Games Page Background Animation
class GamesBackground {
  constructor() {
    this.particles = [];
    this.particleCount = 50;
    this.colors = ['#76e5fc', '#5a67d8', '#805ad5', '#d53f8c'];
    
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      const size = Math.random() * 10 + 3;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = color;
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      
      // Animation
      particle.style.position = 'fixed';
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      
      // Store particle data
      this.particles.push({
        element: particle,
        x: x,
        y: y,
        size: size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
      
      document.body.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 90}deg);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 180}deg);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 270}deg);
        }
        100% {
          transform: translate(0, 0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }

  animate() {
    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      // Clear existing timeout
      clearTimeout(resizeTimeout);
      
      // Set new timeout to avoid excessive updates
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Update particles position on resize
        this.particles.forEach(particle => {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.element.style.left = `${particle.x}px`;
          particle.element.style.top = `${particle.y}px`;
        });
      }, 250); // Wait 250ms after last resize event
    });
  }
}

// Initialize the background when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GamesBackground();
});