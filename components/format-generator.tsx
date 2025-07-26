"use client"

import { useState, useEffect } from "react"
import { FileText, Copy, Check, Sparkles, User, Settings, Zap, Award } from "lucide-react"

type FormatType = "codename" | "promotion" | "shift-log" | "point-request"

interface FormatData {
  discordUsername?: string
  robloxUsername?: string
  codename?: string
  division?: string
  rank?: string
  currentPoints?: string
  rankRequest?: string
  ping?: string
  currentRank?: string
  time?: string
  tasks?: string
  pointsRequested?: string
  shiftLogLink?: string
}

const FORMAT_TEMPLATES = {
  codename: `Discord Username: @{discordUsername}
Roblox Username: {robloxUsername}
Codename Request: {codename}`,
  promotion: `Username: @{discordUsername}
Division: {division}
Rank: {rank}
Current Points: {currentPoints}
Rank Request: {rankRequest}
Ping: @{ping}`,
  "shift-log": `Codename: {codename}
Current Rank: {currentRank}
Division: {division}
Time: {time}
Tasks/Notes: {tasks}
Proof: (1+ Screenshots w/ Trident Timer)`,
  "point-request": `Username: @{discordUsername}
Division: {division}
Rank: {rank}
Points Requested: {pointsRequested}
Shift Log Link: {shiftLogLink}
Ping: @{ping}`,
}

const FORMAT_DESCRIPTIONS = {
  codename: "Submit your professional codename for HICOM+ approval",
  promotion: "Request advancement to the next rank in your division",
  "shift-log": "Log your self deployment activities with proper documentation",
  "point-request": "Request points for completed shifts and activities",
}

export function FormatGenerator() {
  const [selectedFormat, setSelectedFormat] = useState<FormatType>("codename")
  const [formData, setFormData] = useState<FormatData>({})
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Clean username function to remove @ if user adds it
  const cleanUsername = (username: string) => {
    return username.replace(/^@+/, "")
  }

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = getRequiredFields()
    const filledFields = requiredFields.filter((field) => formData[field]?.trim())
    const percentage = (filledFields.length / requiredFields.length) * 100
    setCompletionPercentage(percentage)
  }, [formData, selectedFormat])

  const getRequiredFields = (): (keyof FormatData)[] => {
    switch (selectedFormat) {
      case "codename":
        return ["discordUsername", "robloxUsername", "codename"]
      case "promotion":
        return ["discordUsername", "division", "rank", "currentPoints", "rankRequest"]
      case "shift-log":
        return ["codename", "currentRank", "division", "time", "tasks"]
      case "point-request":
        return ["discordUsername", "division", "rank", "pointsRequested", "shiftLogLink"]
      default:
        return []
    }
  }

  const generateFormat = () => {
    let template = FORMAT_TEMPLATES[selectedFormat]
    const processedData = { ...formData }

    // Clean and process usernames
    if (processedData.discordUsername) {
      processedData.discordUsername = cleanUsername(processedData.discordUsername)
    }
    if (processedData.ping) {
      processedData.ping = cleanUsername(processedData.ping)
    }

    Object.entries(processedData).forEach(([key, value]) => {
      if (value?.trim()) {
        template = template.replace(new RegExp(`{${key}}`, "g"), value.trim())
      } else {
        template = template.replace(new RegExp(`{${key}}`, "g"), `[Enter ${key}]`)
      }
    })
    return template
  }

  const copyToClipboard = async () => {
    if (!isComplete) {
      return
    }
    setIsGenerating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Smooth animation
      const formatText = generateFormat()
      await navigator.clipboard.writeText(formatText)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const formatLabels = {
    codename: "Codename Request",
    promotion: "Promotion Request",
    "shift-log": "Shift Log",
    "point-request": "Point Request",
  }

  const formatIcons = {
    codename: User,
    promotion: Award,
    "shift-log": FileText,
    "point-request": Zap,
  }

  const isComplete = completionPercentage === 100

  return (
    <div 
      className="relative h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Header with Progress */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-mcd-gold/15 to-yellow-400/8 rounded-xl border border-mcd-gold/25">
                <FileText className="h-6 w-6 text-mcd-gold" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold bg-clip-text text-transparent">
                Format Generator
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Discord format creation
              </p>
            </div>
          </div>
          
          {/* Progress Circle */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-mcd-gold/20"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionPercentage / 100)}`}
                className="text-mcd-gold transition-all duration-700 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-mcd-gold">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-2 bg-mcd-gold/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center justify-between mt-4 text-xs">
          <span className="text-muted-foreground">
            {completionPercentage === 100 ? "Ready to generate" : "Fill required fields"}
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              completionPercentage === 100 
                ? "bg-green-400 animate-pulse" 
                : completionPercentage > 0 
                ? "bg-yellow-400 animate-pulse" 
                : "bg-mcd-gold/30"
            }`}></div>
            <span className="text-muted-foreground">
              {getRequiredFields().filter(field => formData[field]?.trim()).length} / {getRequiredFields().length} fields
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-8">
        {/* Format Type Selection */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-mcd-gold to-yellow-400 rounded-full"></div>
            <h4 className="text-lg font-semibold text-foreground">Choose Format Type</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formatLabels).map(([value, label]) => {
              const Icon = formatIcons[value as FormatType]
              const isSelected = selectedFormat === value
              return (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedFormat(value as FormatType)
                    setFormData({}) // Reset form data when changing format
                  }}
                  className={`relative group overflow-hidden rounded-2xl transition-all duration-500 transform ${
                    isSelected
                      ? "scale-105 shadow-2xl shadow-mcd-gold/30"
                      : "hover:scale-[1.02] hover:shadow-xl hover:shadow-mcd-gold/20"
                  }`}
                >
                  {/* Background Layers */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isSelected
                      ? "bg-gradient-to-br from-mcd-gold/20 via-yellow-400/15 to-mcd-gold/10"
                      : "bg-gradient-to-br from-background/80 to-muted/40 group-hover:from-mcd-gold/10 group-hover:to-yellow-400/5"
                  }`}></div>
                  
                  {/* Border Glow */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isSelected
                      ? "ring-2 ring-mcd-gold/60 ring-offset-2 ring-offset-background"
                      : "ring-1 ring-muted/30 group-hover:ring-mcd-gold/40"
                  }`}></div>
                  
                  {/* Shimmer Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-700 ${
                    isSelected ? 'animate-shimmer' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  
                  <div className="relative p-6 text-left backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isSelected 
                          ? "bg-mcd-gold/30 shadow-lg ring-2 ring-mcd-gold/40" 
                          : "bg-muted/40 group-hover:bg-mcd-gold/20"
                      }`}>
                        <Icon
                          className={`h-6 w-6 transition-all duration-300 ${
                            isSelected 
                            ? "text-mcd-gold animate-pulse" 
                            : "text-muted-foreground group-hover:text-mcd-gold group-hover:scale-110"
                          }`}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className={`font-semibold text-base mb-2 transition-all duration-300 ${
                          isSelected 
                            ? "text-mcd-gold" 
                            : "text-foreground group-hover:text-mcd-gold"
                        }`}>
                          {label}
                        </h5>
                        <p className={`text-sm leading-relaxed transition-all duration-300 ${
                          isSelected 
                            ? "text-mcd-gold/80" 
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}>
                          {FORMAT_DESCRIPTIONS[value as FormatType]}
                        </p>
                      </div>
                      
                      {/* Selection Indicator */}
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isSelected 
                          ? "bg-mcd-gold shadow-lg shadow-mcd-gold/50 animate-pulse" 
                          : "bg-mcd-gold/40 group-hover:bg-mcd-gold/60"
                      }`}></div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Fields */}
        <div className="relative mb-8">
          <div className="bg-background/60 border border-border/40 rounded-2xl p-6 shadow-md">
            <div className="space-y-6">
              {selectedFormat === "codename" && (
                <>
                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3 group-focus-within:text-mcd-gold transition-colors duration-300">
                      Discord Username <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.discordUsername || ""}
                        onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                        onFocus={() => setFocusedField("discordUsername")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your Discord username"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3 group-focus-within:text-mcd-gold transition-colors duration-300">
                      Roblox Username <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.robloxUsername || ""}
                        onChange={(e) => setFormData({ ...formData, robloxUsername: e.target.value })}
                        onFocus={() => setFocusedField("robloxUsername")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your Roblox username"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3 group-focus-within:text-mcd-gold transition-colors duration-300">
                      Desired Codename <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.codename || ""}
                        onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                        onFocus={() => setFocusedField("codename")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your desired codename"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedFormat === "promotion" && (
                <>
                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Discord Username <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.discordUsername || ""}
                      onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                      placeholder="Enter your Discord username"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Division <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.division || ""}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      placeholder="Enter your division"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Current Rank <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rank || ""}
                      onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                      placeholder="Enter your current rank"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Current Points <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currentPoints || ""}
                      onChange={(e) => setFormData({ ...formData, currentPoints: e.target.value })}
                      placeholder="Enter your current points"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Rank Request <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rankRequest || ""}
                      onChange={(e) => setFormData({ ...formData, rankRequest: e.target.value })}
                      placeholder="Enter requested rank"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Ping
                    </label>
                    <input
                      type="text"
                      value={formData.ping || ""}
                      onChange={(e) => setFormData({ ...formData, ping: e.target.value })}
                      placeholder="Enter ping (optional)"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>
                </>
              )}

              {selectedFormat === "shift-log" && (
                <>
                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Codename <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.codename || ""}
                      onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                      placeholder="Enter your codename"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Current Rank <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currentRank || ""}
                      onChange={(e) => setFormData({ ...formData, currentRank: e.target.value })}
                      placeholder="Enter your current rank"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Division <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.division || ""}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      placeholder="Enter your division"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Time <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.time || ""}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="Enter shift time"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Tasks/Notes <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.tasks || ""}
                      onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
                      placeholder="Enter tasks and notes"
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200 resize-none"
                    />
                  </div>
                </>
              )}

              {selectedFormat === "point-request" && (
                <>
                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Discord Username <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.discordUsername || ""}
                      onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                      placeholder="Enter your Discord username"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Division <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.division || ""}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      placeholder="Enter your division"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Rank <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rank || ""}
                      onChange={(e) => setFormData({ ...formData, nextRank: e.target.value })}
                        placeholder="Enter your next rank"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Points Requested <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pointsRequested || ""}
                      onChange={(e) => setFormData({ ...formData, pointsNeeded: e.target.value })}
                        placeholder="Enter points needed for next rank"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Shift Log Link <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.shiftLogLink || ""}
                      onChange={(e) => setFormData({ ...formData, shiftLogLink: e.target.value })}
                      placeholder="Enter shift log link"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-foreground/90 mb-3">
                      Ping
                    </label>
                    <input
                      type="text"
                      value={formData.ping || ""}
                      onChange={(e) => setFormData({ ...formData, ping: e.target.value })}
                      placeholder="Enter ping (optional)"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-mcd-gold/40 focus:border-mcd-gold/40 transition-all duration-200"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Generated Format Display */}
        <div className="relative">
          <div className="relative bg-background border border-border rounded-3xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-mcd-gold to-yellow-400 rounded-full"></div>
                <h4 className="text-lg font-semibold text-foreground">Generated Format</h4>
              </div>
              
              <button
                onClick={copyToClipboard}
                disabled={!isComplete || isGenerating}
                className={`relative group flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform ${
                  isComplete && !isGenerating
                    ? "bg-gradient-to-r from-mcd-gold to-yellow-400 text-black hover:scale-105 hover:shadow-xl hover:shadow-mcd-gold/30 active:scale-95"
                    : "bg-muted/40 text-muted-foreground cursor-not-allowed"
                }`}
              >
                <div className="relative">
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </div>
                <span>
                  {isGenerating ? "Generating..." : copied ? "Copied!" : "Copy Format"}
                </span>
                
                {isComplete && !isGenerating && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
                )}
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-mcd-gold/5 to-transparent rounded-2xl" />
              <pre className="relative bg-background border border-border rounded-2xl p-6 text-sm text-foreground font-mono whitespace-pre-wrap overflow-x-auto">
                {generateFormat()}
              </pre>
            </div>
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="relative">
          <div className="relative bg-background border border-border rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-mcd-gold rounded-full"></div>
              <h4 className="text-lg font-semibold text-foreground">Helpful Tips</h4>
              <Sparkles className="w-5 h-5 text-mcd-gold animate-pulse" />
            </div>
            
            <div className="grid gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-mcd-gold rounded-full mt-2 flex-shrink-0" />
                <p>Don't include the @ symbol when entering usernames - it will be added automatically</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-mcd-gold rounded-full mt-2 flex-shrink-0" />
                <p>Make sure all required fields are filled before copying the format</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-mcd-gold rounded-full mt-2 flex-shrink-0" />
                <p>Double-check your information for accuracy before submitting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
