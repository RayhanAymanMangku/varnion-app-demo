import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getWebsiteBySubdomain, getPublishedDataFromGCS, getPageByPath } from '@/lib/website-service'
import { BlockRenderer } from '@/components/featured/public-blocks/components/block-renderer'
import { BuilderBlock } from '@/components/featured/public-blocks/types/page.type'

interface BlogDetailPageProps {
    params: Promise<{
        subdomain: string
        slug: string
    }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
    const { subdomain, slug } = await params

    console.log('━━━━━━━━ GENERATE METADATA ━━━━━━━━')
    console.log('[METADATA] Subdomain:', subdomain)
    console.log('[METADATA] Slug:', slug)

    const parsedSubdomain = subdomain.includes('. ') ? subdomain.split('.')[0] : subdomain
    const website = await getWebsiteBySubdomain(parsedSubdomain)

    if (!website) {
        return { title: 'Blog Not Found' }
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/blog/${website.id}/${slug}`,
            {
                next: { revalidate: 60 },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (response.ok) {
            const data = await response.json()
            const blog = data.data

            console.log('[METADATA] ✅ Blog found:', blog.title)

            return {
                title: blog.title,
                description: blog.description,
                openGraph: {
                    title: blog.title,
                    description: blog.description,
                    images: blog.thumbnail ? [blog.thumbnail] : [],
                    type: 'article',
                    authors: [blog.author],
                },
                twitter: {
                    card: 'summary_large_image',
                    title: blog.title,
                    description: blog.description,
                    images: blog.thumbnail ? [blog.thumbnail] : [],
                },
            }
        }
    } catch (error) {
        console.error('[METADATA] Failed to fetch blog:', error)
    }

    return {
        title: `Blog - ${website.title}`,
        description: website.description,
    }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { subdomain, slug } = await params

    console.log('━━━━━━━━ BLOG DETAIL PAGE ━━━━━━━━')
    console.log('[PAGE] Subdomain:', subdomain)
    console.log('[PAGE] Slug:', slug)

    const parsedSubdomain = subdomain.includes('.') ? subdomain.split('.')[0] : subdomain
    const website = await getWebsiteBySubdomain(parsedSubdomain)

    if (!website) {
        console.log('[PAGE] ❌ Website not found')
        return notFound()
    }

    console.log('[PAGE] ✅ Website found:', website.title)
    console.log('[PAGE] Website ID:', website.id)

    const publishedData = await getPublishedDataFromGCS(website.id)

    if (!publishedData) {
        console.log('[PAGE] ❌ No published data')
        return notFound()
    }

    const pageData = getPageByPath(publishedData, '/blog-detail')

    if (!pageData) {
        console.log('[PAGE] ❌ Blog detail template not found')
        return notFound()
    }

    console.log('[PAGE] ✅ Blog detail template found')

    let blocks: BuilderBlock[] = []

    try {
        const parsed = JSON.parse(pageData.serialize)
        blocks = parsed.blocks || []
        console.log('[PAGE] ✅ Parsed blocks count:', blocks.length)
        console.log('[PAGE] Block types:', blocks.map(b => b.type))
    } catch (error) {
        console.error('[PAGE] ❌ Failed to parse serialize:', error)
        return notFound()
    }

    console.log('[PAGE] 🎉 Rendering with', blocks.length, 'blocks')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return (
        <main className="min-h-screen">
            <BlockRenderer blocks={blocks} />
        </main>
    )
}