'use client'

import { useState, useEffect } from "react"
import { FileText, Copy, Check, Sparkles, User, Zap, Award, ChevronDown, ChevronUp } from "lucide-react"

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
  const [expandedSections, setExpandedSections] = useState({
    formatType: true,
    formFields: true,
    generatedFormat: true,
    tips: true
  })

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
      await new Promise((resolve) => setTimeout(resolve, 500))
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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-background/95 to-muted/90 border border-border rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:border-accent/50">
        {/* Subtle decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-accent/40 rounded-full z-0"></div>
        <div className="absolute top-6 right-8 w-1 h-1 bg-accent/30 rounded-full z-0"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-accent/35 rounded-full z-0"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-border/30">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="relative">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-3 rounded-xl border border-accent/30 shadow-sm">
                  <FileText className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Format Generator</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Create professional Discord formats with ease</p>
              </div>
            </div>
          
            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/25 rounded-full">
                <div className={`w-2 h-2 rounded-full ${
                  completionPercentage === 100 
                    ? "bg-green-400 animate-pulse" 
                    : completionPercentage > 0 
                    ? "bg-yellow-400 animate-pulse" 
                    : "bg-accent/50"
                }`}></div>
                <span className="text-xs font-medium text-accent-foreground">
                  {completionPercentage === 100 ? "Ready" : "In Progress"}
                </span>
              </div>
              
              {/* Progress Circle */}
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 50 50">
                  <circle
                    cx="25"
                    cy="25"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-accent/20"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 18}`}
                    strokeDashoffset={`${2 * Math.PI * 18 * (1 - completionPercentage / 100)}`}
                    className="text-accent transition-all duration-700 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">
                    {Math.round(completionPercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

        <div className="space-y-6">
          {/* Format Type Selection */}
          <div className="relative bg-gradient-to-br from-secondary/90 via-secondary to-secondary/90 border border-border/30 rounded-2xl overflow-hidden shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-60"></div>
            <div className="absolute top-6 right-8 w-1 h-1 bg-accent rounded-full opacity-40"></div>
            
            <button 
              onClick={() => toggleSection('formatType')}
              className="w-full flex items-center justify-between p-6 bg-transparent hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-accent via-yellow-400 to-accent rounded-full shadow-lg shadow-accent/20"></div>
                <h2 className="text-xl font-bold text-foreground">Choose Format Type</h2>
              </div>
              {expandedSections.formatType ? 
                <ChevronUp className="text-accent-foreground w-5 h-5" /> : 
                <ChevronDown className="text-accent-foreground w-5 h-5" />
              }
            </button>
            
            {expandedSections.formatType && (
              <div className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formatLabels).map(([value, label]) => {
                    const Icon = formatIcons[value as FormatType]
                    const isSelected = selectedFormat === value
                    return (
                      <button
                        key={value}
                        onClick={() => {
                          setSelectedFormat(value as FormatType)
                          setFormData({})
                        }}
                        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                          isSelected
                            ? "ring-2 ring-accent/60"
                            : "ring-1 ring-border hover:ring-accent/40"
                        }`}
                      >
                        <div className={`absolute inset-0 transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-br from-accent/15 via-accent/10 to-accent/5"
                            : "bg-background group-hover:bg-muted"
                        }`}></div>
                        
                        <div className="relative p-5 text-left">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg transition-all duration-300 ${
                              isSelected 
                                ? "bg-accent/20" 
                                : "bg-secondary/30"
                            }`}>
                              <Icon
                                className={`h-5 w-5 transition-all duration-300 ${
                                  isSelected 
                                  ? "text-accent-foreground" 
                                  : "text-accent-foreground"
                                }`}
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h5 className={`font-semibold text-base mb-1 transition-all duration-300 ${
                                isSelected 
                                  ? "text-accent-foreground" 
                                  : "text-foreground"
                              }`}>
                                {label}
                              </h5>
                              <p className={`text-sm transition-all duration-300 ${
                                isSelected 
                                  ? "text-accent-foreground/80" 
                                  : "text-muted-foreground"
                              }`}>
                                {FORMAT_DESCRIPTIONS[value as FormatType]}
                              </p>
                            </div>
                            
                            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              isSelected 
                                ? "bg-accent" 
                                : "bg-secondary"
                            }`}></div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="relative bg-gradient-to-br from-secondary/90 via-secondary to-secondary/90 border border-border/30 rounded-2xl overflow-hidden shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-60"></div>
            <div className="absolute top-6 right-8 w-1 h-1 bg-accent rounded-full opacity-40"></div>
            
            <button 
              onClick={() => toggleSection('formFields')}
              className="w-full flex items-center justify-between p-6 bg-transparent hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-accent via-yellow-400 to-accent rounded-full shadow-lg shadow-accent/20"></div>
                <h2 className="text-xl font-bold text-foreground">Fill Information</h2>
              </div>
              {expandedSections.formFields ? 
                <ChevronUp className="text-accent-foreground w-5 h-5" /> : 
                <ChevronDown className="text-accent-foreground w-5 h-5" />
              }
            </button>
            
            {expandedSections.formFields && (
              <div className="p-6 pt-0">
                <div className="space-y-5">
                  {selectedFormat === "codename" && (
                    <>
                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Discord Username <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.discordUsername || ""}
                            onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                            placeholder="Enter your Discord username"
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Roblox Username <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.robloxUsername || ""}
                            onChange={(e) => setFormData({ ...formData, robloxUsername: e.target.value })}
                            placeholder="Enter your Roblox username"
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Desired Codename <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.codename || ""}
                            onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                            placeholder="Enter your desired codename"
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {selectedFormat === "promotion" && (
                    <>
                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Discord Username <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.discordUsername || ""}
                          onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                          placeholder="Enter your Discord username"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Time <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.division || ""}
                          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                          placeholder="Enter your division"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Current Rank <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.rank || ""}
                          onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                          placeholder="Enter your current rank"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Points <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.currentPoints || ""}
                          onChange={(e) => setFormData({ ...formData, currentPoints: e.target.value })}
                          placeholder="Enter your current points"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Rank <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.rankRequest || ""}
                          onChange={(e) => setFormData({ ...formData, rankRequest: e.target.value })}
                          placeholder="Enter requested rank"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Ping
                        </label>
                        <input
                          type="text"
                          value={formData.ping || ""}
                          onChange={(e) => setFormData({ ...formData, ping: e.target.value })}
                          placeholder="Enter ping (optional)"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>
                    </>
                  )}

                  {selectedFormat === "shift-log" && (
                    <>
                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Codename <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.codename || ""}
                          onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                          placeholder="Enter your codename"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Current Rank <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.currentRank || ""}
                          onChange={(e) => setFormData({ ...formData, currentRank: e.target.value })}
                          placeholder="Enter your current rank"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Reason <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.division || ""}
                          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                          placeholder="Enter your division"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Tasks/Notes <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.time || ""}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          placeholder="Enter shift time"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Reason for Promotion <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          value={formData.tasks || ""}
                          onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
                          placeholder="Enter tasks and notes"
                          rows={3}
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 resize-none"
                        />
                      </div>
                    </>
                  )}

                  {selectedFormat === "point-request" && (
                    <>
                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Discord Username <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.discordUsername || ""}
                          onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                          placeholder="Enter your Discord username"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Division <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.division || ""}
                          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                          placeholder="Enter your division"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Desired Rank <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.rank || ""}
                          onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                          placeholder="Enter your next rank"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Points Requested <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.pointsRequested || ""}
                          onChange={(e) => setFormData({ ...formData, pointsRequested: e.target.value })}
                          placeholder="Enter points needed for next rank"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Shift Log Link <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.shiftLogLink || ""}
                          onChange={(e) => setFormData({ ...formData, shiftLogLink: e.target.value })}
                          placeholder="Enter shift log link"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-accent-foreground mb-2">
                          Ping
                        </label>
                        <input
                          type="text"
                          value={formData.ping || ""}
                          onChange={(e) => setFormData({ ...formData, ping: e.target.value })}
                          placeholder="Enter ping (optional)"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Generated Format Display */}
          <div className="relative bg-gradient-to-br from-secondary/90 via-secondary to-secondary/90 border border-border/30 rounded-2xl overflow-hidden shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-60"></div>
            <div className="absolute top-6 right-8 w-1 h-1 bg-accent rounded-full opacity-40"></div>
            
            <button 
              onClick={() => toggleSection('generatedFormat')}
              className="w-full flex items-center justify-between p-6 bg-transparent hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-accent via-yellow-400 to-accent rounded-full shadow-lg shadow-accent/20"></div>
                <h2 className="text-xl font-bold text-foreground">Generated Format</h2>
              </div>
              {expandedSections.generatedFormat ? 
                <ChevronUp className="text-accent-foreground w-5 h-5" /> : 
                <ChevronDown className="text-accent-foreground w-5 h-5" />
              }
            </button>
            
            {expandedSections.generatedFormat && (
              <div className="p-6 pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <p className="text-muted-foreground text-sm mb-2 sm:mb-0">
                    Copy this format to your clipboard
                  </p>
                  
                  <button
                    onClick={copyToClipboard}
                    disabled={!isComplete || isGenerating}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                      isComplete && !isGenerating
                        ? "bg-gradient-to-r from-accent to-yellow-500 text-accent-foreground hover:shadow-lg hover:shadow-accent/30"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <div className="relative">
                      {isGenerating ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </div>
                    <span>
                      {isGenerating ? "Generating..." : copied ? "Copied!" : "Copy Format"}
                    </span>
                  </button>
                </div>
                
                <div className="bg-muted border border-border rounded-xl p-5">
                  <pre className="text-sm text-foreground font-mono whitespace-pre-wrap overflow-x-auto">
                    {generateFormat()}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Helpful Tips */}
          <div className="relative bg-gradient-to-br from-secondary/90 via-secondary to-secondary/90 border border-border/30 rounded-2xl overflow-hidden shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute top-6 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
            
            <button 
              onClick={() => toggleSection('tips')}
              className="w-full flex items-center justify-between p-6 bg-transparent hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-400 via-accent to-blue-400 rounded-full shadow-lg shadow-blue-400/20"></div>
                <h2 className="text-xl font-bold text-foreground">Helpful Tips</h2>
              </div>
              {expandedSections.tips ? 
                <ChevronUp className="text-accent-foreground w-5 h-5" /> : 
                <ChevronDown className="text-accent-foreground w-5 h-5" />
              }
            </button>
            
            {expandedSections.tips && (
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Don't include the @ symbol when entering usernames - it will be added automatically
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                        Make sure all required fields are filled before copying the format
                      </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                        Double-check your information for accuracy before submitting
                      </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}