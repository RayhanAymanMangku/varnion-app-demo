"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface CtaBlockProps {
    background?: string
    className?: string
    elements?: BlockXElement[]
}

export function CtaBlock({ background, className, elements = [] }: CtaBlockProps) {
    const bg = background ?? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={className}
                    style={{ background: bg }}
                >
                    <div className="space-y-8">
                        {elements.map((element) => (
                            <ElementRenderer key={element.id} element={element} preview={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}