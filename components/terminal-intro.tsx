"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface TerminalIntroProps {
  onComplete: () => void
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [progress, setProgress] = useState(0)
  const [shake, setShake] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const terminalLines = useRef([
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
    { text: "LAUNCHING HANDBOOK INTERFACE...", duration: 1000 }
  ]).current

  const totalDuration = useRef(
    terminalLines.reduce((sum, line) => sum + line.duration, 0) + 1000
  ).current

  const handleSkip = useCallback(() => {
    if (canSkip && animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      onComplete()
    }
  }, [canSkip, onComplete])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setCanSkip(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!canSkip) return

    const handler = () => handleSkip()
    window.addEventListener('keydown', handler)
    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('click', handler)
    }
  }, [canSkip, handleSkip])

  useEffect(() => {
    startTimeRef.current = performance.now()
    
    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current
      
      setProgress(Math.min(100, (elapsed / totalDuration) * 100))
      
      let cumulativeTime = 0
      let currentIndex = terminalLines.length
      
      for (let i = 0; i < terminalLines.length; i++) {
        cumulativeTime += terminalLines[i].duration
        if (elapsed < cumulativeTime) {
          currentIndex = i
          break
        }
      }
      
      setCurrentLine(currentIndex)

      // Trigger shake animation during countdown
      if (terminalLines[currentIndex]?.text.includes("LAUNCHING")) {
        setShake(true)
        setTimeout(() => setShake(false), 2000)
      }
      
      if (elapsed >= totalDuration && !isComplete) {
        setIsComplete(true)
        setTimeout(onComplete, 500)
        return
      }
      
      if (elapsed < totalDuration) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [terminalLines, totalDuration, isComplete, onComplete])

  useEffect(() => {
    const timer = setInterval(() => setShowCursor(prev => !prev), 500)
    return () => clearInterval(timer)
  }, [])

  const getLineStyle = (text: string) => {
    if (text.includes("Marshall, Carter & Darke")) return "text-mcd-gold font-bold text-lg"
    if (text.includes("100%")) return "text-green-400 font-bold"
    if (text.includes("granted") || text.includes("established")) return "text-green-400 font-semibold"
    if (text.includes("profit meets prestige")) return "text-mcd-gold-light italic"
    if (text.includes("LAUNCH") || text.includes("INITIATING")) return "text-red-500 font-bold"
    if (text.match(/[123]\.\.\.$/)) return "text-yellow-500 font-bold text-xl"
    return "text-green-400"
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 cursor-pointer overflow-hidden z-50 ${shake ? 'animate-shake' : ''}`}
      onClick={handleSkip}
    >
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-mcd-gold/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationName: 'pulse',
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationIterationCount: 'infinite',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      <div className={`w-full max-w-4xl z-10 flex flex-col ${shake ? 'animate-glow' : ''}`} style={{ height: 'calc(100vh - 2rem)' }}>
        <div className="bg-gradient-to-r from-mcd-purple-dark to-mcd-purple rounded-t-xl p-3 flex items-center gap-2 shadow-lg">
          <div className="flex gap-1.5">
            {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((color, i) => (
              <div key={i} className={`w-2.5 h-2.5 ${color} rounded-full`} />
            ))}
          </div>
          <span className="ml-3 text-mcd-gold-light text-sm font-semibold tracking-wider">
            MC&D TERMINAL v3.14.159
          </span>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-mcd-gold text-xs font-medium">
              {Math.round(progress)}% COMPLETE
            </div>
            <div className="text-mcd-gold-light/70 text-xs">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-b-xl p-6 flex-grow border border-mcd-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-transparent via-mcd-gold/10 to-transparent"
              style={{
                animation: 'scan 4s linear infinite',
                animationDelay: '1s'
              }}
            />
          </div>
          
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-2">
              {terminalLines.slice(0, currentLine).map((line, index) => (
                <div key={index} className="flex items-center">
                  {index === 0 && <span className="text-mcd-gold mr-2 font-bold">$</span>}
                  <span className={`${getLineStyle(line.text)} tracking-wide animate-fadeIn`}>
                    {line.text}
                  </span>
                </div>
              ))}
              
              {currentLine < terminalLines.length && (
                <div className="flex items-center">
                  <span className="text-mcd-gold mr-2 font-bold">$</span>
                  <span className={`inline-block w-3 h-5 bg-mcd-gold ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                </div>
              )}
            </div>
            
            {isComplete && (
              <div className="mt-auto mb-8 text-center space-y-4 animate-pulse">
                <div className="text-mcd-gold text-xl font-bold tracking-wider">
                  ► PRESS ANY KEY TO CONTINUE ◄
                </div>
                <div className="text-gray-500 text-sm">
                  Click anywhere or press any key
                </div>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800">
            <div 
              className="h-full bg-gradient-to-r from-mcd-gold to-yellow-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="mt-2 text-center text-mcd-gold-light/50 text-xs tracking-wider">
          CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY
        </div>
      </div>
      
      {canSkip && !isComplete && (
        <div className="absolute bottom-8 right-8 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-mcd-gold/30 animate-fadeIn">
          <div className="w-2 h-2 bg-mcd-gold rounded-full animate-pulse" />
          <div className="text-mcd-gold text-xs tracking-wider">
            PRESS ANY KEY TO SKIP
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.1s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.2); }
          50% { box-shadow: 0 0 40px rgba(212,175,55,0.4); }
        }
      `}</style>
    </div>
  )
}