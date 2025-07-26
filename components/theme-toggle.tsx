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
        text: "text-[#B8860B]",
        transition: "from-[#FAD02C] to-[#B8860B]"
      }
    } else if (theme === "dark") {
      return {
        border: "border-mcd-purple",
        borderSecondary: "border-mcd-purple/70",
        bg: "bg-gradient-to-br from-[#6A4C93] via-[#462569] to-[#2D1A44]",
        text: "text-[#6A4C93]",
        transition: "from-[#6A4C93] to-[#2D1A44]"
      }
    } else {
      return {
        border: "border-[#8B5A3C]",
        borderSecondary: "border-[#8B5A3C]/70",
        bg: "bg-gradient-to-br from-[#D2B48C] via-[#8B5A3C] to-[#654321]",
        text: "text-[#8B5A3C]",
        transition: "from-[#D2B48C] to-[#654321]"
      }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="relative flex justify-center items-center">
      {/* Decorative rings */}
      <div className={`absolute w-14 h-14 rounded-full border-2 ${
        colors.border
      } transition-all duration-700 ease-out ${
        isHovered ? "scale-125 opacity-100" : "scale-100 opacity-0"
      }`}></div>
      
      <div className={`absolute w-16 h-16 rounded-full border ${
        colors.borderSecondary
      } transition-all duration-1000 ease-out ${
        isHovered ? "scale-150 opacity-50" : "scale-100 opacity-0"
      }`}></div>
      
      {/* Toggle button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
          colors.bg
        } shadow-lg transition-all duration-500 z-10 transform ${
          isHovered ? "scale-110" : "scale-100"
        }`}
        aria-label="Toggle theme"
      >
        {/* Sun icon */}
        <div className={`absolute transition-all duration-500 ${
          theme === "light" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-90 scale-0 opacity-0"
        }`}>
          <Sun className="h-5 w-5 text-[#B8860B]" />
        </div>
        
        {/* Moon icon */}
        <div className={`absolute transition-all duration-500 ${
          theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`}>
          <Moon className="h-5 w-5 text-[#6A4C93]" />
        </div>
        
        {/* Monitor icon */}
        <div className={`absolute transition-all duration-500 ${
          theme === "system" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-180 scale-0 opacity-0"
        }`}>
          <Monitor className="h-5 w-5 text-[#8B5A3C]" />
        </div>
        
        {/* Animated transition element */}
        <div className={`absolute w-8 h-8 rounded-full bg-gradient-to-br ${
          colors.transition
        } transition-all duration-500 ${
          isAnimating ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}></div>
      </button>
      
      {/* Theme indicator text */}
      <div className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium transition-all duration-300 ${
        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      } ${colors.text}`}>
        {theme === "light" ? "Light Mode" : theme === "dark" ? "Dark Mode" : "System Mode"}
      </div>
    </div>
  )
}