import { notFound } from "next/navigation";
import { getWebsiteBySubdomain, getPublishedDataFromGCS, getPageByPath } from "@/lib/website-service";
import { Metadata } from "next";
import { BlockRenderer } from "@/components/featured/public-blocks/components/block-renderer";
import { BuilderBlock } from "@/components/featured/public-blocks/types/blocks.type";

interface PageProps {
    params: {
        subdomain: string;
        slug?: string[];
    };
}

export default async function SubdomainPage({ params }: PageProps) {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🚀 [PAGE-RENDER] Starting page render");

    try {
        const { subdomain: fullSubdomain, slug = [] } = params;

        console.log("[PAGE-RENDER] Raw params:", { fullSubdomain, slug });

        const subdomain = fullSubdomain.includes(".")
            ? fullSubdomain.split(".")[0]
            : fullSubdomain;

        console.log("[PAGE-RENDER] Parsed subdomain:", subdomain);
        console.log("[PAGE-RENDER] Slug array:", slug);
        console.log("[PAGE-RENDER] Slug length:", slug.length);

        const website = await getWebsiteBySubdomain(subdomain);

        if (!website) {
            console.log("[PAGE-RENDER] ❌ Website not found, returning 404");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return notFound();
        }

        console.log("[PAGE-RENDER] ✅ Website found:", website.title);

        const publishedData = await getPublishedDataFromGCS(website.id);

        if (!publishedData) {
            console.log("[PAGE-RENDER] ❌ No published data, returning 404");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return notFound();
        }

        console.log("[PAGE-RENDER] ✅ Published data found");

        const path = slug.length === 0 ? "/" : `/${slug.join("/")}`;
        console.log("[PAGE-RENDER] Constructed path:", path);

        const pageData = getPageByPath(publishedData, path);

        if (!pageData) {
            console.log("[PAGE-RENDER] ❌ Page not found, returning 404");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return notFound();
        }

        console.log("[PAGE-RENDER] ✅ Page found:", pageData.name);

        let blocks: BuilderBlock[] = [];
        let canvasBackground = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"; // ✅ Default

        try {
            const parsed = JSON.parse(pageData.serialize);
            blocks = parsed.blocks || [];
            canvasBackground = parsed.canvasBackground || canvasBackground; // ✅ Get from serialize

            console.log("[PAGE-RENDER] ✅ Parsed blocks count:", blocks.length);
            console.log("[PAGE-RENDER] Canvas background:", canvasBackground);
            console.log("[PAGE-RENDER] Block types:", blocks.map((b) => b.type));
        } catch (error) {
            console.error("[PAGE-RENDER] ❌ Failed to parse serialize:", error);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return notFound();
        }

        console.log("[PAGE-RENDER] 🎉 Rendering page successfully");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return (
            <main
                className="min-h-screen w-full"
                style={{ background: canvasBackground }}
            >
                <BlockRenderer blocks={blocks} />
            </main>
        );
    } catch (error) {
        console.error("[PAGE-RENDER] ❌ Unexpected error:", error);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        throw error;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    console.log("━━━━━━━━ GENERATE METADATA ━━━━━━━━");

    try {
        const { subdomain: fullSubdomain, slug = [] } = params;

        const subdomain = fullSubdomain.includes(".")
            ? fullSubdomain.split(".")[0]
            : fullSubdomain;

        console.log("[METADATA] Subdomain:", subdomain);
        console.log("[METADATA] Slug:", slug);

        const website = await getWebsiteBySubdomain(subdomain);

        if (!website) {
            console.log("[METADATA] Website not found");
            return {
                title: "Not Found",
            };
        }

        const publishedData = await getPublishedDataFromGCS(website.id);

        if (!publishedData) {
            console.log("[METADATA] No published data");
            return {
                title: website.title,
                description: website.description,
            };
        }

        const path = slug.length === 0 ? "/" : `/${slug.join("/")}`;
        console.log("[METADATA] Path:", path);

        const pageData = getPageByPath(publishedData, path);

        if (!pageData) {
            console.log("[METADATA] Page not found");
            return {
                title: website.title,
                description: website.description,
            };
        }

        const meta = pageData.metadata;

        if (!meta) {
            console.log("[METADATA] No metadata found");
            return {
                title: pageData.name || website.title,
                description: website.description,
            };
        }

        console.log("[METADATA] Using metadata:", {
            title: meta.title,
            description: meta.description,
        });
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return {
            title: meta.title || pageData.name || website.title,
            description: meta.description || website.description,
            keywords: meta.keywords,
            authors: meta.author ? [{ name: meta.author }] : undefined,
            robots: meta.robots,
            openGraph: {
                title: meta.ogTitle || meta.title,
                description: meta.ogDescription || meta.description,
                images: meta.ogImage ? [meta.ogImage] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: meta.ogTitle || meta.title,
                description: meta.ogDescription || meta.description,
                images: meta.ogImage ? [meta.ogImage] : [],
            },
            alternates: {
                canonical: meta.canonical,
            },
            icons: {
                icon: meta.favicon || "/favicon.ico",
            },
        };
    } catch (error) {
        console.error("[METADATA] Error:", error);
        return {
            title: "Error",
        };
    }
}