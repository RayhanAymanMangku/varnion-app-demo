"use client"

import React from "react"
import NavbarBlock from "./navbar"
import { HeroBlock } from "./hero"
import { SectionBlock } from "./section"
import { FeatureGridBlock } from "./feature-grid"
import { TestimonialBlock } from "./testimonial"
import { CtaBlock } from "./cta"
import { FooterBlock } from "./footer"
import { TextBlock } from "./text"
import { ImageBlock } from "./image"
import { PricingBlock } from "./pricing"
import { FaqBlock } from "./faq"
import { ContactBlock } from "./contact"
import { StatsBlock } from "./stats"
import { GalleryBlock } from "./gallery"
import { TeamBlock } from "./team"
import { BlockX } from "./block-x"
import { FormBlock } from "./form"
import { BlogListBlock } from "./blog-list"
import { BlogDetail } from "./blog-detail"
import { BuilderBlock } from "../types/page.type"

interface BlockRendererProps {
    blocks: BuilderBlock[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
    if (!blocks?.length) return null

    return (
        <div className="space-y-6">
            {blocks.map((block) => {
                const normalized = block.type.toLowerCase().replace(/[-_]/g, "")
                const props = block.props || {}

                switch (normalized) {
                    case "navbar":
                        return <NavbarBlock key={block.id} {...props} />

                    case "hero":
                    case "herosection":
                        return <HeroBlock key={block.id} {...props} />

                    case "section":
                    case "contentsection":
                        return <SectionBlock key={block.id} {...props} />

                    case "featuregrid":
                    case "features":
                    case "featurelist":
                        return <FeatureGridBlock key={block.id} {...props} />

                    case "pricing":
                    case "pricingtable":
                    case "pricingplans":
                        return <PricingBlock key={block.id} {...props} />

                    case "text":
                    case "textblock":
                        return <TextBlock key={block.id} {...props} />

                    case "image":
                    case "imageblock":
                        return <ImageBlock key={block.id} {...props} />

                    case "testimonial":
                    case "testimonials":
                    case "testimonialblock":
                        return <TestimonialBlock key={block.id} {...props} />

                    case "faq":
                    case "faqs":
                    case "faqsection":
                        return <FaqBlock key={block.id} {...props} />

                    case "contact":
                    case "contactform":
                    case "contactsection":
                        return <ContactBlock key={block.id} {...props} />

                    case "stats":
                    case "statistics":
                    case "statsblock":
                        return <StatsBlock key={block.id} {...props} />

                    case "cta":
                    case "calltoaction":
                    case "ctasection":
                        return <CtaBlock key={block.id} {...props} />

                    case "gallery":
                    case "imagecarousel":
                    case "imagegallery":
                        return <GalleryBlock key={block.id} {...props} />

                    case "team":
                    case "teammembers":
                    case "teamblock":
                        return <TeamBlock key={block.id} {...props} />

                    case "blockx":
                    case "flexibleblockx":
                    case "customblock":
                        return <BlockX key={block.id} {...props} />

                    case "form":
                    case "formblock":
                        return <FormBlock key={block.id} {...props} />

                    case "bloglist":
                    case "blogarchive":
                        return <BlogListBlock key={block.id} {...props} />

                    case "blogdetail":
                    case "blogdetailpage":
                    case "singleblog":
                        return <BlogDetail key={block.id} {...props} />

                    case "footer":
                    case "footersection":
                        return <FooterBlock key={block.id} {...props} />

                    default:
                        console.warn('[BlockRenderer] Unknown block type:', block.type)
                        return (
                            <div key={block.id} className="relative w-full">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="rounded-3xl p-8 border border-red-500/20 bg-red-950/20">
                                        <div className="text-red-400">
                                            <div className="font-semibold text-lg mb-2">
                                                Unknown Block: {block.type}
                                            </div>
                                            <div className="text-sm text-red-300">
                                                This block type is not supported in the published site.
                                            </div>
                                            <details className="mt-4">
                                                <summary className="cursor-pointer text-xs text-red-400 hover:text-red-300">
                                                    Show block data
                                                </summary>
                                                <pre className="mt-2 p-4 bg-black/20 rounded-lg overflow-auto text-xs">
                                                    {JSON.stringify(block, null, 2)}
                                                </pre>
                                            </details>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            })}
        </div>
    )
}