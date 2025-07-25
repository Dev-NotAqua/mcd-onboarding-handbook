"use client"

import type React from "react"

import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"

interface CalloutProps {
  children: React.ReactNode
  type?: "info" | "warning" | "success" | "error"
}

const calloutStyles = {
  info: {
    container: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    text: "text-blue-900 dark:text-blue-100",
    Icon: Info,
  },
  warning: {
    container: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400",
    text: "text-yellow-900 dark:text-yellow-100",
    Icon: AlertTriangle,
  },
  success: {
    container: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    text: "text-green-900 dark:text-green-100",
    Icon: CheckCircle,
  },
  error: {
    container: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    icon: "text-red-600 dark:text-red-400",
    text: "text-red-900 dark:text-red-100",
    Icon: AlertCircle,
  },
}

export function Callout({ children, type = "info" }: CalloutProps) {
  const styles = calloutStyles[type]
  const { Icon } = styles

  return (
    <div className={`p-4 rounded-lg border ${styles.container}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${styles.icon}`} />
        <div className={`text-sm ${styles.text}`}>{children}</div>
      </div>
    </div>
  )
}
