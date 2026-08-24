import React, { useEffect, useRef } from 'react';

export const PhotonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Adjust particle count based on screen size
      const count = Math.floor((width * height) / 15000);
      particles.length = 0; // Clear existing

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5, // 0.5 to 2
          speedY: Math.random() * 0.5 + 0.1, // Base speed
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      // Clear with slight trailing effect for motion blur
      ctx.clearRect(0, 0, width, height);

      // Determine colors based on dark mode class on root
      const isDark = document.documentElement.classList.contains('dark');
      const baseColor = isDark ? '255, 77, 0' : '255, 112, 51'; // Varna Sun Orange

      particles.forEach((p) => {
        // Apply scroll velocity to y position
        p.y -= p.speedY + scrollVelocity * 0.1;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity * (isDark ? 0.8 : 0.4)})`;
        ctx.fill();
      });

      // Decay scroll velocity
      scrollVelocity *= 0.95;

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity += delta * 0.1; // Add momentum
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70 transition-opacity duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
