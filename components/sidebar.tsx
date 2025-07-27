"use client"

import {
  Shield,
  Users,
  FileText,
  User,
  Target,
  TrendingUp,
  BookOpen,
  Clock,
  Briefcase,
  Award,
  Globe,
  Gavel,
  Menu,
  X
} from "lucide-react"
import type { HandbookSection } from "@/lib/types"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const sectionIcons = {
  welcome: Shield,
  verification: Users,
  codenames: FileText,
  divisions: Briefcase,
  hierarchy: TrendingUp,
  "shift-logging": Clock,
  points: Target,
  "hierarchy-detailed": Award,
  "divisions-detailed": Briefcase,
  events: Globe,
  clearance: User,
  regulations: Gavel,
  leadership: Award,
  conclusion: BookOpen,
}

interface SidebarProps {
  sections: HandbookSection[]
  activeSection: string
}

export function Sidebar({ sections, activeSection }: SidebarProps) {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [scrolled, setScrolled] = useState(false)
  
  // Toggle sidebar on mobile
  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Find and click the expand button to open the section
      const expandButton = element.querySelector('button[aria-expanded]') as HTMLButtonElement
      if (expandButton && expandButton.getAttribute('aria-expanded') === 'false') {
        expandButton.click()
      }
      
      // Scroll to the section with a small delay to allow expansion animation
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
      
      if (isMobile) setSidebarOpen(false)
    }
  }

  // Add scroll listener for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className={`fixed top-4 left-4 z-40 p-2.5 rounded-full bg-gradient-to-br from-mcd-purple to-mcd-gold shadow-lg transition-all duration-300 ${
            scrolled ? 'scale-90' : 'scale-100'
          }`}
          aria-label="Open handbook navigation"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-card/95 backdrop-blur-xl border-r border-mcd-purple/20 overflow-hidden shadow-2xl transition-all duration-500 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ overflowX: 'hidden' }}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-mcd-purple/10 bg-gradient-to-br from-mcd-purple/5 via-mcd-purple/10 to-transparent relative">
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-mcd-purple/10 text-mcd-purple hover:bg-mcd-purple/20 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-mcd-purple via-mcd-gold to-mcd-purple rounded-2xl flex items-center justify-center shadow-xl shadow-mcd-purple/20 animate-pulse-once">
                  <span className="text-white font-bold text-lg">MC&D</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card shadow-md animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-serif font-bold bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent truncate">
                  Marshall, Carter & Darke
                </h1>
                <p className="text-sm text-muted-foreground font-medium truncate">Onboarding Handbook</p>
              </div>
            </div>
            
            {/* Search shortcut */}
            <div className="mt-3 text-xs flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg border border-border overflow-hidden">
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border text-xs flex-shrink-0">⌘</kbd> + 
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border text-xs flex-shrink-0">K</kbd> 
              <span className="ml-1 truncate">to search handbook</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1">
            {sections.map((section, index) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons] || FileText
              const isActive = activeSection === section.id

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden mx-2 ${
                    isActive
                      ? "bg-gradient-to-r from-mcd-purple/20 via-mcd-purple/10 to-mcd-purple/5 text-mcd-purple border border-mcd-purple/20 shadow-lg shadow-mcd-purple/5"
                      : "hover:bg-gradient-to-r hover:from-muted/60 hover:to-muted/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-mcd-purple to-mcd-gold rounded-r-full"></div>
                  )}
                  
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>

                  <div className={`relative p-1.5 rounded-lg ${
                    isActive 
                      ? "bg-gradient-to-br from-mcd-purple/20 to-mcd-gold/20" 
                      : "bg-muted/50 group-hover:bg-muted"
                  }`}>
                    <Icon
                      className={`h-5 w-5 transition-all duration-300 ${
                        isActive
                          ? "text-mcd-purple scale-110 drop-shadow-sm"
                          : "text-muted-foreground group-hover:text-mcd-purple group-hover:scale-110"
                      }`}
                    />
                  </div>
                  
                  <div className="relative flex-1 min-w-0 overflow-hidden">
                    <span className={`font-medium block transition-all duration-300 truncate ${isActive ? "font-semibold" : ""}`}>
                      {section.title}
                    </span>
                    <span className="text-xs text-muted-foreground truncate opacity-80 block">
                      Section {index + 1} of {sections.length}
                    </span>
                  </div>

                  {/* Progress indicator */}
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={isActive ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.1)"}
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={isActive ? "url(#active-gradient)" : "rgba(255,255,255,0.3)"}
                        strokeWidth="2"
                        strokeDasharray="100"
                        strokeDashoffset={100 - (100 * (index + 1)) / sections.length}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-xs font-mono">
                      {index + 1}
                    </span>
                  </div>
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-mcd-purple/10 bg-gradient-to-t from-mcd-purple/5 to-transparent">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Handbook Online • Latest Version
                </span>
              </div>
              <p className="text-xs text-muted-foreground">© 2025 Marshall, Carter & Darke Ltd.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}