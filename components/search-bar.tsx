"use client"

import { useState, useEffect } from "react"
import { Search, X, Loader2, ChevronUp, ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSearch } from "@/contexts/search-context"
import { performSearch } from "@/lib/search-utils"
import { HANDBOOK_SECTIONS } from "@/lib/constants"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const {
    setHighlightedText,
    searchResults,
    setSearchResults,
    currentResultIndex,
    nextResult,
    previousResult,
    clearSearch,
    navigateToResult,
  } = useSearch()
  const [isFocused, setIsFocused] = useState(false)

  // Perform search when value changes
  useEffect(() => {
    if (value.trim()) {
      setIsLoading(true)
      const results = performSearch(HANDBOOK_SECTIONS, value)
      setSearchResults(results)
      setHighlightedText(value)
      setIsLoading(false)
    } else {
      setSearchResults([])
      setHighlightedText('')
    }
  }, [value, setSearchResults, setHighlightedText])

  const handleClear = () => {
    onChange("")
    clearSearch()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault()
      if (currentResultIndex === -1) {
        // Navigate to first result if none selected
        navigateToResult(0)
      } else {
        // Navigate to next result
        nextResult()
      }
      setIsFocused(false)
    } else if (e.key === 'ArrowDown' && searchResults.length > 0) {
      e.preventDefault()
      nextResult()
    } else if (e.key === 'ArrowUp' && searchResults.length > 0) {
      e.preventDefault()
      previousResult()
    } else if (e.key === 'Escape') {
      setIsFocused(false)
    }
  }

  return (
    <>
      <div className="relative group w-full max-w-lg mx-auto">
        {/* Animated background glow */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-mcd-purple/30 via-mcd-purple/10 to-mcd-gold/30 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 ${
            isFocused ? "opacity-70" : ""
          }`}
        ></div>

        {/* Floating label animation */}
        {isFocused && value === "" && (
          <div className="absolute -top-2 left-3 px-1 bg-background text-xs text-mcd-purple font-medium z-10 transition-all duration-300">
            {placeholder}
          </div>
        )}

      <div className="relative">
        <div
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 z-20 ${
            isFocused ? "text-mcd-purple scale-110" : "text-muted-foreground"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            handleKeyDown(e)
            if (e.key === 'Enter' && value.trim()) {
              e.preventDefault()
            }
            if (e.key === 'Escape') {
              handleClear()
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : placeholder}
          className={`w-full pl-10 pr-32 py-3 text-base bg-background border rounded-xl transition-all duration-500 focus:outline-none focus:ring-4 text-foreground placeholder:text-muted-foreground/70 ${
            isFocused
              ? "border-mcd-purple ring-4 ring-mcd-purple/20 bg-background shadow-lg"
              : "border-muted hover:border-mcd-purple/50 hover:shadow-md"
          }`}
          aria-label="Search handbook sections"
          role="searchbox"
          aria-describedby={isLoading ? "search-status" : undefined}
          autoComplete="off"
          spellCheck="false"
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {/* Search Results Counter */}
          {searchResults.length > 0 && (
            <div className="text-xs text-mcd-purple px-2 py-1 bg-mcd-purple/10 rounded border border-mcd-purple/20">
              {currentResultIndex + 1} of {searchResults.length}
            </div>
          )}
          
          {/* Navigation Controls */}
          {searchResults.length > 1 && (
            <div className="flex items-center">
              <button
                onClick={previousResult}
                className="p-1 text-muted-foreground hover:text-mcd-purple transition-colors duration-200 focus:outline-none"
                aria-label="Previous result"
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                onClick={nextResult}
                className="p-1 text-muted-foreground hover:text-mcd-purple transition-colors duration-200 focus:outline-none"
                aria-label="Next result"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {/* Clear Button */}
          {value && (
            <button
              onClick={handleClear}
              className={`p-1 rounded-full transition-all duration-300 ${
                isFocused
                  ? "text-mcd-purple bg-mcd-purple/10 hover:bg-mcd-purple/20"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              aria-label="Clear search"
              type="button"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Search Results Preview */}
      {isFocused && searchResults.length > 0 && !isMobile && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-background to-muted border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300 z-50 max-h-64 overflow-y-auto">
          {searchResults.slice(0, 5).map((result, index) => (
             <button
               key={`${result.sectionId}-${result.contentIndex}`}
               onClick={() => {
                  navigateToResult(index)
                  setIsFocused(false)
                }}
               className={`w-full text-left p-3 hover:bg-mcd-purple/10 transition-colors duration-200 border-b border-border last:border-b-0 ${
                 index === currentResultIndex ? 'bg-mcd-purple/20' : ''
               }`}
             >
               <div className="text-sm font-medium text-mcd-purple mb-1">{result.sectionTitle}</div>
               <div className="text-xs text-muted-foreground">
                 {result.contextBefore}
                 <span className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-1 rounded">
                   {result.matchText}
                 </span>
                 {result.contextAfter}
               </div>
             </button>
           ))}
          {searchResults.length > 5 && (
            <div className="p-2 text-xs text-muted-foreground text-center border-t border-border">
              +{searchResults.length - 5} more results
            </div>
          )}
        </div>
      )}

      {/* Desktop Search suggestions bar */}
      {isFocused && value.trim() && searchResults.length === 0 && !isMobile && (
        <div 
          className={`absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-background to-muted border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
            isLoading ? "animate-pulse" : ""
          }`}
          id="search-status"
          aria-live="polite"
        >
          <div className="p-3 text-sm">
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin text-mcd-purple" />
                <span className="bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent">
                  Searching for "{value}"...
                </span>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-foreground">
                  Press <kbd className="px-1.5 py-0.5 bg-muted rounded-md border border-border text-xs">Enter</kbd> to search
                </span>
                <span className="text-muted-foreground text-xs">
                  {value.length > 20 ? `${value.substring(0, 20)}...` : value}
                </span>
              </div>
            )}
          </div>
          
          {/* Sample suggestions */}
          {!isLoading && value.length > 2 && (
            <div className="border-t border-border">
              <button className="w-full text-left p-3 hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  Search all sections for "<span className="font-medium text-mcd-purple">{value}</span>"
                </span>
              </button>
              <button className="w-full text-left p-3 hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  Search in <span className="font-medium text-mcd-gold">Documents</span> for "<span className="font-medium text-mcd-purple">{value}</span>"
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      </div>

      {/* Mobile Search Overlay */}
      {isMobile && isFocused && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          {/* Mobile Search Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <button
              onClick={() => setIsFocused(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mcd-purple">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </div>
              <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={(e) => {
                  handleKeyDown(e)
                  if (e.key === 'Enter' && value.trim()) {
                    e.preventDefault()
                  }
                  if (e.key === 'Escape') {
                    handleClear()
                  }
                }}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-3 text-base bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-mcd-purple focus:border-mcd-purple"
                autoFocus
              />
              {value && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search Results */}
          <div className="flex-1 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="p-4 space-y-3">
                <div className="text-sm text-muted-foreground mb-4">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </div>
                {searchResults.map((result, index) => (
                  <button
                    key={`${result.sectionId}-${result.contentIndex}`}
                    onClick={() => {
                      navigateToResult(index)
                      setIsFocused(false)
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      index === currentResultIndex 
                        ? 'bg-mcd-purple/20 border-mcd-purple' 
                        : 'bg-muted/50 border-border hover:bg-muted'
                    }`}
                  >
                    <div className="text-base font-medium text-mcd-purple mb-2">{result.sectionTitle}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {result.contextBefore}
                      <span className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-1 rounded">
                        {result.matchText}
                      </span>
                      {result.contextAfter}
                    </div>
                  </button>
                ))}
              </div>
            ) : value.trim() ? (
              <div className="p-4 text-center">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-mcd-purple" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    No results found for "{value}"
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-4">Search the MC&D Handbook</div>
                <div className="space-y-2">
                  {HANDBOOK_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        onChange(section.title)
                        setIsFocused(false)
                      }}
                      className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="font-medium text-foreground">{section.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">Section {section.id} of 8</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}