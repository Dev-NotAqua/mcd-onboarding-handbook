"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------- lines ---------- */
  const lines = [
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
  ];
  const totalDuration = lines.reduce((a, b) => a + b.duration, 0);

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
    if (isComplete) return; // This prevents the effect from re-running after completion

    const start = performance.now();
    let id: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(100, (elapsed / totalDuration) * 100));

      let idx = 0;
      let cum = 0;
      for (let i = 0; i < lines.length; i++) {
        cum += lines[i].duration;
        if (elapsed < cum) break;
        idx = i + 1;
      }
      setCurrentLine(idx);

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
    onShakeChange?.(doShake);
  }, [currentLine, onShakeChange, lines]);

  /* ---------- interaction handler ---------- */
  const handleInteraction = useCallback(() => {
    if (isComplete || canSkip) {
        setIsComplete(true); // Ensure animation stops
        onComplete();
    }
  }, [canSkip, isComplete, onComplete]);

  useEffect(() => {
    // Attach listener if skippable or already complete
    if (canSkip || isComplete) {
      window.addEventListener("click", handleInteraction);
      window.addEventListener("keydown", handleInteraction);
    }
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [canSkip, isComplete, handleInteraction]);

  /* ---------- helpers ---------- */
  const lineStyle = (t: string) => {
    if (t.startsWith("MC&D TERMINAL")) return "text-[#d4af37] font-bold text-lg";
    if (t.startsWith("Copyright")) return "text-[#d4af37]";
    if (t.includes("100%")) return "text-green-400 font-bold";
    if (/granted|established/.test(t)) return "text-green-400 font-semibold";
    if (/profit meets prestige/.test(t)) return "text-[#f2d675] italic";
    if (/LAUNCH|INITIATING/.test(t)) return "text-red-500 font-bold";
    if (/^...$/.test(t)) return "text-yellow-500 font-bold text-xl";
    return "text-green-400";
  };

  return (
    <>
      {/* global styles */}
      <style jsx global>{`
        html { --gold: #d4af37; --gold-light: #f2d675; --purple-dark: #2e1a47; --purple: #4a2b6b; --green: #22c55e; --red: #ef4444; --yellow: #eab308; }
        @keyframes scan { 0% { transform: translateY(-100px); } 100% { transform: translateY(100vh); } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.1s linear infinite; }
        .animate-glow { box-shadow: 0 0 20px 5px rgba(212, 175, 55, 0.25); }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* component */}
      <div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-2 sm:p-4 cursor-pointer overflow-hidden z-50"
        onClick={handleInteraction}
      >
        {/* starfield */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-400/10 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 5 + 3}s`,
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
        </div>

        {/* terminal */}
        <div className="w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl animate-glow">
          {/* title bar */}
          <header className="bg-gradient-to-r from-[#2e1a47] to-[#4a2b6b] px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
            </div>
            <span className="ml-2 text-xs sm:text-sm text-[#f2d675] font-semibold tracking-wider">MC&D TERMINAL v3.14.159</span>
            <div className="ml-auto flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#f2d675]/80">
              <span>{Math.round(progress)}% COMPLETE</span>
              <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </header>

          {/* body */}
          <main className="bg-black/90 flex-1 p-3 sm:p-6 font-mono relative">
            <div className="space-y-1">
              {lines.slice(0, currentLine).map((l, i) => (
                <p key={i} className={`${lineStyle(l.text)} animate-fadeIn`}>
                  {l.text || "\u00A0"}
                </p>
              ))}

              {!isComplete && currentLine < lines.length && (
                 <p className="flex items-center gap-2 animate-fadeIn">
                  <span className="text-green-400">{">"}</span>
                  <span className={`inline-block w-2.5 h-[1lh] bg-[#d4af37] transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
                 </p>
              )}
            </div>

            {isComplete && (
               <div className="mt-8 text-center space-y-2 animate-pulse">
                 <p className="text-[#d4af37] font-bold tracking-wider text-sm sm:text-base">► PRESS ANY KEY TO CONTINUE ◄</p>
                 <p className="text-gray-500 text-xs">Click anywhere or press any key</p>
               </div>
            )}
          </main>

          {/* progress */}
          <div className="h-1 bg-gray-800">
            <div className="h-full bg-gradient-to-r from-[#d4af37] to-yellow-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-[#d4af37]/50 tracking-wider">CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY</p>

        {canSkip && !isComplete && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-full border border-[#d4af37]/30 animate-fadeIn">
            <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
            <span className="text-[10px] text-[#d4af37]">PRESS ANY KEY TO SKIP</span>
          </div>
        )}
      </div>
    </>
  );
}