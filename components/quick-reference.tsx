'use client'

import { useState } from 'react'
import { BookOpen, Zap, Trophy, MessageSquare, TrendingUp, ChevronDown } from 'lucide-react'

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
    category: "Key Channels",
    icon: MessageSquare,
    items: [
      { command: "#codename-request", description: "Submit codename for approval" },
      { command: "#promotion-request", description: "Request rank promotions" },
      { command: "#point-request", description: "Request points for activities" },
      { command: "#hierarchy-and-promotions", description: "View rank requirements" },
    ],
  },
]

export default function QuickReference() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Essential Commands'])
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  
  const toggleAll = () => {
    if (expandedCategories.length === QUICK_REFERENCE_DATA.length) {
      setExpandedCategories([])
    } else {
      setExpandedCategories(QUICK_REFERENCE_DATA.map(c => c.category))
    }
  }
  
  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-border/30">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="relative">
            <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-3 rounded-xl border border-accent/30 shadow-sm">
              <BookOpen className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Quick Reference Guide</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Essential commands and shortcuts for your journey</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/25 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-accent-foreground">Active</span>
          </div>
          
          {/* Expand/Collapse All */}
          <button 
            onClick={toggleAll}
            className="text-xs font-medium px-3 py-1.5 bg-secondary/15 border border-secondary/25 rounded-full text-secondary-foreground hover:bg-secondary/25 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
          >
            {expandedCategories.length === QUICK_REFERENCE_DATA.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {QUICK_REFERENCE_DATA.map((category) => {
          const CategoryIcon = category.icon
          const isExpanded = expandedCategories.includes(category.category)
          
          return (
            <div
              key={category.category}
              className="relative group/category"
            >
              <div className="relative bg-secondary/25 backdrop-blur-sm border border-border/30 rounded-xl p-4 hover:border-accent/40 transition-all duration-400 ease-out hover:shadow-lg hover:scale-[1.02] hover:bg-secondary/30">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full flex items-center justify-between mb-3 group/header transition-all duration-300 ease-out hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-2.5 rounded-xl border border-accent/25 transition-all duration-300 ease-out group-hover/header:scale-110 group-hover/header:shadow-sm">
                      <CategoryIcon className="h-5 w-5 text-accent-foreground transition-all duration-300 ease-out group-hover/header:drop-shadow-sm" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground group-hover/header:text-accent-foreground transition-all duration-300 ease-out">
                      {category.category}
                    </h4>
                  </div>
                  
                  <div className={`transform transition-all duration-400 ease-out ${isExpanded ? 'rotate-180 scale-110' : 'hover:scale-105'}`}>
                    <ChevronDown className="h-5 w-5 text-accent-foreground transition-all duration-300 ease-out" />
                  </div>
                </button>
                
                {/* Category Items */}
                <div 
                  className={`space-y-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden transform ${
                    isExpanded ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="relative group/item"
                    >
                      <div className="relative bg-secondary/40 border border-border/20 rounded-lg p-4 hover:border-accent/30 transition-all duration-300 ease-out group-hover/item:bg-secondary/50 hover:scale-[1.01] hover:shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 transition-all duration-300 ease-out group-hover/item:scale-125 group-hover/item:shadow-sm group-hover/item:shadow-accent/20"></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-sm text-accent-foreground font-semibold mb-1.5 break-all transition-all duration-300 ease-out group-hover/item:text-accent">
                              {item.command}
                            </div>
                            <div className="text-sm text-muted-foreground leading-relaxed transition-all duration-300 ease-out group-hover/item:text-foreground">
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
      
      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-border/20 text-center">
        <p className="text-sm text-muted-foreground">
          Last updated: July 27, 2025 • All times in UTC
        </p>
      </div>
    </div>
  )
}