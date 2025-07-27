"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { ContentSection } from "@/components/content-section"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { HANDBOOK_SECTIONS } from "@/lib/constants"
import { SearchProvider } from "@/contexts/search-context"
import { useActiveSection } from "@/hooks/use-active-section"
import { useIsMobile } from "@/hooks/use-mobile"
import { FormatGenerator } from "@/components/format-generator"
import QuickReference from "@/components/quick-reference"
import { ErrorBoundary } from "@/components/error-boundary"
import LogoCanvas from "@/components/logo"
import ParticleBackground from "@/components/particle-background"
import BackToTop from "@/components/back-to-top"
import { TerminalIntro } from "@/components/terminal-intro"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showTerminal, setShowTerminal] = useState(true)
  const [isShaking, setIsShaking] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTools, setShowTools] = useState(true)
  const isMobile = useIsMobile()
  const activeSection = useActiveSection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Check if terminal has been completed before
  useEffect(() => {
    const terminalCompleted = sessionStorage.getItem('mcd-terminal-completed')
    if (terminalCompleted === 'true') {
      setShowTerminal(false)
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

  return (
    <SearchProvider>
      <ErrorBoundary>
        <div className={`min-h-screen bg-gradient-to-br from-background via-background to-accent/5 text-foreground transition-all duration-300 ${isShaking ? 'animate-shake-page' : ''}`}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200"
          >
            Skip to main content
          </a>

          {isMobile && <MobileHeader sections={filteredSections} activeSection={activeSection} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}

          <div className="flex min-h-screen">
            <BackToTop />
            {!isMobile && <Sidebar sections={filteredSections} activeSection={activeSection} />}

            <div className={`flex-1 flex flex-col ${!isMobile ? "ml-80" : ""} ${isMobile ? "pt-24" : ""}`}>
              <main id="main-content" className="flex-1">
                <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-accent/20 shadow-sm transition-all duration-500 ${isScrolled ? 'py-2' : 'py-3'}`}>
                  <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-1 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="w-full sm:flex-1 sm:max-w-md">
                      <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search handbook sections..."
                      />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button 
                        onClick={() => setShowTools(!showTools)}
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent-foreground text-xs font-medium rounded-lg border border-accent/20 transition-colors"
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
                      </button>
                      <ThemeToggle />
                    </div>
                  </div>
                </header>

                <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                  {/* Hero Section */}
                  <motion.div 
                    ref={heroRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-0"
                  >
                    <div className="absolute inset-0 -z-10">
                      <ParticleBackground />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-mcd-purple/10 to-mcd-gold/10 rounded-full blur-3xl animate-pulse-slow"></div>
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-mcd-purple/15 rounded-full blur-2xl animate-float"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-mcd-gold/15 rounded-full blur-xl animate-float-reverse"></div>
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      <motion.div 
                        className="relative inline-block"
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15,
                          delay: 0.2
                        }}
                      >
                        <div className="absolute -inset-4 bg-gradient-to-r from-mcd-purple/40 via-mcd-gold/40 to-mcd-purple/40 rounded-full blur-xl opacity-80 animate-pulse"></div>
                        <div className="relative w-32 h-32 mx-auto">
                          <LogoCanvas />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-3 sm:space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-mcd-gold via-mcd-purple to-mcd-gold bg-clip-text text-transparent leading-tight">
                          Marshall, Carter & Darke
                        </h1>
                        
                        <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
                        
                        <motion.p 
                          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          Your comprehensive guide to joining the world's most <span className="text-accent-foreground font-semibold">prestigious procurement firm</span> - where profit meets prestige.
                        </motion.p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 border border-accent/20 rounded-full text-xs sm:text-sm text-accent-foreground backdrop-blur-sm">
                          <div className="w-2 h-2 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full animate-pulse"></div>
                          Ready to serve excellence
                        </div>
                        

                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Quick Tools Section */}
                  <AnimatePresence>
                    {showTools && (
                      <motion.div 
                        className="mb-8 sm:mb-12 lg:mb-16 relative"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Background Effects */}
                        <div className="absolute inset-0 -z-10">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-mcd-purple/10 via-mcd-gold/15 to-mcd-purple/10 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
                          <div className="absolute top-0 left-1/4 w-64 h-64 bg-mcd-purple/10 rounded-full blur-2xl animate-float"></div>
                          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-mcd-gold/10 rounded-full blur-xl animate-float-reverse"></div>
                        </div>
                        
                        <motion.div 
                          className="text-center mb-8 sm:mb-12 relative z-10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-gradient-to-r from-mcd-purple/10 via-mcd-gold/15 to-mcd-purple/10 rounded-full border border-accent/20 backdrop-blur-md">
                            <div className="w-2 h-2 bg-gradient-to-r from-mcd-purple to-mcd-gold rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-accent-foreground">Professional Tools Suite</span>
                            <div className="w-2 h-2 bg-gradient-to-r from-mcd-gold to-mcd-purple rounded-full animate-pulse"></div>
                          </div>
                          
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mcd-gold via-mcd-purple to-mcd-gold mb-4 sm:mb-6">
                            Quick Tools
                          </h2>
                          
                          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-mcd-purple"></div>
                            <div className="w-3 h-3 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full animate-spin-slow"></div>
                            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-mcd-gold"></div>
                          </div>
                          
                          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                            Streamline your MC&D operations with our <span className="text-accent-foreground font-semibold">intelligent format generators</span> and <span className="text-accent-foreground font-semibold">instant reference guides</span>
                          </p>
                        </motion.div>
                        
                        <div className="relative z-10">
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                            {/* Format Generator Card */}
                            <motion.div 
                              className="group relative"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="relative bg-gradient-to-br from-mcd-purple/5 via-background/90 to-mcd-gold/5 backdrop-blur-xl rounded-2xl border border-accent/30 p-1 shadow-2xl hover:shadow-mcd-purple/25 transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,140,255,0.1)_0%,rgba(0,0,0,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm relative">
                                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-mcd-purple/10 flex items-center justify-center text-mcd-purple text-xs font-bold">
                                    F
                                  </div>
                                  <FormatGenerator />
                                </div>
                              </div>
                            </motion.div>
                            
                            {/* Quick Reference Card */}
                            <motion.div 
                              className="group relative"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="relative bg-gradient-to-br from-mcd-gold/5 via-background/90 to-mcd-purple/5 backdrop-blur-xl rounded-2xl border border-accent/30 p-1 shadow-2xl hover:shadow-mcd-gold/25 transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,200,100,0.1)_0%,rgba(0,0,0,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm relative">
                                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-mcd-gold/10 flex items-center justify-center text-mcd-gold text-xs font-bold">
                                    Q
                                  </div>
                                  <QuickReference />
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Content Sections */}
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {filteredSections.length === 0 ? (
                      <motion.div 
                        className="text-center py-12 sm:py-16 lg:py-20 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-muted/50 to-muted/30 rounded-full flex items-center justify-center mx-auto">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-mcd-purple/10 to-mcd-gold/10 rounded-full animate-ping opacity-20"></div>
                              <span className="text-4xl sm:text-6xl opacity-60">🔍</span>
                            </div>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-muted-foreground">No sections found</h2>
                            <p className="text-muted-foreground text-base sm:text-lg">
                              Try adjusting your search query or browse all sections
                            </p>
                          </div>
                          <motion.button
                            onClick={() => setSearchQuery("")}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mcd-purple to-mcd-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base transition-all duration-300 mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Clear Search
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <AnimatePresence>
                        {filteredSections.map((section, index) => (
                          <motion.div 
                            key={section.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <ContentSection section={section} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </SearchProvider>
  )
}