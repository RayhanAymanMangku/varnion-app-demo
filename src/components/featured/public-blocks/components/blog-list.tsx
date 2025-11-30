"use client"

import React, { useEffect, useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ElementRenderer } from "./element-renderer"
import { BlogCardRenderer } from "./blog-list/blog-card-renderer"
import { getDefaultCardTemplate, getFeaturedCardModifiers } from "./blog-list/default-card-template"
import { BlockXElement } from "../types/page.type"
import { BlogCardTemplate, BlogData } from "../types/blog.type"

interface BlogListBlockProps {
    websiteId?: string
    background?: string
    className?: string
    layout?: "featured-grid" | "grid-3" | "grid-4"
    gridColumns?: string
    elements?: BlockXElement[]
    showPagination?: boolean
    pageSize?: number
    cardTemplate?: BlogCardTemplate[]
}

function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
    return (
        <div className={cn("animate-pulse", featured && "lg:col-span-2 lg:row-span-2")}>
            <div className="aspect-16/10 bg-linear-to-br from-white/5 to-white/10 rounded-3xl mb-4" />
            <div className="space-y-3">
                <div className="h-6 bg-linear-to-r from-white/5 to-white/10 rounded-lg w-3/4" />
                <div className="h-4 bg-linear-to-r from-white/5 to-white/10 rounded w-full" />
                <div className="h-4 bg-linear-to-r from-white/5 to-white/10 rounded w-5/6" />
                <div className="flex gap-2 mt-4">
                    <div className="h-7 bg-linear-to-r from-white/5 to-white/10 rounded-full w-20" />
                    <div className="h-7 bg-linear-to-r from-white/5 to-white/10 rounded-full w-20" />
                </div>
            </div>
        </div>
    )
}

export function BlogListBlock({
    websiteId,
    background,
    className,
    layout = "featured-grid",
    gridColumns,
    elements = [],
    pageSize = 9,
    cardTemplate
}: BlogListBlockProps) {
    const [blogData, setBlogData] = useState<BlogData[]>([])
    const [selectedLabel, setSelectedLabel] = useState<string>("")
    const [isFetching, setIsFetching] = useState(false)

    const bg = background ?? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
    const finalCardTemplate = cardTemplate || getDefaultCardTemplate()
    const featuredModifiers = getFeaturedCardModifiers()

    useEffect(() => {
        if (!websiteId) return

        const fetchBlogs = async () => {
            try {
                setIsFetching(true)

                const params = new URLSearchParams()
                params.append("page", "1")
                params.append("pageSize", String(pageSize))

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/blog/website/${websiteId}?${params.toString()}`,
                    {
                        next: { revalidate: 60 },
                    }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs')
                }

                const data = await response.json()
                const blogs = data.data?.blogs || []

                setBlogData(blogs)
            } catch (error) {
                console.error('[BlogList] Failed to fetch blogs:', error)
            } finally {
                setIsFetching(false)
            }
        }

        fetchBlogs()
    }, [websiteId, pageSize])

    const allLabels = useMemo(() => {
        const labels = new Set<string>()
        blogData.forEach((blog) => {
            blog.labels?.forEach((labelItem) => {
                labels.add(labelItem.label.name)
            })
        })
        return Array.from(labels)
    }, [blogData])

    const filteredBlogs = useMemo(() => {
        if (!selectedLabel) return blogData
        return blogData.filter((blog) =>
            blog.labels?.some((labelItem) => labelItem.label.name === selectedLabel)
        )
    }, [blogData, selectedLabel])

    const gridClass = useMemo(() => {
        if (gridColumns) return gridColumns

        switch (layout) {
            case "featured-grid":
                return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            case "grid-3":
                return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            case "grid-4":
                return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr"
            default:
                return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        }
    }, [layout, gridColumns])

    if (!websiteId) {
        return (
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-white/60">No website selected</p>
                </div>
            </section>
        )
    }

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

                        {allLabels.length > 0 && (
                            <div className="flex flex-wrap gap-3 justify-center">
                                <button
                                    onClick={() => setSelectedLabel("")}
                                    className={cn(
                                        "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105",
                                        !selectedLabel
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                                            : "bg-white/5 backdrop-blur-xl border border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40"
                                    )}
                                >
                                    All Posts
                                </button>
                                {allLabels.map((label) => (
                                    <button
                                        key={label}
                                        onClick={() => setSelectedLabel(label)}
                                        className={cn(
                                            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105",
                                            selectedLabel === label
                                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                                                : "bg-white/5 backdrop-blur-xl border border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isFetching ? (
                            <div className={cn("grid gap-8", gridClass)}>
                                {Array.from({ length: pageSize }).map((_, idx) => (
                                    <BlogCardSkeleton key={idx} featured={layout === "featured-grid" && idx === 0} />
                                ))}
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 mb-6">
                                    <span className="text-5xl">📝</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">No Posts Found</h3>
                                <p className="text-white/60 text-lg max-w-md mx-auto">
                                    {selectedLabel
                                        ? `No posts found with label "${selectedLabel}"`
                                        : "No blog posts available yet"}
                                </p>
                            </div>
                        ) : (
                            <div className={cn("grid gap-8", gridClass)}>
                                {filteredBlogs.map((blog, idx) => (
                                    <BlogCardRenderer
                                        key={blog.id}
                                        blog={blog}
                                        template={finalCardTemplate}
                                        featured={layout === "featured-grid" && idx === 0}
                                        featuredModifiers={featuredModifiers}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}