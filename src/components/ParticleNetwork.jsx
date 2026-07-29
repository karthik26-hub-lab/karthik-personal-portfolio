import React, { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    
    // Track mouse position for parallax (normalized from -1 to 1)
    let mouseX = 0;
    let mouseY = 0;
    // Smooth mouse position to make parallax buttery
    let targetMouseX = 0;
    let targetMouseY = 0;
    // Raw mouse position for magnetic pull
    let rawMouseX = -1000;
    let rawMouseY = -1000;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      rawMouseX = -1000;
      rawMouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        // Distribute initial y randomly across the screen so they don't all start at the bottom
        this.y = Math.random() * canvas.height; 
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100; // Start slightly below screen
        
        // Z-index determines size, speed, and parallax intensity (1 is front, 4 is back)
        this.z = Math.random() * 3 + 1; 
        
        this.size = (4 - this.z) * 1.5; // Closer (z=1) is bigger
        this.speed = (4 - this.z) * 0.4; // Closer moves faster
        
        // Drift
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = -this.speed - (Math.random() * 0.2); // Always drift up
        
        // Premium tech colors
        const colors = ['#4facfe', '#00f2fe', '#a18cd1', '#e0e0e0'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = (4 - this.z) * 0.25; // Closer is more opaque
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around when floating off screen
        if (this.y < -50) {
          this.reset();
        }
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;

        // Apply parallax based on smoothed mouse
        const parallaxX = mouseX * (20 / this.z);
        const parallaxY = mouseY * (20 / this.z);
        
        let drawX = this.x + parallaxX;
        let drawY = this.y + parallaxY;

        // Magnetic Effect
        const dx = rawMouseX - drawX;
        const dy = rawMouseY - drawY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const magnetRadius = 180; // Pull radius

        if (distance < magnetRadius) {
          const force = (magnetRadius - distance) / magnetRadius;
          // Smoothly pull towards the mouse pointer
          drawX += dx * force * 0.15;
          drawY += dy * force * 0.15;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    const init = () => {
      particles = [];
      // Adjust density
      const particleCount = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // First setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smoothly interpolate mouse position for buttery parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default ParticleNetwork;
