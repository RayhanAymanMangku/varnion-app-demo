"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface HeroBlockProps {
    background?: string
    className?: string
    elements?: BlockXElement[]
}

export function HeroBlock({ background, className, elements = [] }: HeroBlockProps) {
    const bg = background ?? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(className)}
                    style={{ background: bg }}
                >
                    {elements.map((element) => (
                        <ElementRenderer key={element.id} element={element} preview={true} />
                    ))}
                </div>
            </div>
        </section>
    )
}