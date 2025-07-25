"use client"

import { Shield, Users, FileText, User, Target, TrendingUp, BookOpen, Menu, X, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import type { HandbookSection } from "@/lib/types"

const sectionIcons = {
  welcome: Shield,
  verification: Users,
  codenames: FileText,
  divisions: User,
  hierarchy: TrendingUp,
  "shift-logging": FileText,
  points: Target,
  "hierarchy-detailed": TrendingUp,
  "divisions-detailed": User,
  events: BookOpen,
  clearance: Shield,
  regulations: FileText,
  leadership: TrendingUp,
  conclusion: BookOpen,
}

interface MobileHeaderProps {
  sections: HandbookSection[]
  activeSection: string
}

export function MobileHeader({ sections, activeSection }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Account for mobile header height (96px = 24 * 4)
      const headerHeight = 96
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-mcd-purple/20 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-mcd-purple via-mcd-gold to-mcd-purple rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-mcd-gold font-bold text-sm">MC&D</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent">
                  MC&D Handbook
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Onboarding Guide</p>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-muted/80 to-muted/60 hover:from-muted hover:to-muted/80 border border-muted-foreground/20 hover:border-mcd-purple/50 transition-all duration-300 shadow-lg group"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Menu
                  className={`absolute h-5 w-5 text-foreground transition-all duration-300 ${isMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
                />
                <X
                  className={`absolute h-5 w-5 text-foreground transition-all duration-300 ${isMenuOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
                />
              </div>
            </button>
          </div>

          {/* Collapsible Navigation Menu */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm rounded-xl p-4 border border-mcd-purple/10 shadow-inner">
              <nav className="max-h-80 overflow-y-auto space-y-1" id="mobile-navigation-menu" role="navigation" aria-label="Main navigation">
                {sections.map((section, index) => {
                  const Icon = sectionIcons[section.id as keyof typeof sectionIcons] || FileText
                  const isActive = activeSection === section.id

                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 group/item ${
                        isActive
                          ? "bg-gradient-to-r from-mcd-purple/15 to-mcd-purple/5 text-mcd-purple border border-mcd-purple/20 shadow-lg scale-[1.02]"
                          : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:scale-[1.01]"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Navigate to ${section.title} section`}
                    >
                      <Icon
                        className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? "text-mcd-purple scale-110"
                            : "group-hover/item:text-mcd-purple group-hover/item:scale-110"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium truncate flex-1">{section.title}</span>
                      <ChevronRight
                        className={`h-3 w-3 transition-all duration-300 ${
                          isActive ? "text-mcd-purple" : "text-muted-foreground/50 group-hover/item:text-mcd-purple"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
