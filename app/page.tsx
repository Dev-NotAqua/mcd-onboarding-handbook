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

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const activeSection = useActiveSection()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 300)

    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [])

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

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-mcd-purple/5 flex items-center justify-center" role="status" aria-live="polite">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-mcd-purple/30 border-t-mcd-purple rounded-full animate-spin mx-auto" aria-hidden="true"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-mcd-gold rounded-full animate-spin mx-auto"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                aria-hidden="true"
              ></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent">
                Marshall, Carter & Darke
              </h2>
              <p className="text-muted-foreground font-medium">Loading Onboarding Handbook...</p>
              <span className="sr-only">Please wait while the handbook loads</span>
            </div>
            {/* Loading progress indicator */}
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-mcd-purple to-mcd-gold rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-mcd-purple/5 text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-mcd-purple focus:text-mcd-gold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-mcd-purple focus:ring-offset-2 transition-all duration-200"
        >
          Skip to main content
        </a>

        {isMobile && <MobileHeader sections={filteredSections} activeSection={activeSection} />}

        <div className="flex min-h-screen">
          <BackToTop />
          {!isMobile && <Sidebar sections={filteredSections} activeSection={activeSection} />}

          <div className={`flex-1 flex flex-col ${!isMobile ? "ml-80" : ""} ${isMobile ? "pt-24" : ""}`}>
            <main id="main-content" className="flex-1">
              <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-mcd-purple/20 shadow-sm">
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
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mcd-purple/5 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-mcd-gold/10 rounded-full blur-2xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-mcd-purple/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="relative inline-block">
                      <div className="absolute -inset-4 bg-gradient-to-r from-mcd-purple/40 via-mcd-gold/40 to-mcd-purple/40 rounded-full blur-xl opacity-80 animate-pulse"></div>
                      <div className="relative w-32 h-32 mx-auto animate-slide-up">
                        <LogoCanvas />
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-mcd-purple via-mcd-gold to-mcd-purple bg-clip-text text-transparent animate-slide-up leading-tight">
                        Welcome to MC&D
                      </h1>
                      <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-transparent via-mcd-gold to-transparent mx-auto animate-scale-in" style={{ animationDelay: '0.5s' }}></div>
                      <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
                        Your comprehensive guide to joining <span className="text-mcd-purple font-semibold">Marshall, Carter, and Darke Ltd.</span> - where profit meets prestige.
                      </p>
                    </div>
                    <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                      <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-mcd-purple/10 border border-mcd-purple/20 rounded-full text-xs sm:text-sm text-mcd-purple">
                        <div className="w-2 h-2 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full animate-pulse"></div>
                        Ready to serve excellence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tools Section */}
                <div className="mb-8 sm:mb-12 lg:mb-16 relative">
                  {/* Background Effects */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-mcd-purple/10 via-mcd-gold/15 to-mcd-purple/10 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-mcd-gold/5 rounded-full blur-2xl animate-float"></div>
                    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-mcd-purple/8 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
                  </div>
                  
                  <div className="text-center mb-8 sm:mb-12 relative z-10">
                    <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-gradient-to-r from-mcd-purple/10 via-mcd-gold/15 to-mcd-purple/10 rounded-full border border-mcd-gold/20 backdrop-blur-md animate-slide-up">
                      <div className="w-2 h-2 bg-gradient-to-r from-mcd-purple to-mcd-gold rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-mcd-gold">Professional Tools Suite</span>
                      <div className="w-2 h-2 bg-gradient-to-r from-mcd-gold to-mcd-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mcd-purple via-mcd-gold via-yellow-400 to-mcd-purple mb-4 sm:mb-6 animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.1s' }}>
                      Quick Tools
                    </h2>
                    
                    <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                      <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-mcd-gold"></div>
                      <div className="w-3 h-3 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full animate-spin-slow"></div>
                      <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-mcd-gold"></div>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
                      Streamline your MC&D operations with our <span className="text-mcd-gold font-semibold">intelligent format generators</span> and <span className="text-mcd-purple font-semibold">instant reference guides</span>
                    </p>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      {/* Format Generator Card */}
                      <div className="group relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-mcd-gold via-yellow-400 via-mcd-gold to-yellow-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-1000 animate-pulse-slow"></div>
                        <div className="relative bg-gradient-to-br from-background/80 via-background/90 to-mcd-gold/5 backdrop-blur-xl rounded-2xl border border-mcd-gold/30 p-1 shadow-2xl hover:shadow-mcd-gold/25 transition-all duration-700 overflow-hidden">
                          <div className="bg-gradient-to-br from-card/95 via-card/90 to-background/95 rounded-xl p-6 sm:p-8 h-full backdrop-blur-sm">
                            <FormatGenerator />
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Reference Card */}
                      <div className="group relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-mcd-purple via-mcd-gold via-mcd-purple to-mcd-gold rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-1000 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                        <div className="relative bg-gradient-to-br from-background/80 via-background/90 to-mcd-purple/5 backdrop-blur-xl rounded-2xl border border-mcd-purple/30 p-1 shadow-2xl hover:shadow-mcd-purple/25 transition-all duration-700 overflow-hidden">
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
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mcd-gold to-yellow-400 hover:from-yellow-400 hover:to-mcd-gold text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
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

            <footer className="mt-auto py-8 sm:py-10 lg:py-12 border-t border-mcd-gold/20 bg-mcd-purple/5">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-mcd-gold font-bold text-sm">MC&D</span>
                      </div>
                      <span className="text-xl font-serif font-bold text-mcd-gold">Marshall, Carter & Darke Ltd.</span>
                    </div>
                    <p className="text-muted-foreground text-sm">The world's premier purveyor of anomalous objects and bespoke experiences.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-mcd-gold">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-muted-foreground hover:text-mcd-gold transition-colors">Home</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-mcd-gold transition-colors">About Us</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-mcd-gold transition-colors">Contact</a></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-mcd-gold">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-muted-foreground hover:text-mcd-gold transition-colors">Twitter</a>
                      <a href="#" className="text-muted-foreground hover:text-mcd-gold transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-mcd-gold/20 text-center text-muted-foreground text-sm">
                  <p>© 2025 Marshall, Carter & Darke Ltd. All rights reserved.</p>
                  <p className="mt-2">For internal use only. Unauthorized distribution is strictly prohibited.</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
