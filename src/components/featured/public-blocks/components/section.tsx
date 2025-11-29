"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface SectionBlockProps {
    background?: string
    className?: string
    elements?: BlockXElement[]
}

export function SectionBlock({ background, className, elements = [] }: SectionBlockProps) {
    const bg = background ?? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(className)}
                    style={{ background: bg }}
                >
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        {elements.map((element) => (
                            <ElementRenderer key={element.id} element={element} preview={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}