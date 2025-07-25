"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import type { HandbookSection } from "@/lib/types"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import { EnhancedDiscordInterface } from "@/components/enhanced-discord-interface"
import { DiscordVerificationInterface } from "@/components/discord-verification-interface"
import { TridentTimerInterface } from "@/components/trident-timer-interface"
import { HierarchyInterface } from "@/components/hierarchy-interface"


interface ContentSectionProps {
  section: HandbookSection
}

export function ContentSection({ section }: ContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section id={section.id} className="scroll-mt-20 sm:scroll-mt-24 group">
      <div className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-mcd-gold/20 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-mcd-gold/5 transition-all duration-500">
        {/* Section Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between bg-gradient-to-r from-mcd-gold/5 via-mcd-gold/10 to-mcd-gold/5 hover:from-mcd-gold/10 hover:via-mcd-gold/15 hover:to-mcd-gold/10 transition-all duration-500 relative overflow-hidden group/header active:scale-[0.99]"
          aria-expanded={isExpanded}
          aria-controls={`section-${section.id}`}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/10 to-transparent transform -translate-x-full group-hover/header:translate-x-full transition-transform duration-1000"></div>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent relative group-hover/header:scale-105 transition-transform duration-300 text-left">
            {section.title}
          </h2>

          <div
            className={`transform transition-all duration-500 group-hover/header:scale-110 flex-shrink-0 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-mcd-gold" />
          </div>
        </button>

        {/* Section Content */}
        <div
          id={`section-${section.id}`}
          className={`transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-none opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {section.content.map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {item.type === "text" && (
                  <p className="text-foreground leading-relaxed text-sm sm:text-base lg:text-lg">{item.text}</p>
                )}

                {item.type === "heading" && (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold text-mcd-gold mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-mcd-gold to-yellow-400 rounded-full flex-shrink-0"></div>
                    {item.text}
                  </h3>
                )}

                {item.type === "list" && item.items && (
                  <div className="space-y-2 sm:space-y-3 my-4 sm:my-6">
                    {item.items.map((listItem, listIndex) => (
                      <div key={listIndex} className="flex items-start gap-3 sm:gap-4 group/item">
                        <div className="flex-shrink-0 mt-1.5 sm:mt-2">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-mcd-gold to-yellow-400 rounded-full shadow-lg group-hover/item:scale-125 transition-transform duration-300"></div>
                        </div>
                        <span className="text-foreground leading-relaxed group-hover/item:text-mcd-gold transition-colors duration-300 flex-1 text-sm sm:text-base lg:text-lg">
                          {listItem}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {item.type === "code" && item.code && (
                  <div className="my-4 sm:my-6">
                    <CodeBlock code={item.code} language={item.language} />
                  </div>
                )}

                {item.type === "callout" && (
                  <div className="my-4 sm:my-6">
                    <Callout type={item.calloutType || "info"}>{item.text}</Callout>
                  </div>
                )}

                {item.type === "image" && item.src && (
                  <div className="my-8">
                    <div className="relative group/image overflow-hidden rounded-xl border border-mcd-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
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


              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
