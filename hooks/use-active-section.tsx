"use client"

import { useState, useEffect } from "react"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that's in the viewport
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by how close to the top of the viewport they are
          const sortedEntries = visibleEntries.sort((a, b) => {
            const aTop = a.boundingClientRect.top
            const bTop = b.boundingClientRect.top
            // Prefer sections closer to the top of the viewport
            return Math.abs(aTop) - Math.abs(bTop)
          })
          setActiveSection(sortedEntries[0].target.id)
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Better detection for collapsed sections
        threshold: [0, 0.1, 0.3, 0.5], // Simplified thresholds for better performance
      },
    )

    // Observe all sections with a small delay to ensure DOM is ready
    const observeSections = () => {
      const sections = document.querySelectorAll("section[id]")
      if (sections.length === 0) {
        // Retry after a short delay if no sections found
        setTimeout(observeSections, 100)
        return
      }
      sections.forEach((section) => observer.observe(section))
    }

    observeSections()

    return () => {
      observer.disconnect()
    }
  }, [])

  return activeSection
}
