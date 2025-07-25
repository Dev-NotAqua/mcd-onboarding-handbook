"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Square, Clock, Timer, Zap, Coffee } from "lucide-react"

interface TimerState {
  isRunning: boolean
  isPaused: boolean
  time: number
  breakTime: number
  totalBreaks: number
}

export function TridentTimerInterface() {
  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    time: 0,
    breakTime: 0,
    totalBreaks: 0,
  })

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: true, isPaused: false }))
  }

  const pauseTimer = () => {
    setTimer((prev) => ({ ...prev, isPaused: true }))
  }

  const stopTimer = () => {
    setTimer({
      isRunning: false,
      isPaused: false,
      time: 0,
      breakTime: 0,
      totalBreaks: 0,
    })
  }

  const takeBreak = () => {
    setTimer((prev) => ({
      ...prev,
      isPaused: true,
      totalBreaks: prev.totalBreaks + 1,
    }))
  }

  // Simulate timer running
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer.isRunning && !timer.isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => ({ ...prev, time: prev.time + 1 }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer.isRunning, timer.isPaused])

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-mcd-gold/30 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-mcd-gold/20 to-yellow-400/20 px-6 py-4 border-b border-mcd-gold/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-mcd-gold to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
            <Timer className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Trident Timer</h3>
            <p className="text-gray-300 text-sm">MC&D Shift Management System</p>
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="p-6 text-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Circular progress */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - (timer.time % 3600) / 3600)}`}
                className="text-mcd-gold transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock className={`w-8 h-8 ${timer.isRunning ? "text-mcd-gold animate-pulse" : "text-gray-400"}`} />
            </div>
          </div>
        </div>

        {/* Time Display */}
        <div className="space-y-2">
          <div className="text-4xl font-mono font-bold text-white">{formatTime(timer.time)}</div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Coffee className="w-4 h-4" />
              <span>Breaks: {timer.totalBreaks}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>Points: {Math.floor(timer.time / 1800) * 3}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              timer.isRunning && !timer.isPaused
                ? "bg-green-500 animate-pulse"
                : timer.isPaused
                  ? "bg-yellow-500"
                  : "bg-gray-500"
            }`}
          ></div>
          <span className="text-gray-300 text-sm font-medium">
            {timer.isRunning && !timer.isPaused ? "Active Shift" : timer.isPaused ? "On Break" : "Shift Ended"}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {!timer.isRunning ? (
            <button
              onClick={startTimer}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Play className="w-4 h-4" />
              Start Shift
            </button>
          ) : (
            <>
              <button
                onClick={timer.isPaused ? startTimer : pauseTimer}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {timer.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {timer.isPaused ? "Resume" : "Break"}
              </button>
              <button
                onClick={stopTimer}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Square className="w-4 h-4" />
                End Shift
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 px-6 py-3 border-t border-gray-700">
        <p className="text-gray-400 text-xs text-center">
          Use <span className="text-mcd-gold font-mono">/shift manage</span> command in Discord
        </p>
      </div>
    </div>
  )
}
