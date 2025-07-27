"use client"

import { useState, useMemo } from "react"
import { Crown, Star, Shield, Target, TrendingUp, Award, Users, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Rank {
  id: string
  name: string
  points: number
  requirements?: string
  owner?: string
  color: string
  icon: React.ElementType
  level: "executive" | "high" | "middle" | "low"
}

const RANKS: Rank[] = [
  // Executive Command
  { id: "ceo", name: "Company CEO - FL", points: 0, color: "from-purple-500 to-pink-500", icon: Crown, level: "executive", owner: "Marshall" },
  { id: "coo", name: "Company COO - CFL", points: 0, color: "from-purple-400 to-pink-400", icon: Crown, level: "executive", owner: "Carter" },
  { id: "advisor", name: "Company Advisor - FoL", points: 0, color: "from-purple-300 to-pink-300", icon: Crown, level: "executive", owner: "VACANT" },

  // High Command
  { id: "hoo", name: "Head of Operations", points: 0, color: "from-red-500 to-orange-500", icon: Star, level: "high", owner: "Singularity" },
  { id: "fl", name: "Force Leader", points: 0, color: "from-red-400 to-orange-400", icon: Star, level: "high", owner: "Division Leader" },
  { id: "fd", name: "Finance Director", points: 0, color: "from-red-300 to-orange-300", icon: Star, level: "high", owner: "VACANT" },

  // High Ranks
  { id: "hr5", name: "Commander", points: 530, color: "from-orange-500 to-yellow-500", icon: Award, level: "high", requirements: "10 Deployments Hosted" },
  { id: "hr4", name: "General", points: 480, color: "from-orange-400 to-yellow-400", icon: Award, level: "high" },
  { id: "hr3", name: "Colonel", points: 430, color: "from-orange-300 to-yellow-300", icon: Award, level: "high", requirements: "3 Deployments Hosted" },
  { id: "hr2", name: "Major", points: 380, color: "from-yellow-500 to-yellow-400", icon: Shield, level: "high" },
  { id: "hr1", name: "Captain", points: 330, color: "from-yellow-400 to-yellow-300", icon: Shield, level: "high", requirements: "Pass HR Applications" },

  // Middle Ranks
  { id: "mr5", name: "Lieutenant", points: 275, color: "from-blue-500 to-cyan-500", icon: TrendingUp, level: "middle" },
  { id: "mr4", name: "Sergeant", points: 240, color: "from-blue-400 to-cyan-400", icon: TrendingUp, level: "middle" },
  { id: "mr3", name: "Corporal", points: 205, color: "from-blue-300 to-cyan-300", icon: Target, level: "middle" },
  { id: "mr2", name: "Specialist", points: 170, color: "from-cyan-500 to-teal-500", icon: Target, level: "middle" },
  { id: "mr1", name: "Agent", points: 135, color: "from-cyan-400 to-teal-400", icon: Target, level: "middle", requirements: "3 Self Deployments" },

  // Low Ranks
  { id: "lr5", name: "Senior Associate", points: 100, color: "from-green-500 to-emerald-500", icon: Users, level: "low" },
  { id: "lr4", name: "Associate", points: 75, color: "from-green-400 to-emerald-400", icon: Users, level: "low" },
  { id: "lr3", name: "Junior Associate", points: 50, color: "from-green-300 to-emerald-300", icon: Users, level: "low", requirements: "1 Self Deployment" },
  { id: "lr2", name: "Trainee", points: 25, color: "from-emerald-500 to-green-500", icon: Users, level: "low" },
  { id: "lr1", name: "Recruit", points: 0, color: "from-gray-500 to-gray-400", icon: Users, level: "low", requirements: "Pass Tryout" },
];

const LEVEL_COLORS: Record<string, string> = {
  executive: "from-purple-900/20 to-pink-900/20 border-purple-500/30",
  high: "from-red-900/20 to-orange-900/20 border-red-500/30",
  middle: "from-blue-900/20 to-cyan-900/20 border-blue-500/30",
  low: "from-green-900/20 to-emerald-900/20 border-green-500/30",
};

const LEVEL_TITLES: Record<string, string> = {
  executive: "Executive Command",
  high: "High Command & High Ranks", 
  middle: "Middle Ranks",
  low: "Low Ranks",
};

const LEVEL_ORDER: Rank['level'][] = ["executive", "high", "middle", "low"];

const HEALTH_POINTS: Record<Rank['level'], string> = {
  executive: "200 HP",
  high: "200 HP",
  middle: "175 HP",
  low: "150 HP"
};

const DIVISION_ACCESS: Record<Rank['level'], string> = {
  executive: "Both Divisions",
  high: "Both Divisions",
  middle: "Both Divisions",
  low: "Wrecker Only"
};

const CAN_RK_AUTHORITY: Record<Rank['level'], string> = {
  executive: "Full Authority",
  high: "Full Authority",
  middle: "Limited",
  low: "Limited"
};

export function HierarchyInterface() {
  const [selectedRank, setSelectedRank] = useState<string | null>(null)
  
  const groupedRanks = useMemo(() => {
    return RANKS.reduce((acc, rank) => {
      if (!acc[rank.level]) acc[rank.level] = [];
      acc[rank.level].push(rank);
      return acc;
    }, {} as Record<string, Rank[]>);
  }, []);

  const toggleRank = (id: string) => {
    setSelectedRank(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-mcd-purple/30 shadow-2xl shadow-mcd-purple/20 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-mcd-purple/30 to-mcd-gold/20 px-6 py-4 border-b border-mcd-purple/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mcd-purple/5 via-transparent to-transparent"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-mcd-purple to-mcd-gold rounded-lg flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl bg-gradient-to-r from-mcd-purple via-mcd-gold to-mcd-purple bg-clip-text text-transparent tracking-tight">
              MC&D Hierarchy System
            </h3>
            <p className="text-gray-300 text-sm mt-1">Rank Structure & Point Requirements</p>
          </div>
        </div>
      </div>

      {/* Enhanced Levels */}
      <div className="p-6 space-y-8">
        {LEVEL_ORDER.map(level => (
          <div 
            key={level} 
            className={`bg-gradient-to-br ${LEVEL_COLORS[level]} rounded-xl border p-5 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-3">
                <div className={`w-3 h-8 rounded-full ${
                  level === "executive" ? "bg-gradient-to-b from-purple-500 to-pink-500" :
                  level === "high" ? "bg-gradient-to-b from-red-500 to-orange-500" :
                  level === "middle" ? "bg-gradient-to-b from-blue-500 to-cyan-500" :
                  "bg-gradient-to-b from-green-500 to-emerald-500"
                }`}></div>
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {LEVEL_TITLES[level]}
                </span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedRanks[level]?.map(rank => (
                  <RankCard 
                    key={rank.id}
                    rank={rank}
                    isSelected={selectedRank === rank.id}
                    onSelect={toggleRank}
                    healthPoints={HEALTH_POINTS[rank.level]}
                    divisionAccess={DIVISION_ACCESS[rank.level]}
                    canRKAuthority={CAN_RK_AUTHORITY[rank.level]}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Footer */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 px-6 py-3 border-t border-gray-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,white/5%,transparent)]"></div>
        <p className="text-gray-400 text-xs text-center relative z-10">
          Click on any rank to view detailed requirements and permissions
        </p>
      </div>
    </div>
  )
}

interface RankCardProps {
  rank: Rank
  isSelected: boolean
  onSelect: (id: string) => void
  healthPoints: string
  divisionAccess: string
  canRKAuthority: string
}

function RankCard({ rank, isSelected, onSelect, healthPoints, divisionAccess, canRKAuthority }: RankCardProps) {
  const Icon = rank.icon as React.ComponentType<{ className?: string }>;
  const contentId = `rank-details-${rank.id}`;
  
  return (
    <div 
      className={`text-left rounded-xl border transition-all duration-300 group overflow-hidden ${
        isSelected
          ? "bg-mcd-purple/10 border-mcd-purple/50 shadow-lg shadow-mcd-purple/20 scale-[1.02]"
          : "bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50 hover:border-gray-500/50 hover:scale-[1.02]"
      }`}
    >
      <button
        onClick={() => onSelect(rank.id)}
        className="w-full p-4 text-left relative"
        aria-expanded={isSelected}
        aria-controls={contentId}
        aria-label={`${rank.name} details`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 bg-gradient-to-br ${rank.color} rounded-lg flex items-center justify-center shadow-lg`}
              aria-hidden="true"
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-white font-bold text-sm truncate tracking-tight">
                {rank.name}
              </h5>
              {rank.points > 0 && (
                <p className="text-gray-400 text-xs truncate mt-1">
                  {rank.points} points required
                </p>
              )}
            </div>
            <motion.div
              animate={{ rotate: isSelected ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronRight
                className="flex-shrink-0 w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* Owner Badge */}
          {rank.owner && (
            <div className="text-xs text-green-300 bg-green-900/30 border border-green-500/30 rounded-full px-3 py-1 mb-2 mt-3 inline-flex items-center gap-1">
              <span className="font-medium">👑 Current:</span> {rank.owner}
            </div>
          )}

          {/* Requirements Badge */}
          {rank.requirements && !isSelected && (
            <div className="text-xs text-blue-300 bg-blue-900/30 border border-blue-500/30 rounded-full px-3 py-1 inline-flex items-center gap-1">
              <span className="font-medium">📋</span> {rank.requirements}
            </div>
          )}
        </div>
      </button>

      {/* Enhanced Expanded Details */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="overflow-hidden"
          >
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-4 pb-4"
            >
              <div className="pt-3 border-t border-gray-600/30 space-y-3">
                {rank.requirements && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-blue-300 bg-blue-900/20 border border-blue-500/30 rounded-lg px-3 py-2"
                  >
                    <span className="font-bold">📋 Requirements:</span> {rank.requirements}
                  </motion.div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <DetailBox title="Health" value={healthPoints} icon="❤️" delay={0.2} />
                  <DetailBox title="Division Access" value={divisionAccess} icon="🏢" delay={0.3} />
                  <DetailBox title="CanRK Authority" value={canRKAuthority} icon="🔑" delay={0.4} />
                  <DetailBox title="Level" value={rank.level.charAt(0).toUpperCase() + rank.level.slice(1)} icon="📊" delay={0.5} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}

function DetailBox({ title, value, icon, delay }: { title: string; value: string; icon: string; delay: number }) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-gray-800/40 rounded-lg p-2 border border-gray-700/50"
    >
      <div className="text-xs text-gray-400 flex items-center gap-1">
        <span>{icon}</span> {title}
      </div>
      <div className="text-white font-medium text-sm mt-1 truncate">
        {value}
      </div>
    </motion.div>
  )
}