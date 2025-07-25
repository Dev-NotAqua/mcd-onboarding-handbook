"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-muted/80 to-muted/60 hover:from-muted hover:to-muted/80 border border-muted-foreground/20 hover:border-mcd-gold/50 transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden active:scale-95 hover:scale-105"
      aria-label="Toggle theme"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

      {/* Icon container with proper centering */}
      <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
        <Sun className="absolute h-4 w-4 sm:h-5 sm:w-5 text-amber-500 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 text-blue-400 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </button>
  )
}
