"use client";

import { useState, useMemo, FC, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Crown,
  Star,
  Shield,
  Target,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  Heart,
  Network,
  Key,
  BarChart,
  ClipboardList,
  User,
  X,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA DEFINITIONS ---

interface Rank {
  id: string;
  name: string;
  points: number;
  requirements?: string;
  owner?: string;
  color: string;
  icon: LucideIcon;
  level: "executive" | "high" | "middle" | "low";
}

const RANKS: Rank[] = [
    // Executive Command
  { id: "ceo", name: "Company CEO - FL", points: 0, color: "from-purple-500 to-pink-500", icon: Crown, level: "executive", owner: "Marshall" },
  { id: "coo", name: "Company COO - CFL", points: 0, color: "from-purple-400 to-pink-400", icon: Crown, level: "executive", owner: "Darke" },
  { id: "advisor", name: "Company Advisor - FoL", points: 0, color: "from-purple-300 to-pink-300", icon: Crown, level: "executive", owner: "VACANT" },

  // High Command
  { id: "fl", name: "Force Leader", points: 0, color: "from-red-400 to-orange-400", icon: Star, level: "high", owner: "Moonveil" },
  { id: "fd", name: "Finance Director", points: 0, color: "from-red-300 to-orange-300", icon: Star, level: "high", owner: "Singularity" },

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
  { id: "mr1", name: "Officer", points: 135, color: "from-cyan-400 to-teal-400", icon: Target, level: "middle", requirements: "3 Self Deployments" },

  // Low Ranks
  { id: "lr5", name: "Senior Operative", points: 100, color: "from-green-500 to-emerald-500", icon: Users, level: "low" },
  { id: "lr4", name: "Operative", points: 75, color: "from-green-400 to-emerald-400", icon: Users, level: "low" },
  { id: "lr3", name: "Junior Operative", points: 50, color: "from-green-300 to-emerald-300", icon: Users, level: "low", requirements: "1 Self Deployment" },
  { id: "lr2", name: "Trainee", points: 25, color: "from-emerald-500 to-green-500", icon: Users, level: "low" },
  { id: "lr1", name: "Recruit", points: 0, color: "from-gray-500 to-gray-400", icon: Users, level: "low", requirements: "Pass Tryout" },
];


interface LevelDetail {
  title: string;
  colors: string;
  icon: LucideIcon;
  health: string;
  division: string;
  canRK: string;
  gradient: string;
}

const LEVEL_DETAILS: Record<Rank["level"], LevelDetail> = {
  executive: {
    title: "Executive Command",
    colors: "from-purple-900/50 to-pink-900/50 border-purple-500/50",
    icon: Crown,
    health: "200 HP",
    division: "All Divisions",
    canRK: "Full Authority",
    gradient: "from-purple-500 to-pink-500",
  },
  high: {
    title: "High Command & High Ranks",
    colors: "from-red-900/50 to-orange-900/50 border-red-500/50",
    icon: Star,
    health: "175 HP",
    division: "All Divisions",
    canRK: "Full Authority",
    gradient: "from-red-500 to-orange-500",
  },
  middle: {
    title: "Middle Ranks",
    colors: "from-blue-900/50 to-cyan-900/50 border-blue-500/50",
    icon: TrendingUp,
    health: "150 HP",
    division: "All Divisions",
    canRK: "Limited Authority",
    gradient: "from-blue-500 to-cyan-500",
  },
  low: {
    title: "Low Ranks",
    colors: "from-green-900/50 to-emerald-900/50 border-green-500/50",
    icon: Users,
    health: "125 HP",
    division: "Wrecker Division Only",
    canRK: "Limited Authority",
    gradient: "from-green-500 to-emerald-500",
  },
};

const LEVEL_ORDER: Rank["level"][] = ["executive", "high", "middle", "low"];

// --- UI & STYLING DEFINITIONS ---
const UIVariants = {
  container: "max-w-7xl mx-auto bg-gray-900 text-white font-sans rounded-3xl overflow-hidden",
  header: "p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 text-center relative overflow-hidden",
  headerTitle: "text-4xl md:text-5xl font-bold tracking-tight",
  headerSubtitle: "text-lg text-gray-400 mt-2 max-w-2xl mx-auto",
  levelWrapper: "p-4 md:p-6 lg:p-8 space-y-8",
  levelCard: "rounded-2xl border p-6 shadow-2xl relative overflow-hidden transition-all duration-300",
  levelTitle: "text-2xl font-bold mb-6 flex items-center gap-4 text-white",
  rankGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  footer: "p-6 bg-gray-900/50 border-t border-gray-700 text-center",
};

// --- MAIN COMPONENT ---

export function HierarchyInterface() {
  // Use a single state for the active rank object
  const [activeRank, setActiveRank] = useState<Rank | null>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveRank(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={UIVariants.container}>
      <header className={UIVariants.header}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-orange-900/10"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={UIVariants.headerTitle}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              MC&D Hierarchy
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={UIVariants.headerSubtitle}
          >
            Explore the complete rank structure, point requirements, and privileges.
          </motion.p>
        </div>
      </header>

      <main className={UIVariants.levelWrapper}>
        {LEVEL_ORDER.map((level, index) => {
          const details = LEVEL_DETAILS[level];
          const ranksInLevel = RANKS.filter(r => r.level === level);

          return (
            <motion.section
              key={level}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${UIVariants.levelCard} ${details.colors}`}
            >
               <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${details.gradient} opacity-50`}></div>
              <h3 className={UIVariants.levelTitle}>
                <details.icon className="w-8 h-8 opacity-80" />
                {details.title}
              </h3>
              <div className={UIVariants.rankGrid}>
                {ranksInLevel.map((rank) => (
                  <RankCard
                    key={rank.id}
                    rank={rank}
                    // Pass the rank object itself to the handler
                    onSelect={() => setActiveRank(rank)}
                  />
                ))}
              </div>
            </motion.section>
          );
        })}
      </main>
      
      {/* Modal is rendered here, outside of the mapping */}
      <AnimatePresence>
        {activeRank && (
          <RankDetailModal 
            rank={activeRank}
            levelDetails={LEVEL_DETAILS[activeRank.level]}
            onClose={() => setActiveRank(null)}
          />
        )}
      </AnimatePresence>

      <footer className={UIVariants.footer}>
        <p className="text-gray-500 text-sm">Select any rank to view its full details.</p>
      </footer>
    </div>
  );
}

// --- CHILD COMPONENTS ---

interface RankCardProps {
  rank: Rank;
  onSelect: () => void;
}

const RankCard: FC<RankCardProps> = ({ rank, onSelect }) => {
  const Icon = rank.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <button
        onClick={onSelect}
        className="w-full p-4 text-left rounded-lg border bg-gray-800/50 backdrop-blur-sm transition-all duration-300 text-white border-gray-700 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${rank.color} shadow-md`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold truncate">{rank.name}</h4>
            {rank.points > 0 && (
              <p className="text-sm text-gray-400">{rank.points} points</p>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </div>
      </button>
    </motion.div>
  );
};


interface RankDetailModalProps {
    rank: Rank;
    levelDetails: LevelDetail;
    onClose: () => void;
}

const RankDetailModal: FC<RankDetailModalProps> = ({ rank, levelDetails, onClose }) => {
  const Icon = rank.icon;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
        className="relative w-full max-w-md bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl p-6"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10">
          <X size={24} />
        </button>
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br ${rank.color} shadow-lg flex-shrink-0`}>
                <Icon className="w-9 h-9 text-white" />
            </div>
            <div className="flex-1 pt-1">
                <h2 className="text-2xl font-bold text-white">{rank.name}</h2>
                <p className="text-gray-400">{rank.points > 0 ? `${rank.points} points` : 'Base Rank'}</p>
            </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          {rank.owner && (
            <DetailBox
              icon={User}
              label="Current Holder"
              value={rank.owner}
              color="text-green-400"
            />
          )}
          {rank.requirements && (
            <DetailBox
              icon={ClipboardList}
              label="Primary Requirement"
              value={rank.requirements}
              color="text-blue-400"
            />
          )}
          
          <div className="pt-3 border-t border-gray-700/50"></div>

          <DetailBox
            icon={Heart}
            label="Health Points"
            value={levelDetails.health}
            color="text-red-400"
          />
          <DetailBox
            icon={Network}
            label="Division Access"
            value={levelDetails.division}
            color="text-cyan-400"
          />
          <DetailBox
            icon={Key}
            label="RK Authority"
            value={levelDetails.canRK}
            color="text-yellow-400"
          />
          <DetailBox
            icon={BarChart}
            label="Rank Level"
            value={rank.level.charAt(0).toUpperCase() + rank.level.slice(1)}
            color="text-indigo-400"
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}

interface DetailBoxProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color?: string;
}

const DetailBox: FC<DetailBoxProps> = ({ icon: Icon, label, value, color = "text-gray-300" }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 flex items-start gap-3">
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color}`} />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        <p className={`font-semibold ${color} break-words`}>{value}</p>
      </div>
    </div>
  );