"use client"

import { useState, useEffect } from "react"
import { Hash, Volume2, Megaphone, Users, ChevronRight, Sparkles } from "lucide-react"

interface DiscordChannel {
  name: string
  type: "text" | "voice" | "announcement"
  link?: string
  description?: string
  memberCount?: number
  isActive?: boolean
  hasNotification?: boolean
}

interface ChannelCategory {
  name: string
  channels: DiscordChannel[]
  collapsed?: boolean
}

const DISCORD_CHANNELS: ChannelCategory[] = [
  {
    name: "DIVISIONS",
    channels: [
      {
        name: "divisions",
        type: "text",
        description: "Division information and recruitment",
        isActive: true,
      },
    ],
  },
  {
    name: "EDUCATIONAL CHANNELS",
    channels: [
      {
        name: "math-class",
        type: "text",
        description: "Learn mathematics with MC&D professionals",
        hasNotification: true,
      },
      {
        name: "count-to-503",
        type: "text",
        description: "Community counting challenge",
      },
      {
        name: "english-class",
        type: "text",
        description: "Professional communication skills",
      },
      {
        name: "karaoke",
        type: "voice",
        description: "Voice channel for entertainment",
        memberCount: 3,
      },
    ],
  },
  {
    name: "ANNOUNCEMENTS",
    channels: [
      {
        name: "announcements",
        type: "announcement",
        description: "Official MC&D company announcements",
        hasNotification: true,
      },
      {
        name: "sub-announcements",
        type: "announcement",
        description: "Secondary announcements and updates",
      },
    ],
  },
  {
    name: "HALL OF SHAME",
    channels: [
      {
        name: "hicom-shitposting",
        type: "text",
        description: "High Command casual discussions",
      },
      {
        name: "memory-lane",
        type: "text",
        description: "Nostalgic MC&D moments",
      },
    ],
  },
  {
    name: "SUPPORT",
    channels: [
      {
        name: "qna",
        type: "text",
        description: "Questions and answers - get help here!",
        hasNotification: true,
      },
    ],
  },
]

const getChannelIcon = (type: string) => {
  switch (type) {
    case "voice":
      return Volume2
    case "announcement":
      return Megaphone
    default:
      return Hash
  }
}

export function EnhancedDiscordInterface() {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null)
  const [pulseEffect, setPulseEffect] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleCategory = (categoryName: string) => {
    const newCollapsed = new Set(collapsedCategories)
    if (newCollapsed.has(categoryName)) {
      newCollapsed.delete(categoryName)
    } else {
      newCollapsed.add(categoryName)
    }
    setCollapsedCategories(newCollapsed)
  }

  return (
    <div className="relative group">
      {/* Animated background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-1000 animate-pulse"></div>

      <div className="relative bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-xl border border-gray-600 shadow-2xl overflow-hidden max-w-sm mx-auto transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
        {/* Discord-like server header */}
        <div className="bg-gradient-to-r from-gray-750 to-gray-800 px-4 py-4 border-b border-gray-600 shadow-lg relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-mcd-gold/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-12 h-12 bg-gradient-to-br from-mcd-gold to-yellow-400 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${pulseEffect ? "scale-110 shadow-xl" : ""}`}
              >
                <span className="text-black font-bold text-sm">MC&D</span>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-base bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Marshall, Carter & Darke
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-xs font-medium">259 members online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Channel categories and list */}
        <div className="bg-gray-900 max-h-80 overflow-y-auto custom-scrollbar">
          {DISCORD_CHANNELS.map((category, categoryIndex) => {
            const isCollapsed = collapsedCategories.has(category.name)
            return (
              <div key={categoryIndex} className="py-1">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-800/50 transition-all duration-300 group/category relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/5 to-transparent transform -translate-x-full group-hover/category:translate-x-full transition-transform duration-1000"></div>

                  <div className={`transform transition-all duration-300 ${isCollapsed ? "rotate-0" : "rotate-90"}`}>
                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover/category:text-mcd-gold" />
                  </div>
                  <span className="text-gray-400 group-hover/category:text-mcd-gold text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
                    {category.name}
                  </span>
                </button>

                {/* Channels in category */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
                  }`}
                >
                  <div className="space-y-0.5 pb-2">
                    {category.channels.map((channel, channelIndex) => {
                      const Icon = getChannelIcon(channel.type)
                      const isHovered = hoveredChannel === `${categoryIndex}-${channelIndex}`

                      return (
                        <div
                          key={channelIndex}
                          onMouseEnter={() => setHoveredChannel(`${categoryIndex}-${channelIndex}`)}
                          onMouseLeave={() => setHoveredChannel(null)}
                          className={`group/channel flex items-center gap-2 px-3 py-2 mx-2 rounded-md transition-all duration-300 relative overflow-hidden transform ${
                            channel.isActive
                              ? "bg-mcd-gold/10 text-mcd-gold border-l-2 border-mcd-gold shadow-lg scale-105"
                              : "hover:bg-gray-700/50 text-gray-300 hover:text-white hover:scale-105"
                          } ${isHovered ? "shadow-lg" : ""}`}
                          title={channel.description}
                        >
                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover/channel:translate-x-full transition-transform duration-700"></div>

                          <Icon
                            className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                              channel.isActive
                                ? "text-mcd-gold animate-pulse"
                                : "text-gray-400 group-hover/channel:text-mcd-gold"
                            } ${isHovered ? "scale-110" : ""}`}
                          />

                          <span className="text-sm font-medium truncate flex-1 relative">{channel.name}</span>

                          {/* Notification badge */}
                          {channel.hasNotification && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                          )}

                          {channel.type === "voice" && (
                            <div className="flex items-center gap-1 bg-gray-800/50 rounded-full px-2 py-1">
                              <Users className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400 text-xs font-medium">{channel.memberCount || 0}</span>
                            </div>
                          )}

                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced footer */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-750 px-4 py-4 border-t border-gray-600 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/10 to-transparent transform -translate-x-full animate-shimmer"></div>

          <div className="relative">
            <p className="text-gray-300 text-xs text-center font-medium leading-relaxed">
              Learn cool stuff and ditch school because MC&D is your school!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
