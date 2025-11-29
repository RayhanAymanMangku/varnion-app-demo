import { notFound } from "next/navigation";
import { getWebsiteBySubdomain, getPublishedDataFromGCS, getPageByPath } from "@/lib/website-service";
import { Metadata } from "next";
import { BuilderBlock } from "@/components/featured/public-blocks/types/blocks.type";
import { BlockRenderer } from "@/components/featured/public-blocks/components/block-renderer";

interface PageProps {
    params: {
        subdomain?: string; // Pastikan properti optional
        slug?: string[];
    };
}

export default async function SubdomainPage({ params }: PageProps) {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🚀 [PAGE-RENDER] Starting page render");

    try {
        const { subdomain: fullSubdomain, slug = [] } = params;

        // Validasi untuk fullSubdomain
        if (!fullSubdomain) {
            console.error("[PAGE-RENDER] ❌ Full subdomain is missing, returning 404");
            return notFound();
        }

        console.log("[PAGE-RENDER] Raw params:", { fullSubdomain, slug });

        const subdomain = typeof fullSubdomain === "string" && fullSubdomain.includes(".")
            ? fullSubdomain.split(".")[0]
            : fullSubdomain;

        console.log("[PAGE-RENDER] Parsed subdomain:", subdomain);

        const path = Array.isArray(slug) && slug.length > 0 ? `/${slug.join("/")}` : "/";

        console.log("[PAGE-RENDER] Constructed path:", path);

        // Proces website data
        const website = await getWebsiteBySubdomain(subdomain);

        if (!website) {
            console.log("[PAGE-RENDER] ❌ Website not found, returning 404");
            return notFound();
        }

        const publishedData = await getPublishedDataFromGCS(website.id);
        if (!publishedData) {
            console.log("[PAGE-RENDER] ❌ No published data, returning 404");
            return notFound();
        }

        const pageData = getPageByPath(publishedData, path);
        if (!pageData) {
            console.log("[PAGE-RENDER] ❌ Page not found, returning 404");
            return notFound();
        }

        let blocks: BuilderBlock[] = [];
        let canvasBackground = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"; // Default

        try {
            const parsed = JSON.parse(pageData.serialize);
            blocks = parsed.blocks || [];
            canvasBackground = parsed.canvasBackground || canvasBackground;

            console.log("[PAGE-RENDER] ✅ Parsed blocks count:", blocks.length);
            console.log("[PAGE-RENDER] Canvas background:", canvasBackground);
        } catch (error) {
            console.error("[PAGE-RENDER] ❌ Failed to parse serialize:", error);
            return notFound();
        }

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
        throw error;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const { subdomain: fullSubdomain, slug = [] } = params;

        if (!fullSubdomain) {
            console.error("[METADATA] ❌ Full subdomain is missing");
            return { title: "Not Found" };
        }

        const subdomain = typeof fullSubdomain === "string" && fullSubdomain.includes(".")
            ? fullSubdomain.split(".")[0]
            : fullSubdomain;

        const website = await getWebsiteBySubdomain(subdomain);
        if (!website) {
            console.error("[METADATA] ❌ Website not found");
            return { title: "Not Found" };
        }

        const path = Array.isArray(slug) && slug.length > 0 ? `/${slug.join("/")}` : "/";
        const publishedData = await getPublishedDataFromGCS(website.id);
        const pageData = getPageByPath(publishedData, path);

        if (!pageData || !pageData.metadata) {
            return {
                title: website.title,
                description: website.description,
            };
        }

        const meta = pageData.metadata;

        return {
            title: meta.title || pageData.name || website.title,
            description: meta.description || website.description,
            robots: meta.robots,
            icons: {
                icon: meta.favicon || "/favicon.ico",
            },
        };
    } catch (error) {
        console.error("[METADATA] Error:", error);
        return { title: "Error" };
    }
}