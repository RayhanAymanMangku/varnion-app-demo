"use client"
import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import createGlobe from "cobe"
import Image from "next/image"

export const SkeletonOne = () => {
    return (
        <div className="flex w-full h-full items-center justify-center p-4">
            <Image
                src="/assets/solutions/solution-4.png"
                alt="VICA Application"
                width={300}
                height={300}
                className="w-3/4 h-auto max-h-72 object-contain"
                priority

            />
        </div>
    )
}

export const SkeletonThree = () => {
    return (
        <div className="flex w-full h-fit items-center justify-center p-4">
            <Image
                src="/assets/solutions/solution-2.png"
                alt="header"
                width={400}
                height={300}
                className="w-full h-auto max-h-72 object-cover object-center rounded-xl transition-all duration-200 group-hover:blur-sm"
                priority
            />
        </div>
    )
}

export const SkeletonTwo = () => {
    return (
        <div className="flex w-full h-fit items-center justify-center p-4">
            <Image
                src="/assets/solutions/solution-1.png"
                alt="header"
                width={400}
                height={300}
                className="w-full h-auto max-h-72 object-contian rounded-xl transition-all duration-200 group-hover:blur-sm"
                priority
            />
        </div>
    )
}

export const Globe = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        let phi = 0

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 2,
            width: 500 * 2,
            height: 500 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],

            // cobe expects [lat, lon]
            markers: [
                { location: [-6.2088, 106.8456], size: 0.1 }, // Jakarta (lat, lon)
                { location: [-8.6705, 115.2126], size: 0.05 }, // Bali (lat, lon)
                { location: [-7.7956, 110.3695], size: 0.05 }, // Yogyakarta (lat, lon)
            ],

            onRender: (state) => {
                state.phi = phi
                phi += 0.01
            },
        })

        return () => globe.destroy()
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            className={className}
        />
    )
}

export const SkeletonFour = () => {
    return (
        <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10  rounded-br-2xl z-30">
            <Globe className="absolute -right-10 md:-right-60 -bottom-80 md:-bottom-72 z-10" />
        </div>
    );
};

const featuresData = [
    {
        id: "vica",
        title: "Personal Assistant Manager (VICA)",
        description: "VICA is the best choice for managing your network due to its various advantages",
        className: "col-span-1 lg:col-span-3 border-b lg:border-r dark:border-neutral-800",
    },
    {
        id: "app-driven",
        title: "App-driven ISP",
        description:
            "With the vision of Technology for Everyone, Varnion stands out as an ISP offering innovative, self-developed app-based solutions that can enhance and strengthen your business performance while seamlessly integrating into your business's internal systems.",
        className: "col-span-1 lg:col-span-3 border-b dark:border-neutral-800",
    },
    {
        id: "sla",
        title: "100% SLA",
        description: "Whether its you or Tyler Durden, you can get to know about our product on YouTube",
        className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
        id: "support",
        title: "24/7 Monitoring Support",
        description:
            "Varnion's professional team is fully committed to monitoring your internet connection network while offering fast, innovative, and top-notch service.",
        className: "col-span-1 lg:col-span-3",
    },
]

const skeletonComponents: Record<string, React.ReactNode> = {
    vica: <SkeletonOne />,
    "app-driven": <SkeletonTwo />,
    sla: <SkeletonThree />,
    support: <SkeletonFour />,
}

export function FeaturesSectionDemo() {
    const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
        <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>{children}</div>
    )

    const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
        <p className="max-w-5xl mx-auto text-left text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    )

    const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
        <p className={cn("text-sm md:text-base max-w-4xl mx-0 my-2 text-muted-foreground text-justify")}>
            {children}
        </p>
    )

    return (
        <div className="relative z-20 py-10 lg:pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 px-8 ">
                <h4 className="text-2xl lg:text-5xl max-w-5xl mx-auto text-center font-medium text-white dark:text-white">
                    What We Offer for You   
                </h4>

                <p className="text-sm lg:text-base  max-w-2xl mx-auto text-muted-foreground text-center font-normal">
                    Varnion is an Internet Service Provider (ISP) that offers a wide range of innovative solutions to meet the needs of businesses and individuals.
                </p>
            </div>

            <div className="relative ">
                <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-xl nebula-card backdrop-blur-sm w-full">
                    {featuresData.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="h-full w-full">{skeletonComponents[feature.id]}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
