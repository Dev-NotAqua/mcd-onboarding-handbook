"use client"

import {
  Shield,
  Users,
  FileText,
  User,
  Target,
  TrendingUp,
  BookOpen,
  Clock,
  Briefcase,
  Award,
  Globe,
  Gavel,
} from "lucide-react"
import type { HandbookSection } from "@/lib/types"

const sectionIcons = {
  welcome: Shield,
  verification: Users,
  codenames: FileText,
  divisions: Briefcase,
  hierarchy: TrendingUp,
  "shift-logging": Clock,
  points: Target,
  "hierarchy-detailed": Award,
  "divisions-detailed": Briefcase,
  events: Globe,
  clearance: User,
  regulations: Gavel,
  leadership: Award,
  conclusion: BookOpen,
}

interface SidebarProps {
  sections: HandbookSection[]
  activeSection: string
}

export function Sidebar({ sections, activeSection }: SidebarProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-card/95 backdrop-blur-md border-r border-mcd-purple/20 overflow-hidden shadow-xl">
      <div className="h-full flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-mcd-purple/10 bg-gradient-to-br from-mcd-purple/5 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-mcd-purple via-mcd-gold to-mcd-purple rounded-2xl flex items-center justify-center shadow-xl shadow-mcd-purple/20">
                <span className="text-mcd-gold font-bold text-lg">MC&D</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold bg-gradient-to-r from-mcd-purple to-mcd-gold bg-clip-text text-transparent">
                Marshall, Carter & Darke
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Onboarding Handbook</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {sections.map((section, index) => {
            const Icon = sectionIcons[section.id as keyof typeof sectionIcons] || FileText
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-mcd-purple/15 via-mcd-purple/10 to-mcd-purple/5 text-mcd-purple border border-mcd-purple/20 shadow-lg shadow-mcd-purple/5 scale-[1.02]"
                    : "hover:bg-gradient-to-r hover:from-muted/60 hover:to-muted/30 text-muted-foreground hover:text-foreground hover:shadow-md hover:scale-[1.01]"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <Icon
                  className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "text-mcd-purple scale-110 drop-shadow-sm"
                      : "group-hover:text-mcd-purple group-hover:scale-110"
                  }`}
                />
                <span className={`font-medium relative transition-all duration-300 ${isActive ? "font-semibold" : ""}`}>
                  {section.title}
                </span>

                {/* Active indicator */}
                {isActive && <div className="absolute right-4 w-2 h-2 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-full animate-pulse"></div>}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-mcd-purple/10 bg-gradient-to-t from-mcd-purple/5 to-transparent">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Handbook Online</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 Marshall, Carter & Darke Ltd.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
