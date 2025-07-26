"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light")
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="relative flex justify-center items-center">
      {/* Decorative rings */}
      <div className={`absolute w-14 h-14 rounded-full border border-mcd-gold/30 transition-all duration-700 ease-out ${
        isHovered ? "scale-125 opacity-100" : "scale-100 opacity-0"
      }`}></div>
      
      <div className={`absolute w-16 h-16 rounded-full border border-mcd-gold/20 transition-all duration-1000 ease-out ${
        isHovered ? "scale-150 opacity-50" : "scale-100 opacity-0"
      }`}></div>
      
      {/* Toggle button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
          theme === "light" 
            ? "bg-gradient-to-br from-amber-100 to-amber-200" 
            : "bg-gradient-to-br from-indigo-900 to-blue-900"
        } shadow-lg transition-all duration-500 z-10 transform ${
          isHovered ? "scale-110" : "scale-100"
        }`}
        aria-label="Toggle theme"
      >
        {/* Sun icon with animation */}
        <div className={`absolute transition-all duration-500 ${
          theme === "light" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-90 scale-0 opacity-0"
        }`}>
          <Sun className="h-5 w-5 text-amber-600" />
        </div>
        
        {/* Moon icon with animation */}
        <div className={`absolute transition-all duration-500 ${
          theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`}>
          <Moon className="h-5 w-5 text-blue-300" />
        </div>
        
        {/* Animated transition element */}
        <div className={`absolute w-8 h-8 rounded-full bg-gradient-to-br ${
          theme === "light" 
            ? "from-mcd-gold to-amber-500" 
            : "from-blue-500 to-indigo-600"
        } transition-all duration-500 ${
          isAnimating ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}></div>
      </button>
      
      {/* Theme indicator text */}
      <div className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium transition-all duration-300 ${
        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      } ${theme === "light" ? "text-amber-600" : "text-blue-300"}`}>
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </div>
    </div>
  )
}