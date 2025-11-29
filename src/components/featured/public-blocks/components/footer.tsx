"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FooterBlockProps } from "../types/blocks.type"

export function FooterBlock({
    logoUrl,
    navLinks,
    copyright,
    privacyUrl,
    termsUrl
}: FooterBlockProps) {
    const finalLogoUrl = logoUrl || "https://static.dev.varnion.net.id/nextune/assets/images/logo-varnion.svg"

    const finalNavLinks = navLinks || [
        { id: "1", name: "Home", href: "/" },
        { id: "2", name: "About", href: "/about" },
        { id: "3", name: "Contact", href: "/contact" },
    ]

    const finalCopyright = copyright || "© 2025 Varnion. All rights reserved."
    const finalPrivacyUrl = privacyUrl || "#"
    const finalTermsUrl = termsUrl || "#"

    return (
        <footer className="relative z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div className={cn("rounded-3xl border nebula-bg backdrop-blur-xs inset-0 p-6")}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <Image
                                src={finalLogoUrl}
                                alt="footer-logo"
                                width={100}
                                height={16}
                                className="w-28 h-16 object-contain"
                                priority
                            />
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            {finalNavLinks.map((link) => (
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
                        <p className="text-xs text-muted-foreground">{finalCopyright}</p>

                        <div className="flex items-center gap-3 text-xs nebula-text-secondary">
                            <a href={finalPrivacyUrl} className="transition-colors hover:text-white">
                                Kebijakan Privasi
                            </a>
                            <span className="text-muted-foreground">•</span>
                            <a href={finalTermsUrl} className="transition-colors hover:text-white">
                                Syarat Layanan
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}