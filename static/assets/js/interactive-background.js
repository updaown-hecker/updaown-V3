// Interactive Background System
class InteractiveBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0, radius: 150 };
    this.animationId = null;
    this.time = 0;
    this.colorHue = 0;
    
    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    
    document.body.insertBefore(this.canvas, document.body.firstChild);
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    // Increase particle count significantly for more visual impact
    const particleCount = Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 5000));
    
    for (let i = 0; i < particleCount; i++) {
      // Create different types of particles for variety
      const particleType = Math.random();
      let size;
      let speed;
      let opacity;
      
      if (particleType < 0.3) {
        // Small, fast particles
        size = Math.random() * 2 + 1;
        speed = Math.random() * 1.2 + 0.8;
        opacity = Math.random() * 0.4 + 0.3;
      } else if (particleType < 0.7) {
        // Medium particles
        size = Math.random() * 4 + 2;
        speed = Math.random() * 0.8 + 0.4;
        opacity = Math.random() * 0.6 + 0.4;
      } else {
        // Large, slow particles
        size = Math.random() * 6 + 3;
        speed = Math.random() * 0.6 + 0.2;
        opacity = Math.random() * 0.8 + 0.5;
      }
      
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: size,
        baseSize: size,
        opacity: opacity,
        connections: [],
        type: particleType < 0.3 ? 'small' : particleType < 0.7 ? 'medium' : 'large'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());
    
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    });

    // Add click effect
    document.addEventListener('click', (e) => {
      this.createClickEffect(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
      this.createClickEffect(e.touches[0].clientX, e.touches[0].clientY);
    });
    
    // Add mousedown for more responsive feel
    document.addEventListener('mousedown', (e) => {
      this.createClickEffect(e.clientX, e.clientY);
    });
  }

  createClickEffect(x, y) {
    // Create many more particles for a dramatic effect
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      // Much higher velocity to reach screen edges
      const velocity = Math.random() * 8 + 4; // 4-12 velocity range
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * 6 + 3, // Bigger particles
        baseSize: Math.random() * 6 + 3,
        opacity: 1, // Start fully visible
        connections: [],
        life: 200 // Longer life to reach screen edges
      });
    }
    
    // Add some random high-velocity particles for extra drama
    for (let i = 0; i < 10; i++) {
      const randomAngle = Math.random() * Math.PI * 2;
      const highVelocity = Math.random() * 15 + 10; // 10-25 velocity for screen-reaching particles
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(randomAngle) * highVelocity,
        vy: Math.sin(randomAngle) * highVelocity,
        size: Math.random() * 8 + 4, // Even bigger particles
        baseSize: Math.random() * 8 + 4,
        opacity: 1,
        connections: [],
        life: 300 // Longer life for high-velocity particles
      });
    }
  }

  updateParticles() {
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.canvas.width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      }
      if (particle.y <= 0 || particle.y >= this.canvas.height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      }

      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.02;
        particle.vy -= Math.sin(angle) * force * 0.02;
        
        // Enhanced pulse effect based on particle type
        const pulseIntensity = particle.type === 'small' ? 3 : particle.type === 'medium' ? 2 : 1;
        particle.size = particle.baseSize + Math.sin(this.time * 0.01) * pulseIntensity * force;
        particle.opacity = Math.min(1, particle.opacity + force * 0.15);
      } else {
        particle.size = particle.baseSize;
        particle.opacity = Math.max(0.3, particle.opacity - 0.01);
      }

      // Life management for click particles
      if (particle.life !== undefined) {
        particle.life--;
        // Gradually fade out as life decreases
        const maxLife = particle.life > 200 ? 300 : 200; // Handle both life values
        particle.opacity = particle.life / maxLife;
        if (particle.life <= 0) {
          this.particles.splice(index, 1);
        }
      }

      // Add some randomness
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;
      
      // Limit velocity
      particle.vx = Math.max(-2, Math.min(2, particle.vx));
      particle.vy = Math.max(-2, Math.min(2, particle.vy));
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const otherParticle = this.particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) { // Reduced connection distance for cleaner look
          const opacity = (100 - distance) / 100 * 0.15; // Much lower opacity
          this.ctx.strokeStyle = `hsla(${this.colorHue}, 70%, 60%, ${opacity})`;
          this.ctx.lineWidth = 0.5; // Thinner lines
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      }
    }
  }

  drawParticles() {
    for (const particle of this.particles) {
      // Skip particles with invalid sizes
      if (particle.size <= 0 || !Number.isFinite(particle.size)) {
        continue;
      }
      
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      
      // Create gradient for each particle
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, Math.max(0.1, particle.size)
      );
      
      const hue = (this.colorHue + Math.random() * 30) % 360;
      gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, 1)`);
      gradient.addColorStop(0.7, `hsla(${hue}, 60%, 50%, 0.8)`);
      gradient.addColorStop(1, `hsla(${hue}, 40%, 30%, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, Math.max(0.1, particle.size), 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    }
  }

  addBackgroundGlow() {
    // Add subtle radial glow in the center
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const maxRadius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
    
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius
    );
    
    gradient.addColorStop(0, `hsla(${this.colorHue}, 30%, 20%, 0.02)`);
    gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    this.time++;
    this.colorHue = (this.colorHue + 0.1) % 360;
    
    // Clear canvas with much stronger fade effect to remove trails quickly
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
    
    // Add subtle background glow effect
    this.addBackgroundGlow();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas?.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Initialize the background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Remove old background elements
  const oldSpheres = document.querySelector('.spheres-container');
  if (oldSpheres) {
    oldSpheres.remove();
  }
  
  // Create new interactive background
  window.interactiveBackground = new InteractiveBackground();
}); 