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
  const containerRef = useRef<HTMLDivElement>(null)

  const terminalLines = [
    { text: "MC&D TERMINAL v3.14.159", delay: 500 },
    { text: "Copyright © Marshall, Carter & Darke Ltd.", delay: 300 },
    { text: "", delay: 200 },
    { text: "Initializing secure connection...", delay: 400 },
    { text: "[████████████████████████████████] 100%", delay: 800 },
    { text: "Connection established.", delay: 300 },
    { text: "", delay: 200 },
    { text: "Loading employee onboarding system...", delay: 400 },
    { text: "Authenticating credentials...", delay: 500 },
    { text: "Access granted.", delay: 300 },
    { text: "", delay: 200 },
    { text: "Welcome to Marshall, Carter & Darke Ltd.", delay: 400 },
    { text: "Where profit meets prestige.", delay: 500 },
    { text: "", delay: 300 },
    { text: "Launching handbook interface...", delay: 600 }
  ]

  const handleSkip = useCallback(() => {
    if (canSkip) {
      onComplete()
    }
  }, [canSkip, onComplete])

  useEffect(() => {
    // Allow skipping after 2 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true)
    }, 2000)

    return () => clearTimeout(skipTimer)
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (canSkip) {
        handleSkip()
      }
    }

    const handleClick = () => {
      if (canSkip) {
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleClick)
    }
  }, [canSkip, handleSkip])

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      // Calculate progress
      setProgress(Math.round((currentLine / terminalLines.length) * 100))

      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
      }, terminalLines[currentLine]?.delay || 300)

      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 1000)

      return () => clearTimeout(completeTimer)
    }
  }, [currentLine, terminalLines, onComplete, isComplete])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 cursor-pointer overflow-hidden"
      onClick={handleSkip}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-mcd-gold/10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      
      {/* Main terminal container */}
      <div className="w-full max-w-4xl z-10">
        {/* Terminal Header */}
        <div className="bg-gradient-to-r from-mcd-purple-dark to-mcd-purple rounded-t-xl p-3 flex items-center gap-2 shadow-lg">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="ml-3 text-mcd-gold-light text-sm font-semibold tracking-wider">
            MC&D TERMINAL v3.14.159
          </span>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-mcd-gold text-xs font-medium">
              {progress}% COMPLETE
            </div>
            <div className="text-mcd-gold-light/70 text-xs">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-b-xl p-6 min-h-[500px] border border-mcd-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] relative overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mcd-gold/5 to-transparent animate-scanline h-[2px]"></div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-mcd-gold/5 blur-xl rounded-xl z-0 pointer-events-none"></div>
          
          {/* Content */}
          <div className="space-y-2 relative z-10">
            {terminalLines.slice(0, currentLine).map((line, index) => (
              <div key={index} className="flex items-center animate-fade-in">
                {index === 0 && (
                  <span className="text-mcd-gold mr-2 font-bold">$</span>
                )}
                <span className={`${
                  line.text.includes("Marshall, Carter & Darke") 
                    ? "text-mcd-gold font-bold text-lg" 
                    : line.text.includes("100%") 
                    ? "text-green-400 font-bold" 
                    : line.text.includes("granted") || line.text.includes("established")
                    ? "text-green-400 font-semibold"
                    : line.text.includes("profit meets prestige")
                    ? "text-mcd-gold-light italic"
                    : line.text.includes("Launching")
                    ? "text-cyan-300 font-semibold"
                    : "text-green-400"
                } tracking-wide`}>
                  {line.text}
                </span>
              </div>
            ))}
            
            {/* Cursor */}
            {currentLine < terminalLines.length && (
              <div className="flex items-center">
                <span className="text-mcd-gold mr-2 font-bold">$</span>
                <span className={`inline-block w-3 h-5 bg-mcd-gold ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
              </div>
            )}
            
            {/* Completion message */}
            {isComplete && (
              <div className="mt-8 text-center space-y-4 animate-pulse">
                <div className="text-mcd-gold text-xl font-bold tracking-wider">
                  ► PRESS ANY KEY TO CONTINUE ◄
                </div>
                <div className="text-gray-500 text-sm">
                  Click anywhere or press any key
                </div>
              </div>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800">
            <div 
              className="h-full bg-gradient-to-r from-mcd-gold to-yellow-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Terminal footer */}
        <div className="mt-4 text-center text-mcd-gold-light/50 text-xs tracking-wider">
          CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-mcd-gold/30"></div>
      <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-mcd-gold/30"></div>
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-mcd-gold/30"></div>
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-mcd-gold/30"></div>
      
      {/* Skip hint */}
      {canSkip && !isComplete && (
        <div className="absolute bottom-8 right-8 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-mcd-gold/30">
          <div className="w-2 h-2 bg-mcd-gold rounded-full animate-pulse"></div>
          <div className="text-mcd-gold text-xs tracking-wider">
            PRESS ANY KEY TO SKIP
          </div>
        </div>
      )}
    </div>
  )
}