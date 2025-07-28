"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

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
  const animationFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const startTimeRef = useRef<number>(0);
  
  /* -------------------------------------------------------- Constants */
  const STAR_COUNT = 200; // Total number of stars
  const DEEP_SPACE_SPEED = 0.01; // Slowest stars
  const MID_SPACE_SPEED = 0.03; // Medium speed stars
  const CLOSE_SPACE_SPEED = 0.08; // Fastest stars
  const BG_COLOR = "rgba(10, 5, 15, 0.9)";
  
  /* -------------------------------------------------------- Lines */
  const lines = useMemo(() => [
    { text: "MC&D TERMINAL v3.14.159", duration: 500 },
    { text: "Copyright © Marshall, Carter & Darke Ltd.", duration: 300 },
    { text: "", duration: 200 },
    { text: "Initializing secure connection...", duration: 400 },
    { text: "[████████████████████████████████] 100%", duration: 800 },
    { text: "Connection established.", duration: 300 },
    { text: "", duration: 200 },
    { text: "Loading employee onboarding system...", duration: 400 },
    { text: "Authenticating credentials...", duration: 500 },
    { text: "Access granted.", duration: 300 },
    { text: "", duration: 200 },
    { text: "Welcome to Marshall, Carter & Darke Ltd.", duration: 400 },
    { text: "Where profit meets prestige.", duration: 500 },
    { text: "", duration: 300 },
    { text: "INITIATING LAUNCH SEQUENCE...", duration: 400 },
    { text: "3...", duration: 800 },
    { text: "2...", duration: 800 },
    { text: "1...", duration: 800 },
    { text: "LAUNCHING HANDBOOK INTERFACE...", duration: 1000 },
  ], []);
  
  const totalDuration = useMemo(() => lines.reduce((a, b) => a + b.duration, 0), [lines]);
  
  /* -------------------------------------------------------- Effects */
  useEffect(() => {
    document.body.style.overflow = "hidden";
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
    
    animationFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isComplete, totalDuration, lines]);
  
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);
  
  useEffect(() => {
    const launchLine = lines[currentLine];
    if (!launchLine) return;
    
    const doShake = /LAUNCHING/.test(launchLine.text);
    setIsShaking(doShake);
    onShakeChange?.(doShake);
  }, [currentLine, onShakeChange, lines]);
  
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
    
    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Update star positions to fit new dimensions
      starsRef.current = starsRef.current.map(star => ({
        ...star,
        x: (star.x / window.innerWidth) * canvas.width,
        y: (star.y / window.innerHeight) * canvas.height
      }));
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation loop
    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with subtle fade for motion blur effect
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate elapsed time since animation started
      const elapsedTime = (time - startTimeRef.current) / 1000;
      
      // Draw and update each star
      starsRef.current.forEach(star => {
        // Move star downward (simulating forward motion)
        star.y += star.speed * (1 + elapsedTime * 0.1);
        
        // Reset star position when it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star with appropriate brightness
        const starIndex = parseInt(star.id.replace('star-', '')) || 0;
        let alpha = star.brightness * (0.7 + Math.sin(time * 0.001 + starIndex) * 0.3);
        
        // Ensure alpha is valid and within bounds
        alpha = Math.max(0, Math.min(1, isNaN(alpha) ? 0.5 : alpha));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 208, 44, ${alpha})`;
        ctx.fill();
        
        // Add subtle glow effect for larger stars
        if (star.size > 2) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
          );
          const glowAlpha = Math.max(0, Math.min(1, alpha * 0.8));
          gradient.addColorStop(0, `rgba(250, 208, 44, ${glowAlpha})`);
          gradient.addColorStop(1, 'rgba(250, 208, 44, 0)');
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
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
    if (t.startsWith("MC&D TERMINAL")) return "text-[#FAD02C] font-bold text-lg";
    if (t.startsWith("Copyright")) return "text-[#D4AF37]";
    if (t.includes("100%")) return "text-[#FAD02C] font-bold";
    if (/granted|established/.test(t)) return "text-[#FAD02C] font-semibold";
    if (/profit meets prestige/.test(t)) return "italic text-[#D4AF37]";
    if (/LAUNCH|INITIATING/.test(t)) return "text-red-500 font-bold";
    if (/^...$/.test(t)) return "text-yellow-500 font-bold text-xl";
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
          25% { transform: translate(-1.5px, 1.5px); }
          50% { transform: translate(1.5px, -1.5px); }
          75% { transform: translate(-1.5px, 1.5px); }
        }
        
        .animate-shake { 
          animation: shake 0.1s linear infinite; 
        }
        
        .animate-glow { 
          box-shadow: 0 0 20px 5px rgba(212, 175, 55, 0.25);
          transition: box-shadow 0.3s ease;
        }
        
        .shake-glow {
          animation: shake 0.2s ease-in-out infinite, glow-pulse 0.5s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px 5px rgba(212, 175, 55, 0.25); }
          50% { box-shadow: 0 0 30px 10px rgba(212, 175, 55, 0.4); }
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
        
        @media (prefers-reduced-motion: reduce) {
          * { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
      `}</style>
      
      {/* Component */}
      <div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-[#2D1A44] via-[#462569] to-black flex items-center justify-center p-2 sm:p-4 cursor-pointer overflow-hidden z-50"
        onClick={handleInteraction}
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
        <div className={`w-full max-w-4xl flex flex-col rounded-lg overflow-hidden shadow-2xl animate-glow transition-all duration-300 ${
          isShaking ? 'shake-glow' : ''
        }`}>
          {/* Title bar */}
          <header className="bg-gradient-to-r from-[#2D1A44] to-[#462569] px-3 py-2 flex items-center gap-2 border-b border-black/30">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
            </div>
            <span className="ml-2 text-xs sm:text-sm text-[#FAD02C] font-semibold tracking-wider">MC&D TERMINAL</span>
            <div className="ml-auto flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#FAD02C]/80">
              <span>{Math.round(progress)}% COMPLETE</span>
              <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </header>
          
          {/* Body */}
          <main className="bg-black/70 flex-1 p-3 sm:p-6 font-mono relative crt backdrop-blur-[1px]">
            <div className="relative z-20 space-y-1">
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
        
        <p className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-[#FAD02C]/50 tracking-wider z-10">
          CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY
        </p>
        
        {canSkip && !isComplete && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full border border-[#FAD02C]/30 animate-fadeIn z-10 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#FAD02C] rounded-full animate-pulse" />
            <span className="text-xs text-[#FAD02C]">PRESS ANY KEY TO SKIP</span>
          </div>
        )}
      </div>
    </>
  );
}