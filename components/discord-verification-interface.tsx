"use client"

import { useState } from "react"
import { Shield, CheckCircle, Clock, User, Hash, ArrowRight } from "lucide-react"

interface VerificationStep {
  id: string
  title: string
  description: string
  status: "pending" | "active" | "completed"
  channel?: string
}

export function DiscordVerificationInterface() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps: VerificationStep[] = [
    {
      id: "join",
      title: "Join Server",
      description: "Click the Discord invite link to join MC&D server",
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "pending",
    },
    {
      id: "verify",
      title: "Run Verification",
      description: "Use /verify command in #verification channel",
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "pending",
      channel: "#verification",
    },
    {
      id: "roles",
      title: "Select Roles",
      description: "Choose your roles in #role-request channel",
      status: currentStep > 3 ? "completed" : currentStep === 3 ? "active" : "pending",
      channel: "#role-request",
    },
    {
      id: "complete",
      title: "Access Granted",
      description: "Welcome to MC&D! You now have full server access",
      status: currentStep > 4 ? "completed" : currentStep === 4 ? "active" : "pending",
    },
  ]

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-mcd-gold/30 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-mcd-gold/20 to-yellow-400/20 px-6 py-4 border-b border-mcd-gold/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-mcd-gold to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-mcd-purple via-mcd-gold to-mcd-purple bg-clip-text text-transparent">Discord Verification</h3>
            <p className="text-gray-300 text-sm">MC&D Server Access Process</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gray-800/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm font-medium">Progress</span>
          <span className="text-mcd-gold text-sm font-bold">{currentStep}/4</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-mcd-gold to-yellow-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
              step.status === "completed"
                ? "bg-green-900/20 border-green-500/30"
                : step.status === "active"
                  ? "bg-mcd-gold/10 border-mcd-gold/30 shadow-lg"
                  : "bg-gray-800/30 border-gray-600/30"
            }`}
          >
            {/* Step Icon */}
            <div className="flex-shrink-0 mt-1">
              {step.status === "completed" ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : step.status === "active" ? (
                <Clock className="w-6 h-6 text-mcd-gold animate-pulse" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center">
                  <span className="text-gray-500 text-xs font-bold">{index + 1}</span>
                </div>
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <h4
                className={`font-semibold mb-1 ${
                  step.status === "completed"
                    ? "text-green-400"
                    : step.status === "active"
                      ? "text-mcd-gold"
                      : "text-gray-400"
                }`}
              >
                {step.title}
              </h4>
              <p className="text-gray-300 text-sm mb-2">{step.description}</p>

              {/* Channel Tag */}
              {step.channel && (
                <div className="flex items-center gap-1 text-xs">
                  <Hash className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400 font-mono">{step.channel}</span>
                </div>
              )}

              {/* Action Button */}
              {step.status === "active" && step.id !== "complete" && (
                <button
                  onClick={nextStep}
                  className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-mcd-gold to-yellow-400 hover:from-yellow-400 hover:to-mcd-gold text-black text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {step.id === "join" ? "Join Server" : step.id === "verify" ? "Run /verify" : "Select Roles"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 px-6 py-3 border-t border-gray-700">
        <div className="flex items-center justify-center gap-2">
          <User className="w-4 h-4 text-mcd-gold" />
          <span className="text-gray-300 text-sm">
            {currentStep === 4 ? "Welcome to MC&D!" : "Complete verification to access all channels"}
          </span>
        </div>
      </div>
    </div>
  )
}
