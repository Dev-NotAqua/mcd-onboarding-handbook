import React from 'react'
import type { HandbookSection } from './types'
import type { SearchResult } from '../contexts/search-context'

export function performSearch(sections: HandbookSection[], query: string): SearchResult[] {
  if (!query.trim()) return []

  const results: SearchResult[] = []
  const searchTerm = query.toLowerCase().trim()

  sections.forEach((section) => {
    section.content.forEach((item, contentIndex) => {
      let textToSearch = ''
      
      // Extract searchable text based on content type
      switch (item.type) {
        case 'text':
        case 'heading':
        case 'callout':
          textToSearch = item.text || ''
          break
        case 'list':
          textToSearch = (item.items || []).join(' ')
          break
        case 'code':
          textToSearch = item.code || ''
          break
        default:
          return // Skip non-searchable content types
      }

      const lowerText = textToSearch.toLowerCase()
      const matchIndex = lowerText.indexOf(searchTerm)
      
      if (matchIndex !== -1) {
        // Extract context around the match
        const contextLength = 50
        const start = Math.max(0, matchIndex - contextLength)
        const end = Math.min(textToSearch.length, matchIndex + searchTerm.length + contextLength)
        
        const contextBefore = textToSearch.substring(start, matchIndex)
        const matchText = textToSearch.substring(matchIndex, matchIndex + searchTerm.length)
        const contextAfter = textToSearch.substring(matchIndex + searchTerm.length, end)

        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          contentIndex,
          matchText,
          contextBefore: start > 0 ? '...' + contextBefore : contextBefore,
          contextAfter: end < textToSearch.length ? contextAfter + '...' : contextAfter,
        })
      }
    })
  })

  return results
}

export function highlightText(text: string, searchTerm: string): React.ReactNode[] {
  if (!searchTerm.trim()) {
    return [text]
  }

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return React.createElement(
        'mark',
        {
          key: index,
          className: 'bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-1 py-0.5 rounded-sm font-semibold animate-pulse'
        },
        part
      )
    }
    return part
  })
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}