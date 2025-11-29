import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border nebula-card nebula-glow backdrop-blur-xs inset-0 p-6",
        hover && "hover:border-white/20 transition-colors",
        className,
      )}
      suppressHydrationWarning
    >
      {children}
    </div>
  )
}
