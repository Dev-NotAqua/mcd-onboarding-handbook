"use client"

import { Hash, Volume2, Megaphone, Users, MessageSquare } from "lucide-react"

interface DiscordChannel {
  name: string
  type: "text" | "voice" | "announcement"
  link?: string
  description?: string
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
        link: "https://discord.gg/your-server", // Replace with actual Discord invite
        description: "Division information and recruitment",
      },
    ],
  },
  {
    name: "EDUCATIONAL",
    channels: [
      {
        name: "math-class",
        type: "text",
        link: "https://discord.gg/your-server",
        description: "Learn mathematics with MC&D",
      },
      {
        name: "count-to-503",
        type: "text",
        link: "https://discord.gg/your-server",
        description: "Community counting game",
      },
      {
        name: "english-class",
        type: "text",
        link: "https://discord.gg/your-server",
        description: "Improve your English skills",
      },
      {
        name: "karaoke",
        type: "voice",
        link: "https://discord.gg/your-server",
        description: "Voice channel for karaoke sessions",
      },
    ],
  },
  {
    name: "ANNOUNCEMENTS",
    channels: [
      {
        name: "announcements",
        type: "announcement",
        link: "https://discord.gg/your-server",
        description: "Official MC&D announcements",
      },
      {
        name: "sub-announcements",
        type: "announcement",
        link: "https://discord.gg/your-server",
        description: "Secondary announcements",
      },
    ],
  },
  {
    name: "HALL OF SHAME",
    channels: [
      {
        name: "hicom-shitposting",
        type: "text",
        link: "https://discord.gg/your-server",
        description: "High Command casual discussions",
      },
      {
        name: "memory-lane",
        type: "text",
        link: "https://discord.gg/your-server",
        description: "Nostalgic moments and memories",
      },
    ],
  },
  {
    name: "SUPPORT",
    channels: [
      {
        name: "qna",
        type: "text",
        link: "https://discord.gg/your-server",
        description: "Questions and answers",
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

export function DiscordChannels() {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg border border-gray-700 shadow-2xl overflow-hidden max-w-md mx-auto">
      {/* Discord-like header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mcd-gold rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">MC</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Marshall, Carter & Darke</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-xs">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Channel list */}
      <div className="bg-gray-900 max-h-96 overflow-y-auto">
        {DISCORD_CHANNELS.map((category, categoryIndex) => (
          <div key={categoryIndex} className="py-2">
            {/* Category header */}
            <div className="px-3 py-1 flex items-center gap-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{category.name}</span>
            </div>

            {/* Channels in category */}
            <div className="space-y-0.5">
              {category.channels.map((channel, channelIndex) => {
                const Icon = getChannelIcon(channel.type)
                return (
                  <a
                    key={channelIndex}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-1.5 mx-2 rounded hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                    title={channel.description}
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300 flex-shrink-0" />
                    <span className="text-gray-300 group-hover:text-white text-sm font-medium truncate">
                      {channel.name}
                    </span>
                    {channel.type === "voice" && (
                      <div className="ml-auto flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-500 text-xs">0</span>
                      </div>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer with join button */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <a
          href="https://discord.gg/your-server" // Replace with actual Discord invite
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-mcd-gold to-yellow-400 hover:from-yellow-400 hover:to-mcd-gold text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <MessageSquare className="w-4 h-4" />
          Join Discord Server
        </a>
      </div>
    </div>
  )
}
