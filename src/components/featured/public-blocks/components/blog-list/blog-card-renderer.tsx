import React from "react"
import { cn } from "@/lib/utils"
import { Calendar, User, Clock, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { BlogCardTemplate, BlogData } from "../../types/blog.type"

interface BlogCardRendererProps {
    blog: BlogData
    template: BlogCardTemplate[]
    featured?: boolean
    featuredModifiers?: Record<string, string>
}

export function BlogCardRenderer({ blog, template, featured = false, featuredModifiers = {} }: BlogCardRendererProps) {
    const formattedDate = new Date(blog.publishDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    const readingTime = Math.ceil((blog.content?.length || 0) / 1000)

    const renderTemplate = (node: BlogCardTemplate): React.ReactNode => {
        const baseClassName = featured && featuredModifiers[node.id]
            ? featuredModifiers[node.id]
            : node.className || ""

        switch (node.type) {
            case "card-wrapper": {
                const className = cn(
                    baseClassName,
                    featured && "lg:col-span-2 lg:row-span-2"
                )

                return (
                    <article
                        key={node.id}
                        className={className}
                        style={node.style}
                    >
                        <a href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                            {node.children?.map(renderTemplate)}
                        </a>
                    </article>
                )
            }

            case "image-container": {
                const aspectRatio = node.aspectRatio || "16/10"

                return (
                    <div
                        key={node.id}
                        className={baseClassName}
                        style={{ aspectRatio, ...node.style }}
                    >
                        {node.children?.map(renderTemplate)}
                    </div>
                )
            }

            case "image": {
                const thumbnailUrl = blog.thumbnail || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23334155' width='800' height='600'/%3E%3Ctext fill='%23cbd5e1' font-family='sans-serif' font-size='48' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E"

                return (
                    <div key={node.id} className={cn("relative w-full h-full", baseClassName)}>
                        <Image
                            src={thumbnailUrl}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            style={node.style}
                            loading="lazy"
                        />
                    </div>
                )
            }

            case "overlay": {
                return (
                    <div
                        key={node.id}
                        className={baseClassName}
                        style={node.style}
                    />
                )
            }

            case "badge": {
                if (!featured) return null
                return (
                    <div key={node.id} className={baseClassName} style={node.style}>
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                    </div>
                )
            }

            case "labels": {
                if (!blog.labels || blog.labels.length === 0) return null
                return (
                    <div key={node.id} className={baseClassName} style={node.style}>
                        {blog.labels.slice(0, 2).map((labelItem) => (
                            <span
                                key={labelItem.label.id}
                                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xl border border-white/30 text-white"
                            >
                                {labelItem.label.name}
                            </span>
                        ))}
                    </div>
                )
            }

            case "metadata": {
                return (
                    <div key={node.id} className={baseClassName} style={node.style}>
                        <div className="flex items-center gap-3 text-white/90 text-xs flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                <span className="font-medium">{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{readingTime} min</span>
                            </div>
                        </div>
                    </div>
                )
            }

            case "content": {
                return (
                    <div key={node.id} className={baseClassName} style={node.style}>
                        {node.children?.map(renderTemplate)}
                    </div>
                )
            }

            case "title": {
                return (
                    <h3
                        key={node.id}
                        className={baseClassName}
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: node.lineClamp || 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            ...node.style,
                        }}
                    >
                        {blog.title}
                    </h3>
                )
            }

            case "description": {
                return (
                    <p
                        key={node.id}
                        className={baseClassName}
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: node.lineClamp || 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            ...node.style,
                        }}
                    >
                        {blog.description}
                    </p>
                )
            }

            case "cta": {
                return (
                    <div key={node.id} className={baseClassName} style={node.style}>
                        <span>Read more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                )
            }

            case "card-wrapper": {
                const className = cn(
                    baseClassName,
                    featured && "lg:col-span-2 lg:row-span-2"
                )

                return (
                    <article
                        key={node.id}
                        className={className}
                        style={node.style}
                    >
                        {/* ✅ Add link to blog detail */}
                        <a
                            href={`/blog/${blog.slug}`}
                            className="flex flex-col h-full"
                        >
                            {node.children?.map(renderTemplate)}
                        </a>
                    </article>
                )
            }

            default:
                return null
        }
    }

    return <>{template.map(renderTemplate)}</>
}