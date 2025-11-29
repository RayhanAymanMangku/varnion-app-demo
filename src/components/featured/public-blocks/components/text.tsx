"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface TextBlockProps {
    background?: string
    className?: string
    elements?: BlockXElement[]
}

export function TextBlock({ background, className, elements = [] }: TextBlockProps) {
    const bg = background ?? "transparent"

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={className}
                    style={{ background: bg }}
                >
                    <div className="max-w-3xl mx-auto">
                        {elements.map((element) => (
                            <ElementRenderer key={element.id} element={element} preview={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}