import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import localFont from "next/font/local"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const heliosfont = localFont({
  src: '../../public/fonts/heliosext.woff',
  weight: '500',
  style: 'normal',
  variable: '--font-helios',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Arial',
})