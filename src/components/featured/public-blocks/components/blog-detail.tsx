"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calendar, User, Tag, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BlogData } from "../types/blog.type"
import { ElementRenderer } from "./element-renderer"
import { BlockXElement } from "../types/page.type"

interface BlogDetailProps {
    websiteId?: string
    background?: string
    className?: string
    layout?: "default" | "modern" | "minimal"
    elements?: BlockXElement[]
    contentElements?: BlockXElement[]
    showAuthor?: boolean
    showDate?: boolean
    showLabels?: boolean
    showReadTime?: boolean
    showBackButton?: boolean
    showRelatedPosts?: boolean
    relatedPostsCount?: number
}

interface RelatedBlog {
    id: string
    title: string
    slug: string
    thumbnail: string
    description: string
    publishDate: string
}

function BlogDetailSkeleton() {
    return (
        <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-8 bg-gradient-to-r from-white/5 to-white/10 rounded-lg w-32 mb-8" />
            <div className="flex gap-2 mb-6">
                <div className="h-7 bg-gradient-to-r from-white/5 to-white/10 rounded-full w-24" />
                <div className="h-7 bg-gradient-to-r from-white/5 to-white/10 rounded-full w-24" />
            </div>
            <div className="h-16 bg-gradient-to-r from-white/5 to-white/10 rounded-lg w-full mb-6" />
            <div className="flex gap-4 mb-8">
                <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-32" />
                <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-32" />
                <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-32" />
            </div>
            <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 rounded-2xl mb-12" />
            <div className="space-y-4">
                <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-5/6" />
                <div className="h-4 bg-gradient-to-r from-white/5 to-white/10 rounded w-4/5" />
            </div>
        </div>
    )
}

export function BlogDetail({
    websiteId,
    background,
    className,
    elements = [],
    contentElements = [],
    showAuthor = true,
    showDate = true,
    showLabels = true,
    showReadTime = true,
    showBackButton = true,
    showRelatedPosts = true,
    relatedPostsCount = 3,
}: BlogDetailProps) {
    const params = useParams()
    const slug = params?.slug as string

    const [blogData, setBlogData] = useState<BlogData | null>(null)
    const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const bg = background ?? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"

    useEffect(() => {
        if (!websiteId || !slug) return

        const fetchBlogData = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/blog/${websiteId}/${slug}`,
                    {
                        next: { revalidate: 60 },
                    }
                )

                if (!response.ok) {
                    throw new Error('Blog not found')
                }

                const data = await response.json()
                const blog = data.data

                setBlogData(blog)

                if (showRelatedPosts) {
                    const relatedResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/blog/website/${websiteId}? pageSize=${relatedPostsCount + 1}`,
                        {
                            next: { revalidate: 60 },
                        }
                    )

                    if (relatedResponse.ok) {
                        const relatedData = await relatedResponse.json()
                        const related: RelatedBlog[] = (relatedData.data?.blogs || [])
                            .filter((b: BlogData) => b.slug !== slug)
                            .slice(0, relatedPostsCount)
                            .map((b: BlogData) => ({
                                id: b.id,
                                title: b.title,
                                slug: b.slug,
                                thumbnail: b.thumbnail,
                                description: b.description,
                                publishDate: b.publishDate,
                            }))

                        setRelatedBlogs(related)
                    }
                }
            } catch (err) {
                console.error('[BlogDetail] Error:', err)
                setError(err instanceof Error ? err.message : 'Failed to load blog')
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlogData()
    }, [websiteId, slug, showRelatedPosts, relatedPostsCount])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200
        const wordCount = content.trim().split(/\s+/).length
        return Math.ceil(wordCount / wordsPerMinute)
    }

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
                    className={cn("rounded-3xl py-12 sm:py-16 lg:py-20 px-8 sm:px-12 lg:px-16", className)}
                    style={{ background: bg }}
                >
                    {isLoading ? (
                        <BlogDetailSkeleton />
                    ) : error || !blogData ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 mb-6">
                                <span className="text-5xl">❌</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Blog Not Found</h3>
                            <p className="text-white/60 text-lg max-w-md mx-auto mb-8">{error}</p>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {elements.map((element) => (
                                <ElementRenderer key={element.id} element={element} preview={true} />
                            ))}

                            <article className="max-w-4xl mx-auto">
                                <div className="space-y-8">
                                    {showBackButton && (
                                        <div className="mb-8">
                                            <Link
                                                href="/blog"
                                                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 w-fit"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                <span>Back to Blog</span>
                                            </Link>
                                        </div>
                                    )}

                                    {showLabels && blogData.labels && blogData.labels.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {blogData.labels.map((labelItem) => (
                                                <span
                                                    key={labelItem.label.id}
                                                    className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 text-sm flex items-center gap-1"
                                                >
                                                    <Tag className="w-3 h-3" />
                                                    {labelItem.label.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                                        {blogData.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/70 mb-8 text-sm">
                                        {showAuthor && (
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                <span>{blogData.author}</span>
                                            </div>
                                        )}
                                        {showDate && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(blogData.publishDate)}</span>
                                            </div>
                                        )}
                                        {showReadTime && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{calculateReadTime(blogData.content)} min read</span>
                                            </div>
                                        )}
                                    </div>

                                    {blogData.thumbnail && (
                                        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                                            <Image
                                                src={blogData.thumbnail}
                                                alt={blogData.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    )}

                                    {blogData.description && (
                                        <div className="text-xl text-white/90 italic border-l-4 border-purple-500 pl-6 mb-12">
                                            {blogData.description}
                                        </div>
                                    )}

                                    <div
                                        className="prose prose-invert prose-lg max-w-none
                                            prose-headings:text-white prose-headings:font-bold
                                            prose-p:text-white/80 prose-p:leading-relaxed
                                            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                                            prose-strong:text-white prose-strong:font-semibold
                                            prose-ul:text-white/80 prose-ol:text-white/80
                                            prose-li:text-white/80
                                            prose-blockquote:border-purple-500 prose-blockquote:text-white/90
                                            prose-code:text-purple-300 prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                                            prose-img:rounded-xl prose-img:shadow-xl"
                                        dangerouslySetInnerHTML={{ __html: blogData.content }}
                                    />

                                    {contentElements.map((element) => (
                                        <ElementRenderer key={element.id} element={element} preview={true} />
                                    ))}

                                    {showRelatedPosts && relatedBlogs.length > 0 && (
                                        <>
                                            <div className="my-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            <div>
                                                <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
                                                <div className={cn(
                                                    "grid gap-6",
                                                    relatedPostsCount >= 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
                                                )}>
                                                    {relatedBlogs.map((related) => (
                                                        <Link
                                                            key={related.id}
                                                            href={`/blog/${related.slug}`}
                                                            className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:scale-105"
                                                        >
                                                            {related.thumbnail && (
                                                                <div className="relative h-48">
                                                                    <Image
                                                                        src={related.thumbnail}
                                                                        alt={related.title}
                                                                        fill
                                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="p-4">
                                                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                                                                    {related.title}
                                                                </h3>
                                                                <p className="text-sm text-white/70 line-clamp-2">
                                                                    {related.description}
                                                                </p>
                                                                <div className="mt-3 text-xs text-white/50">
                                                                    {formatDate(related.publishDate)}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </article>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}