"use client"

import { useState, useEffect, useMemo } from "react"

import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { ContentSection } from "@/components/content-section"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { HANDBOOK_SECTIONS } from "@/lib/constants"
import { useActiveSection } from "@/hooks/use-active-section"
import { FormatGenerator } from "@/components/format-generator"
import QuickReference from "@/components/quick-reference"
import { ErrorBoundary } from "@/components/error-boundary"
import LogoCanvas from "@/components/logo"
import ParticleBackground from "@/components/particle-background"
import BackToTop from "@/components/back-to-top"
import { TerminalIntro } from "@/components/terminal-intro"

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)
  const activeSection = useActiveSection()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleTerminalComplete = () => {
    setShowTerminal(false)
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

  if (showTerminal) {
    return <TerminalIntro onComplete={handleTerminalComplete} />
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200"
        >
          Skip to main content
        </a>

        {isMobile && <MobileHeader sections={filteredSections} activeSection={activeSection} />}

        <div className="flex min-h-screen">
          <BackToTop />
          {!isMobile && <Sidebar sections={filteredSections} activeSection={activeSection} />}

          <div className={`flex-1 flex flex-col ${!isMobile ? "ml-80" : ""} ${isMobile ? "pt-24" : ""}`}>
            <main id="main-content" className="flex-1">
              <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-accent/20 shadow-sm">
                <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="w-full sm:flex-1 sm:max-w-md">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Search handbook sections..."
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <ThemeToggle />
                  </div>
                </div>
              </header>

              <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                {/* Hero Section */}
                <div className="relative text-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-0">
                  <div className="absolute inset-0 -z-10">
                    <ParticleBackground />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="relative inline-block">
                      <div className="absolute -inset-4 bg-gradient-to-r from-accent/40 via-accent/40 to-accent/40 rounded-full blur-xl opacity-80 animate-pulse"></div>
                      <div className="relative w-32 h-32 mx-auto animate-slide-up">
                        <LogoCanvas />
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent animate-slide-up leading-tight">
                        Welcome to MC&D
                      </h1>
                      <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto animate-scale-in" style={{ animationDelay: '0.5s' }}></div>
                      <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
                        Your comprehensive guide to joining <span className="text-accent-foreground font-semibold">Marshall, Carter, and Darke Ltd.</span> - where profit meets prestige.
                      </p>
                    </div>
                    <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                      <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 border border-accent/20 rounded-full text-xs sm:text-sm text-accent-foreground">
                      <div className="w-2 h-2 bg-gradient-to-br from-accent to-accent rounded-full animate-pulse"></div>
                        Ready to serve excellence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tools Section */}
                <div className="mb-8 sm:mb-12 lg:mb-16 relative">
                  {/* Background Effects */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-accent/10 via-accent/15 to-accent/10 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-float"></div>
                    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/8 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
                  </div>
                  
                  <div className="text-center mb-8 sm:mb-12 relative z-10">
                    <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-gradient-to-r from-accent/10 via-accent/15 to-accent/10 rounded-full border border-accent/20 backdrop-blur-md animate-slide-up">
                      <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-accent-foreground">Professional Tools Suite</span>
                      <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent via-accent to-accent mb-4 sm:mb-6 animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.1s' }}>
                      Quick Tools
                    </h2>
                    
                    <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                      <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
                      <div className="w-3 h-3 bg-gradient-to-br from-accent to-accent rounded-full animate-spin-slow"></div>
                      <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
                      Streamline your MC&D operations with our <span className="text-accent-foreground font-semibold">intelligent format generators</span> and <span className="text-accent-foreground font-semibold">instant reference guides</span>
                    </p>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      {/* Format Generator Card */}
                      <div className="group relative">
                        <div className="relative bg-gradient-to-br from-background/80 via-background/90 to-accent/5 backdrop-blur-xl rounded-2xl border border-accent/30 p-1 shadow-2xl hover:shadow-accent/25 transition-all duration-700 overflow-hidden">
                          <div className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm">
                            <FormatGenerator />
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Reference Card */}
                      <div className="group relative">
                        <div className="relative bg-gradient-to-br from-background/80 via-background/90 to-accent/5 backdrop-blur-xl rounded-2xl border border-accent/30 p-1 shadow-2xl hover:shadow-accent/25 transition-all duration-700 overflow-hidden">
                          <div className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm">
                            <QuickReference />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {filteredSections.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
                      <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-muted/50 to-muted/30 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-4xl sm:text-6xl opacity-50">🔍</span>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-muted-foreground">No sections found</h2>
                          <p className="text-muted-foreground text-base sm:text-lg">
                            Try adjusting your search query or browse all sections
                          </p>
                        </div>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-accent to-accent hover:from-accent hover:to-accent text-accent-foreground font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                        >
                          Clear Search
                        </button>
                      </div>
                    </div>
                  ) : (
                    filteredSections.map((section, index) => (
                      <div key={section.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <ContentSection section={section} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </main>


          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
