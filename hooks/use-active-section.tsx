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
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          )
          setActiveSection(mostVisible.target.id)
        }
      },
      {
        rootMargin: "-10% 0px -80% 0px", // Adjusted for better mobile experience
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better accuracy
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
