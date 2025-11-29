"use client"

import Image from "next/image"
import Link from "next/link"
import { navLists } from "../lib/constants"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className={cn(
                "rounded-3xl border nebula-bg backdrop-blur-xs inset-0 p-6",
              )}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="https://static.dev.varnion.net.id/nextune/assets/images/logo-varnion.svg"
                alt="logo"
                width={100}
                height={16}
                className="w-28 h-16 object-contain"
                priority
              />
            </a>

            <div className="flex items-center gap-4 text-sm">
              {navLists.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="nebula-text-secondary hover:nebula-text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2025 Varnion. All rights reserved.</p>
            <div className="flex items-center gap-3 text-xs nebula-text-secondary">
              <a href="#" className="transition-colors">
                Kebijakan Privasi
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#" className="transition-colors">
                Syarat Layanan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
