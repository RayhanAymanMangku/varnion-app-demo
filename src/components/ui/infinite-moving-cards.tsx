"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import React, { useEffect, useState, useCallback } from "react"

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "slow",
    pauseOnHover = true,
    className,
}: {
    items: {
        id: number
        src: string
    }[]
    direction?: "left" | "right"
    speed?: "fast" | "normal" | "slow"
    pauseOnHover?: boolean
    className?: string
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)
    const [start, setStart] = useState(false)

    const getDirection = useCallback(() => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards")
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse")
            }
        }
    }, [direction])

    const getSpeed = useCallback(() => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s")
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s")
            } else {
                containerRef.current.style.setProperty("--animation-duration", "300s")
            }
        }
    }, [speed])

    const addAnimation = useCallback(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            getDirection()
            getSpeed()
            setStart(true)
        }
    }, [getDirection, getSpeed])

    useEffect(() => {
        addAnimation()
    }, [addAnimation])

    return (
        <div
            ref={containerRef}
            className={cn("scroller relative z-20 max-w-7xl overflow-hidden", className)}
            style={{
                maskImage: `linear-gradient(
                    to right,
                    transparent 0%,
                    white 15%,
                    white 85%,
                    transparent 100%
                ), linear-gradient(
                    to bottom,
                    white 0%,
                    white 85%,
                    white 100%
                )`,
                maskComposite: "intersect",
                WebkitMaskImage: `linear-gradient(
                    to right,
                    transparent 0%,
                    white 15%,
                    white 85%,
                    transparent 100%
                ), linear-gradient(
                    to bottom,
                    white 0%,
                    white 85%,
                    white 100%
                )`,
                WebkitMaskComposite: "source-in",
            }}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {items.map((item, idx) => (
                    <Image
                        key={idx}
                        src={item.src}
                        alt={"image"}
                        width={250}
                        height={250}
                        className="w-52 h-40 object-contain rounded-none"
                        priority
                    />
                ))}
            </ul>
        </div>
    )
}