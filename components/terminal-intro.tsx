"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface Props {
  onComplete: () => void;
  onShakeChange?: (isShaking: boolean) => void;
}

export default function TerminalIntro({ onComplete, onShakeChange }: Props) {
  /* ---------- state ---------- */
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------- lines ---------- */
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

  /* ---------- effects ---------- */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isComplete) return;

    const start = performance.now();
    let id: number;

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
        id = requestAnimationFrame(tick);
      }
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
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

  /* ---------- interaction handler ---------- */
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

  // Separate effect to handle completion callback
  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  /* ---------- helpers ---------- */
  const lineStyle = (t: string) => {
    if (t.startsWith("MC&D TERMINAL")) return "text-mcd-gold-light font-bold text-lg";
    if (t.startsWith("Copyright")) return "text-mcd-gold";
    if (t.includes("100%")) return "text-mcd-gold-light font-bold";
    if (/granted|established/.test(t)) return "text-mcd-gold-light font-semibold";
    if (/profit meets prestige/.test(t)) return "italic";
    if (/LAUNCH|INITIATING/.test(t)) return "text-red-500 font-bold";
    if (/^...$/.test(t)) return "text-yellow-500 font-bold text-xl";
    return "text-mcd-gold";
  };

  const generateStars = (count: number, sizeRange: [number, number], speedRange: [number, number]) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
      const duration = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
      return (
        <div
          key={i}
          className="absolute rounded-full bg-mcd-gold-light animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      );
    });
  };

  return (
    <>
      {/* global styles */}
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
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, 2px); }
        }

        .animate-shake { animation: shake 0.1s linear infinite; }
        
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
          background-size: 100% 3px;
          z-index: 10;
          pointer-events: none;
          animation: scan 8s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { 
            animation-duration: 0.01ms !important; 
            animation-iteration-count: 1 !important; 
            transition-duration: 0.01ms !important; 
          }
        }
      `}</style>

      {/* component */}
      <div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-[var(--mcd-purple-dark)] via-[var(--mcd-purple)] to-black flex items-center justify-center p-2 sm:p-4 cursor-pointer overflow-hidden z-50"
        onClick={handleInteraction}
      >
        {/* starfield layers */}
        <div className="absolute inset-0 pointer-events-none">
          {generateStars(100, [0.5, 1.5], [20, 40])}
          {generateStars(50, [1, 2.5], [10, 20])}
        </div>

        {/* terminal */}
        <div className={`w-full max-w-4xl flex flex-col rounded-lg overflow-hidden shadow-2xl animate-glow transition-all duration-300 ${
          isShaking ? 'shake-glow' : ''
        }`}>
          {/* title bar */}
          <header className="bg-gradient-to-r from-[var(--mcd-purple-dark)] to-[var(--mcd-purple)] px-3 py-2 flex items-center gap-2 border-b border-black/30">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
            </div>
            <span className="ml-2 text-xs sm:text-sm text-[var(--mcd-gold)] font-semibold tracking-wider">MC&D TERMINAL</span>
            <div className="ml-auto flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[var(--mcd-gold)]/80">
              <span>{Math.round(progress)}% COMPLETE</span>
              <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </header>

          {/* body */}
          <main className="bg-black/70 flex-1 p-3 sm:p-6 font-mono relative crt backdrop-blur-[1px]">
            <div className="relative z-20 space-y-1">
              
              {/* --- FIX: Correctly render previous and current lines --- */}
              {lines.slice(0, currentLine).map((l, i) => (
                <p key={i} className={lineStyle(l.text)}>
                  {l.text || "\u00A0"}
                </p>
              ))}

              {!isComplete && currentLine < lines.length && (
                 <p className={`flex items-center gap-2 ${lineStyle(lines[currentLine].text)}`}>
                  <span>{lines[currentLine].text}</span>
                  <span className={`inline-block w-2 h-[1em] bg-[var(--mcd-gold-light)] transition-opacity duration-200 ${showCursor ? "opacity-100" : "opacity-0"}`} />
                 </p>
              )}

            </div>
            
            {/* CRT grid overlay */}
            <div className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(212, 175, 55, 0.04) 1px, transparent 1px)`,
                backgroundSize: "2em 2em"
              }}
            />
          </main>

          {/* progress */}
          <div className="h-1 bg-black/50">
            <div className="h-full bg-gradient-to-r from-[var(--mcd-gold)] to-[var(--mcd-gold-light)] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-[var(--mcd-gold)]/50 tracking-wider z-10">
          CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY
        </p>

        {canSkip && !isComplete && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full border border-[var(--mcd-gold)]/30 animate-fadeIn z-10 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[var(--mcd-gold)] rounded-full animate-pulse" />
            <span className="text-xs text-[var(--mcd-gold)]">PRESS ANY KEY TO SKIP</span>
          </div>
        )}
      </div>
    </>
  );
}