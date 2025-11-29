export interface BuilderBlock {
    id: string
    type: string
    props?: Record<string, unknown>
}

export interface NavbarLink {
    id?: string | number
    name: string
    href: string
}

export interface NavbarBlockProps {
    logoSrc?: string
    navLinks?: NavbarLink[]
    className?: string 
    background?: string
}

export interface HeroBlockProps {
    background?: string
    className?: string
    containerClass?: string
    content?: {
        badge?: string
        title?: string
        subtitle?: string
        ctaPrimary?: string
        ctaSecondary?: string
        mockupText?: string
    }
    elementClass?: {
        badge?: string
        title?: string
        subtitle?: string
        ctaPrimary?: string
        ctaSecondary?: string
        mockup?: string
        mockupText?: string
    }
    elementBackground?: Record<string, string>
}

export interface SectionBlockProps {
    background?: string
    className?: string
    containerClassName?: string
    content?: {
        title?: string
        body?: string
    }
    elementClass?: {
        title?: string
        body?: string
    }
    elementBackground?: Record<string, string>
}

export interface TextBlockProps {
    background?: string
    className?: string
    containerClassName?: string
    content?: {
        text?: string
    }
    elementClass?: {
        text?: string
    }
    elementBackground?: Record<string, string>
}

export interface FeatureItem {
    title: string
    desc: string
    icon?: string
}

export interface FeatureGridBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
    }
    elementClass?: {
        title?: string
    }
    elementBackground?: Record<string, string>
    items?: FeatureItem[]
}

export interface PricingPlan {
    name: string
    price: string
    features: string[]
    highlighted?: boolean
}

export interface PricingBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
        subtitle?: string
    }
    elementClass?: {
        title?: string
        subtitle?: string
    }
    elementBackground?: Record<string, string>
    plans?: PricingPlan[]
}

export interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
}

export interface TestimonialBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
    }
    elementClass?: {
        title?: string
    }
    elementBackground?: Record<string, string>
    testimonials?: TestimonialItem[]
}

export interface FaqItem {
    question: string
    answer: string
}

export interface FaqBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
    }
    elementClass?: {
        title?: string
    }
    elementBackground?: Record<string, string>
    items?: FaqItem[]
}

export interface ContactBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
        subtitle?: string
    }
    elementClass?: {
        title?: string
        subtitle?: string
    }
    elementBackground?: Record<string, string>
}

export interface StatItem {
    value: string
    label: string
    trend?: string
}

export interface StatsBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
    }
    elementClass?: {
        title?: string
    }
    elementBackground?: Record<string, string>
    stats?: StatItem[]
}

export interface CtaBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
        subtitle?: string
        button?: string
    }
    elementClass?: {
        title?: string
        subtitle?: string
        button?: string
    }
    elementBackground?: Record<string, string>
}

export interface GalleryImage {
    src: string
    alt: string
}

export interface GalleryBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
    }
    elementClass?: {
        title?: string
    }
    elementBackground?: Record<string, string>
    images?: GalleryImage[]
}

export interface TeamMember {
    name: string
    role: string
    avatar: string
    socials?: {
        linkedin?: string
        twitter?: string
        github?: string
    }
}

export interface TeamBlockProps {
    background?: string
    className?: string
    content?: {
        title?: string
        subtitle?: string
    }
    elementClass?: {
        title?: string
        subtitle?: string
    }
    elementBackground?: Record<string, string>
    members?: TeamMember[]
}

export interface BlockXProps {
    background?: string
    className?: string
    content?: {
        title?: string
        body?: string
    }
    elementClass?: {
        title?: string
        body?: string
    }
    elementBackground?: Record<string, string>
}

export interface ImageBlockProps {
    background?: string
    className?: string
    containerClassName?: string
    content?: {
        src?: string
        alt?: string
        caption?: string
        description?: string
    }
    elementClass?: {
        caption?: string
        image?: string
    }
    elementBackground?: Record<string, string>
}

export interface FooterLink {
    id: string
    name: string
    href: string
}

export interface FooterBlockProps {
    logoUrl?: string
    navLinks?: FooterLink[]
    copyright?: string
    privacyUrl?: string
    termsUrl?: string
    className?: string 
    background?: string
}