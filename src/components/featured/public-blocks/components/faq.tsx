"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface FaqBlockProps {
    background?: string
    className?: string
    elements?: BlockXElement[]
}

export function FaqBlock({ background, className, elements = [] }: FaqBlockProps) {
    const bg = background ?? "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)"

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div
                    className={className}
                    style={{ background: bg }}
                >
                    <div className="space-y-6">
                        {elements.map((element) => (
                            <ElementRenderer key={element.id} element={element} preview={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}