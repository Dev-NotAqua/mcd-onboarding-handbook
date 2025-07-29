"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)


  const handleClick = () => {
    setIsAnimating(true)
    
    setTimeout(() => {
      if (theme === "light") {
        setTheme("dark")
      } else if (theme === "dark") {
        setTheme("system")
      } else {
        setTheme("light")
      }
      setIsAnimating(false)
    }, 300)
  }

  const getThemeColors = () => {
    if (theme === "light") {
      return {
        border: "border-mcd-gold",
        borderSecondary: "border-mcd-gold/70",
        bg: "bg-gradient-to-br from-[#FAD02C] via-[#D4AF37] to-[#B8860B]",
        text: "text-[#B8860B] dark:text-[#D4AF37]",
        iconColor: "text-[#B8860B]",
        transition: "from-[#FAD02C] to-[#B8860B]"
      }
    } else if (theme === "dark") {
      return {
        border: "border-mcd-purple",
        borderSecondary: "border-mcd-purple/70",
        bg: "bg-gradient-to-br from-[#6A4C93] via-[#462569] to-[#2D1A44]",
        text: "text-[#8A6FB8] dark:text-[#A084C7]",
        iconColor: "text-[#A084C7]",
        transition: "from-[#6A4C93] to-[#2D1A44]"
      }
    } else {
      return {
        border: "border-[#8B5A3C]",
        borderSecondary: "border-[#8B5A3C]/70",
        bg: "bg-gradient-to-br from-[#D2B48C] via-[#8B5A3C] to-[#654321]",
        text: "text-[#A0724F] dark:text-[#C4956B]",
        iconColor: "text-[#C4956B]",
        transition: "from-[#D2B48C] to-[#654321]"
      }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="relative flex justify-center items-center w-24 h-24">
      {/* Decorative rings - hidden on mobile */}
      <div className={`absolute w-14 h-14 rounded-xl border-2 ${
        colors.border
      } transition-all duration-700 ease-out ${
        isHovered ? "sm:scale-125 sm:opacity-100" : "scale-100 opacity-0"
      } hidden sm:block pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}></div>
      
      <div className={`absolute w-16 h-16 rounded-xl border ${
        colors.borderSecondary
      } transition-all duration-1000 ease-out ${
        isHovered ? "sm:scale-150 sm:opacity-50" : "scale-100 opacity-0"
      } hidden sm:block pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}></div>
      
      {/* Toggle button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${
          colors.bg
        } shadow-lg transition-all duration-500 z-10 transform ${
          isHovered ? "sm:scale-110" : "scale-100"
        }`}
        aria-label="Toggle theme"
      >
        {/* Sun icon */}
        <div className={`absolute transition-all duration-500 ${
          theme === "light" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-90 scale-0 opacity-0"
        }`}>
          <Sun className="h-5 w-5 text-[#B8860B] drop-shadow-sm" />
        </div>
        
        {/* Moon icon */}
        <div className={`absolute transition-all duration-500 ${
          theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`}>
          <Moon className="h-5 w-5 text-[#A084C7] drop-shadow-sm" />
        </div>
        
        {/* Monitor icon */}
        <div className={`absolute transition-all duration-500 ${
          theme === "system" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-180 scale-0 opacity-0"
        }`}>
          <Monitor className="h-5 w-5 text-[#C4956B] drop-shadow-sm" />
        </div>
        
        {/* Animated transition element */}
        <div className={`absolute w-8 h-8 rounded-lg bg-gradient-to-br ${
          colors.transition
        } transition-all duration-500 ${
          isAnimating ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}></div>
      </button>
      

      

    </div>
  )
}