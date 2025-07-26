'use client'

import { useState } from 'react'
import { BookOpen, Zap, Trophy, MessageSquare, TrendingUp } from 'lucide-react'

interface QuickReferenceItem {
  command: string
  description: string
}

interface QuickReferenceCategory {
  category: string
  icon: any
  items: QuickReferenceItem[]
}

const QUICK_REFERENCE_DATA = [
  {
    category: "Essential Commands",
    icon: Zap,
    items: [
      { command: "/verify", description: "Complete Discord verification" },
      { command: "/shift manage", description: "Start/stop Trident Timer for self deployments" },
    ],
  },
  {
    category: "Point Values",
    icon: Trophy,
    items: [
      { command: "Deployments", description: "5 points per 30 minutes" },
      { command: "Self Deployments", description: "3 points per 30 minutes" },
      { command: "The Probes Interrogation", description: "5 points flat" },
    ],
  },
  {
    category: "Key Channels",
    icon: MessageSquare,
    items: [
      { command: "#codename-request", description: "Submit codename for approval" },
      { command: "#promotion-request", description: "Request rank promotions" },
      { command: "#point-request", description: "Request points for activities" },
      { command: "#hierarchy-and-points", description: "View rank requirements" },
    ],
  },
  {
    category: "Rank Progression",
    icon: TrendingUp,
    items: [
      { command: "Recruit → 25 Points", description: "First promotion milestone" },
      { command: "50 Points + 1 Self Deploy", description: "Second milestone" },
      { command: "135 Points + 3 Self Deploys", description: "Middle Rank entry" },
      { command: "330 Points + HR Apps", description: "High Rank entry" },
    ],
  },
]

export default function QuickReference() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Essential Commands']) // Start with Essential Commands expanded
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  
  return (
    <div className="relative">
      <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-mcd-gold/30">
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-br from-mcd-gold/15 to-mcd-gold/8 p-2.5 rounded-xl border border-mcd-gold/25">
                  <BookOpen className="h-6 w-6 text-mcd-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Quick Reference</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Essential commands and shortcuts</p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/25 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">Ready</span>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {QUICK_REFERENCE_DATA.map((category, index) => {
              const CategoryIcon = category.icon
              const isExpanded = expandedCategories.includes(category.category)
              
              return (
                <div
                  key={category.category}
                  className="relative group/category"
                >
                  <div className="relative bg-background border border-border rounded-xl p-4 hover:border-mcd-gold/30 transition-all duration-200 hover:shadow-md">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="w-full flex items-center justify-between mb-3 group/header"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="bg-gradient-to-br from-mcd-gold/12 to-mcd-gold/8 p-2 rounded-lg border border-mcd-gold/20">
                          <CategoryIcon className="h-4 w-4 text-mcd-gold" />
                        </div>
                        <h4 className="text-base font-semibold text-foreground group-hover/header:text-mcd-gold transition-colors duration-200">
                          {category.category}
                        </h4>
                      </div>
                      
                      <div className={`transform transition-transform duration-150 ease-in-out ${isExpanded ? 'rotate-180' : ''}`}>
                        <div className="w-5 h-5 rounded-full bg-mcd-gold/10 border border-mcd-gold/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 border-t border-r border-mcd-gold transform rotate-45 -translate-y-px" />
                        </div>
                      </div>
                    </button>
                    
                    {/* Category Items */}
                    <div className={`space-y-2.5 transition-all duration-200 overflow-hidden ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="relative group/item"
                        >
                          <div className="relative bg-background/50 border border-border/30 rounded-lg p-3 hover:border-mcd-gold/25 transition-colors duration-150 hover:bg-background/70">
                            <div className="flex items-start gap-2.5">
                              <div className="w-1.5 h-1.5 bg-mcd-gold rounded-full mt-1.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-sm text-mcd-gold font-medium mb-1 break-all">
                                  {item.command}
                                </div>
                                <div className="text-sm text-muted-foreground leading-relaxed">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
