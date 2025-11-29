// File: types/page.type.ts

export interface PageMetadata {
    title: string
    description: string
    keywords?: string
    ogImage?: string
    ogTitle?: string
    ogDescription?: string
    favicon?: string
    author?: string
    canonical?: string
    robots?: string
}

export interface PageData {
    path: string
    name: string
    serialize: string
    metadata: PageMetadata | null
}

export interface PublishedData {
    [key: string]: PageData
}

export interface BlockXElement {
    id: string
    type: 'heading' | 'text' | 'button' | 'image' | 'div' | 'container' | 'flex' | 'grid' | 'list' | 'icon' | 'badge' | 'card'
    content?: string
    className?: string
    style?: Record<string, string>
    level?: 1 | 2 | 3 | 4 | 5 | 6
    src?: string
    alt?: string
    href?: string  
    scrollTarget?: string  
    variant?: string
    items?: string[]
    children?: BlockXElement[]
}

export interface BuilderBlock {
    id: string
    type: string
    props?: Record<string, unknown>
}