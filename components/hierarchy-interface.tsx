"use client"

import { useState } from "react"
import { Crown, Star, Shield, Target, TrendingUp, Award, Users, ChevronRight } from "lucide-react"

interface Rank {
  id: string
  name: string
  points: number
  requirements?: string
  owner?: string
  color: string
  icon: any
  level: "executive" | "high" | "middle" | "low"
}

export function HierarchyInterface() {
  const [selectedRank, setSelectedRank] = useState<string | null>(null)

  const ranks: Rank[] = [
    // Executive Command
    {
      id: "ceo",
      name: "Company CEO - FL",
      points: 0,
      color: "from-purple-500 to-pink-500",
      icon: Crown,
      level: "executive",
      owner: "Marshall",
    },
    {
      id: "coo",
      name: "Company COO - CFL",
      points: 0,
      color: "from-purple-400 to-pink-400",
      icon: Crown,
      level: "executive",
      owner: "Carter",
    },
    {
      id: "advisor",
      name: "Company Advisor - FoL",
      points: 0,
      color: "from-purple-300 to-pink-300",
      icon: Crown,
      level: "executive",
      owner: "Moonveil",
    },

    // High Command
    {
      id: "hoo",
      name: "Head of Operations",
      points: 0,
      color: "from-red-500 to-orange-500",
      icon: Star,
      level: "high",
      owner: "Singularity",
    },
    {
      id: "fl",
      name: "Force Leader",
      points: 0,
      color: "from-red-400 to-orange-400",
      icon: Star,
      level: "high",
      owner: "Division Leader",
    },

    // High Ranks
    {
      id: "hr5",
      name: "Commander",
      points: 530,
      color: "from-orange-500 to-yellow-500",
      icon: Award,
      level: "high",
      requirements: "10 Deployments Hosted",
    },
    { id: "hr4", name: "General", points: 480, color: "from-orange-400 to-yellow-400", icon: Award, level: "high" },
    {
      id: "hr3",
      name: "Colonel",
      points: 430,
      color: "from-orange-300 to-yellow-300",
      icon: Award,
      level: "high",
      requirements: "3 Deployments Hosted",
    },
    { id: "hr2", name: "Major", points: 380, color: "from-yellow-500 to-yellow-400", icon: Shield, level: "high" },
    {
      id: "hr1",
      name: "Captain",
      points: 330,
      color: "from-yellow-400 to-yellow-300",
      icon: Shield,
      level: "high",
      requirements: "Pass HR Applications",
    },

    // Middle Ranks
    {
      id: "mr5",
      name: "Lieutenant",
      points: 275,
      color: "from-blue-500 to-cyan-500",
      icon: TrendingUp,
      level: "middle",
    },
    {
      id: "mr4",
      name: "Sergeant",
      points: 240,
      color: "from-blue-400 to-cyan-400",
      icon: TrendingUp,
      level: "middle",
    },
    { id: "mr3", name: "Corporal", points: 205, color: "from-blue-300 to-cyan-300", icon: Target, level: "middle" },
    { id: "mr2", name: "Specialist", points: 170, color: "from-cyan-500 to-teal-500", icon: Target, level: "middle" },
    {
      id: "mr1",
      name: "Agent",
      points: 135,
      color: "from-cyan-400 to-teal-400",
      icon: Target,
      level: "middle",
      requirements: "3 Self Deployments",
    },

    // Low Ranks
    { id: "lr5", name: "Senior Associate", points: 100, color: "from-green-500 to-emerald-500", icon: Users, level: "low" },
    { id: "lr4", name: "Associate", points: 75, color: "from-green-400 to-emerald-400", icon: Users, level: "low" },
    {
      id: "lr3",
      name: "Junior Associate",
      points: 50,
      color: "from-green-300 to-emerald-300",
      icon: Users,
      level: "low",
      requirements: "1 Self Deployment",
    },
    { id: "lr2", name: "Trainee", points: 25, color: "from-emerald-500 to-green-500", icon: Users, level: "low" },
    {
      id: "lr1",
      name: "Recruit",
      points: 0,
      color: "from-gray-500 to-gray-400",
      icon: Users,
      level: "low",
      requirements: "Pass Tryout",
    },
  ]

  const levelColors: Record<string, string> = {
    executive: "from-purple-900/20 to-pink-900/20 border-purple-500/30",
    high: "from-red-900/20 to-orange-900/20 border-red-500/30",
    middle: "from-blue-900/20 to-cyan-900/20 border-blue-500/30",
    low: "from-green-900/20 to-emerald-900/20 border-green-500/30",
  }

  const levelTitles: Record<string, string> = {
    executive: "Executive Command",
    high: "High Command & High Ranks",
    middle: "Middle Ranks",
    low: "Low Ranks",
  }

  const groupedRanks = ranks.reduce(
    (acc, rank) => {
      if (!acc[rank.level]) acc[rank.level] = []
      acc[rank.level].push(rank)
      return acc
    },
    {} as Record<string, Rank[]>,
  )

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-mcd-gold/30 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-mcd-gold/20 to-yellow-400/20 px-6 py-4 border-b border-mcd-gold/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-mcd-gold to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">MC&D Hierarchy System</h3>
            <p className="text-gray-300 text-sm">Rank Structure & Point Requirements</p>
          </div>
        </div>
      </div>

      {/* Hierarchy Levels */}
      <div className="p-6 space-y-6">
        {(Object.keys(groupedRanks) as Array<keyof typeof groupedRanks>).map((level) => (
          <div key={level} className={`bg-gradient-to-br ${levelColors[level]} rounded-xl border p-4`}>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-mcd-gold to-yellow-400 rounded-full"></div>
              {levelTitles[level]}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {groupedRanks[level].map((rank) => {
                const Icon = rank.icon
                const isSelected = selectedRank === rank.id

                return (
                  <button
                    key={rank.id}
                    onClick={() => setSelectedRank(isSelected ? null : rank.id)}
                    className={`text-left p-4 rounded-lg border transition-all duration-300 group ${
                      isSelected
                        ? "bg-mcd-gold/10 border-mcd-gold/50 shadow-lg scale-105"
                        : "bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50 hover:border-gray-500/50 hover:scale-[1.02]"
                    }`}
                    aria-expanded={isSelected}
                    aria-label={`${rank.name} rank details. ${rank.points} points required. ${rank.owner ? `Owned by ${rank.owner}` : ''} ${rank.requirements ? `Requirements: ${rank.requirements}` : 'No additional requirements'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${rank.color} rounded-lg flex items-center justify-center shadow-lg`}
                        aria-hidden="true"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white font-semibold text-sm">{rank.name}</h5>
                        {rank.points > 0 && <p className="text-gray-400 text-xs">{rank.points} points required</p>}
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isSelected ? "rotate-90" : ""}`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Owner Badge */}
                    {rank.owner && (
                      <div className="text-xs text-green-300 bg-green-900/30 border border-green-500/30 rounded px-2 py-1 mb-2">
                        <span className="font-medium">👑 Current Owner:</span> {rank.owner}
                      </div>
                    )}

                    {/* Requirements Badge */}
                    {rank.requirements && (
                      <div className="text-xs text-blue-300 bg-blue-900/30 border border-blue-500/30 rounded px-2 py-1">
                        <span className="font-medium">📋 Requirements:</span> {rank.requirements}
                      </div>
                    )}

                    {/* Expanded Details */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-gray-600/30 space-y-2 animate-fade-in">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Health Points:</span>
                          <span className="text-white font-mono">
                            {level === "executive"
                              ? "200 HP"
                              : level === "high"
                                ? "200 HP"
                                : level === "middle"
                                  ? "175 HP"
                                  : "150 HP"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Division Access:</span>
                          <span className="text-white">{level === "low" ? "Wrecker Only" : "Both Divisions"}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">CanRK Authority:</span>
                          <span className="text-white">
                            {level === "executive" || level === "high" ? "Full Authority" : "Limited"}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 px-6 py-3 border-t border-gray-700">
        <p className="text-gray-400 text-xs text-center">
          Click on any rank to view detailed requirements and permissions
        </p>
      </div>
    </div>
  )
}
