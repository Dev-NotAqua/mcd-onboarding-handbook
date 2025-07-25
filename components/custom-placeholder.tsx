"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomPlaceholderProps {
  icon: LucideIcon
  title: string
  description?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "gold" | "muted"
}

export function CustomPlaceholder({
  icon: Icon,
  title,
  description,
  className,
  size = "md",
  variant = "default"
}: CustomPlaceholderProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48"
  }

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  }

  const variants = {
    default: "bg-gradient-to-br from-muted/50 to-muted/30 border-muted text-muted-foreground",
    gold: "bg-gradient-to-br from-mcd-gold/20 to-yellow-400/10 border-mcd-gold/30 text-mcd-gold",
    muted: "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-lg group",
      sizeClasses[size],
      variants[variant],
      className
    )}>
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 rounded-full blur-sm group-hover:opacity-40 transition-opacity duration-500"></div>
        <Icon className={cn(
          "relative transition-all duration-500 group-hover:scale-110",
          iconSizes[size],
          variant === "gold" && "animate-pulse"
        )} />
      </div>
      
      <div className="mt-3 text-center space-y-1">
        <h4 className={cn(
          "font-semibold transition-colors duration-300",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
        )}>
          {title}
        </h4>
        {description && (
          <p className={cn(
            "text-xs opacity-70 transition-opacity duration-300 group-hover:opacity-90",
            size === "sm" && "text-[10px]"
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

// Preset components for common use cases
export function LoadingPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex items-center justify-center w-full h-32 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border-2 border-dashed border-muted animate-pulse",
      className
    )}>
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-mcd-gold/30 border-t-mcd-gold rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-muted-foreground font-medium">Loading...</p>
      </div>
    </div>
  )
}

export function ErrorPlaceholder({ className, message = "Content unavailable" }: { className?: string, message?: string }) {
  return (
    <div className={cn(
      "flex items-center justify-center w-full h-32 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-xl border-2 border-dashed border-red-200 dark:border-red-800",
      className
    )}>
      <div className="text-center space-y-2">
        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
          <span className="text-red-500 text-sm">!</span>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">{message}</p>
      </div>
    </div>
  )
}