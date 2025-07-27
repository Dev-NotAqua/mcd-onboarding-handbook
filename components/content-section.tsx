"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, ExternalLink, ArrowRight, Check, Star, Zap, Shield, User, Award, BookOpen, Clock, Briefcase, Globe, Gavel, Copy } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSearch } from "@/contexts/search-context"
import { highlightText } from "@/lib/search-utils"
import type { HandbookSection } from "@/lib/types"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import { EnhancedDiscordInterface } from "@/components/enhanced-discord-interface"
import { DiscordVerificationInterface } from "@/components/discord-verification-interface"
import { TridentTimerInterface } from "@/components/trident-timer-interface"
import { HierarchyInterface } from "@/components/hierarchy-interface"
import { motion, AnimatePresence } from "framer-motion"

// Function to parse text with bold formatting and search highlighting
function parseTextWithFormatting(text: string, searchTerm?: string) {
  // First handle bold formatting
  const boldParts = text.split(/\*\*(.*?)\*\*/g)
  const formattedParts = boldParts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={`bold-${index}`} className="font-semibold text-mcd-purple">{part}</strong>
    }
    return part
  })
  
  // Then handle search highlighting if searchTerm is provided
  if (searchTerm && searchTerm.trim()) {
    return formattedParts.map((part, index) => {
      if (typeof part === 'string') {
        return highlightText(part, searchTerm).map((highlighted, hIndex) => (
          <span key={`highlight-${index}-${hIndex}`}>{highlighted}</span>
        ))
      }
      return part
    })
  }
  
  return formattedParts
}

// Icon mapping for section types
const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "verification": Shield,
  "codenames": User,
  "shift-logging": Clock,
  "morphs": User,
  "hierarchy": Award,
  "channels": Globe,
  "divisions": Briefcase,
  "conclusion": BookOpen,
  "beginner-info": Zap,
}

interface ContentSectionProps {
  section: HandbookSection
}

export function ContentSection({ section }: ContentSectionProps) {
  const isMobile = useIsMobile()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { highlightedText } = useSearch()
  const contentRef = useRef<HTMLDivElement>(null)
  const IconComponent = SECTION_ICONS[section.id] || BookOpen

  // Auto-expand if section contains highlighted text
  useEffect(() => {
    if (highlightedText && contentRef.current?.textContent?.includes(highlightedText)) {
      setIsExpanded(true)
    }
  }, [highlightedText])

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/handbook#${section.id}`)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <motion.section
      id={section.id}
      className="scroll-mt-20 sm:scroll-mt-24 group"
      initial={false}
      animate={{ 
        borderColor: isHovered ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.1)",
        boxShadow: isHovered ? "0 10px 30px -10px rgba(139, 92, 246, 0.15)" : "0 4px 15px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="bg-gradient-to-br from-card/50 via-card/70 to-card/90 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header */}
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between bg-gradient-to-r from-mcd-purple/5 via-mcd-purple/10 to-mcd-purple/5 hover:from-mcd-purple/10 hover:via-mcd-purple/15 hover:to-mcd-purple/10 transition-all duration-500 relative overflow-hidden group/header active:scale-[0.99]"
            aria-expanded={isExpanded}
            aria-controls={`section-${section.id}`}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-purple/10 to-transparent transform -translate-x-full group-hover/header:translate-x-full transition-transform duration-1000"></div>
            
            {/* Section icon */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isExpanded ? "bg-gradient-to-br from-mcd-purple to-mcd-gold scale-110" : "bg-mcd-purple/10"}`}>
                  <IconComponent className={`h-5 w-5 ${isExpanded ? "text-white" : "text-mcd-purple"}`} />
                </div>
                {isExpanded && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
                )}
              </div>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold bg-gradient-to-r from-mcd-purple to-purple-400 bg-clip-text text-transparent relative group-hover/header:scale-105 transition-transform duration-300 text-left">
                {section.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div
                className={`transform transition-all duration-500 group-hover/header:scale-110 flex-shrink-0 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-mcd-purple" />
                ) : (
                  <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-mcd-purple" />
                )}
              </div>
            </div>
          </button>
          
          {/* Copy link button positioned absolutely to avoid nesting */}
          <button 
            onClick={handleCopyLink}
            className="absolute top-4 sm:top-5 right-12 sm:right-16 p-2 rounded-full hover:bg-mcd-purple/10 transition-colors z-10"
            aria-label={isCopied ? "Link copied!" : "Copy section link"}
          >
            <AnimatePresence>
              {isCopied && (
                <motion.div 
                  className="absolute -top-8 -right-2 bg-mcd-purple text-white text-xs px-2 py-1 rounded-md"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
            <Copy className="h-4 w-4 text-mcd-purple" />
          </button>
        </div>

        {/* Section Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`section-${section.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.3, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.3 },
                  opacity: { duration: 0.2 }
                }
              }}
              className="overflow-hidden"
              ref={contentRef}
            >
              <div className={`p-4 sm:p-6 space-y-4 sm:space-y-6 ${isMobile ? "px-4" : "px-6"}`}>
                {section.content.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.type === "text" && (
                      <p className="text-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                        {parseTextWithFormatting(item.text || "", highlightedText)}
                      </p>
                    )}

                    {item.type === "heading" && (
                      <div className="relative mt-8 mb-6">
                        <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-mcd-purple to-mcd-gold rounded-full"></div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold bg-gradient-to-r from-mcd-purple via-mcd-gold to-mcd-purple bg-clip-text text-transparent flex items-center gap-2">
                          {parseTextWithFormatting(item.text || "", highlightedText)}
                        </h3>
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-mcd-purple/20 to-transparent mt-2"></div>
                      </div>
                    )}

                    {item.type === "list" && item.items && (
                      <div className="space-y-3 sm:space-y-4 my-5 sm:my-7">
                        {item.items.map((listItem, listIndex) => (
                          <div key={listIndex} className="flex items-start gap-3 sm:gap-4 group/item hover:bg-mcd-purple/5 p-3 rounded-lg transition-colors duration-300">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-6 h-6 rounded-full bg-mcd-purple/10 flex items-center justify-center group-hover/item:bg-gradient-to-br from-mcd-purple to-mcd-gold transition-colors duration-300">
                                <ArrowRight className="w-3 h-3 text-mcd-purple group-hover/item:text-white transition-colors duration-300" />
                              </div>
                            </div>
                            <span className="text-foreground leading-relaxed group-hover/item:text-mcd-purple transition-colors duration-300 flex-1 text-sm sm:text-base lg:text-lg">
                              {parseTextWithFormatting(listItem, highlightedText)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {(item.type === "code" || item.type === "code-block") && item.code && (
                      <div className="my-5 sm:my-7">
                        <CodeBlock code={item.code} language={item.language} />
                      </div>
                    )}

                    {item.type === "callout" && (
                      <div className="my-5 sm:my-7">
                        <Callout type={item.calloutType || "info"}>
                          {parseTextWithFormatting(item.text || "", highlightedText)}
                        </Callout>
                      </div>
                    )}

                    {item.type === "image" && item.src && (
                      <div className="my-8">
                        <div className="relative group/image overflow-hidden rounded-xl border border-mcd-purple/20 shadow-lg hover:shadow-xl transition-all duration-300">
                          <img
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt || ""}
                            className="w-full h-auto transition-transform duration-300 group-hover/image:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>

                          {/* Zoom indicator */}
                          <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {item.caption && (
                          <p className="text-sm text-muted-foreground mt-3 text-center italic">{item.caption}</p>
                        )}
                      </div>
                    )}

                    {item.type === "discord-interface" && (
                      <div className="my-8 flex justify-center">
                        <EnhancedDiscordInterface />
                      </div>
                    )}

                    {item.type === "discord-verification" && (
                      <div className="my-8 flex justify-center">
                        <DiscordVerificationInterface />
                      </div>
                    )}

                    {item.type === "trident-timer" && (
                      <div className="my-8 flex justify-center">
                        <TridentTimerInterface />
                      </div>
                    )}

                    {item.type === "hierarchy-interface" && (
                      <div className="my-8 flex justify-center">
                        <HierarchyInterface />
                      </div>
                    )}

                  </motion.div>
                ))}
              </div>
              
              {/* Section footer */}
              <div className="px-6 py-4 border-t border-mcd-purple/10 bg-gradient-to-r from-mcd-purple/5 to-transparent flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-mcd-gold" />
                  <span>Section completed</span>
                </div>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-sm flex items-center gap-1 text-mcd-purple hover:text-mcd-gold transition-colors"
                >
                  Back to top
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}