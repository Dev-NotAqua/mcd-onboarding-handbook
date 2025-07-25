"use client"

import { useState, useEffect } from "react"
import { Check, Circle, Trophy, Star, Zap, Sparkles } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  category: "essential" | "intermediate" | "advanced"
}

const ONBOARDING_CHECKLIST: ChecklistItem[] = [
  {
    id: "discord-join",
    title: "Join Discord Server",
    description: "Join the MC&D official Discord server using the invitation link",
    completed: false,
    category: "essential",
  },
  {
    id: "verification",
    title: "Complete Verification",
    description: "Use /verify command in the verification channel",
    completed: false,
    category: "essential",
  },
  {
    id: "codename-request",
    title: "Submit Codename Request",
    description: "Choose and submit your professional codename for approval",
    completed: false,
    category: "essential",
  },
  {
    id: "codename-approval",
    title: "Get Codename Approved",
    description: "Wait for HICOM+ to approve your codename request",
    completed: false,
    category: "essential",
  },
  {
    id: "read-handbook",
    title: "Read Complete Handbook",
    description: "Go through all sections of this onboarding handbook",
    completed: false,
    category: "intermediate",
  },
  {
    id: "understand-points",
    title: "Understand Point System",
    description: "Learn how to earn points through events and self deployments",
    completed: false,
    category: "intermediate",
  },
  {
    id: "first-deployment",
    title: "Attend First Deployment",
    description: "Participate in your first official MC&D deployment",
    completed: false,
    category: "intermediate",
  },
  {
    id: "shift-log",
    title: "Complete First Self Deployment",
    description: "Log your first self deployment using Trident Timer",
    completed: false,
    category: "advanced",
  },
  {
    id: "first-promotion",
    title: "Request First Promotion",
    description: "Accumulate enough points and request your first promotion",
    completed: false,
    category: "advanced",
  },
]

const categoryInfo = {
  essential: {
    icon: Circle,
    color: "text-red-500",
    bg: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
    border: "border-red-200 dark:border-red-800",
    glow: "shadow-red-500/20",
  },
  intermediate: {
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    glow: "shadow-yellow-500/20",
  },
  advanced: {
    icon: Zap,
    color: "text-green-500",
    bg: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
    border: "border-green-200 dark:border-green-800",
    glow: "shadow-green-500/20",
  },
}

export function ProgressTracker() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(ONBOARDING_CHECKLIST)
  const [showCelebration, setShowCelebration] = useState(false)
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem("mcd-progress")
      if (saved) {
        const savedProgress = JSON.parse(saved)
        // Validate saved data structure
        if (Array.isArray(savedProgress) && savedProgress.length === ONBOARDING_CHECKLIST.length) {
          setChecklist(savedProgress)
        }
      }
    } catch (error) {
      console.warn("Failed to load progress from localStorage:", error)
    }
  }, [])

  const toggleItem = (id: string) => {
    const updated = checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    setChecklist(updated)
    
    try {
      localStorage.setItem("mcd-progress", JSON.stringify(updated))
    } catch (error) {
      console.warn("Failed to save progress to localStorage:", error)
    }

    // Check if all items are completed
    const allCompleted = updated.every((item) => item.completed)
    const wasAllCompleted = checklist.every((item) => item.completed)
    
    if (allCompleted && !wasAllCompleted) {
      setShowCelebration(true)
      // Use useEffect to handle timeout cleanup
    }
  }

  const completedCount = checklist.filter((item) => item.completed).length
  const progressPercentage = (completedCount / checklist.length) * 100

  // Handle celebration timeout with proper cleanup
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showCelebration])

  // Animate progress bar
  useEffect(() => {
    if (!mounted) return
    
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage)
    }, 300) // Reduced delay for better UX
    return () => clearTimeout(timer)
  }, [progressPercentage, mounted])

  const getCompletedByCategory = (category: string) => {
    const categoryItems = checklist.filter((item) => item.category === category)
    const completedItems = categoryItems.filter((item) => item.completed)
    return { completed: completedItems.length, total: categoryItems.length }
  }

  return (
    <div className="relative group">
      {/* Animated background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-1000"></div>

      <div className="relative bg-gradient-to-br from-card via-card to-mcd-gold/5 rounded-xl border border-mcd-gold/20 p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="absolute inset-0 bg-gradient-to-r from-mcd-gold/20 via-yellow-400/30 to-mcd-gold/20 animate-pulse z-10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <div className="text-center transform animate-bounce">
              <Trophy className="h-20 w-20 text-mcd-gold mx-auto mb-4 animate-spin" />
              <h3 className="text-3xl font-bold text-mcd-gold mb-2 animate-pulse">🎉 Congratulations! 🎉</h3>
              <p className="text-muted-foreground text-lg">You've completed all onboarding steps!</p>
              <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mt-4 animate-spin" />
            </div>
          </div>
        )}

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-mcd-gold/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-mcd-gold/20 to-yellow-400/20 rounded-xl shadow-lg">
              <Trophy className="h-7 w-7 text-mcd-gold animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent">
                Onboarding Progress
              </h3>
              <p className="text-sm text-muted-foreground">Track your journey to becoming a full MC&D member</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-foreground">Overall Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent">
                  {completedCount}
                </span>
                <span className="text-muted-foreground text-lg">/ {checklist.length}</span>
              </div>
            </div>
            <div className="relative w-full bg-muted rounded-full h-5 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold rounded-full transition-all duration-2000 ease-out shadow-lg relative overflow-hidden"
                style={{ width: `${animatedProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <div className="text-right mt-3">
              <span className="text-lg font-bold bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent">
                {Math.round(animatedProgress)}% Complete
              </span>
            </div>
          </div>

          {/* Category Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(categoryInfo).map(([category, info]) => {
              const { completed, total } = getCompletedByCategory(category)
              const percentage = total > 0 ? (completed / total) * 100 : 0
              const Icon = info.icon

              return (
                <div
                  key={category}
                  className={`p-5 rounded-xl border-2 ${info.bg} ${info.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${info.glow}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-5 w-5 ${info.color} animate-pulse`} />
                    <span className="font-bold capitalize text-foreground text-lg">{category}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3 font-medium">
                    {completed}/{total} completed
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        category === "essential"
                          ? "bg-gradient-to-r from-red-400 to-red-500"
                          : category === "intermediate"
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                            : "bg-gradient-to-r from-green-400 to-green-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Checklist Items */}
          <div className="space-y-6">
            {Object.entries(categoryInfo).map(([category, info]) => {
              const categoryItems = checklist.filter((item) => item.category === category)
              const Icon = info.icon

              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`h-6 w-6 ${info.color} animate-pulse`} />
                    <h4 className="font-bold text-foreground capitalize text-xl">{category} Steps</h4>
                  </div>
                  <div className="space-y-3 ml-9">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`group flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
                          item.completed
                            ? "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800 shadow-lg shadow-green-500/20"
                            : "bg-gradient-to-br from-muted/30 to-muted/50 border-muted hover:border-mcd-gold/50 hover:bg-muted/50 hover:shadow-lg hover:shadow-mcd-gold/10"
                        }`}
                        onClick={() => toggleItem(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleItem(item.id)
                          }
                        }}
                        aria-label={`${item.completed ? 'Mark as incomplete' : 'Mark as complete'}: ${item.title}`}
                      >
                        <div
                          className={`mt-1 rounded-full p-3 transition-all duration-500 ${
                            item.completed
                              ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-110"
                              : "bg-muted-foreground/20 text-muted-foreground group-hover:bg-mcd-gold/20 group-hover:text-mcd-gold group-hover:scale-110 group-hover:shadow-lg"
                          }`}
                          aria-hidden="true"
                        >
                          {item.completed ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <h5
                            className={`font-bold text-lg transition-all duration-300 ${
                              item.completed
                                ? "text-green-800 dark:text-green-200 line-through"
                                : "text-foreground group-hover:text-mcd-gold"
                            }`}
                          >
                            {item.title}
                          </h5>
                          <p
                            className={`text-sm mt-2 transition-all duration-300 leading-relaxed ${
                              item.completed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {completedCount === checklist.length && (
            <div className="mt-8 p-8 bg-gradient-to-r from-mcd-gold/10 via-yellow-400/10 to-mcd-gold/10 border-2 border-mcd-gold/30 rounded-xl text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/10 to-transparent animate-shimmer"></div>
              <Trophy className="h-16 w-16 text-mcd-gold mx-auto mb-6 animate-bounce" />
              <h4 className="text-2xl font-serif font-bold bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent mb-4">
                🎉 Mission Accomplished! 🎉
              </h4>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                You've successfully completed the MC&D onboarding process. Welcome to the company, shareholder!
              </p>
              <div className="text-lg bg-gradient-to-r from-mcd-gold to-yellow-400 bg-clip-text text-transparent font-bold">
                Ready to start earning profits and climbing the ranks! 💰
              </div>
              <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mt-4 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
