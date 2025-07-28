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
import { useDebounce } from "@/hooks/use-debounce"
import Image from "next/image"
import { motion } from "framer-motion"

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

// Animation variants with proper typing
const sidebarVariants = {
  open: { 
    x: 0,
    transition: { 
      type: "spring" as const,
      damping: 25,
      stiffness: 120
    }
  },
  closed: { 
    x: "-100%",
    transition: { 
      type: "spring" as const,
      damping: 25,
      stiffness: 120
    }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      damping: 30,
      stiffness: 150
    }
  })
};

interface SidebarProps {
  sections: HandbookSection[]
  activeSection: string
}

export function Sidebar({ sections, activeSection }: SidebarProps) {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [scrolled, setScrolled] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Debounce scroll events for performance
  const debouncedScroll = useDebounce(scrolled, 50)

  // Initialize sidebar state
  useEffect(() => {
    setIsInitialized(true)
    setSidebarOpen(!isMobile)
  }, [isMobile])

  // Toggle sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
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

  // Performance optimization: only render mobile toggle when needed
  const MobileToggleButton = isMobile ? (
    <motion.button
      onClick={() => setSidebarOpen(true)}
      className={`fixed top-4 left-4 z-40 p-2.5 rounded-full bg-gradient-to-br from-mcd-purple to-mcd-gold shadow-lg transition-all duration-300 ${
        debouncedScroll ? 'scale-90' : 'scale-100'
      }`}
      aria-label="Open handbook navigation"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
    >
      <Menu className="h-5 w-5 text-white" />
    </motion.button>
  ) : null

  if (!isInitialized) {
    return null // Prevent FOUC during initialization
  }

  return (
    <>
      {MobileToggleButton}
      
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        className={`fixed left-0 top-0 h-screen w-80 bg-card/95 backdrop-blur-xl border-r border-mcd-purple/20 overflow-hidden shadow-2xl z-50`}
        style={{ overflowX: 'hidden' }}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-mcd-purple/10 bg-gradient-to-br from-mcd-purple/5 via-mcd-purple/10 to-transparent relative">
            {/* Close button for mobile */}
            {isMobile && (
              <motion.button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-mcd-purple/10 text-mcd-purple hover:bg-mcd-purple/20 transition-colors"
                aria-label="Close sidebar"
                whileTap={{ scale: 0.85 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="relative">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-14 h-14 bg-gradient-to-br from-mcd-purple/20 via-mcd-gold/20 to-mcd-purple/20 rounded-2xl flex items-center justify-center shadow-xl shadow-mcd-purple/20 backdrop-blur-sm border border-mcd-gold/30 overflow-hidden group"
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src="/Logo.png"
                      alt="MC&D Logo"
                      fill
                      className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                      priority
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-mcd-gold/10 to-transparent opacity-0"
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card shadow-md animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-serif font-bold bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent truncate">
                  Marshall, Carter & Darke
                </h1>
                <p className="text-sm text-muted-foreground font-medium truncate">Onboarding Handbook</p>
              </div>
            </motion.div>
            {/* Search shortcut */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-3 text-xs flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg border border-border overflow-hidden"
            >
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border text-xs flex-shrink-0">⌘</kbd> + 
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border text-xs flex-shrink-0">K</kbd> 
              <span className="ml-1 truncate">to search handbook</span>
            </motion.div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1">
            {sections.map((section, index) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons] || FileText
              const isActive = activeSection === section.id
              return (
                <motion.button
                  key={section.id}
                  variants={navItemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-400 ease-out group relative overflow-hidden mx-2 ${
                    isActive
                      ? "bg-gradient-to-r from-mcd-purple/25 via-mcd-purple/15 to-mcd-purple/8 text-mcd-purple border border-mcd-purple/30 shadow-lg shadow-mcd-purple/10 scale-[1.02]"
                      : "hover:bg-gradient-to-r hover:from-muted/60 hover:to-muted/30 text-muted-foreground hover:text-foreground hover:scale-[1.01]"
                  }`}
                  whileHover={{ 
                    scale: isActive ? 1.02 : 1.01,
                    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-mcd-purple via-mcd-gold to-mcd-purple rounded-r-full shadow-lg shadow-mcd-purple/50"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {/* Animated background effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/8 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className={`relative p-1.5 rounded-lg transition-all duration-300 ease-out ${
                    isActive 
                      ? "bg-gradient-to-br from-mcd-purple/25 to-mcd-gold/25 shadow-md shadow-mcd-purple/20" 
                      : "bg-muted/50 group-hover:bg-muted group-hover:shadow-sm"
                  }`}>
                    <Icon
                      className={`h-5 w-5 transition-all duration-400 ease-out ${
                        isActive
                          ? "text-mcd-purple scale-125 drop-shadow-md filter brightness-110"
                          : "text-muted-foreground group-hover:text-mcd-purple group-hover:scale-110 group-hover:drop-shadow-sm"
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
                  <motion.div 
                    className="relative w-8 h-8 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={isActive ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.1)"}
                        strokeWidth="2"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={isActive ? "url(#active-gradient)" : "rgba(255,255,255,0.3)"}
                        strokeWidth="2"
                        strokeDasharray="100"
                        strokeDashoffset={100 - (100 * (index + 1)) / sections.length}
                        strokeLinecap="round"
                        animate={isActive ? { 
                          strokeDashoffset: [100 - (100 * (index + 1)) / sections.length, 0],
                          transition: { duration: 1.5, ease: "easeOut" }
                        } : {}}
                      />
                    </svg>
                    <span className="absolute text-xs font-mono">
                      {index + 1}
                    </span>
                  </motion.div>
                </motion.button>
              )
            })}
          </nav>
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="p-4 border-t border-mcd-purple/10 bg-gradient-to-t from-mcd-purple/5 to-transparent"
          >
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                ></motion.div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Handbook Online • Latest Version
                </span>
              </div>
              <p className="text-xs text-muted-foreground">© 2025 Marshall, Carter & Darke Ltd.</p>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  )
}