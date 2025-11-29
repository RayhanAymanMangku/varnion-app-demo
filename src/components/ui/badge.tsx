import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "purple" | "destructive" | "primary"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "border-white/10 bg-white/5 text-muted-foreground",
    primary: "border-blue-400/30 bg-blue-500/10 text-blue-200",
    success: "border-emerald-400/20 bg-emerald-400/15 text-emerald-300",
    purple: "border-purple-400/30 bg-purple-500/10 text-purple-200",
    destructive: "border-red-400/20 bg-red-400/15 text-red-300",
  }

  return (
    <span className={cn("rounded-full px-2 py-1 text-xs items-center border", variants[variant], className)}>{children}</span>
  )
}
