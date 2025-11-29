"use client"

import React, { JSX } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { BlockXElement } from "../types/page.type"
import Image from "next/image"

interface ElementRendererProps {
    element: BlockXElement
    preview?: boolean
}

export function ElementRenderer({ element, preview = true }: ElementRendererProps) {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (element.scrollTarget) {
            e.preventDefault()
            e.stopPropagation()

            const targetElement = document.querySelector(`[data-element-id="${element.scrollTarget}"]`)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            } else {
                console.warn(`Target element with ID "${element.scrollTarget}" not found`)
            }
        } else if (element.href) {
            if (element.href.startsWith('#')) {
                e.preventDefault()
                const targetId = element.href.slice(1)
                const target = document.getElementById(targetId)
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                    const elementTarget = document.querySelector(`[data-element-id="${targetId}"]`)
                    if (elementTarget) {
                        elementTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                }
            } else {
                if (element.href.startsWith('http')) {
                    e.preventDefault()
                    window.open(element.href, '_blank', 'noopener,noreferrer')
                }
            }
        } else {
            e.preventDefault()
        }
    }

    const renderChildren = (children?: BlockXElement[]) => {
        if (!children || children.length === 0) return null

        return children.map((child) => (
            <ElementRenderer
                key={child.id}
                element={child}
                preview={preview}
            />
        ))
    }

    const renderContent = (): React.ReactNode => {
        switch (element.type) {
            case "heading": {
                const level = typeof element.level === 'number' ? element.level : 2
                const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

                return (
                    <HeadingTag className={cn(element.className)} style={element.style}>
                        {element.content}
                    </HeadingTag>
                )
            }

            case "text":
                return (
                    <p className={cn(element.className)} style={element.style}>
                        {element.content}
                    </p>
                )

            case "button":
                return (
                    <button
                        className={cn(element.className)}
                        style={element.style}
                        onClick={handleButtonClick}
                        type="button"
                    >
                        {element.content}
                    </button>
                )

            case "image":
                return (
                    <Image
                        src={element.src || "https://via.placeholder.com/400x300"}
                        width={400}
                        height={300}
                        alt={element.alt || "Image"}
                        className={cn(element.className)}
                        style={element.style}
                    />
                )

            case "div":
                return (
                    <div className={cn(element.className)} style={element.style}>
                        {renderChildren(element.children)}
                    </div>
                )

            case "container":
                return (
                    <div className={cn("max-w-7xl mx-auto px-4", element.className)} style={element.style}>
                        {renderChildren(element.children)}
                    </div>
                )

            case "flex":
                return (
                    <div className={cn("flex", element.className)} style={element.style}>
                        {renderChildren(element.children)}
                    </div>
                )

            case "grid":
                return (
                    <div className={cn("grid", element.className)} style={element.style}>
                        {renderChildren(element.children)}
                    </div>
                )

            case "list":
                return (
                    <ul className={cn(element.className)} style={element.style}>
                        {element.items?.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 mb-3">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-green-400" />
                                </div>
                                <span className="text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                )

            case "badge":
                return (
                    <span className={cn("inline-block px-3 py-1 rounded-full text-sm", element.className)} style={element.style}>
                        {element.content}
                    </span>
                )

            case "card":
                return (
                    <div className={cn("rounded-lg", element.className)} style={element.style}>
                        {renderChildren(element.children)}
                    </div>
                )

            default:
                return (
                    <div className="text-red-400 p-2 text-sm">
                        Unknown element: {element.type}
                    </div>
                )
        }
    }

    return (
        <div data-element-id={element.id}>
            {renderContent()}
        </div>
    )
}