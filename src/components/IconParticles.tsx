import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export function IconParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const particles: Array<{
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      size: number;
      alpha: number;
    }> = [];

    const createParticle = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y;

      switch (side) {
        case 0: // top
          x = Math.random() * window.innerWidth;
          y = -10;
          break;
        case 1: // right
          x = window.innerWidth + 10;
          y = Math.random() * window.innerHeight;
          break;
        case 2: // bottom
          x = Math.random() * window.innerWidth;
          y = window.innerHeight + 10;
          break;
        default: // left
          x = -10;
          y = Math.random() * window.innerHeight;
          break;
      }

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const spreadX = (Math.random() - 0.5) * 400;
      const spreadY = (Math.random() - 0.5) * 400;
      const targetX = centerX + spreadX;
      const targetY = centerY + spreadY;
      
      const angle = Math.atan2(targetY - y, targetX - x);
      const speed = Math.random() * 3 + 1;
      
      return {
        x,
        y,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.3 + 0.1,
      };
    };

    const dialogContent = document.querySelector('[role="dialog"]');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLElement) {
          if (mutation.target.classList.contains('fade-out-content')) {
            setIsClosing(true);
          }
        }
      });
    });

    if (dialogContent) {
      observer.observe(dialogContent, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (particles.length < 80) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= isClosing ? 0.05 : 0.002;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${p.alpha})`; // Teal color for Icon Series
        ctx.shadowColor = 'rgba(20, 184, 166, 0.3)';
        ctx.shadowBlur = 15;
        ctx.fill();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCanvasSize);
      particles.length = 0;
    };
  }, [isClosing]);

  return ReactDOM.createPortal(
    <canvas
      ref={canvasRef}
      className="fixed pointer-events-none"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        mixBlendMode: 'screen',
        zIndex: 45
      }}
    />,
    document.body
  );
} 