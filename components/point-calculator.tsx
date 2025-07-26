"use client"

import { useState, useEffect } from "react"
import { Calculator, TrendingUp, Target, Clock, Zap } from "lucide-react"

const RANK_REQUIREMENTS = [
  { name: "Recruit", points: 0, additional: "Pass Tryout", color: "bg-gray-500" },
  { name: "25 Points", points: 25, additional: "", color: "bg-blue-500" },
  { name: "50 Points + 1 Self Deployment", points: 50, additional: "1 Self Deployment", color: "bg-blue-600" },
  { name: "75 Points", points: 75, additional: "", color: "bg-indigo-500" },
  { name: "100 Points", points: 100, additional: "", color: "bg-indigo-600" },
  { name: "135 Points + 3 Self Deployments", points: 135, additional: "3 Self Deployments", color: "bg-purple-500" },
  { name: "170 Points", points: 170, additional: "", color: "bg-purple-600" },
  { name: "205 Points", points: 205, additional: "", color: "bg-pink-500" },
  { name: "240 Points", points: 240, additional: "", color: "bg-pink-600" },
  { name: "275 Points", points: 275, additional: "", color: "bg-red-500" },
  { name: "330 Points + HR Applications", points: 330, additional: "Pass HR Applications", color: "bg-orange-500" },
  { name: "380 Points", points: 380, additional: "", color: "bg-orange-600" },
  {
    name: "430 Points + 3 Deployments Hosted",
    points: 430,
    additional: "3 Deployments Hosted",
    color: "bg-yellow-500",
  },
  { name: "480 Points", points: 480, additional: "", color: "bg-yellow-600" },
  {
    name: "530 Points + 10 Deployments Hosted",
    points: 530,
    additional: "10 Deployments Hosted",
    color: "bg-mcd-gold",
  },
]

export function PointCalculator() {
  const [currentPoints, setCurrentPoints] = useState(0)
  const [deploymentHours, setDeploymentHours] = useState(0)
  const [selfDeploymentHours, setSelfDeploymentHours] = useState(0)
  const [animatedTotal, setAnimatedTotal] = useState(0)

  const calculatePoints = () => {
    const deploymentPoints = Math.floor(deploymentHours * 2) * 5 // 5 points per 30 min
    const selfDeploymentPoints = Math.floor(selfDeploymentHours * 2) * 3 // 3 points per 30 min
    return deploymentPoints + selfDeploymentPoints
  }

  const totalPoints = currentPoints + calculatePoints()
  const nextRank = RANK_REQUIREMENTS.find((rank) => rank.points > totalPoints)
  const currentRank = RANK_REQUIREMENTS.filter((rank) => rank.points <= totalPoints).pop()

  // Animate total points
  useEffect(() => {
    const duration = 1000
    const steps = 50
    const increment = (totalPoints - animatedTotal) / steps

    if (Math.abs(totalPoints - animatedTotal) > 0.1) {
      const timer = setInterval(() => {
        setAnimatedTotal((prev) => {
          const next = prev + increment
          if (Math.abs(next - totalPoints) < Math.abs(increment)) {
            clearInterval(timer)
            return totalPoints
          }
          return next
        })
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [totalPoints, animatedTotal])

  return (
    <div className="bg-gradient-to-br from-card via-card to-mcd-gold/5 rounded-xl border border-mcd-gold/20 p-8 shadow-lg hover:shadow-xl transition-all duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-mcd-gold/10 rounded-lg">
          <Calculator className="h-6 w-6 text-mcd-gold" />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-mcd-purple via-mcd-gold to-mcd-purple bg-clip-text text-transparent">Point Calculator</h3>
          <p className="text-sm text-muted-foreground">Calculate your advancement progress and next rank</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Target className="h-4 w-4 text-mcd-gold" />
              Current Points
            </label>
            <input
              type="number"
              value={currentPoints}
              onChange={(e) => setCurrentPoints(Math.max(0, Number.parseInt(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-muted/50 border-2 border-muted hover:border-mcd-gold/50 focus:border-mcd-gold rounded-lg focus:outline-none transition-all duration-300 focus:shadow-lg focus:bg-background text-lg font-medium"
              placeholder="Enter your current points"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Clock className="h-4 w-4 text-blue-500" />
              Deployment Hours
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                5 pts/30min
              </span>
            </label>
            <input
              type="number"
              step="0.5"
              value={deploymentHours}
              onChange={(e) => setDeploymentHours(Math.max(0, Number.parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-muted/50 border-2 border-muted hover:border-blue-500/50 focus:border-blue-500 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-lg focus:bg-background text-lg font-medium"
              placeholder="Hours of deployments attended"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Zap className="h-4 w-4 text-green-500" />
              Self Deployment Hours
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                3 pts/30min
              </span>
            </label>
            <input
              type="number"
              step="0.5"
              value={selfDeploymentHours}
              onChange={(e) => setSelfDeploymentHours(Math.max(0, Number.parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 bg-muted/50 border-2 border-muted hover:border-green-500/50 focus:border-green-500 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-lg focus:bg-background text-lg font-medium"
              placeholder="Hours of self deployments"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Calculation Breakdown */}
          <div className="bg-gradient-to-br from-mcd-gold/10 via-yellow-400/10 to-mcd-gold/10 border-2 border-mcd-gold/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-mcd-gold animate-pulse" />
              <span className="font-bold text-mcd-gold text-lg">Calculation Results</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <span className="text-blue-700 dark:text-blue-300 font-medium">Deployment Points:</span>
                <span className="font-bold text-blue-800 dark:text-blue-200 text-lg">
                  {Math.floor(deploymentHours * 2) * 5}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <span className="text-green-700 dark:text-green-300 font-medium">Self Deployment Points:</span>
                <span className="font-bold text-green-800 dark:text-green-200 text-lg">
                  {Math.floor(selfDeploymentHours * 2) * 3}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-mcd-gold/20 to-yellow-400/20 rounded-lg border border-mcd-gold/30">
                <span className="text-mcd-gold font-bold text-lg">Total Points:</span>
                <span className="font-bold text-mcd-gold text-2xl">{Math.round(animatedTotal)}</span>
              </div>
            </div>
          </div>

          {/* Rank Information */}
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${currentRank?.color || "bg-gray-500"}`} />
                <h4 className="font-bold text-green-800 dark:text-green-200">Current Rank</h4>
              </div>
              <p className="text-green-600 dark:text-green-400 font-medium">
                {currentRank ? currentRank.name : "Recruit"}
                {currentRank?.additional && <span className="text-sm ml-2 opacity-75">({currentRank.additional})</span>}
              </p>
            </div>

            {nextRank && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${nextRank.color}`} />
                  <h4 className="font-bold text-blue-800 dark:text-blue-200">Next Rank</h4>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {nextRank.name}
                  {nextRank.additional && <span className="text-sm ml-2 opacity-75">({nextRank.additional})</span>}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-500 dark:text-blue-400">Need:</span>
                  <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full text-sm">
                    {nextRank.points - totalPoints} more points
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Visualization */}
      {nextRank && (
        <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-muted">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-mcd-gold" />
            Progress to Next Rank
          </h4>
          <div className="relative">
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${nextRank.color}`}
                style={{
                  width: `${Math.min(100, (totalPoints / nextRank.points) * 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-muted-foreground">{currentRank?.name || "Recruit"}</span>
              <span className="font-medium text-foreground">{Math.round((totalPoints / nextRank.points) * 100)}%</span>
              <span className="text-muted-foreground">{nextRank.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
