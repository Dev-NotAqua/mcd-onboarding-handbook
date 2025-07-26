"use client"

import { Search, X, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Simulate search loading state with debounce
  useEffect(() => {
    if (value.trim()) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setIsSearching(false)
        // Here you would typically call your search function
        // onSearch?.(value)
      }, 500) // Reduced from 300ms for better UX
      return () => clearTimeout(timer)
    } else {
      setIsSearching(false)
    }
  }, [value])

  return (
    <div className="relative group">
      {/* Animated background glow */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-mcd-purple/20 to-mcd-gold/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isFocused ? "opacity-100" : ""
        }`}
      ></div>

      <div className="relative">
        <div
          className={`absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 z-20 ${
            isFocused ? "text-mcd-purple scale-110" : "text-muted-foreground"
          }`}
        >
          {isSearching ? <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" /> : <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              // Trigger search on Enter
              e.preventDefault()
              // You can add actual search logic here
            }
            if (e.key === 'Escape') {
              onChange('')
              e.currentTarget.blur()
            }
          }}
          placeholder={placeholder}
          className={`w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-background border-2 rounded-lg transition-all duration-300 focus:outline-none focus:shadow-lg text-foreground placeholder:text-muted-foreground hover:scale-[1.01] focus:scale-[1.02] ${
            isFocused
              ? "border-mcd-purple shadow-lg shadow-mcd-purple/20 bg-background"
              : "border-border hover:border-mcd-purple/50 hover:shadow-md"
          }`}
          aria-label="Search handbook sections"
          role="searchbox"
          aria-describedby={isSearching ? "search-status" : undefined}
          autoComplete="off"
          spellCheck="false"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Clear search"
            type="button"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search suggestions or results count could go here */}
      {value.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground px-2 sm:px-3 animate-fade-in" id="search-status" aria-live="polite">
          {isSearching ? (
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full animate-pulse"></div>
              Searching...
            </span>
          ) : (
            `Press Enter to search for "${value}"`
          )}
        </div>
      )}
    </div>
  )
}
