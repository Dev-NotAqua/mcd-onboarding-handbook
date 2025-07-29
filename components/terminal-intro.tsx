"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
  onShakeChange?: (isShaking: boolean) => void;
}

// Star properties interface
interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  id: string;
}

export default function TerminalIntro({ onComplete, onShakeChange }: Props) {
  /* -------------------------------------------------------- State */
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const activeMeteors = useRef<any[]>([]);
  const startTimeRef = useRef<number>(0);
  
  /* -------------------------------------------------------- Constants */
  const STAR_COUNT = 200; // Total number of stars
  const DEEP_SPACE_SPEED = 0.01; // Slowest stars
  const MID_SPACE_SPEED = 0.03; // Medium speed stars
  const CLOSE_SPACE_SPEED = 0.08; // Fastest stars
  const BG_COLOR = "rgba(10, 5, 15, 0.9)";
  
  /* -------------------------------------------------------- Lines */
  const lines = useMemo(() => [
    { text: "[SECURE CONNECTION PROTOCOL v3.7.2]", duration: 800 },
    { text: "┌─[AUTHENTICATION]────────────────────────────┐", duration: 400 },
    { text: "│ Neural Pattern Scan... [COMPLETE]          │", duration: 600 },
    { text: "│ Biometric Verification... [SUCCESS]        │", duration: 500 },
    { text: "│ Security Clearance: ████████████████       │", duration: 400 },
    { text: "└────────────────────────────────────────────┘", duration: 200 },
    { text: "", duration: 300 },
    { text: "┌─[NEURAL MATRIX]─────────────────────────────┐", duration: 300 },
    { text: "│ EST. 2024 - Corporate Knowledge Nexus     │", duration: 600 },
    { text: "│ Excellence Through Neural Synthesis       │", duration: 500 },
    { text: "│ Quantum Clearance Granted                 │", duration: 400 },
    { text: "└────────────────────────────────────────────┘", duration: 200 },
    { text: "", duration: 400 },
    { text: "┌─[SYSTEM STATUS]────────────────────────────┐", duration: 200 },
    { text: "│ Quantum Encryption: ACTIVE                │", duration: 300 },
    { text: "│ Reality Anchors: STABLE                   │", duration: 300 },
    { text: "│ Temporal Shields: OPERATIONAL             │", duration: 300 },
    { text: "│ Memetic Filters: ENGAGED                  │", duration: 300 },
    { text: "└────────────────────────────────────────────┘", duration: 200 },
    { text: "", duration: 300 },
    { text: "┌─[LAUNCH SEQUENCE ALPHA-7]─────────────────┐", duration: 200 },
    { text: "│ Phase 1: Reality Stabilization... [OK]     │", duration: 400 },
    { text: "│ Phase 2: Dimensional Calibration... [OK]   │", duration: 400 },
    { text: "│ Phase 3: Interface Manifestation... [OK]   │", duration: 400 },
    { text: "└────────────────────────────────────────────┘", duration: 200 },
    { text: "", duration: 300 },
    { text: "[SYSTEM ARMED] Awaiting manual override...", duration: 400 },
    { text: "Override detected - Countdown initiated", duration: 300 },
    { text: "T-3...", duration: 800 },
    { text: "T-2...", duration: 800 },
    { text: "T-1...", duration: 800 },
    { text: "[IGNITION] Reality distortion field active", duration: 500 },
    { text: "[SYNTHESIS] Neural interface synchronization complete. Welcome to the future of McDonald's.", duration: 1200 },
  ], []);
  
  const totalDuration = useMemo(() => lines.reduce((a, b) => a + b.duration, 0), [lines]);
  
  /* -------------------------------------------------------- Effects */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Force initialization
    if (starsRef.current.length === 0) {
      const generateStars = () => {
        const stars: Star[] = [];
        for (let i = 0; i < STAR_COUNT; i++) {
          const layer = Math.random();
          let speed, size, brightness;
          
          if (layer < 0.5) {
            speed = DEEP_SPACE_SPEED * (0.5 + Math.random() * 0.5);
            size = 0.5 + Math.random() * 1;
            brightness = 0.1 + Math.random() * 0.2;
          } else if (layer < 0.8) {
            speed = MID_SPACE_SPEED * (0.7 + Math.random() * 0.3);
            size = 1 + Math.random() * 1.5;
            brightness = 0.3 + Math.random() * 0.3;
          } else {
            speed = CLOSE_SPACE_SPEED * (0.8 + Math.random() * 0.2);
            size = 2 + Math.random() * 2;
            brightness = 0.6 + Math.random() * 0.4;
          }
          
          stars.push({
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            size,
            speed,
            brightness,
            id: `star-${i}`
          });
        }
        return stars;
      };
      starsRef.current = generateStars();
    }

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  
  useEffect(() => {
    const t = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(t);
  }, []);
  
  useEffect(() => {
    if (isComplete) return;
    
    const start = performance.now();
    startTimeRef.current = start;
    
    // Force initialization of progress
    setProgress(0);
    setCurrentLine(0);
    
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(100, (elapsed / totalDuration) * 100));
      
      let cumulativeDuration = 0;
      let nextLineIndex = 0;
      
      for (let i = 0; i < lines.length; i++) {
        cumulativeDuration += lines[i].duration;
        if (elapsed < cumulativeDuration) {
          nextLineIndex = i;
          break;
        }
        nextLineIndex = i + 1;
      }
      
      setCurrentLine(nextLineIndex);
      
      if (elapsed >= totalDuration) {
        setIsComplete(true);
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };
    
    // Add fallback timeout to prevent hanging
    const fallbackTimeout = setTimeout(() => {
      if (!isComplete) {
        setCurrentLine(lines.length);
        setProgress(100);
        setIsComplete(true);
      }
    }, totalDuration + 2000);
    
    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(fallbackTimeout);
    };
  }, [isComplete, totalDuration, lines]);

  // Auto-scroll to bottom as new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentLine]);
  
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);
  
  useEffect(() => {
    const launchLine = lines[currentLine];
    if (!launchLine) return;
    
    const doShake = /T-\d+\.\.\.|LAUNCHING|IGNITION|SYSTEM ARMED|SYNTHESIS|OVERRIDE|COUNTDOWN|COMPLETE|SUCCESS|VERIFIED|ARMED|READY|NEURAL|BIOMETRIC|CLEARANCE|QUANTUM|REALITY|ANCHORS/.test(launchLine.text);
    setIsShaking(doShake);
    onShakeChange?.(doShake);
    
    // Debug log to verify shake effect is triggering
    if (doShake) {
      console.log('Shake effect triggered for line:', launchLine.text);
    }
  }, [currentLine, onShakeChange, lines]);

  // Handle completion with enhanced effects
  useEffect(() => {
    if (isComplete) {
      // Trigger final shake effect
      setIsShaking(true);
      onShakeChange?.(true);
      
      // Stop shake after completion animation
      const shakeTimeout = setTimeout(() => {
        setIsShaking(false);
        onShakeChange?.(false);
        
        // Call onComplete after shake ends
        setTimeout(() => {
          onComplete();
        }, 300);
      }, 800);
      
      return () => clearTimeout(shakeTimeout);
    }
  }, [isComplete, onComplete, onShakeChange]);
  
  /* -------------------------------------------------------- Starfield Setup */
  useEffect(() => {
    // Only initialize stars once
    if (starsRef.current.length > 0) return;
    
    // Generate stars with consistent positions
    const generateStars = () => {
      const stars: Star[] = [];
      
      for (let i = 0; i < STAR_COUNT; i++) {
        // Determine layer (deep, mid, close)
        const layer = Math.random();
        let speed, size, brightness;
        
        if (layer < 0.5) {
          // Deep space - slow moving
          speed = DEEP_SPACE_SPEED * (0.5 + Math.random() * 0.5);
          size = 0.5 + Math.random() * 1;
          brightness = 0.1 + Math.random() * 0.2;
        } else if (layer < 0.8) {
          // Mid space - medium speed
          speed = MID_SPACE_SPEED * (0.7 + Math.random() * 0.3);
          size = 1 + Math.random() * 1.5;
          brightness = 0.3 + Math.random() * 0.3;
        } else {
          // Close space - fast moving
          speed = CLOSE_SPACE_SPEED * (0.8 + Math.random() * 0.2);
          size = 2 + Math.random() * 2;
          brightness = 0.6 + Math.random() * 0.4;
        }
        
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          speed,
          brightness,
          id: `star-${i}`
        });
      }
      
      return stars;
    };
    
    starsRef.current = generateStars();
  }, []);
  
  /* -------------------------------------------------------- Canvas Animation */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Enhanced animated background with nebula effects
    let nebulaOffset = 0;
    let time = 0;
    
    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Initialize stars for new dimensions
      if (typeof window !== 'undefined') {
        starsRef.current = starsRef.current.map(star => ({
          ...star,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        }));
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Enhanced animation loop with nebula and particle effects
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      time = timestamp * 0.001; // Convert to seconds
      nebulaOffset += 0.005;
      
      // Premium cosmic background with multiple layers
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#0a0a0a');
      bgGradient.addColorStop(0.5, '#1a0a2e');
      bgGradient.addColorStop(1, '#16213e');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // High-quality nebula system
      const nebulaLayers = [
        { color: '#4a148c', size: 0.8, speed: 0.1, opacity: 0.15 },
        { color: '#7b1fa2', size: 0.6, speed: 0.15, opacity: 0.12 },
        { color: '#9c27b0', size: 0.4, speed: 0.2, opacity: 0.08 }
      ];
      
      nebulaLayers.forEach((layer, index) => {
        const x = (canvas.width / 2) + Math.sin(time * layer.speed + index) * canvas.width * layer.size;
        const y = (canvas.height / 2) + Math.cos(time * layer.speed * 0.7 + index) * canvas.height * layer.size;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        
        const nebula = ctx.createRadialGradient(x, y, 0, x, y, radius);
        nebula.addColorStop(0, `${layer.color}${Math.floor(layer.opacity * 255).toString(16).padStart(2, '0')}`);
        nebula.addColorStop(0.5, `${layer.color}${Math.floor(layer.opacity * 128).toString(16).padStart(2, '0')}`);
        nebula.addColorStop(1, `${layer.color}00`);
        
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Atmospheric dust particles
      for (let i = 0; i < 50; i++) {
        const x = (time * 10 + i * 73) % canvas.width;
        const y = (time * 7 + i * 37) % canvas.height;
        const opacity = 0.02 + Math.sin(time + i) * 0.01;
        
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.sin(time * 2 + i) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Draw and update stars with enhanced effects
      starsRef.current.forEach((star, index) => {
        // Enhanced star movement with wave patterns
        const waveX = Math.sin(time * 0.5 + index * 0.1) * 0.5;
        const waveY = Math.cos(time * 0.3 + index * 0.1) * 0.3;
        
        star.y += star.speed * (1 + Math.sin(time * 0.1) * 0.2);
        star.x += waveX * star.speed;
        
        // Reset star position with smooth transitions
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        
        // Enhanced brightness with twinkling
        const twinkle = 0.5 + Math.sin(time * 3 + index) * 0.5;
        let alpha = star.brightness * (0.4 + twinkle * 0.6);
        alpha = Math.max(0.1, Math.min(1, alpha));
        
        // Premium star rendering with color variation
        const starColors = [
          { core: '255, 255, 255', glow: '227, 242, 253' },
          { core: '255, 215, 0', glow: '255, 245, 157' },
          { core: '135, 206, 235', glow: '179, 229, 252' },
          { core: '221, 160, 221', glow: '248, 187, 217' }
        ];
        
        const colorIndex = Math.floor(Math.random() * 4);
        const starColor = starColors[colorIndex % starColors.length];
        
        // Multi-layer star with cross pattern
        const crossSize = star.size * 1.5;
        ctx.strokeStyle = `rgba(${starColor.core}, ${alpha * 0.8})`;
        ctx.lineWidth = star.size * 0.2;
        ctx.beginPath();
        ctx.moveTo(star.x - crossSize, star.y);
        ctx.lineTo(star.x + crossSize, star.y);
        ctx.moveTo(star.x, star.y - crossSize);
        ctx.lineTo(star.x, star.y + crossSize);
        ctx.stroke();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor.core}, ${alpha})`;
        ctx.fill();
        
        // Outer glow with color variation
        const glowSize = star.size * (4 + Math.sin(time * 3 + index) * 2);
        const glowGradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glowSize
        );
        
        glowGradient.addColorStop(0, `rgba(${starColor.glow}, ${alpha * 0.9})`);
        glowGradient.addColorStop(0.3, `rgba(${starColor.glow}, ${alpha * 0.5})`);
        glowGradient.addColorStop(0.7, `rgba(${starColor.glow}, ${alpha * 0.2})`);
        glowGradient.addColorStop(1, `rgba(${starColor.glow}, 0)`);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Enhanced star trails for fast-moving stars
        if (star.speed > CLOSE_SPACE_SPEED * 0.7) {
          const trailLength = star.speed * 8;
          const trailGradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x - trailLength, star.y - trailLength * 0.5
          );
          
          trailGradient.addColorStop(0, `rgba(250, 208, 44, ${alpha * 0.6})`);
          trailGradient.addColorStop(0.5, `rgba(255, 200, 100, ${alpha * 0.3})`);
          trailGradient.addColorStop(1, 'rgba(250, 208, 44, 0)');
          
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - trailLength, star.y - trailLength * 0.5);
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = star.size * (0.3 + alpha * 0.7);
          ctx.stroke();
        }
      });
      
      // Enhanced meteor effects with realistic physics and trails
      if (Math.random() < 0.015) {
        const meteor = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3, // Start higher up
          speedX: -8 - Math.random() * 12, // Angled trajectory
          speedY: 12 + Math.random() * 8,
          size: 1 + Math.random() * 3,
          life: 1.0, // Fade out over time
          maxLife: 60 + Math.random() * 40,
          trail: [] as {x: number, y: number, life: number}[]
        };
        
        // Add to active meteors array
        activeMeteors.current.push(meteor);
      }
      
      // Update and draw meteors
      activeMeteors.current = activeMeteors.current.filter(meteor => {
        meteor.x += meteor.speedX;
        meteor.y += meteor.speedY;
        meteor.life -= 1 / meteor.maxLife;
        
        // Add trail points
        meteor.trail.push({x: meteor.x, y: meteor.y, life: meteor.life});
        if (meteor.trail.length > 20) meteor.trail.shift();
        
        // Remove if off screen or faded
        if (meteor.life <= 0 || meteor.y > canvas.height + 50 || meteor.x < -50) {
          return false;
        }
        
        // Draw meteor with gradient trail
        const gradient = ctx.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - meteor.speedX * 5, meteor.y - meteor.speedY * 5
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.life})`);
        gradient.addColorStop(0.3, `rgba(255, 200, 100, ${meteor.life * 0.8})`);
        gradient.addColorStop(0.7, `rgba(255, 100, 50, ${meteor.life * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 50, 0, 0)`);
        
        // Draw trail
        ctx.beginPath();
        meteor.trail.forEach((point: { x: number; y: number; life: number }, index: number) => {
          const trailAlpha = (point.life * (index / meteor.trail.length)) * meteor.life;
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.strokeStyle = gradient;
        ctx.lineWidth = meteor.size * (1 + meteor.life * 2);
        ctx.stroke();
        
        // Draw meteor head with glow
        const headGradient = ctx.createRadialGradient(
          meteor.x, meteor.y, 0,
          meteor.x, meteor.y, meteor.size * 4
        );
        headGradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.life})`);
        headGradient.addColorStop(0.3, `rgba(255, 220, 180, ${meteor.life * 0.8})`);
        headGradient.addColorStop(1, `rgba(255, 100, 50, 0)`);
        
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = headGradient;
        ctx.fill();
        
        return true;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Force start animation
    startTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  /* -------------------------------------------------------- Interaction */
  const handleInteraction = useCallback(() => {
    if (canSkip && !isComplete) {
      setIsComplete(true);
    }
  }, [canSkip, isComplete]);
  
  useEffect(() => {
    if (canSkip || isComplete) {
      window.addEventListener("click", handleInteraction);
      window.addEventListener("keydown", handleInteraction);
    }
    
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [canSkip, isComplete, handleInteraction]);
  
  // Completion callback
  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);
  
  /* -------------------------------------------------------- Line Styling */
  const lineStyle = (t: string) => {
    // Authentication and security messages
    if (t.includes("SECURE CONNECTION") || t.includes("AUTHENTICATION")) return "text-[#FAD02C] font-bold text-lg";
    if (t.includes("Neural Pattern") || t.includes("Biometric") || t.includes("Security Clearance")) return "text-green-400 font-semibold";
    
    // System status and headers
    if (/┌.*┐|└.*┘/.test(t)) return "text-[#FAD02C] font-mono tracking-wider";
    if (t.includes("NEURAL MATRIX") || t.includes("SYSTEM STATUS")) return "text-[#FAD02C] font-bold";
    if (t.includes("EST. 2024") || t.includes("Corporate Knowledge")) return "text-[#D4AF37] font-semibold";
    if (t.includes("Excellence Through") || t.includes("Quantum Clearance")) return "text-cyan-300";
    
    // System components
    if (t.includes("Quantum Encryption") || t.includes("Reality Anchors") || t.includes("Temporal Shields") || t.includes("Memetic Filters")) return "text-green-400";
    if (t.includes("ACTIVE") || t.includes("STABLE") || t.includes("OPERATIONAL") || t.includes("ENGAGED")) return "text-green-300 font-bold";
    
    // Launch sequence
    if (t.includes("LAUNCH SEQUENCE")) return "text-[#FAD02C] font-bold";
    if (t.includes("Phase") && t.includes("[OK]")) return "text-green-400";
    if (t.includes("[OK]")) return "text-green-300 font-bold";
    
    // Critical system messages
    if (t.includes("SYSTEM ARMED")) return "text-yellow-400 font-bold animate-pulse";
    if (t.includes("Override detected")) return "text-orange-400 font-semibold";
    
    // Countdown - enhanced styling
    if (/T-\d+\.\.\./.test(t)) return "text-red-400 font-bold text-2xl animate-pulse";
    
    // Final messages
    if (t.includes("IGNITION") || t.includes("Reality distortion")) return "text-red-500 font-bold animate-pulse";
    if (t.includes("SYNTHESIS") || t.includes("Neural interface synchronization")) return "text-[#FAD02C] font-bold";
    if (t.includes("Welcome to the future")) return "text-green-400 font-semibold";
    
    // Default styling
    return "text-[#D4AF37]";
  };
  
  /* -------------------------------------------------------- Render */
  return (
    <>
      {/* Global styles */}
      <style jsx global>{`
        :root { 
          --mcd-gold-light: #FAD02C;
          --mcd-gold: #D4AF37;
          --mcd-gold-dark: #B8860B;
          --mcd-purple-light: #6A4C93;
          --mcd-purple: #462569;
          --mcd-purple-dark: #2D1A44;
        }

        /* Custom scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thumb-\[\#FAD02C\]\/30::-webkit-scrollbar-thumb {
          background-color: rgba(250, 208, 44, 0.3);
          border-radius: 4px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thumb-\[\#FAD02C\]\/30::-webkit-scrollbar-thumb:hover {
          background-color: rgba(250, 208, 44, 0.5);
        }
        
        @keyframes scan { 
          0% { background-position: 0 0; } 
          100% { background-position: 0 100vh; } 
        }
        
        @keyframes pulse { 
          0%, 100% { opacity: 0.2; } 
          50% { opacity: 0.8; } 
        }
        
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        
        @keyframes shake { 
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
          20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
        }
        
        .animate-shake { 
          animation: shake 0.15s linear infinite; 
        }
        
        .animate-glow { 
          box-shadow: 0 0 20px 5px rgba(212, 175, 55, 0.25);
          transition: box-shadow 0.3s ease;
        }
        
        .shake-glow {
          animation: shake 0.15s ease-in-out infinite, glow-pulse 0.4s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 25px 8px rgba(250, 208, 44, 0.4); }
          50% { box-shadow: 0 0 40px 15px rgba(250, 208, 44, 0.6); }
        }
        
        .crt::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0.1) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 2px;
          z-index: 10;
          pointer-events: none;
          animation: scan 10s linear infinite;
        }
        
        .terminal-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(
            circle at center,
            rgba(70, 37, 105, 0.15) 0%,
            rgba(0, 0, 0, 0) 70%
          );
          pointer-events: none;
          z-index: 0;
          animation: terminal-glow 8s ease-in-out infinite alternate;
        }
        
        @keyframes terminal-glow {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .welcome-box {
          border: 1px solid rgba(250, 208, 44, 0.3);
          background: linear-gradient(135deg, rgba(70, 37, 105, 0.1) 0%, rgba(250, 208, 44, 0.05) 100%);
          box-shadow: 0 0 20px rgba(250, 208, 44, 0.1);
        }
        
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(40, end);
        }
        
        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(250, 208, 44, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
      `}</style>
      
      {/* Component */}
      <motion.div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-[#2D1A44] via-[#462569] to-black flex items-center justify-center p-2 sm:p-4 cursor-pointer overflow-hidden z-50"
        onClick={handleInteraction}
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{ 
          opacity: isComplete ? 0 : 1,
          scale: isComplete ? 0.8 : 1,
          filter: isComplete ? "blur(20px)" : "blur(0px)"
        }}
        transition={{ 
          duration: 2.0, 
          delay: isComplete ? 0.5 : 0,
          ease: "easeInOut"
        }}
      >
        {/* Starfield Canvas - now with persistent positions */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ 
            zIndex: 0,
            opacity: 0.8
          }}
        />
        
        {/* Terminal glow effect */}
        <div 
          className="terminal-glow absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.3,
            background: 'radial-gradient(circle at center, rgba(70, 37, 105, 0.1) 0%, transparent 70%)'
          }}
        />
        
        {/* Terminal */}
        <div className={`w-full max-w-4xl flex flex-col rounded-lg overflow-hidden shadow-2xl animate-glow transition-all duration-300 max-h-[80vh] ${
          isShaking ? 'shake-glow' : ''
        }`}>
          {/* Title bar */}
          <header className="bg-gradient-to-r from-[#2D1A44] to-[#462569] px-3 py-2 flex items-center gap-2 border-b border-black/30">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
            </div>
            <span className="ml-2 text-xs sm:text-sm text-[#FAD02C] font-semibold tracking-wider">NEURAL INTERFACE v3.14</span>
            <div className="ml-auto flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#FAD02C]/80">
              <span>{Math.round(progress)}% COMPLETE</span>
              <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </header>
          
          {/* Body */}
          <main className="bg-black/70 h-96 font-mono relative crt backdrop-blur-[1px] overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#FAD02C]/30 scrollbar-track-transparent" ref={scrollRef}>
              <div className="relative z-20 p-3 sm:p-6 space-y-1">
                {/* Render previous and current lines */}
                {lines.slice(0, currentLine).map((l, i) => (
                  <p key={i} className={lineStyle(l.text)}>
                    {l.text || "\u00A0"}
                  </p>
                ))}
                
                {!isComplete && currentLine < lines.length && (
                  <p className={`flex items-center gap-2 ${lineStyle(lines[currentLine].text)}`}>
                    <span>{lines[currentLine].text}</span>
                    <span className={`inline-block w-2 h-[1em] bg-[#FAD02C] transition-opacity duration-200 ${showCursor ? "opacity-100" : "opacity-0"}`} />
                  </p>
                )}
              </div>
            </div>
            
            {/* CRT grid overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: `linear-gradient(rgba(250, 208, 44, 0.04) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(250, 208, 44, 0.04) 1px, transparent 1px)`,
                backgroundSize: "2em 2em"
              }}
            />
          </main>
          
          {/* Progress bar */}
          <div className="h-1 bg-black/50">
            <div 
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FAD02C] transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
        
        <p className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-cyan-300/70 tracking-wider z-10">
          QUANTUM-ENCRYPTED │ REALITY ANCHORS STABLE │ MEMETIC FILTERS ENGAGED
        </p>
        
        {canSkip && !isComplete && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full border border-[#FAD02C]/30 animate-fadeIn z-10 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#FAD02C] rounded-full animate-pulse" />
            <span className="text-xs text-[#FAD02C]">PRESS ANY KEY TO SKIP</span>
          </div>
        )}
      </motion.div>
    </>
  );
}