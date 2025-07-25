"use client"

import { useState, useEffect, useMemo } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { ContentSection } from "@/components/content-section"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { HANDBOOK_SECTIONS } from "@/lib/constants"
import { useActiveSection } from "@/hooks/use-active-section"
import { FormatGenerator } from "@/components/format-generator"
import { QuickReference } from "@/components/quick-reference"
import { ErrorBoundary } from "@/components/error-boundary"

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
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-mcd-gold/5 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-mcd-gold/30 border-t-mcd-gold rounded-full animate-spin mx-auto"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-yellow-400 rounded-full animate-spin mx-auto"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
              ></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent">
                Marshall, Carter & Darke
              </h2>
              <p className="text-muted-foreground font-medium">Loading Onboarding Handbook...</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-mcd-gold/5 text-foreground">
          {/* Mobile Header */}
          {isMobile && <MobileHeader sections={filteredSections} activeSection={activeSection} />}

          <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            {!isMobile && <Sidebar sections={filteredSections} activeSection={activeSection} />}

            {/* Main Content */}
            <main className={`flex-1 ${!isMobile ? "ml-80" : ""} ${isMobile ? "pt-24" : ""}`}>
              {/* Header with Search and Theme Toggle */}
              <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-mcd-gold/20 shadow-sm">
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

              {/* Content Sections */}
              <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                {/* Hero Section */}
                <div className="relative text-center mb-8 sm:mb-12 lg:mb-16 overflow-hidden px-2 sm:px-0">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mcd-gold/5 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-mcd-gold/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="relative inline-block">
                      <div className="absolute -inset-4 bg-gradient-to-r from-mcd-gold/20 via-yellow-400/20 to-mcd-gold/20 rounded-full blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-mcd-gold via-yellow-400 to-mcd-gold rounded-full flex items-center justify-center shadow-2xl shadow-mcd-gold/30 mx-auto animate-slide-up">
                        <span className="text-black font-bold text-2xl">MC&D</span>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold bg-clip-text text-transparent animate-slide-up leading-tight">
                        Welcome to MC&D
                      </h1>
                      <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-transparent via-mcd-gold to-transparent mx-auto animate-scale-in" style={{animationDelay: '0.5s'}}></div>
                      <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up px-4 sm:px-0" style={{animationDelay: '0.3s'}}>
                        Your comprehensive guide to joining <span className="text-mcd-gold font-semibold">Marshall, Carter, and Darke Ltd.</span> - where profit meets
                        prestige.
                      </p>
                    </div>
                    <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
                      <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-mcd-gold/10 border border-mcd-gold/20 rounded-full text-xs sm:text-sm text-mcd-gold">
                        <div className="w-2 h-2 bg-mcd-gold rounded-full animate-pulse"></div>
                        Ready to serve excellence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tools Section */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold mb-3 sm:mb-4 animate-slide-up px-4 sm:px-0">
                      Quick Tools
                    </h2>
                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent via-mcd-gold to-transparent mx-auto mb-3 sm:mb-4 animate-scale-in" style={{animationDelay: '0.2s'}}></div>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto animate-slide-up px-4 sm:px-0" style={{animationDelay: '0.3s'}}>
                      Generate professional formats for your MC&D communications
                    </p>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 animate-slide-up xl:items-start xl:grid-rows-1" style={{animationDelay: '0.4s'}}>
                    <FormatGenerator />
                    <QuickReference />
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

                {/* Footer */}
                <footer className="mt-12 sm:mt-16 lg:mt-20 py-8 sm:py-10 lg:py-12 border-t border-mcd-gold/20">
                  <div className="text-center space-y-3 sm:space-y-4 px-4">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-mcd-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-xs">MC&D</span>
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-mcd-gold">Marshall, Carter & Darke Ltd.</span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">© 2025 Marshall, Carter & Darke Ltd. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">Handbook Online</span>
                    </div>
                  </div>
                </footer>
              </div>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
