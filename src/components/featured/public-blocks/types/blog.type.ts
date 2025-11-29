export interface BlogLabel {
    id: string
    name: string
}

export interface BlogLabelRelation {
    label: BlogLabel
}

export interface BlogData {
    id: string
    websiteId: string
    title: string
    slug: string
    description: string
    content: string
    thumbnail: string | null
    author: string
    publishDate: string
    status: 'draft' | 'published'
    labels?: BlogLabelRelation[]
    createdAt: string
    updatedAt: string
}

export interface BlogCardTemplate {
    id: string
    type: "card-wrapper" | "image-container" | "image" | "overlay" | "badge" | "labels" | "metadata" | "content" | "title" | "description" | "cta"
    className?: string
    style?: Record<string, string>
    aspectRatio?: string
    lineClamp?: number
    children?: BlogCardTemplate[]
}

export interface PaginationMeta {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
}