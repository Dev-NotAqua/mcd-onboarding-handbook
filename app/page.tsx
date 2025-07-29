"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import dynamic from 'next/dynamic'
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { ContentSection } from "@/components/content-section"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { HANDBOOK_SECTIONS } from "@/lib/constants"
import { SearchProvider } from "@/contexts/search-context"
import { useActiveSection } from "@/hooks/use-active-section"
import { useIsMobile } from "@/hooks/use-mobile"
import { ErrorBoundary } from "@/components/error-boundary"

// const LogoCanvas = dynamic(() => import('@/components/logo'), { ssr: false })

const FormatGenerator = dynamic(() => import('@/components/format-generator'), { ssr: false, loading: () => <div className="w-full h-64 rounded-lg bg-muted animate-pulse" /> })
const QuickReference = dynamic(() => import('@/components/quick-reference'), { ssr: false, loading: () => <div className="w-full h-64 rounded-lg bg-muted animate-pulse" /> })
// const ParticleBackground = dynamic(() => import('@/components/particle-background'), { ssr: false })
import BackToTop from "@/components/back-to-top"
import TerminalIntro from "@/components/terminal-intro"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showTerminal, setShowTerminal] = useState(true)
  const [isShaking, setIsShaking] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTools, setShowTools] = useState(true)
  const isMobile = useIsMobile()
  const activeSection = useActiveSection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Check if terminal has been completed before
  useEffect(() => {
    const terminalCompleted = sessionStorage.getItem('mcd-terminal-completed')
    if (terminalCompleted === 'true') {
      setShowTerminal(false)
      setShowMainContent(true)
    }
  }, [])

  // Close menu on escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen])

  const handleTerminalComplete = () => {
    setShowTerminal(false)
    sessionStorage.setItem('mcd-terminal-completed', 'true')
    
    // Create smooth assembly effect with staggered animations
    setTimeout(() => {
      setShowMainContent(true)
    }, 800)
    
    if (isShaking) {
      setTimeout(() => {
        setIsShaking(false)
      }, 1000)
    }
  }

  const handleShakeChange = (shaking: boolean) => {
    setIsShaking(shaking)
  }

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return HANDBOOK_SECTIONS

    const query = searchQuery.toLowerCase()
    return HANDBOOK_SECTIONS.filter(
      (section) =>
        section.title.toLowerCase().includes(query) ||
        section.content.some(
          (item) => item.text?.toLowerCase().includes(query) || item.code?.toLowerCase().includes(query),
        ),
    )
  }, [searchQuery])

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (showTerminal) {
    return <TerminalIntro onComplete={handleTerminalComplete} onShakeChange={handleShakeChange} />
  }

  // Removed loading spinner - show main content directly after terminal intro

  return (
    <SearchProvider>
      <ErrorBoundary>
        <motion.div 
          className={`min-h-screen bg-gradient-to-br from-background via-background to-accent/5 text-foreground ${isShaking ? 'animate-shake-page' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200"
          >
            Skip to main content
          </a>

          {isMobile && (
            <MobileHeader 
              scrollToSection={scrollToSection}
            />
          )}

          <div className="flex min-h-screen">
            <BackToTop />
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: -150, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1.4, 
                  delay: 0.2, 
                  type: "spring",
                  stiffness: 60,
                  damping: 15
                }}
              >
                <Sidebar sections={filteredSections} activeSection={activeSection} />
              </motion.div>
            )}

            <motion.div 
              className={`flex-1 flex flex-col ${!isMobile ? "ml-80" : ""} ${isMobile ? "pt-24" : ""} w-full max-w-full overflow-x-hidden`}
              initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 1.6, 
                delay: 0.4, 
                type: "spring",
                stiffness: 50,
                damping: 18
              }}
            >
              <main id="main-content" className="flex-1 relative w-full max-w-full overflow-x-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none"></div>
                <div className="relative z-10">
                <motion.header 
                  className={`sticky top-0 z-40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-accent/20 shadow-sm transition-all duration-500 ${isScrolled ? 'py-2' : 'py-3'} w-full max-w-full overflow-x-hidden`}
                  initial={{ opacity: 0, y: -80, scale: 0.9, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.6, 
                    type: "spring",
                    stiffness: 70,
                    damping: 20
                  }}
                >
                  <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-1 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full max-w-full overflow-x-hidden">
                    <div className="w-full sm:flex-1 sm:max-w-md">
                      <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search handbook sections..."
                      />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.button 
                        onClick={() => setShowTools(!showTools)}
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent-foreground text-xs font-medium rounded-lg border border-accent/20 transition-all duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(139, 92, 246, 0.15)",
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        whileTap={{ 
                          scale: 0.95,
                          transition: { duration: 0.1, ease: "easeInOut" }
                        }}
                      >
                        {showTools ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            Hide Tools
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            Show Tools
                          </>
                        )}
                      </motion.button>
                      <ThemeToggle />
                    </div>
                  </div>
                </motion.header>

                <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                  {/* Hero Section */}
                  <motion.div 
                    ref={heroRef}
                    initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ 
                      duration: 1.8, 
                      delay: 0.8, 
                      type: "spring",
                      stiffness: 40,
                      damping: 20
                    }}
                    className="relative text-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-0"
                  >
                    <div className="absolute inset-0 -z-10">
                      {/* <ParticleBackground /> */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-mcd-purple/10 to-mcd-gold/10 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { 
                            duration: 1.2, 
                            delay: 0.3,
                            ease: "easeOut"
                          }
                        }}
                      />
                      <motion.div 
                        className="absolute top-1/4 left-1/4 w-32 h-32 bg-mcd-purple/15 rounded-full blur-2xl"
                        animate={{ 
                          y: [0, -15, 0],
                          transition: { 
                            duration: 6, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      />
                      <motion.div 
                        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-mcd-gold/15 rounded-full blur-xl"
                        animate={{ 
                          y: [0, 15, 0],
                          transition: { 
                            duration: 5, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }
                        }}
                      />
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      <motion.div 
                        className="relative inline-block"
                        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15,
                          delay: 0.35
                        }}
                      >
                        <motion.div 
                          className="absolute -inset-4 bg-gradient-to-r from-mcd-purple/40 via-mcd-gold/40 to-mcd-purple/40 rounded-full blur-xl opacity-80"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.6, 0.8, 0.6],
                            transition: { 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        />
                        <motion.div 
                          className="relative w-32 h-32 mx-auto group cursor-pointer"
                          initial={{ scale: 0, rotate: -180, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            rotate: 0, 
                            opacity: 1,
                            y: [0, -8, 0]
                          }}
                          transition={{
                            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                            rotate: { duration: 1.2, ease: "easeOut" },
                            opacity: { duration: 0.6 },
                            y: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            transition: {
                              scale: { duration: 0.3 },
                              rotate: { duration: 0.6, ease: "easeInOut" }
                            }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Animated glow rings */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-mcd-purple/30 via-mcd-gold/30 to-mcd-purple/30 blur-xl"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.6, 0.3],
                              rotate: [0, 360]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Secondary glow ring */}
                          <motion.div
                            className="absolute inset-2 rounded-full bg-gradient-to-r from-mcd-gold/20 via-mcd-purple/20 to-mcd-gold/20 blur-lg"
                            animate={{
                              scale: [1.1, 0.9, 1.1],
                              opacity: [0.2, 0.5, 0.2],
                              rotate: [360, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.5
                            }}
                          />
                          
                          {/* Logo container with enhanced effects */}
                          <motion.div
                            className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm border border-mcd-purple/20 shadow-2xl"
                            whileHover={{
                              boxShadow: [
                                "0 20px 40px -10px rgba(139, 92, 246, 0.3)",
                                "0 25px 50px -12px rgba(245, 158, 11, 0.4)",
                                "0 20px 40px -10px rgba(139, 92, 246, 0.3)"
                              ],
                              borderColor: "rgba(139, 92, 246, 0.5)"
                            }}
                            transition={{
                              boxShadow: { duration: 2, repeat: Infinity },
                              borderColor: { duration: 0.3 }
                            }}
                          >
                            {/* Animated background pattern */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-mcd-purple/10 via-transparent to-mcd-gold/10"
                              animate={{
                                background: [
                                  "linear-gradient(45deg, rgba(139, 92, 246, 0.1), transparent, rgba(245, 158, 11, 0.1))",
                                  "linear-gradient(225deg, rgba(245, 158, 11, 0.1), transparent, rgba(139, 92, 246, 0.1))",
                                  "linear-gradient(45deg, rgba(139, 92, 246, 0.1), transparent, rgba(245, 158, 11, 0.1))"
                                ]
                              }}
                              transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            
                            <motion.div
                              className="relative z-10 w-full h-full p-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3, duration: 0.6 }}
                              whileHover={{
                                filter: [
                                  "brightness(1) saturate(1)",
                                  "brightness(1.1) saturate(1.2)",
                                  "brightness(1) saturate(1)"
                                ]
                              }}
                            >
                              <img 
                                src="/Logo.png" 
                                alt="MC&D Logo" 
                                className="w-full h-full object-contain"
                              />
                            </motion.div>
                            
                            {/* Sparkle effects */}
                            <motion.div
                              className="absolute top-2 right-2 w-1 h-1 bg-mcd-gold rounded-full"
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1
                              }}
                            />
                            <motion.div
                              className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-mcd-purple rounded-full"
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: 2.5
                              }}
                            />
                            <motion.div
                              className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-mcd-gold rounded-full"
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                delay: 0.5
                              }}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-3 sm:space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.7 }}
                      >
                        <motion.h1 
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-mcd-gold via-mcd-purple to-mcd-gold bg-clip-text text-transparent leading-tight"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                        >
                          Marshall, Carter & Darke
                        </motion.h1>
                        
                        <motion.div 
                          className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"
                          initial={{ width: 0 }}
                          animate={{ width: "4rem" }}
                          transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
                        />
                        
                        <motion.p 
                          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                        >
                          Your comprehensive guide to joining the world's most <span className="text-accent-foreground font-semibold">prestigious procurement firm</span> - where profit meets prestige.
                        </motion.p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                      >
                        <motion.div 
                          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 border border-accent/20 rounded-full text-xs sm:text-sm text-accent-foreground backdrop-blur-sm"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: 'rgba(125, 95, 255, 0.15)'
                          }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              transition: { 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          />
                          Ready to serve excellence
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Quick Tools Section */}
                  <AnimatePresence mode="wait">
                    {showTools && (
                      <motion.div 
                        ref={toolsRef}
                        className="mb-8 sm:mb-12 lg:mb-16 relative"
                        initial={{ opacity: 0, height: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto', 
                          y: 0,
                          transition: { 
                            duration: 0.8, 
                            delay: 0.1,
                            height: { 
                              duration: 0.7, 
                              ease: [0.25, 0.46, 0.45, 0.94]
                            },
                            opacity: { 
                              duration: 0.5, 
                              ease: "easeOut" 
                            },
                            y: { 
                              duration: 0.6, 
                              ease: [0.16, 1, 0.3, 1] 
                            }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0,
                          y: -10,
                          transition: { 
                            duration: 0.6,
                            height: { 
                              duration: 0.5, 
                              ease: [0.55, 0.085, 0.68, 0.53] 
                            },
                            opacity: { 
                              duration: 0.3 
                            },
                            y: { 
                              duration: 0.4, 
                              ease: "easeIn" 
                            }
                          }
                        }}
                        layout
                      >
                        {/* Quick Tools Header */}
                        <motion.div 
                          className="text-center mb-6 sm:mb-8"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.5 }}
                        >
                          <motion.h2 
                            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold bg-gradient-to-r from-mcd-purple via-mcd-gold to-mcd-purple bg-clip-text text-transparent mb-4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >
                            Quick Tools
                          </motion.h2>
                          
                          <motion.div 
                            className="flex items-center justify-center mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.25, duration: 0.6 }}
                          >
                            <motion.div
                              className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-mcd-purple/40 to-mcd-purple/80"
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: "5rem", opacity: 1 }}
                              transition={{ 
                                delay: 0.3, 
                                duration: 0.8, 
                                ease: [0.16, 1, 0.3, 1],
                                width: { type: "spring", damping: 10 }
                              }}
                            />
                            <motion.div
                              className="w-1.5 h-1.5 mx-3 rounded-full shadow-md shadow-mcd-gold/30 bg-gradient-to-br from-mcd-gold via-amber-400 to-mcd-gold"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: 1, 
                                opacity: 1,
                                boxShadow: [
                                  "0 0 0 0 rgba(245, 158, 11, 0.3)",
                                  "0 0 0 8px rgba(245, 158, 11, 0.0)",
                                ]
                              }}
                              transition={{ 
                                delay: 0.5, 
                                duration: 0.4,
                                scale: { type: "spring", stiffness: 400 },
                                boxShadow: {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                  ease: "easeOut"
                                }
                              }}
                            />
                            <motion.div
                              className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent via-mcd-purple/40 to-mcd-purple/80"
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: "5rem", opacity: 1 }}
                              transition={{ 
                                delay: 0.3, 
                                duration: 0.8, 
                                ease: [0.16, 1, 0.3, 1],
                                width: { type: "spring", damping: 10 }
                              }}
                            />
                          </motion.div>
                          
                          <motion.p 
                            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                          >
                            Streamline your MC&D operations with our <span className="text-accent-foreground font-semibold">intelligent format generators</span> and <span className="text-accent-foreground font-semibold">instant reference guides</span>
                          </motion.p>
                        </motion.div>
                        <LayoutGroup>
                          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                            <motion.div 
                              className="group relative"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.5 }}
                              layout
                              whileHover={{ y: -5 }}
                            >
                              <div className="relative bg-gradient-to-br from-mcd-purple/5 via-background/90 to-mcd-gold/5 backdrop-blur-xl rounded-2xl border border-accent/30 p-1 shadow-2xl hover:shadow-mcd-purple/25 transition-all duration-500 overflow-hidden">
                                <motion.div 
                                  className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm relative"
                                  layout
                                >
                                  <FormatGenerator />
                                </motion.div>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="group relative"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.5 }}
                              layout
                              whileHover={{ y: -5 }}
                            >
                              <div className="relative bg-gradient-to-br from-mcd-gold/5 via-background/90 to-mcd-purple/5 backdrop-blur-xl rounded-2xl border border-accent/30 p-1 shadow-2xl hover:shadow-mcd-gold/25 transition-all duration-500 overflow-hidden">
                                <motion.div 
                                  className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm relative"
                                  layout
                                >
                                  <QuickReference />
                                </motion.div>
                              </div>
                            </motion.div>
                          </div>
                        </LayoutGroup>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Content Sections */}
                  <motion.div 
                    className="space-y-4 sm:space-y-6 lg:space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {filteredSections.length === 0 ? (
                      <motion.div 
                        className="text-center py-12 sm:py-16 lg:py-20 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                          <motion.div 
                            className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-muted/50 to-muted/30 rounded-full flex items-center justify-center mx-auto"
                            animate={{ 
                              rotate: [0, 5, -5, 0],
                              transition: { 
                                duration: 4, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          >
                            <motion.span 
                              className="text-4xl sm:text-6xl opacity-60"
                              animate={{ 
                                scale: [1, 1.1, 1],
                                transition: { 
                                  duration: 2, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              }}
                            >
                              🔍
                            </motion.span>
                          </motion.div>
                          <div className="space-y-2 sm:space-y-3">
                            <motion.h2 
                              className="text-2xl sm:text-3xl font-serif font-bold text-muted-foreground"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              No sections found
                            </motion.h2>
                            <motion.p 
                              className="text-muted-foreground text-base sm:text-lg"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              Try adjusting your search query or browse all sections
                            </motion.p>
                          </div>
                          <motion.button
                            onClick={() => setSearchQuery("")}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mcd-purple to-mcd-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl text-sm sm:text-base transition-all duration-300 mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            Clear Search
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <LayoutGroup>
                          {filteredSections.map((section, index) => (
                            <motion.div 
                              key={section.id} 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: index * 0.07,
                                type: "spring",
                                stiffness: 100
                              }}
                              layout
                              layoutId={`section-${section.id}`}
                            >
                              <ContentSection section={section} />
                            </motion.div>
                          ))}
                        </LayoutGroup>
                      </AnimatePresence>
                    )}
                  </motion.div>
                </div>
                </div>
              </main>
            </motion.div>
          </div>
        </motion.div>
      </ErrorBoundary>
    </SearchProvider>
  )
}