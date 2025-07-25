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
    <div className="relative group h-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-mcd-gold via-yellow-400 to-mcd-gold rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-1000"></div>

      <div className="relative bg-gradient-to-br from-card via-card to-mcd-gold/5 rounded-xl border border-mcd-gold/20 p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-mcd-gold/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-mcd-gold/10 rounded-lg">
            <FileText className="h-6 w-6 text-mcd-gold" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-mcd-gold">Format Generator</h3>
            <p className="text-sm text-muted-foreground">Generate properly formatted Discord requests</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
        {/* Format Type Selection */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-4">Select Format Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  className={`relative p-4 rounded-xl border-2 transition-all duration-500 text-left group overflow-hidden ${
                    isSelected
                      ? "border-mcd-gold bg-gradient-to-br from-mcd-gold/20 via-mcd-gold/10 to-yellow-400/10 shadow-lg shadow-mcd-gold/20 scale-105 animate-glow"
                      : "border-muted hover:border-mcd-gold/50 hover:bg-gradient-to-br hover:from-muted/50 hover:to-mcd-gold/5 hover:scale-[1.02] hover:shadow-md"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Select ${FORMAT_DESCRIPTIONS[value as FormatType]} format`}
                >
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-mcd-gold/10 to-transparent transform -skew-x-12 transition-all duration-700 ${
                    isSelected ? 'animate-shimmer' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  <div className="relative flex items-center gap-3 z-10">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isSelected 
                        ? "bg-mcd-gold/20 shadow-lg" 
                        : "bg-muted/30 group-hover:bg-mcd-gold/10"
                    }`}>
                      <Icon
                        className={`h-5 w-5 transition-all duration-300 ${
                          isSelected 
                            ? "text-mcd-gold animate-pulse" 
                            : "text-muted-foreground group-hover:text-mcd-gold group-hover:scale-110"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold transition-all duration-300 ${
                          isSelected 
                            ? "text-mcd-gold text-glow" 
                            : "text-foreground group-hover:text-mcd-gold"
                        }`}
                      >
                        {label}
                      </div>
                      <div className={`text-xs mt-1 transition-colors duration-300 ${
                        isSelected 
                          ? "text-mcd-gold/70" 
                          : "text-muted-foreground group-hover:text-muted-foreground/80"
                      }`}>
                        {FORMAT_DESCRIPTIONS[value as FormatType]}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Completion Progress</span>
            <span className="text-sm text-mcd-gold font-bold">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-mcd-gold to-yellow-400 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5 mb-8">
          {selectedFormat === "codename" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Discord Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mcd-gold font-bold">@</span>
                  <input
                    type="text"
                    placeholder="your_discord_username"
                    value={formData.discordUsername || ""}
                    onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Roblox Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="YourRobloxUsername"
                  value={formData.robloxUsername || ""}
                  onChange={(e) => setFormData({ ...formData, robloxUsername: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Desired Codename <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Professional Codename (e.g., Sterling Broker)"
                  value={formData.codename || ""}
                  onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
              </div>
            </>
          )}

          {selectedFormat === "promotion" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Discord Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mcd-gold font-bold">@</span>
                  <input
                    type="text"
                    placeholder="your_discord_username"
                    value={formData.discordUsername || ""}
                    onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Division <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.division || ""}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 relative z-10"
                >
                  <option value="">Select Division</option>
                  <option value="Wrecker Division">Wrecker Division</option>
                  <option value="Accounting Division">Accounting Division</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Current Rank <span className="text-red-500">*</span>
                  </label>
                  <input
                  type="text"
                  placeholder="e.g., Associate"
                  value={formData.rank || ""}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Current Points <span className="text-red-500">*</span>
                  </label>
                  <input
                  type="number"
                  placeholder="150"
                  value={formData.currentPoints || ""}
                  onChange={(e) => setFormData({ ...formData, currentPoints: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Requested Rank <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior Associate"
                  value={formData.rankRequest || ""}
                  onChange={(e) => setFormData({ ...formData, rankRequest: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Ping (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mcd-gold font-bold">@</span>
                  <input
                    type="text"
                    placeholder="hicom_member (optional)"
                    value={formData.ping || ""}
                    onChange={(e) => setFormData({ ...formData, ping: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
            </>
          )}

          {selectedFormat === "shift-log" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Codename <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your MC&D Codename"
                    value={formData.codename || ""}
                    onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                    className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Current Rank <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 25 Points"
                    value={formData.currentRank || ""}
                    onChange={(e) => setFormData({ ...formData, currentRank: e.target.value })}
                    className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Division <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.division || ""}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 relative z-10"
                  >
                    <option value="">Select Division</option>
                    <option value="Wrecker Division">Wrecker Division</option>
                    <option value="Accounting Division">Accounting Division</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Time Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1 hour 30 minutes"
                    value={formData.time || ""}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Tasks/Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe what you did during your shift..."
                  value={formData.tasks || ""}
                  onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 resize-none placeholder:text-muted-foreground relative z-10"
                />
              </div>
            </>
          )}

          {selectedFormat === "point-request" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Discord Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mcd-gold font-bold">@</span>
                  <input
                    type="text"
                    placeholder="your_discord_username"
                    value={formData.discordUsername || ""}
                    onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Division <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.division || ""}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 relative z-10"
                  >
                    <option value="">Select Division</option>
                    <option value="Wrecker Division">Wrecker Division</option>
                    <option value="Accounting Division">Accounting Division</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Current Rank <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 25 Points"
                    value={formData.rank || ""}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Points Requested <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="9"
                  value={formData.pointsRequested || ""}
                  onChange={(e) => setFormData({ ...formData, pointsRequested: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Shift Log Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://discord.com/channels/..."
                  value={formData.shiftLogLink || ""}
                  onChange={(e) => setFormData({ ...formData, shiftLogLink: e.target.value })}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Ping (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mcd-gold font-bold">@</span>
                  <input
                    type="text"
                    placeholder="hicom_member (optional)"
                    value={formData.ping || ""}
                    onChange={(e) => setFormData({ ...formData, ping: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 bg-background text-foreground border-2 border-border hover:border-mcd-gold/50 focus:border-mcd-gold rounded-xl focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-mcd-gold/20 placeholder:text-muted-foreground relative z-10"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Generated Format Display */}
        <div className="bg-gradient-to-br from-mcd-dark via-gray-900 to-mcd-dark rounded-xl border-2 border-mcd-gold/30 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-mcd-gold/20 to-yellow-400/20 border-b border-mcd-gold/30">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-mcd-gold animate-pulse" />
              <span className="text-sm font-bold text-mcd-gold">Generated Format</span>
            </div>
            <div className="relative">
              <button
                  onClick={copyToClipboard}
                  disabled={!isComplete || isGenerating}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isComplete && !isGenerating
                      ? "bg-mcd-gold hover:bg-yellow-400 text-mcd-dark hover:scale-[1.05] shadow-lg hover:shadow-xl"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  aria-label={copied ? "Format copied to clipboard" : "Copy format to clipboard"}
                >
                {isGenerating ? (
                   <>
                     <div className="w-4 h-4 border-2 border-mcd-dark border-t-transparent rounded-full animate-spin" />
                     Generating...
                   </>
                 ) : copied ? (
                   <>
                     <Check className="h-4 w-4" />
                     Copied!
                   </>
                 ) : (
                   <>
                     <Copy className="h-4 w-4" />
                     Copy Format
                   </>
                 )}
              </button>
              {!isComplete && (
                <div className="absolute -bottom-8 left-0 text-xs text-muted-foreground">
                  Fill all required fields to enable copying
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
            <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap leading-relaxed">
              {generateFormat()}
            </pre>
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Pro Tips
          </h4>
          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
            <li>• Discord usernames are automatically formatted with @ for proper pinging</li>
            <li>• Fill all required fields (marked with *) to enable copying</li>
            <li>• Double-check your information before copying to Discord</li>
            <li>• Use professional language appropriate for MC&D standards</li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  )
}
