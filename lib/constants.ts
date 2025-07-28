import React from "react"
import type { HandbookSection } from "./types"
import {
  PartyPopper,
  Target,
  Lock,
  BarChart,
  Handshake,
  ClipboardList,
  Smartphone,
  Keyboard,
  Bot,
  Link,
  Timer,
  CheckCircle,
  PartyPopper as Confetti,
  AlertTriangle,
  Theater,
  Tag,
  UserSearch,
  Shield,
  Star,
  MapPin,
  MessageSquare,
  Clock,
  Pencil,
  FileText,
  Zap,
  FlaskConical,
  Gem,
  Bolt,
  StarIcon,
  Briefcase,
  XCircle,
  Search,
  Ruler,
  Ban,
  Microscope,
  Crown,
  Users,
  TrendingUp,
  Calculator,
  Wand2,
  Truck,
  Laptop,
  Palette,
  Scroll,
  Calendar,
  Camera,
  Trophy,
  MessageCircle,
  Globe,
  BookOpen,
  Wrench,
  Gamepad2,
  Pizza,
  Tv,
  Music,
  Flame,
  Rocket,
  LifeBuoy,
  Lightbulb,
  Brain,
  Dumbbell,
  Flag,
  Puzzle,
  Key,
  Compass,
  Dna,
  FireExtinguisher,
  Paperclip,
  ShoppingBasket,
  PaintRoller,
  Receipt,
  Eye,
  Circle,
  User,
  Pen,
  Paintbrush,
  Monitor,
  Printer,
  Mouse,
  Image,
  Folder,
  Archive,
  FileBox,
  Trash,
  List,
  Grip,
  Newspaper,
  Mic,
  Vote,
  Map,
  Mountain,
  Radio,
  Building,
  Medal,
  Check,
  Upload,
  UsersIcon,
  BookIcon,
  Tent,
  Square,
  File,
  Phone,
  RotateCcw,
  HelpCircle,
  Sparkles,
  MessageSquareIcon,
  MusicIcon,
  Megaphone,
  DollarSign,
  UserCheck,
  BellOff,
  Swords,
  Siren,
  Award,
  StopCircle,
  ShieldCheck,
  Book,
  GraduationCap,
  Plane
} from "lucide-react"

// Icon mapping for text replacement
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "celebration": PartyPopper,
  "game-controller": Gamepad2,
  "lock": Lock,
  "bar-chart": BarChart,
  "target": Target,
  "handshake": Handshake,
  "clipboard": ClipboardList,
  "mobile-device": Smartphone,
  "keyboard": Keyboard,
  "robot": Bot,
  "link": Link,
  "stopwatch": Timer,
  "check-circle": CheckCircle,
  "confetti": Confetti,
  "warning": AlertTriangle,
  "theater-masks": Theater,
  "tag": Tag,
  "detective": UserSearch,
  "shield": Shield,
  "star": Star,
  "pin": MapPin,
  "thought-bubble": MessageSquare,
  "alarm-clock": Clock,
  "pencil": Pencil,
  "close-circle": XCircle,
  "search": Search,
  "ruler": Ruler,
  "no-symbol": Ban,
  "briefcase": Briefcase,
  "fire": Flame,
  "microscope": Microscope,
  "gem": Gem,
  "bolt": Bolt,
  "star-outline": StarIcon,
  "sunglasses": Eye,
  "lightbulb": Lightbulb,
  "crown": Crown,
  "users": Users,
  "trending-up": TrendingUp,
  "calculator": Calculator,
  "wand": Wand2,
  "truck": Truck,
  "laptop": Laptop,
  "palette": Palette,
  "scroll": Scroll,
  "calendar": Calendar,
  "camera": Camera,
  "trophy": Trophy,
  "message-circle": MessageCircle,
  "globe": Globe,
  "book-open": BookOpen,
  "wrench": Wrench,
  "gamepad": Gamepad2,
  "pizza": Pizza,
  "tv": Tv,
  "music": Music,
  "flame": Flame,
  "rocket": Rocket,
  "life-buoy": LifeBuoy,
  "life-ring": LifeBuoy,
  "brain": Brain,
  "dumbbell": Dumbbell,
  "flag": Flag,
  "puzzle": Puzzle,
  "key": Key,
  "compass": Compass,
  "dna": Dna,
  "fire-extinguisher": FireExtinguisher,
  "bottle": Globe,
  "paperclip": Paperclip,
  "broom": Wrench,
  "basket": ShoppingBasket,
  "roller": PaintRoller,
  "soap": Wrench,
  "sponge": Wrench,
  "receipt": Receipt,
  "eye": Eye,
  "candle": Flame,
  "circle": Circle,
  "user": User,
  "spider": User,
  "pen": Pen,
  "paintbrush": Paintbrush,
  "monitor": Monitor,
  "printer": Printer,
  "mouse": Mouse,
  "image": Image,
  "folder": Folder,
  "archive": Archive,
  "file-box": FileBox,
  "trash": Trash,
  "list": List,
  "grip": Grip,
  "newspaper": Newspaper,
  "mic": Mic,
  "vote": Vote,
  "map": Map,
  "mountain": Mountain,
  "radio": Radio,
  "building": Building,
  "medal": Medal,
  "check": Check,
  "upload": Upload,
  "group": UsersIcon,
  "books": BookIcon,
  "circus-tent": Tent,
  "stop": StopCircle,
  "document": File,
  "phone": Phone,
  "refresh": RotateCcw,
  "question-mark-circle": HelpCircle,
  "sparkles": Sparkles,
  "chat": MessageSquareIcon,
  "music-note": MusicIcon,
  "megaphone": Megaphone,
  "money-bill": DollarSign,
  "lock-person": UserCheck,
  "bell-off": BellOff,
  "swords": Swords,
  "siren": Siren,
  "analytics": TrendingUp,
  "leaderboards": Award,
  "shield-check": ShieldCheck,
  "book": Book,
  "graduation-cap": GraduationCap,
  "helicopter": Plane
}

// Helper function to replace [icon:name] with JSX icon components
export const replaceIconPlaceholders = (text: string): (string | React.ReactElement)[] => {
  // Icon-specific colors based on their semantic meaning
  const iconColors: Record<string, string> = {
    "celebration": "text-yellow-500 hover:text-yellow-600", // Party/celebration - yellow
    "game-controller": "text-purple-500 hover:text-purple-600", // Gaming - purple
    "lock": "text-gray-600 hover:text-gray-700", // Security - gray
    "bar-chart": "text-blue-500 hover:text-blue-600", // Data/analytics - blue
    "target": "text-red-500 hover:text-red-600", // Goals/targets - red
    "handshake": "text-orange-500 hover:text-orange-600", // Partnership - orange
    "clipboard": "text-slate-600 hover:text-slate-700", // Documents - slate
    "mobile-device": "text-indigo-500 hover:text-indigo-600", // Technology - indigo
    "keyboard": "text-gray-700 hover:text-gray-800", // Input device - gray
    "robot": "text-cyan-500 hover:text-cyan-600", // AI/automation - cyan
    "link": "text-blue-600 hover:text-blue-700", // Links - blue
    "stopwatch": "text-green-600 hover:text-green-700", // Time - green
    "check-circle": "text-green-500 hover:text-green-600", // Success - green
    "confetti": "text-pink-500 hover:text-pink-600", // Celebration - pink
    "warning": "text-amber-500 hover:text-amber-600", // Warning - amber
    "theater-masks": "text-purple-600 hover:text-purple-700", // Entertainment - purple
    "tag": "text-teal-500 hover:text-teal-600", // Labels - teal
    "detective": "text-amber-700 hover:text-amber-800", // Investigation - amber
    "shield": "text-blue-700 hover:text-blue-800", // Protection - blue
    "star": "text-yellow-400 hover:text-yellow-500", // Achievement - yellow
    "pin": "text-red-600 hover:text-red-700", // Location - red
    "thought-bubble": "text-sky-500 hover:text-sky-600", // Ideas - sky blue
    "alarm-clock": "text-orange-600 hover:text-orange-700", // Time/urgency - orange
    "pencil": "text-gray-500 hover:text-gray-600", // Writing - gray
    "close-circle": "text-red-500 hover:text-red-600", // Error/close - red
    "search": "text-slate-500 hover:text-slate-600", // Search - slate
    "ruler": "text-gray-600 hover:text-gray-700", // Measurement - gray
    "no-symbol": "text-red-600 hover:text-red-700", // Prohibition - red
    "briefcase": "text-brown-600 hover:text-brown-700", // Business - brown
    "fire": "text-red-500 hover:text-red-600", // Fire - red
    "microscope": "text-emerald-600 hover:text-emerald-700", // Science - emerald
    "gem": "text-purple-400 hover:text-purple-500", // Precious - purple
    "bolt": "text-yellow-500 hover:text-yellow-600", // Energy - yellow
    "star-outline": "text-yellow-300 hover:text-yellow-400", // Rating - yellow
    "sunglasses": "text-gray-800 hover:text-gray-900", // Cool/style - dark gray
    "lightbulb": "text-yellow-400 hover:text-yellow-500", // Ideas - yellow
    "crown": "text-yellow-600 hover:text-yellow-700", // Royalty - gold
    "users": "text-blue-600 hover:text-blue-700", // People - blue
    "trending-up": "text-green-500 hover:text-green-600", // Growth - green
    "calculator": "text-gray-600 hover:text-gray-700", // Math - gray
    "wand": "text-purple-500 hover:text-purple-600", // Magic - purple
    "truck": "text-blue-800 hover:text-blue-900", // Transport - blue
    "laptop": "text-slate-700 hover:text-slate-800", // Technology - slate
    "palette": "text-pink-500 hover:text-pink-600", // Art - pink
    "scroll": "text-amber-600 hover:text-amber-700", // Documents - amber
    "calendar": "text-blue-500 hover:text-blue-600", // Time - blue
    "camera": "text-gray-700 hover:text-gray-800", // Photography - gray
    "trophy": "text-yellow-500 hover:text-yellow-600", // Achievement - gold
    "message-circle": "text-blue-500 hover:text-blue-600", // Communication - blue
    "globe": "text-green-600 hover:text-green-700", // World - green
    "book-open": "text-blue-700 hover:text-blue-800", // Knowledge - blue
    "wrench": "text-gray-600 hover:text-gray-700", // Tools - gray
    "gamepad": "text-purple-500 hover:text-purple-600", // Gaming - purple
    "pizza": "text-red-500 hover:text-red-600", // Food - red
    "tv": "text-gray-800 hover:text-gray-900", // Entertainment - gray
    "music": "text-purple-500 hover:text-purple-600", // Audio - purple
    "flame": "text-orange-500 hover:text-orange-600", // Fire - orange
    "rocket": "text-blue-500 hover:text-blue-600", // Space - blue
    "life-buoy": "text-red-500 hover:text-red-600", // Emergency - red
    "brain": "text-pink-500 hover:text-pink-600", // Intelligence - pink
    "dumbbell": "text-gray-700 hover:text-gray-800", // Fitness - gray
    "flag": "text-red-600 hover:text-red-700", // Country/achievement - red
    "puzzle": "text-blue-500 hover:text-blue-600", // Problem solving - blue
    "key": "text-yellow-600 hover:text-yellow-700", // Access - gold
    "compass": "text-red-700 hover:text-red-800", // Navigation - red
    "dna": "text-green-500 hover:text-green-600", // Biology - green
    "fire-extinguisher": "text-red-600 hover:text-red-700", // Safety - red
    "bottle": "text-blue-400 hover:text-blue-500", // Container - blue
    "paperclip": "text-gray-500 hover:text-gray-600", // Office - gray
    "broom": "text-brown-500 hover:text-brown-600", // Cleaning - brown
    "basket": "text-brown-600 hover:text-brown-700", // Storage - brown
    "roller": "text-blue-600 hover:text-blue-700", // Painting - blue
    "soap": "text-blue-300 hover:text-blue-400", // Cleaning - light blue
    "sponge": "text-yellow-400 hover:text-yellow-500", // Cleaning - yellow
    "receipt": "text-gray-600 hover:text-gray-700", // Document - gray
     "eye": "text-blue-600 hover:text-blue-700", // Vision - blue
     "candle": "text-orange-400 hover:text-orange-500", // Light - orange
     "circle": "text-gray-500 hover:text-gray-600", // Shape - gray
     "user": "text-blue-600 hover:text-blue-700", // Person - blue
     "spider": "text-gray-800 hover:text-gray-900", // Creature - dark gray
     "pen": "text-blue-700 hover:text-blue-800", // Writing - blue
     "paintbrush": "text-purple-500 hover:text-purple-600", // Art - purple
     "monitor": "text-gray-700 hover:text-gray-800", // Technology - gray
     "printer": "text-gray-600 hover:text-gray-700", // Office - gray
     "mouse": "text-gray-600 hover:text-gray-700", // Computer - gray
     "image": "text-green-500 hover:text-green-600", // Media - green
     "folder": "text-yellow-600 hover:text-yellow-700", // Storage - yellow
     "archive": "text-brown-600 hover:text-brown-700", // Storage - brown
     "file-box": "text-gray-600 hover:text-gray-700", // Storage - gray
     "trash": "text-red-500 hover:text-red-600", // Delete - red
     "list": "text-slate-600 hover:text-slate-700", // Organization - slate
     "grip": "text-gray-600 hover:text-gray-700", // Handle - gray
     "newspaper": "text-gray-700 hover:text-gray-800", // News - gray
     "mic": "text-red-500 hover:text-red-600", // Audio - red
     "vote": "text-blue-600 hover:text-blue-700", // Democracy - blue
     "map": "text-green-600 hover:text-green-700", // Geography - green
     "mountain": "text-green-700 hover:text-green-800", // Nature - green
     "radio": "text-gray-700 hover:text-gray-800", // Communication - gray
     "building": "text-gray-600 hover:text-gray-700", // Architecture - gray
     "medal": "text-yellow-500 hover:text-yellow-600", // Achievement - gold
     "check": "text-green-500 hover:text-green-600", // Success - green
     "upload": "text-blue-500 hover:text-blue-600", // Action - blue
     "group": "text-blue-600 hover:text-blue-700", // People - blue
     "books": "text-blue-700 hover:text-blue-800", // Knowledge - blue
     "circus-tent": "text-red-500 hover:text-red-600", // Entertainment - red
     "stop": "text-red-600 hover:text-red-700", // Stop action - red
     "document": "text-gray-600 hover:text-gray-700", // File - gray
     "phone": "text-green-600 hover:text-green-700", // Communication - green
     "refresh": "text-blue-500 hover:text-blue-600", // Action - blue
     "question-mark-circle": "text-blue-500 hover:text-blue-600", // Help - blue
     "sparkles": "text-yellow-400 hover:text-yellow-500", // Magic - yellow
     "chat": "text-blue-500 hover:text-blue-600", // Communication - blue
     "music-note": "text-purple-500 hover:text-purple-600", // Audio - purple
     "megaphone": "text-orange-500 hover:text-orange-600", // Announcement - orange
     "money-bill": "text-green-600 hover:text-green-700", // Money - green
     "lock-person": "text-gray-600 hover:text-gray-700", // Security - gray
     "bell-off": "text-gray-500 hover:text-gray-600", // Notification off - gray
     "swords": "text-red-600 hover:text-red-700", // Combat - red
     "siren": "text-red-500 hover:text-red-600", // Emergency - red
     "analytics": "text-blue-500 hover:text-blue-600", // Data - blue
     "leaderboards": "text-yellow-500 hover:text-yellow-600", // Achievement - gold
     "shield-check": "text-green-600 hover:text-green-700", // Security verified - green
     "book": "text-indigo-600 hover:text-indigo-700", // Knowledge - indigo
     "graduation-cap": "text-purple-600 hover:text-purple-700", // Education - purple
     "helicopter": "text-blue-600 hover:text-blue-700" // Aircraft/transport - blue
  }
  
  const parts = text.split(/(\[icon:[^\]]+\])/g)
  return parts.map((part, index) => {
    const iconMatch = part.match(/\[icon:([^\]]+)\]/)
    if (iconMatch) {
      const iconName = iconMatch[1]
      const IconComponent = iconMap[iconName]
      if (IconComponent) {
        const colorClass = iconColors[iconName] || "text-gray-500 hover:text-gray-600" // Default fallback
        return React.createElement(IconComponent, {
          key: index,
          className: `inline-block h-5 w-5 mx-1 align-middle ${colorClass} transition-colors duration-200 drop-shadow-sm`
        })
      }
    }
    return part
  })
}

export const HANDBOOK_SECTIONS: HandbookSection[] = [
  {
    "id": "verification",
    "title": "Verification",
    "content": [
      {
        "type": "text",
        "text": "Hey there, future MC&D employee! [icon:celebration] Welcome to Marshall, Carter, and Darke Ltd. - the most prestigious anomalous corporation in the roleplay universe! Before you can start your exciting journey with us, we need to verify who you are. Think of it as your digital ID card for our fictional corporate empire."
      },
      {
        "type": "heading",
        "text": "Why Do We Need Verification?"
      },
      {
        "type": "text",
        "text": "Great question! Verification helps us:"
      },
      {
        "type": "list",
        "items": [
          "[icon:lock] Keep our Discord server secure from trolls and raiders",
          "[icon:bar-chart] Track your progress and points accurately",
          "[icon:target] Make sure promotions go to the right person",
          "[icon:handshake] Connect your Discord identity with your in-game character",
          "[icon:clipboard] Maintain proper records for our corporate structure"
        ]
      },
      {
        "type": "heading",
        "text": "Step-by-Step Verification Guide"
      },
      {
        "type": "text",
        "text": "Don't worry, it's super easy! Just follow these steps and you'll be verified in no time:"
      },
      {
        "type": "list",
        "items": [
          "[icon:mobile-device] Open Discord and head to the #verify channel",
          "[icon:keyboard] Type the command: /verify",
          "[icon:robot] Bloxlink verification bot will appear with instructions",
          "[icon:link] Follow the instructions on Bloxlink's website to connect your Roblox account",
          "[icon:stopwatch] Wait a few moments while the system processes your verification",
          "[icon:check-circle] Once verified, you'll receive the 'Verified' role automatically",
          "[icon:confetti] Welcome to the team - you're now officially part of MC&D!"
        ]
      },
      {
        "type": "code-block",
        "language": "text",
        "code": "/verify"
      },

      {
        "type": "text",
        "text": "Once you're verified, a whole new world opens up! You'll see all our member channels, can participate in discussions, start earning points, and begin your climb up the corporate ladder. Time to start your MC&D adventure! [icon:theater-masks]"
      }
    ]
  },
  {
    "id": "codenames",
    "title": "Codenames",
    "content": [
      {
        "type": "text",
        "text": "Alright, verified member! [icon:target] Time for one of the coolest parts of joining MC&D - getting your very own codename! Think of it as your secret agent identity for anomalous roleplay adventures. This isn't just a fancy nickname - it's your professional identity that'll stick with you throughout your entire MC&D roleplay journey."
      },

      {
        "type": "heading",
        "text": "Why Do We Use Codenames?"
      },
      {
        "type": "text",
        "text": "Great question! Codenames aren't just for show - they serve important purposes:"
      },
      {
        "type": "list",
        "items": [
          "[icon:detective] Maintain operational security during missions",
          "[icon:theater-masks] Create a professional corporate identity",
          "[icon:clipboard] Standardize communication across all divisions",
          "[icon:shield] Protect your real identity in sensitive operations",
          "[icon:star] Make you feel like the badass roleplay character you are!"
        ]
      },
      {
        "type": "heading",
        "text": "Codename Requirements & Guidelines"
      },
      {
        "type": "text",
        "text": "Before you start brainstorming, here are the rules to keep in mind:"
      },
      {
        "type": "list",
        "items": [
          "[icon:check-circle] Must be professional and workplace-appropriate",
          "No offensive language, slurs, or inappropriate references",
          "Should be unique - we'll check if it's already taken",
          "Keep it short and sweet (1-2 words max, easy to remember)",
          "Can't be real people's names or copyrighted characters",
          "Should sound cool and fit the corporate spy vibe",
          "Think 'professional but mysterious' - you're a roleplay character!"
        ]
      },
      {
        "type": "heading",
        "text": "How to Request Your Codename"
      },
      {
        "type": "text",
        "text": "Ready to become a real MC&D agent? Here's the step-by-step process:"
      },
      {
        "type": "list",
        "items": [
          "Navigate to the #codename-requests channel",
          "Submit your desired codename (maybe have 2-3 backup options!)",
          "[icon:alarm-clock] Wait for staff approval - usually takes less than 24 hours",
          "[icon:check-circle] Once approved, your codename gets added to your Discord nickname",
          "You're now officially part of the MC&D agent roster!"
        ]
      },
      {
        "type": "code-block",
        "language": "text",
        "code": "FORMAT:\nDiscord Username: \nRoblox Username: \nCodename Request: "
      },
      {
        "type": "text",
        "text": "At the end of the verification process (not after codename approval), you'll receive these important roles that unlock your full MC&D experience:"
      },
      {
        "type": "list",
        "items": [
          "[:] MC&D Shareholders [:]",
          "[:] Low Rank [:]",
          "[:] Recruit [:]",
          "[:] Wrecker Division [:]",
          "[:] Current Generation [:]"
        ]
      },
      {
        "type": "text",
        "text": "Remember, your codename represents you as a professional MC&D roleplay character. Make it something you're proud to be called! [icon:sunglasses]"
      }
    ]
  },
  {
    "id": "shift-logging",
    "title": "Self-Deployments and Points",
    "content": [
      {
        "type": "text",
        "text": "Time to talk progression! [icon:target] Welcome to MC&D's point system - this is how we measure your dedication to the roleplay and determine who gets those well-deserved promotions. Think of points as your achievement currency, and self-deployments as your way to earn them. The more you contribute to the roleplay, the higher you climb!"
      },
      {
        "type": "callout",
        "calloutType": "info",
        "text": "Quick Tip: Points aren't just numbers - they represent your dedication, skill, and contribution to the MC&D roleplay experience. Every point gets you closer to that next promotion and higher rank!"
      },
      {
        "type": "heading",
        "text": "What Exactly Are Self-Deployments?"
      },
      {
        "type": "text",
        "text": "Self-deployments are basically your chance to be a solo entrepreneur within MC&D! They're independent missions where YOU take charge:"
      },
      {
        "type": "list",
        "items": [
          "Solo missions that you plan, execute, and complete independently",
          "Perfect opportunity to practice and improve your roleplay skills",
          "[icon:gem] Direct path to earning points for promotions",
          "Build your reputation and prove your worth to leadership",
          "Show initiative and leadership potential",
          "Demonstrate your ability to work without supervision"
        ]
      },
      {
        "type": "heading",
        "text": "Types of Activities That Earn Points"
      },
      {
        "type": "text",
        "text": "Not sure what counts as point-worthy? Here's what MC&D values:"
      },
      {
        "type": "list",
        "items": [
          "[icon:building] Self-deployments (solo RP missions)",
          "[icon:group] Group deployments and operations",
          "Training sessions and workshops"
        ]
      },
      {
        "type": "heading",
        "text": "Step-by-Step Shift Logging Process"
      },
      {
        "type": "text",
        "text": "Ready to log your first shift? Follow this process religiously - it's your ticket to those promotion points!"
      },
      {
        "type": "list",
        "items": [
          "Navigate to the #shift-logs channel",
          "Create a post designated for yourself (name it with your codename in quotes)",
          "[icon:alarm-clock] Use the /shift manage command to start your Trident Timer",
          "Stay productive throughout your shift - live up to MC&D's reputation!",
          "[icon:camera] Take screenshots of your activities as proof",
          "End your shift using /shift manage when you're done",
          "[icon:clipboard] Fill out the shift log format with all required information"
        ]
      },
      {
        "type": "code-block",
        "language": "text",
        "code": "[icon:clipboard] SHIFT LOG FORMAT:\nCodename: [Your MC&D codename]\nCurrent Rank: [Your current rank]\nDivision: [WD/AD]\nTime: [Duration from Trident Timer]\nTasks/Notes: [Detailed description of activities]\nProof: (1+ Screenshots w/ Trident Timer)"
      },
      {
        "type": "heading",
        "text": "Requesting Points for Your Hard Work"
      },
      {
        "type": "text",
        "text": "Logged your shift? Awesome! Now it's time to get those points. Head to the #point-request channel and follow this format:"
      },
      {
        "type": "code-block",
        "language": "text",
        "code": "[icon:clipboard] POINT REQUEST FORMAT:\nUsername: [Your Discord username]\nDivision: [WD/AD]\nRank: [Your current rank]\nPoints Requested: [How many points you're claiming]\nShift Log Link: [Direct link to your specific log message]\nPing: [Tag relevant staff if needed]"
      },
      {
        "type": "text",
        "text": "Pro Tip: For the shift log link, you need the EXACT message link! Hold Shift and right-click on your log message to copy the direct link. This lets staff jump straight to your log for quick verification."
      },
      {
        "type": "callout",
        "calloutType": "info",
        "text": "Always read the pinned messages in #point-request for the latest rules and requirements. These channels have specific guidelines that change occasionally!"
      },
      {
        "type": "heading",
        "text": "Pro Tips for Maximizing Your Points"
      },
      {
        "type": "text",
        "text": "Want to be a point-earning machine? Here are insider secrets:"
      },
      {
        "type": "list",
        "items": [
          "Always take screenshots DURING activities, not after",
          "Be consistent - regular activity earns more than sporadic bursts",
          "[icon:target] Quality over quantity - one great deployment beats five mediocre ones",
          "Write detailed activity descriptions - help staff understand your value",
          "Collaborate with others - group activities often earn bonus points",
          "[icon:trending-up] Track your progress - know how close you are to your next promotion"
        ]
      },
      {
        "type": "text",
        "text": "Remember: Every point you earn is progress in your MC&D roleplay journey. The more effort you put in, the faster you'll climb that corporate ladder! [icon:trophy]"
      }
    ]
  },
  {
    "id": "morphs",
    "title": "Morphs",
    "content": [
      {
        "type": "text",
        "text": "Time to get suited up! Morphs are your professional MC&D appearance on-site - think of them as your corporate uniform that shows everyone you're part of the most prestigious anomalous corporation in the world. [icon:building]"
      },
      {
        "type": "heading",
        "text": "What Are Morphs and Why Do You Need Them?"
      },
      {
        "type": "text",
        "text": "Your morph is more than just a costume - it's your identity within MC&D:"
      },
      {
        "type": "list",
        "items": [
          "Visual representation of your rank and division",
          "Displays your codename and clearance level",
          "[icon:shield] Shows other players you're an official MC&D member",
          "Required for all deployments and on-site activities",
          "Maintains our professional corporate image",
          "Helps with roleplay immersion and authenticity"
        ]
      },
      {
        "type": "callout",
        "calloutType": "info",
        "text": "Think of your morph as your employee ID card, business suit, and security badge all rolled into one!"
      },
      {
        "type": "heading",
        "text": "Step-by-Step Morph Creation Process"
      },
      {
        "type": "text",
        "text": "Ready to create your professional MC&D appearance? Follow these steps carefully - attention to detail matters in our corporation!"
      },
      {
        "type": "list",
        "items": [
          "**Step 1:** Navigate to #morph-formats and locate the LR (Low Rank) Morph format",
          "**Step 2:** Copy the entire LR format - don't miss any commands or formatting",
          "**Step 3:** Go to #morphs-locker and create a new post",
          "**Step 4:** Name your post with your codename in quotes (e.g., \"Phoenix\")",
          "**Step 5:** Paste the LR format into the post details (DON'T SUBMIT YET!)",
          "[icon:user] **Step 6:** Replace every instance of \"user\" with your exact Roblox Username",
          "**Step 7:** Change \"Rank\" in the :permrtag command to \"Recruit\"",
          "**Step 8:** Change \"Codename\" in the :permntag command to your approved codename",
          "[icon:check-circle] **Step 9:** Double-check everything, then submit your post",
          "[icon:stopwatch] **Step 10:** Wait for a HICOM+ member to review and stamp \"Approved\""
        ]
      },
      {
        "type": "callout",
        "calloutType": "warning",
        "text": "Critical: Make sure your Roblox username is spelled EXACTLY as it appears in-game. One typo means your morph won't work!"
      },
      {
        "type": "heading",
        "text": "Getting Morphed On-Site: Your Options"
      },
      {
        "type": "text",
        "text": "Created your morph? Great! Now you need to actually get it applied in-game. You have two main options:"
      },
      {
        "type": "heading",
        "text": "Option 1: MC&D Staff Morphing (Preferred)"
      },
      {
        "type": "text",
        "text": "The fastest and most reliable method:"
      },
      {
        "type": "list",
        "items": [
          "Look for HR+ (High Rank or above) members on-site",
          "Politely ask if they have morphing permissions available",
          "Provide them with your approved morph from #morphs-locker",
          "[icon:bolt] They'll apply your morph instantly - you're ready to deploy!"
        ]
      },
      {
        "type": "heading",
        "text": "Option 2: Site 64 Morpher System (Backup)"
      },
      {
        "type": "text",
        "text": "When no MC&D staff with perms are available:"
      },
      {
        "type": "list",
        "items": [
          "Join the main Site 64 Discord server",
          "Navigate to the #morphs channel",
          "Copy and paste your approved morph format",
          "[icon:radio] In-game, use the communications radio and say \"!morpher\"",
          "Wait patiently - GMT (Game Moderation Team) will respond when available",
          "[icon:helicopter] A staff member will teleport to you and apply your morph"
        ]
      },
      {
        "type": "callout",
        "calloutType": "info",
        "text": "Pro Tip: The morpher system can be busy during peak hours. Try requesting during off-peak times for faster service!"
      },
      {
        "type": "heading",
        "text": "Morph Troubleshooting & Common Issues"
      },
      {
        "type": "text",
        "text": "Running into problems? Here are solutions to common morph issues:"
      },
      {
        "type": "list",
        "items": [
          "[icon:close-circle] **Morph not working:** Check if your Roblox username is spelled correctly",
          "**Long wait times:** Peak hours are busy - try morphing during quieter periods",
          "**Access denied:** Make sure your morph is approved with the green stamp",
          "**Need updates:** Promoted recently? Update your morph with new rank information",
          "[icon:question-mark-circle] **Confused about format:** Ask in #qna for help - we're here to support you!"
        ]
      },
      {
        "type": "text",
        "text": "Once you're morphed and looking sharp in your MC&D uniform, you're officially ready to represent our corporation on-site. Time to show the anomalous world what professional excellence looks like! [icon:briefcase][icon:sparkles]"
      }
    ]
  },
  {
    "id": "hierarchy",
    "title": "Hierarchy and Promotions",
    "content": [
      {
        "type": "text",
        "text": "Welcome to MC&D's corporate ladder! Our hierarchy system is designed to reward dedication, skill, and results. Every rank comes with increased responsibilities, benefits, and prestige within our organization. [icon:building]"
      },
      {
        "type": "heading",
        "text": "Understanding the MC&D Hierarchy"
      },
      {
        "type": "text",
        "text": "MC&D's rank structure reflects our corporate values of excellence and achievement. Each tier represents a significant milestone in your career:"
      },
      {
        "type": "list",
        "items": [
          "[icon:trophy] **Low Ranks (LR)** - Entry-level positions, learning the ropes",
          "[icon:bolt] **Middle Ranks (MR)** - Experienced operatives with leadership potential",
          "[icon:medal] **High Ranks (HR)** - Senior management and specialized experts",
          "[icon:crown] **High Command (HICOM)** - Executive leadership and division heads"
        ]
      },
      {
        "type": "hierarchy-interface"
      },
      {
        "type": "div"
      },

      {
        "type": "heading",
        "text": "High Ranks - 200 HP"
      },
      {
        "type": "list",
        "items": [
          "Commander - 530 points + 10 deployments hosted - HR",
          "General - 480 points - HR",
          "Captain - 430 points + 3 deployments hosted - HR",
          "Colonel - 380 points - HR",
          "Major - 330 points + Pass High Rank Applications - HR"
        ]
      },
      {
        "type": "heading",
        "text": "Middle Ranks - 175 HP"
      },
      {
        "type": "list",
        "items": [
          "Lieutenant - 275 points - MR",
          "Sergeant - 240 points - MR",
          "Corporal - 205 points - MR",
          "Specialist - 170 points - MR",
          "Officer - 135 points + 3 self deployments - MR"
        ]
      },
      {
        "type": "heading",
        "text": "Low Ranks - 150 HP"
      },
      {
        "type": "list",
        "items": [
          "Senior Operative - 100 points - LR",
          "Operative - 75 points - LR",
          "Junior Operative - 50 points + 1 self deployment - LR",
          "Trainee - 25 points - LR",
          "Recruit - Pass Tryout/Application - LR"
        ]
      },
      {
        "type": "callout",
        "calloutType": "warning",
        "text": "Low Ranks may not join the Accounting Division! You must reach Middle Rank or higher with division leader permission."
      },
      {
        "type": "heading",
        "text": "How to Request Promotions: Your Path to Success"
      },
      {
        "type": "text",
        "text": "Ready to climb the corporate ladder? Promotions in MC&D are merit-based and transparent. Here's everything you need to know about advancing your career! [icon:rocket]"
      },
      {
        "type": "heading",
        "text": "Before You Apply: Pre-Promotion Checklist"
      },
      {
        "type": "text",
        "text": "Don't waste time with rejected applications! Make sure you meet ALL requirements:"
      },
      {
        "type": "list",
        "items": [
          "[icon:check] **Point Requirements:** Meet or exceed the minimum points for your desired rank",
          "[icon:check] **Additional Requirements:** Complete any special requirements (self-deployments, applications, etc.)",
          "[icon:check] **Activity Level:** Demonstrate consistent activity and engagement",
          "[icon:check] **Professional Conduct:** Maintain MC&D's standards of excellence",
          "[icon:check] **Documentation:** Have proof ready for all your achievements"
        ]
      },
      {
        "type": "callout",
        "calloutType": "info",
        "text": "Pro Tip: Use the Point Calculator in the Quick Tools section to track your progress toward your next promotion!"
      },
      {
        "type": "heading",
        "text": "Step-by-Step Promotion Request Process"
      },
      {
        "type": "text",
        "text": "Follow this process exactly to ensure your promotion request is processed quickly:"
      },
      {
        "type": "list",
        "items": [
          "[icon:pin] **Step 1:** Navigate to the #promotion-request channel",
          "[icon:clipboard] **Step 2:** Use the Format Generator tool (recommended) or copy the format below",
          "[icon:pencil] **Step 3:** Fill out ALL fields completely and accurately",
          "[icon:paperclip] **Step 4:** Attach proof of additional requirements (screenshots, links, etc.)",
          "[icon:search] **Step 5:** Double-check everything before submitting",
          "[icon:upload] **Step 6:** Submit your request and wait for HICOM+ review",
          "[icon:alarm-clock] **Step 7:** Be patient - reviews typically take 24-48 hours"
        ]
      },
      {
        "type": "heading",
        "text": "Official Promotion Request Format"
      },
      {
        "type": "text",
        "text": "Copy this format exactly and fill in your information:"
      },
      {
        "type": "code-block",
        "language": "text",
        "code": "FORMAT:\nDiscord Username: [Your full Discord username with discriminator]\nRoblox Username: [Your exact Roblox username]\nCodename: [Your approved MC&D codename]\nCurrent Rank: [Your current rank]\nRequested Rank: [The rank you want to be promoted to]\nCurrent Points: [Your total points earned]\nAdditional Requirements Met: [List any special requirements completed]"
      },
      {
        "type": "callout",
        "calloutType": "success",
        "text": "Smart Choice: Use the Format Generator in the Quick Tools section above! It automatically validates your information and ensures proper formatting."
      },
      {
        "type": "heading",
        "text": "What Happens After You Submit?"
      },
      {
        "type": "text",
        "text": "Understanding the review process helps set proper expectations:"
      },
      {
        "type": "list",
        "items": [
          "[icon:eye] **Initial Review:** HICOM+ staff will verify your point total and requirements",
          "[icon:bar-chart] **Background Check:** Your activity level and conduct will be evaluated",
          "[icon:check-circle] **Approval:** If everything checks out, you'll be promoted immediately",
          "[icon:close-circle] **Rejection:** If requirements aren't met, you'll receive feedback on what's needed",
          "[icon:refresh] **Resubmission:** Address any issues and reapply when ready"
        ]
      },
      {
        "type": "callout",
        "calloutType": "warning",
        "text": "Important: Submitting false information or inflated point claims will result in disciplinary action. Always be honest and accurate!"
      },
      {
        "type": "heading",
        "text": "Tips for Successful Promotion Requests"
      },
      {
        "type": "text",
        "text": "Maximize your chances of approval with these insider tips:"
      },
      {
        "type": "list",
        "items": [
          "[icon:camera] **Document Everything:** Keep screenshots of your activities and achievements",
          "[icon:calendar] **Stay Active:** Consistent activity shows dedication and reliability",
          "[icon:handshake] **Be Professional:** Maintain MC&D's standards in all interactions",
          "[icon:trending-up] **Exceed Minimums:** Going above the minimum requirements shows initiative",
          "[icon:chat] **Ask Questions:** Use #qna if you're unsure about any requirements",
          "[icon:alarm-clock] **Time It Right:** Don't rush - make sure you truly meet all criteria"
        ]
      }
    ]
  },
  {
    "id": "channels",
    "title": "Discord Channels Guide",
    "content": [
      {
        "type": "text",
        "text": "Welcome to the MC&D Discord ecosystem! Our channels are carefully organized to create the best experience for all members. Think of this as your roadmap to navigating our corporate headquarters! **This handbook is your most essential resource** - it contains everything you need to know to succeed at MC&D! [icon:building]"
      },
      {
        "type": "callout",
        "calloutType": "info",
        "text": "**ESSENTIAL:** Start with this handbook first! This comprehensive guide contains all the information you need. After reading through this handbook thoroughly, use #qna and #general for additional support. This handbook is your primary learning resource!"
      },
      {
        "type": "heading",
        "text": "[icon:books] Educational & Support Channels"
      },
      {
        "type": "text",
        "text": "Your learning and growth headquarters - everything you need to succeed at MC&D:"
      },
      {
        "type": "list",
        "items": [
          "[icon:books] **<#1235830670123860009>** - This comprehensive interactive handbook for all members (your primary resource!)",
          "[icon:question-mark-circle] **#qna** - Ask questions and get help from staff and experienced members",
          "[icon:clipboard] **#announcements** - Critical MC&D updates, policy changes, and important news",
          "[icon:bar-chart] **#promotion-request** - Submit your promotion applications using the proper format",
          "[icon:target] **<#1376292397859737703>** - Log your on-site activities to earn points and recognition"
        ]
      },
      {
        "type": "callout",
        "calloutType": "success",
        "text": "**Remember:** This handbook should be your first stop for any questions! It's comprehensive and always up-to-date. Use #qna only after consulting this handbook first."
      },
      {
        "type": "heading",
        "text": "[icon:chat] Social & Community Channels"
      },
      {
        "type": "text",
        "text": "Where the MC&D family comes together to connect, share, and have fun:"
      },
      {
        "type": "list",
        "items": [
          "[icon:chat] **#general** - Main chat for casual conversation and daily interactions",
          "[icon:game-controller] **<#1317659188503248937>** - Discuss games, organize gaming sessions, and find gaming buddies",
          "[icon:camera] **#media** - Share screenshots, videos, memes, and creative content",
          "[icon:pizza] **#off-topic** - Random discussions about anything and everything"
        ]
      },
      {
        "type": "heading",
        "text": "[icon:clipboard] Information & Reference Channels"
      },
      {
        "type": "text",
        "text": "Your go-to sources for official information and company knowledge:"
      },
      {
        "type": "list",
        "items": [
          "[icon:scroll] **#rules** - Server rules, guidelines, and the MC&D Constitution",
          "[icon:building] **<#1240841153658491041>** and **<#1270591070878568450>** - MC&D lore, history, and background information"
        ]
      },

      {
        "type": "heading",
        "text": "Channel Etiquette & Best Practices"
      },
      {
        "type": "text",
        "text": "Make the most of our Discord community by following these guidelines:"
      },
      {
        "type": "list",
        "items": [
          "[icon:pin] **Stay On-Topic:** Use channels for their intended purpose",
          "[icon:search] **Search First:** Check pinned messages and recent history before asking questions",
          "[icon:handshake] **Be Respectful:** Maintain MC&D's professional standards in all interactions",
          "[icon:mobile-device] **Use Threads:** For lengthy discussions, create threads to keep channels organized",
          "[icon:bell-off] **Mind Notifications:** Use @here and @everyone sparingly and appropriately",
          "[icon:camera] **Quality Content:** Share relevant, high-quality content that adds value"
        ]
      }
    ]
  },
  {
    "id": "divisions",
    "title": "Divisions",
    "content": [
      {
        "type": "text",
        "text": "MC&D's power lies in specialization! Our divisions are elite units that drive the company's success in different areas. Each division offers unique career paths, exclusive benefits, and specialized training. Ready to find your calling? [icon:rocket]"
      },
      {
        "type": "callout",
        "calloutType": "success",
        "text": "[icon:target] Career Boost: Division membership accelerates promotions, provides exclusive perks, and opens leadership opportunities!"
      },
      {
        "type": "heading",
        "text": "[icon:bolt] Wrecker Division: The Shield of MC&D"
      },
      {
        "type": "text",
        "text": "Are you ready to be MC&D's first line of defense? The Wrecker Division is our elite security force, protecting company assets and ensuring operational safety. If you thrive under pressure and have a warrior's spirit, this is your division! [icon:shield]"
      },
      {
        "type": "heading",
        "text": "What Wreckers Do"
      },
      {
        "type": "list",
        "items": [
          "[icon:swords] **Threat Response:** Neutralize hostile entities and security breaches",
          "[icon:group] **Asset Protection:** Safeguard valuable company resources and personnel",
          "[icon:target] **Special Operations:** Execute high-priority security missions"
        ]
      },
      {
        "type": "heading",
        "text": "Wrecker Benefits & Perks"
      },
      {
        "type": "list",
        "items": [
          "[icon:shield-check] **Exclusive Equipment:** Access to advanced security gear and weapons",
          "[icon:medal] **Combat Training:** Professional development in tactical operations",
          "[icon:handshake] **Brotherhood:** Join an elite team of dedicated professionals"
        ]
      },
      {
        "type": "heading",
        "text": "How to Join the Wreckers"
      },
      {
        "type": "text",
        "text": "The Wrecker Division is the default division of MC&D. Once you join the faction, you are automatically placed into the Wrecker Division!"
      },
      {
        "type": "text",
        "text": "Division Leader: Force Leader \"Moonveil\""
      },
      {
        "type": "heading",
        "text": "[icon:money-bill] Accounting Division: The Financial Powerhouse"
      },
      {
        "type": "text",
        "text": "Numbers don't lie, and neither do profits! The Accounting Division is the financial brain of MC&D, managing our vast wealth and ensuring profitable operations. If you have a head for business and love working with data, welcome to your new home! [icon:bar-chart]"
      },
      {
        "type": "heading",
        "text": "What Accountants Do"
      },
      {
        "type": "list",
        "items": [
          "[icon:money-bill] **Financial Management:** Oversee company budgets and expenditures",
          "[icon:bar-chart] **Profit Analysis:** Analyze business performance and profitability",
          "[icon:briefcase] **Business Strategy:** Develop financial strategies for growth",
          "[icon:handshake] **Negotiation:** Handle business negotiations and deal-making"
        ]
      },
      {
        "type": "heading",
        "text": "Accounting Benefits & Perks"
      },
      {
        "type": "list",
        "items": [
          "[icon:bar-chart] **Business Intelligence:** Access to confidential financial data",
          "[icon:graduation-cap] **Professional Development:** Advanced business and finance training",
          "[icon:money-bill] **Performance Bonuses:** Profit-sharing and achievement incentives",
          "[icon:building] **Corporate Access:** Work closely with high-level executives"
        ]
      },
      {
        "type": "heading",
        "text": "How to Join the Accountants"
      },
      {
        "type": "list",
        "items": [
          "[icon:pencil] **Step 2:** Submit application with relevant experience/skills"
        ]
      },
      {
        "type": "callout",
        "calloutType": "warning",
        "text": "NOTE: Only MR+ may join with the permission of the Division Leader"
      },
      {
        "type": "text",
        "text": "Division Leader: Finance Director \"Singularity\""
      },

    ]
  },
  {
    "id": "conclusion",
    "title": "Final Steps",
    "content": [
      {
        "type": "text",
        "text": "[icon:celebration] Congratulations, future MC&D legend! You've made it through our comprehensive onboarding process and now possess 75% of the knowledge needed to thrive at Marshall, Carter, and Darke Limited. The remaining 25% comes from experience, mentorship, and continued learning! [icon:rocket]"
      },
      {
        "type": "callout",
        "calloutType": "success",
        "text": "[icon:trophy] Achievement Unlocked: MC&D Member! You've joined an elite organization with a legacy of excellence. Welcome to the family!"
      },
      {
        "type": "heading",
        "text": "[icon:clipboard] Final Onboarding Checklist"
      },
      {
        "type": "text",
        "text": "Before you dive into MC&D operations, let's ensure everything is properly set up. Check off each item as you complete it:"
      },
      {
        "type": "list",
        "items": [
          "[icon:check-circle] **Discord Verification Complete** - Used /verify command successfully",
          "[icon:check-circle] **Codename Approved** - Received official MC&D operational codename",
          "[icon:check-circle] **Division Assignment** - Assigned to Wrecker Division (default for new members)",
          "[icon:check-circle] **Channel Access Confirmed** - Can view and participate in appropriate channels",
          "[icon:check-circle] **Point System Mastered** - Understand how to earn and track advancement points",
          "[icon:check-circle] **Shift Logging Learned** - Know how to properly log self-deployments",
          "[icon:check-circle] **First Deployment Ready** - Prepared for your initial on-site operations",
          "[icon:check-circle] **Promotion Path Planned** - Set goals for your first rank advancement",
          "[icon:check-circle] **Community Integrated** - Introduced yourself and started networking"
        ]
      },

      {
        "type": "heading",
        "text": "[icon:life-ring] When You Need Help"
      },
      {
        "type": "text",
        "text": "Remember, asking for help is a sign of wisdom, not weakness. Here's your support network:"
      },
      {
        "type": "list",
        "items": [
          "[icon:question-mark-circle] **#qna Channel:** Your first stop for any questions or concerns",
          "[icon:group] **Mentorship Program:** Connect with experienced members for guidance",
          "[icon:book] **This Handbook:** Your comprehensive reference guide",
          "[icon:building] **HICOM+ Staff:** Leadership team available for serious issues",
          "[icon:handshake] **Peer Support:** Fellow members who've been in your shoes",
          "[icon:clipboard] **Official Documentation:** Company policies and procedures"
        ]
      },
      {
        "type": "callout",
        "calloutType": "warning",
        "text": "[icon:warning] Important Reminder: Always maintain MC&D's professional standards. Your actions reflect on the entire organization!"
      },
      {
        "type": "text",
        "text": "You're now equipped with the knowledge, tools, and support network needed to build an exceptional career at Marshall, Carter, and Darke Limited. The question isn't whether you'll succeed - it's how far you'll go and what legacy you'll leave behind."
      },
      {
        "type": "text",
        "text": "[icon:rocket] **The future of MC&D is in your hands.** Every deployment you log, every relationship you build, and every goal you achieve contributes to our collective success and the continuation of our prestigious legacy."
      },
      {
        "type": "text",
        "text": "[icon:star] **Welcome to Marshall, Carter, and Darke Limited - where profit meets prestige, and legends are born!** Your journey starts now, and the only limit is your ambition! [icon:briefcase][icon:sparkles]"
      },
      {
        "type": "callout",
        "calloutType": "success",
        "text": "[icon:celebration] Welcome to the MC&D family! We're excited to see the incredible impact you'll make. Remember: at Marshall, Carter, and Darke Limited, we don't just do business - we make history! [icon:briefcase][icon:sparkles]"
      },
      {
        "type": "text",
        "text": "**Good luck with your career at Marshall, Carter, and Darke Ltd. - where profit meets prestige, and legends are born!** [icon:star][icon:briefcase]"
      }
    ]
  }
]
