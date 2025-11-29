import { BlogCardTemplate } from "../../types/blog.type"

export function getDefaultCardTemplate(): BlogCardTemplate[] {
    return [
        {
            id: "card-wrapper",
            type: "card-wrapper",
            className: "group flex flex-col h-full relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20",
            children: [
                {
                    id: "image-container",
                    type: "image-container",
                    aspectRatio: "16/10",
                    className: "relative w-full overflow-hidden flex-shrink-0",
                    children: [
                        {
                            id: "image",
                            type: "image",
                            className: "w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110",
                        },
                        {
                            id: "overlay",
                            type: "overlay",
                            className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500",
                        },
                        {
                            id: "badge",
                            type: "badge",
                            className: "absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg",
                        },
                        {
                            id: "labels",
                            type: "labels",
                            className: "absolute top-3 left-3 flex flex-wrap gap-2",
                        },
                        {
                            id: "metadata",
                            type: "metadata",
                            className: "absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500",
                        },
                    ],
                },
                {
                    id: "content",
                    type: "content",
                    className: "flex-1 flex flex-col p-5 space-y-3",
                    children: [
                        {
                            id: "title",
                            type: "title",
                            className: "font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 text-lg leading-tight",
                            lineClamp: 2,
                        },
                        {
                            id: "description",
                            type: "description",
                            className: "text-white/70 line-clamp-3 leading-relaxed text-sm flex-1",
                            lineClamp: 3,
                        },
                        {
                            id: "cta",
                            type: "cta",
                            className: "flex items-center gap-2 text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto",
                        },
                    ],
                },
            ],
        },
    ]
}

export function getFeaturedCardModifiers(): Record<string, string> {
    return {
        "card-wrapper": "group flex flex-col h-full relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20",
        "image-container": "relative w-full overflow-hidden flex-shrink-0",
        "content": "flex-1 flex flex-col p-6 lg:p-8 space-y-4",
        "title": "font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 text-xl lg:text-2xl leading-tight",
        "description": "text-white/70 line-clamp-4 leading-relaxed text-base lg:text-lg flex-1",
        "metadata": "absolute bottom-0 left-0 right-0 p-5 lg:p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500",
    }
}