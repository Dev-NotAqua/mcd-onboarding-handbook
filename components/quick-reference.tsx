"use client"

import { useState } from "react"
import { BookOpen, Zap, Trophy, MessageSquare, TrendingUp } from "lucide-react"

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

export function QuickReference() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Essential Commands"])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold rounded-lg sm:rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-1000"></div>
      
      <div className="relative bg-gradient-to-br from-card via-card to-mcd-gold/5 rounded-lg sm:rounded-xl border border-mcd-gold/20 p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-mcd-gold/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 bg-mcd-gold/10 rounded-lg flex-shrink-0">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-mcd-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-mcd-gold">Quick Reference</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Essential information at your fingertips</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr flex-1">
            {QUICK_REFERENCE_DATA.map((category, index) => {
              const CategoryIcon = category.icon
              return (
                <div
                  key={category.category}
                  className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg sm:rounded-xl border border-mcd-gold/20 p-4 sm:p-6 hover:shadow-lg hover:shadow-mcd-gold/10 transition-all duration-500 group/card animate-slide-up active:scale-[0.99] flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 sm:p-2 bg-mcd-gold/10 rounded-lg group-hover/card:bg-mcd-gold/20 transition-colors duration-300 flex-shrink-0">
                      <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-mcd-gold group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-mcd-gold group-hover/card:text-glow transition-all duration-300 min-w-0 flex-1">
                      {category.category}
                    </h4>
                  </div>
                   <div className="space-y-2 sm:space-y-3 flex-1">
                     {category.items.map((item, itemIndex) => (
                       <div
                         key={itemIndex}
                         className="bg-background/50 rounded-lg p-3 sm:p-4 border border-mcd-gold/10 hover:border-mcd-gold/30 transition-all duration-300 hover:shadow-md hover:shadow-mcd-gold/5 group/item animate-slide-right active:scale-[0.99]"
                         style={{ animationDelay: `${(index * 100) + (itemIndex * 50)}ms` }}
                       >
                         <div className="font-mono text-xs sm:text-sm text-mcd-gold font-semibold mb-1.5 sm:mb-2 group-hover/item:text-glow transition-all duration-300 break-all">
                           {item.command}
                         </div>
                         <div className="text-xs sm:text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 leading-relaxed">
                           {item.description}
                         </div>
                       </div>
                     ))}
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
