"use client"

import { Shield, Users, FileText, User, Target, TrendingUp, BookOpen, Menu, X, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import type { HandbookSection } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

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
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function MobileHeader({ sections, activeSection, isMenuOpen, setIsMenuOpen }: MobileHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Close menu immediately for better UX
      setIsMenuOpen(false)
      
      // Find and click the expand button to open the section
      const expandButton = element.querySelector('button[aria-expanded]') as HTMLButtonElement
      if (expandButton && expandButton.getAttribute('aria-expanded') === 'false') {
        expandButton.click()
      }
      
      // Account for mobile header height with delay for expansion
      setTimeout(() => {
        const headerHeight = document.querySelector('header')?.clientHeight || 96
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }, 150)
    }
  }

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-mcd-purple/20 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-mcd-purple via-mcd-gold to-mcd-purple rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.2))]"></div>
                  <span className="text-mcd-gold font-bold text-xs relative z-10">MC&D</span>
                </div>
                <motion.div 
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-card"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.4)", "0 0 0 4px rgba(74, 222, 128, 0)", "0 0 0 0 rgba(74, 222, 128, 0.4)"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <div className="min-w-0 flex-1">
                <motion.h1 
                  className="text-base font-serif font-bold bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent truncate"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  MC&D Handbook
                </motion.h1>
                <motion.p 
                  className="text-xs text-muted-foreground font-medium truncate"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Onboarding Guide
                </motion.p>
              </div>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg bg-gradient-to-br from-muted/80 to-muted/60 hover:from-muted hover:to-muted/80 border border-muted-foreground/20 hover:border-mcd-purple/50 transition-all duration-300 ease-out shadow-lg group flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <Menu
                  className={`absolute h-4 w-4 text-foreground transition-all duration-300 ease-out ${
                    isMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute h-4 w-4 text-foreground transition-all duration-300 ease-out ${
                    isMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </div>
              <motion.span 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[9px] text-muted-foreground font-medium whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isMenuOpen ? 0 : 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? "Close" : "Menu"}
              </motion.span>
            </motion.button>
          </div>

          {/* Collapsible Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  transition: { 
                    height: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 0.3 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: { 
                    height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 0.2 }
                  }
                }}
              >
                <div className="mt-4 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-xl rounded-xl p-4 border border-mcd-purple/10 shadow-inner">
                  <nav 
                    className="max-h-[70vh] overflow-y-auto space-y-1" 
                    id="mobile-navigation-menu" 
                    role="navigation" 
                    aria-label="Main navigation"
                  >
                    {sections.map((section, index) => {
                      const Icon = sectionIcons[section.id as keyof typeof sectionIcons] || FileText
                      const isActive = activeSection === section.id

                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ease-out group/item relative overflow-hidden ${
                            isActive
                              ? "bg-gradient-to-r from-mcd-purple/20 to-mcd-purple/8 text-mcd-purple border border-mcd-purple/30 shadow-lg"
                              : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20"
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              delay: index * 0.05, 
                              duration: 0.3,
                              ease: "easeOut"
                            }
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: isActive ? '' : 'rgba(125, 95, 255, 0.1)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          aria-current={isActive ? "page" : undefined}
                          aria-label={`Navigate to ${section.title} section`}
                        >
                          {/* Active indicator bar */}
                          {isActive && (
                            <motion.div 
                              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-mcd-gold to-mcd-purple rounded-r-full"
                              initial={{ height: 0 }}
                              animate={{ height: "100%" }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          )}
                          
                          {/* Icon with pulse effect when active */}
                          <motion.div
                            animate={isActive ? {
                              scale: [1, 1.1, 1],
                              transition: {
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            } : {}}
                          >
                            <Icon
                              className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${
                                isActive
                                  ? "text-mcd-purple drop-shadow-sm"
                                  : "group-hover/item:text-mcd-purple group-hover/item:drop-shadow-sm"
                              }`}
                              aria-hidden="true"
                            />
                          </motion.div>
                          
                          <span className="text-sm font-medium truncate flex-1">{section.title}</span>
                          
                          <ChevronRight
                            className={`h-3.5 w-3.5 transition-all duration-300 ${
                              isActive 
                                ? "text-mcd-purple" 
                                : "text-muted-foreground/50 group-hover/item:text-mcd-purple"
                            }`}
                            aria-hidden="true"
                          />
                        </motion.button>
                      )
                    })}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}