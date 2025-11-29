import type React from "react"
import { cn } from "@/lib/utils"

interface IconBoxProps {
  children: React.ReactNode
  className?: string
}

export function IconBox({ children, className }: IconBoxProps) {
  return (
    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", className)}>
      {children}
    </div>
  )
}
