"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface TeamBlockProps {
    background?: string
    className?: string
    elements?: BlockXElement[]
}

export function TeamBlock({ background, className, elements = [] }: TeamBlockProps) {
    const bg = background ?? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={className}
                    style={{ background: bg }}
                >
                    <div className="space-y-12">
                        {elements.map((element) => (
                            <ElementRenderer key={element.id} element={element} preview={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}