import { useEffect, useRef, useState } from 'react';

interface CyberParticlesBgProps {
  speedMultiplier?: number;
  particleColor?: string;
  lineColor?: string;
  density?: number; // Approximate number of particles per 100,000 pixels
}

export default function CyberParticlesBg({
  speedMultiplier = 1,
  particleColor = 'rgba(129, 140, 248, 0.4)', // indigo-400
  lineColor = 'rgba(129, 140, 248, 0.08)', // Indigo connection line
  density = 40,
}: CyberParticlesBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Set up ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timerId: NodeJS.Timeout;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      
      // Debounce resize updates for high performance
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }, 100);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      clearTimeout(timerId);
    };
  }, []);

  // Main Canvas Particle Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust for High DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      alphaSpeed: number;
      orbitRadius?: number;
      orbitSpeed?: number;
      angle?: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      alpha: number;
      speed: number;
    }

    // Determine target count based on responsive surface area
    const area = dimensions.width * dimensions.height;
    const count = Math.min(120, Math.max(15, Math.floor((area / 100000) * (density / 10))));
    const particles: Particle[] = [];
    const shootingStars: ShootingStar[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw subtle grid overlay
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.015)'; // extremely subtle grid
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // 0. Update and Draw Ambient Shooting Stars
      if (shootingStars.length < 3 && Math.random() < 0.006) {
        shootingStars.push({
          x: Math.random() * dimensions.width * 0.6,
          y: Math.random() * dimensions.height * 0.2,
          vx: Math.random() * 3 + 5,
          vy: Math.random() * 2 + 3,
          length: Math.random() * 60 + 40,
          alpha: Math.random() * 0.4 + 0.3,
          speed: Math.random() * 1.5 + 1.2,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx * s.speed;
        s.y += s.vy * s.speed;

        // Draw shooting star gradient trail
        const trailX = s.x - s.vx * (s.length / 10);
        const trailY = s.y - s.vy * (s.length / 10);
        const grad = ctx.createLinearGradient(s.x, s.y, trailX, trailY);
        grad.addColorStop(0, `rgba(129, 140, 248, ${s.alpha})`);
        grad.addColorStop(0.2, `rgba(129, 140, 248, ${s.alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(129, 140, 248, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(trailX, trailY);
        ctx.stroke();

        // Remove off-screen stars
        if (s.x > dimensions.width || s.y > dimensions.height) {
          shootingStars.splice(i, 1);
        }
      }

      // 1. Draw connecting lines first
      ctx.lineWidth = 0.7;
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            // Fade-out based on distance
            const baseAlpha = 1 - dist / 100;
            ctx.strokeStyle = lineColor.replace(
              /rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/,
              `rgba($1,$2,$3,${baseAlpha * 0.08})`
            );
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 1.5 Draw Interactive Mouse Connection Lines
      if (mouseRef.current.x > -500) {
        particles.forEach((p) => {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = 1 - dist / 140;
            // High-tech digital connecting lines
            ctx.strokeStyle = `rgba(129, 140, 248, ${force * 0.16})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }

      // 2. Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap boundaries
        if (p.x < 0 || p.x > dimensions.width) p.vx *= -1;
        if (p.y < 0 || p.y > dimensions.height) p.vy *= -1;

        // Gentle breathing pulsing effect
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.1 || p.alpha >= 0.8) {
          p.alphaSpeed *= -1;
        }
        // Clamping alpha just in case
        p.alpha = Math.max(0.05, Math.min(0.85, p.alpha));

        // Interaction with mouse pointer
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let finalSize = p.size;
        let finalAlpha = p.alpha;

        if (dist < 120) {
          // Attract/glow response
          const influence = 1 - dist / 120;
          finalSize += influence * 1.5;
          finalAlpha = Math.min(0.9, p.alpha + influence * 0.4);

          // Subtle attraction
          p.x -= dx * influence * 0.015;
          p.y -= dy * influence * 0.015;
        }

        ctx.fillStyle = particleColor.replace(
          /rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/,
          `rgba($1,$2,$3,${finalAlpha})`
        );
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
        ctx.fill();

        // High-tech halo on some select stars
        if (p.size > 2.2) {
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.06)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, finalSize * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, speedMultiplier, particleColor, lineColor, density]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
