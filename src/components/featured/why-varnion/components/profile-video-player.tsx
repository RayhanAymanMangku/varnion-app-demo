"use client"
import dynamic from 'next/dynamic'
import React from 'react'
import "vimond-replay/index.css"

const Replay = dynamic(
    () => import("vimond-replay").then((mod) => mod.Replay),
    { ssr: false },
)

const ProfileVideoPlayer = () => {
    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-5 rounded-2xl border nebula-card p-2 overflow-hidden">
                    <Replay source="https://cdn.varnion.net.id/videos/why_varnion_video.mp4" />
                </div>
            </div>
        </section>

    )
}

export default ProfileVideoPlayer