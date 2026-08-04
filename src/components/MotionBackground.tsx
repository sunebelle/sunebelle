"use client";

import { useEffect, useRef } from "react";

interface ThemeConfig {
  name: string;
  glow1: string;
  glow2: string;
  glow3: string;
  particleColor: string;
  lineColor: string;
}

interface MotionBackgroundProps {
  theme?: ThemeConfig;
}

const defaultTheme: ThemeConfig = {
  name: "Cosmic Default",
  glow1: "rgba(99, 102, 241, 0.22)",
  glow2: "rgba(168, 85, 247, 0.16)",
  glow3: "rgba(236, 72, 153, 0.1)",
  particleColor: "rgba(255, 255, 255, 0.75)",
  lineColor: "rgba(99, 102, 241, 0.22)"
};

export default function MotionBackground({ theme: userTheme }: MotionBackgroundProps) {
  const theme = userTheme || defaultTheme;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let planets: Planet[] = [];
    let shootingStars: ShootingStar[] = [];
    const particleCount = 45;

    // Helper to dynamically adjust color opacities based on active theme
    const setAlpha = (rgbaStr: string, alpha: number): string => {
      return rgbaStr.replace(/[\d\.]+\)$/, `${alpha})`);
    };

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 0;
      baseSpeed: number = 0.4;
      twinklePhase: number = 0;
      twinkleSpeed: number = 0;
      currentScale: number = 1;

      constructor(width: number, height: number) {
        this.reset(width, height, true);
        this.currentScale = 1; // start fully formed for initial stars
      }

      reset(width: number, height: number, randomizePosition = false) {
        this.x = randomizePosition ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
        this.y = randomizePosition ? Math.random() * height : (Math.random() > 0.5 ? 0 : height);

        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.4 + 0.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.radius = Math.random() * 2 + 1.2;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.015 + Math.random() * 0.025;
        this.currentScale = 1;
      }

      update(width: number, height: number, mouseX: number, mouseY: number) {
        // Growth logic for newly forming stars
        if (this.currentScale < 1) {
          this.currentScale += 0.015;
          if (this.currentScale > 1) this.currentScale = 1;
        }

        // Friction / limits
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Base drift speed
        const currentSpeed = Math.hypot(this.vx, this.vy);
        if (currentSpeed < this.baseSpeed) {
          const angle = Math.random() * Math.PI * 2;
          this.vx += Math.cos(angle) * 0.05;
          this.vy += Math.sin(angle) * 0.05;
        }

        // Mouse attraction physics
        if (mouseX > -500 && mouseY > -500) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Magnetic pull
            this.vx += (dx / dist) * force * 0.08;
            this.vy += (dy / dist) * force * 0.08;
          }
        }

        // Clamp speed
        const speed = Math.hypot(this.vx, this.vy);
        const maxSpeed = 1.5;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Update twinkling
        this.twinklePhase += this.twinkleSpeed;

        // Bounce / Wrap
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D, color: string) {
        const twinkleAlpha = 0.3 + 0.7 * Math.abs(Math.sin(this.twinklePhase));

        c.save();
        c.globalAlpha = twinkleAlpha * this.currentScale;

        const cx = this.x;
        const cy = this.y;
        const spikes = 4;
        const outerRadius = this.radius * 2.4 * this.currentScale;
        const innerRadius = this.radius * 0.45 * this.currentScale;

        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        c.beginPath();
        c.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          c.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          c.lineTo(x, y);
          rot += step;
        }
        c.lineTo(cx, cy - outerRadius);
        c.closePath();

        c.fillStyle = color;
        c.shadowColor = color;
        c.shadowBlur = 6 * this.currentScale;
        c.fill();

        c.restore();
      }
    }

    class Planet {
      x: number;
      y: number;
      radius: number;
      color: string;
      glowColor: string;
      ringColor: string;
      angle: number;
      speed: number;

      constructor(x: number, y: number, radius: number, color: string, glowColor: string, ringColor: string, speed = 0.0004) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.glowColor = glowColor;
        this.ringColor = ringColor;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = speed;
      }

      update() {
        this.angle += this.speed;
      }

      draw(c: CanvasRenderingContext2D) {
        const driftX = Math.cos(this.angle) * 12;
        const driftY = Math.sin(this.angle) * 8;
        const cx = this.x + driftX;
        const cy = this.y + driftY;

        c.save();

        // Glow shadow
        c.shadowColor = this.glowColor;
        c.shadowBlur = 25;

        // Gradient shading
        const grad = c.createRadialGradient(cx - this.radius * 0.3, cy - this.radius * 0.3, this.radius * 0.05, cx, cy, this.radius);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.25, this.color);
        grad.addColorStop(1, "#020617");

        c.beginPath();
        c.arc(cx, cy, this.radius, 0, Math.PI * 2);
        c.fillStyle = grad;
        c.fill();

        // Planetary ring
        c.shadowBlur = 0;
        c.beginPath();
        c.strokeStyle = this.ringColor;
        c.lineWidth = this.radius * 0.09;
        c.ellipse(cx, cy, this.radius * 1.85, this.radius * 0.32, 0.45, 0, Math.PI * 2);
        c.stroke();

        c.restore();
      }
    }

    class ShootingStar {
      x: number = 0;
      y: number = 0;
      dx: number = 0;
      dy: number = 0;
      length: number = 0;
      speed: number = 0;
      opacity: number = 1;
      active: boolean = true;

      constructor(width: number, height: number) {
        this.reset(width, height);
      }

      reset(width: number, height: number) {
        this.x = Math.random() * width * 0.75 + width * 0.25;
        this.y = Math.random() * height * 0.25;
        this.dx = -1.3 - Math.random() * 0.4;
        this.dy = 0.8 + Math.random() * 0.3;
        this.length = Math.random() * 90 + 45;
        this.speed = Math.random() * 7 + 6;
        this.opacity = 1.0;
        this.active = true;
      }

      update(width: number, height: number) {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.opacity -= 0.015;

        if (this.opacity <= 0 || this.x < 0 || this.y > height) {
          this.active = false;
        }
      }

      draw(c: CanvasRenderingContext2D, tailColor: string) {
        if (!this.active) return;
        c.save();
        c.globalAlpha = this.opacity;

        const grad = c.createLinearGradient(this.x, this.y, this.x - this.dx * this.length, this.y - this.dy * this.length);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.12, tailColor);
        grad.addColorStop(1, "transparent");

        c.beginPath();
        c.strokeStyle = grad;
        c.lineWidth = 1.6;
        c.moveTo(this.x, this.y);
        c.lineTo(this.x - this.dx * this.length, this.y - this.dy * this.length);
        c.stroke();

        c.restore();
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize particles
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }

      // Initialize Planets (top-right, mid-left, lower-right)
      planets = [
        new Planet(
          rect.width * 0.82,
          rect.height * 0.22,
          35,
          "rgba(99, 102, 241, 0.75)",
          "rgba(99, 102, 241, 0.2)",
          "rgba(168, 85, 247, 0.45)",
          0.0005
        ),
        new Planet(
          rect.width * 0.15,
          rect.height * 0.45,
          22,
          "rgba(20, 184, 166, 0.75)",
          "rgba(20, 184, 166, 0.2)",
          "rgba(99, 102, 241, 0.45)",
          -0.0003
        ),
        new Planet(
          rect.width * 0.58,
          rect.height * 0.76,
          14,
          "rgba(236, 72, 153, 0.75)",
          "rgba(236, 72, 153, 0.2)",
          "rgba(244, 114, 182, 0.45)",
          0.0007
        )
      ];

      // Clear shooting stars on resize
      shootingStars = [];
    };

    window.addEventListener("resize", resize);
    resize();

    const mouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const mouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    const windowClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn star-forming cluster on click
      const spawnCount = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < spawnCount; i++) {
        const p = new Particle(rect.width, rect.height);
        p.x = clickX;
        p.y = clickY;

        // Random outward blast velocities
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.6 + 0.4;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.currentScale = 0; // Starts from 0 (forming)

        particles.push(p);
      }

      // Safeguard particle limit
      if (particles.length > 80) {
        particles.splice(0, particles.length - 80);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseleave", mouseLeave);
    window.addEventListener("click", windowClick);

    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and draw planets
      planets.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Spawn shooting stars randomly
      if (Math.random() < 0.005 && shootingStars.length < 2) {
        shootingStars.push(new ShootingStar(rect.width, rect.height));
      }

      // Update and draw shooting stars
      shootingStars.forEach((star, index) => {
        star.update(rect.width, rect.height);
        if (!star.active) {
          shootingStars.splice(index, 1);
        } else {
          star.draw(ctx, theme.particleColor);
        }
      });

      // Slowly form new background stars randomly
      if (Math.random() < 0.015 && particles.length < 75) {
        const p = new Particle(rect.width, rect.height);
        p.currentScale = 0; // start at 0 to form
        particles.push(p);

        // Swap out old star if threshold exceeded
        if (particles.length > particleCount + 10) {
          const oldIndex = particles.findIndex(part => part.currentScale === 1);
          if (oldIndex !== -1) {
            particles.splice(oldIndex, 1);
          }
        }
      }

      // Draw constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = theme.lineColor;
            ctx.lineWidth = (1 - dist / 130) * 0.7;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update(rect.width, rect.height, mx, my);
        p.draw(ctx, theme.particleColor);
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseleave", mouseLeave);
      window.removeEventListener("click", windowClick);
    };
  }, [theme]);

  // CSS Ambient Blobs Orbit Styles matching the theme
  const customStyles = {
    "--glow-color-1": theme.glow1,
    "--glow-color-2": theme.glow2,
    "--glow-color-3": theme.glow3,
  } as React.CSSProperties;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-1000"
      style={customStyles}
    >
      {/* Background radial glow 1 */}
      <div className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full glow-ambient-1 animate-orbit-1 opacity-60" />

      {/* Background radial glow 2 */}
      <div className="absolute top-2/3 -right-1/4 w-[55vw] h-[55vw] rounded-full glow-ambient-2 animate-orbit-2 opacity-50" />

      {/* Background radial glow 3 */}
      <div className="absolute top-1/2 left-1/3 w-[45vw] h-[45vw] rounded-full glow-ambient-3 animate-orbit-3 opacity-40" />

      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25]" />

      {/* Dark tint overlay to maintain text contrast */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Interactive Node Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />
    </div>
  );
}
