"use client"

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  highlightedText: string
  setHighlightedText: (text: string) => void
  searchResults: SearchResult[]
  setSearchResults: (results: SearchResult[]) => void
  currentResultIndex: number
  setCurrentResultIndex: (index: number) => void
  navigateToResult: (index: number) => void
  nextResult: () => void
  previousResult: () => void
  clearSearch: () => void
}

interface SearchResult {
  sectionId: string
  sectionTitle: string
  contentIndex: number
  matchText: string
  contextBefore: string
  contextAfter: string
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedText, setHighlightedText] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState(-1)

  const navigateToResult = useCallback((index: number) => {
    if (index >= 0 && index < searchResults.length) {
      const result = searchResults[index]
      setCurrentResultIndex(index)
      
      // Scroll to the section
      const sectionElement = document.getElementById(result.sectionId)
      if (sectionElement) {
        // First expand the section if it's collapsed
        const expandButton = sectionElement.querySelector('button[aria-expanded]') as HTMLButtonElement
        if (expandButton && expandButton.getAttribute('aria-expanded') === 'false') {
          expandButton.click()
          // Wait for expansion animation
          setTimeout(() => {
            sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 300)
        } else {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  }, [searchResults])

  const nextResult = useCallback(() => {
    if (searchResults.length > 0) {
      const nextIndex = (currentResultIndex + 1) % searchResults.length
      navigateToResult(nextIndex)
    }
  }, [currentResultIndex, searchResults.length, navigateToResult])

  const previousResult = useCallback(() => {
    if (searchResults.length > 0) {
      const prevIndex = currentResultIndex <= 0 ? searchResults.length - 1 : currentResultIndex - 1
      navigateToResult(prevIndex)
    }
  }, [currentResultIndex, searchResults.length, navigateToResult])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setHighlightedText('')
    setSearchResults([])
    setCurrentResultIndex(-1)
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        highlightedText,
        setHighlightedText,
        searchResults,
        setSearchResults,
        currentResultIndex,
        setCurrentResultIndex,
        navigateToResult,
        nextResult,
        previousResult,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export type { SearchResult }