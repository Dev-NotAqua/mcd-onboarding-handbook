import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)
  const mediaQueryRef = React.useRef<MediaQueryList | null>(null)

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return
    
    // Create media query instance
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mediaQueryRef.current = mediaQuery
    
    // Set initial state immediately
    setIsMobile(mediaQuery.matches)
    
    // Media query change handler
    const handleChange = (e: MediaQueryListEvent) => {
      // Prevent unnecessary re-renders if value hasn't changed
      if (isMobile !== e.matches) {
        setIsMobile(e.matches)
      }
    }
    
    // Modern event listener with proper typing
    mediaQuery.addEventListener("change", handleChange)
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Return true only when definitely mobile
  return isMobile === true
}

// Optional: Create a context provider version for better performance
export const MobileContext = React.createContext<boolean | null>(null)

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}

// Optional hook to consume the context
export function useMobile() {
  const context = React.useContext(MobileContext)
  if (context === null) {
    throw new Error("useMobile must be used within a MobileProvider")
  }
  return context
}