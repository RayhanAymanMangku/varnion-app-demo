import { PageData, PublishedData } from '@/components/featured/public-blocks/types/page.type';
import prisma from './prisma';

export async function getWebsiteBySubdomain(subdomain: string) {
    console.log('━━━━━━━━ GET WEBSITE BY SUBDOMAIN ━━━━━━━━');
    console.log('[WEBSITE] Input subdomain:', subdomain);

    try {
        const accessDomain = await prisma.accessDomain.findFirst({
            where: {
                name: subdomain,
                type: 'subdomain',
            },
        });

        if (!accessDomain) {
            console.log('[WEBSITE] ❌ Access domain not found for:', subdomain);
            return null;
        }

        console.log('[WEBSITE] ✅ Access domain found:', accessDomain.id);

        const website = await prisma.website.findUnique({
            where: {
                id: accessDomain.websiteId,
            },
        });

        if (!website) {
            console.log('[WEBSITE] ❌ Website not found');
            return null;
        }

        console.log('[WEBSITE] ✅ Website found:', website.title);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        return {
            id: website.id,
            title: website.title,
            description: website.desc || '',
        };
    } catch (error) {
        console.error('[WEBSITE] ❌ Database error:', error);
        return null;
    }
}

export async function getPublishedDataFromGCS(websiteId: string): Promise<PublishedData> {
    const BUCKET = process.env.NEXT_PUBLIC_GCS_BUCKET || 'v3-varnion-cms';
    const filePath = `${websiteId}/published/data.json`;
    const timestamp = Date.now();
    const url = `https://storage.googleapis.com/${BUCKET}/${filePath}?nocache=${timestamp}`;

    console.log('[GCS] Full URL:', url);

    const response = await fetch(url, {
        cache: 'no-store',
        next: { revalidate: 0 },
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
        },
    });

    if (!response.ok) {
        console.error('[GCS] ❌ Fetch failed:', response.status);
        throw new Error(`Failed to fetch from GCS: ${response.status}`);
    }

    console.log('[GCS] Response status:', response.status);
    console.log('[GCS] Response headers:', Object.fromEntries(response.headers.entries()));

    const data: PublishedData = await response.json();

    console.log('[GCS] ✅ Data fetched successfully');
    console.log('[GCS] Available pages:', Object.keys(data));
    console.log('[GCS] Page details:');
    Object.entries(data).forEach(([key, value]: [string, PageData]) => {
        console.log(`- ${key}: ${value.path} (${value.name})`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return data;
}

export function getPageByPath(publishedData: PublishedData, path: string): PageData | null {
    console.log('━━━━━━━━ GET PAGE BY PATH ━━━━━━━━');
    console.log('[PAGE] Requested path:', path);
    console.log('[PAGE] Available keys:', Object.keys(publishedData));

    let normalizedPath = path.trim();

    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }

    if (!normalizedPath.startsWith('/')) {
        normalizedPath = '/' + normalizedPath;
    }

    console.log('[PAGE] Normalized path:', normalizedPath);

    const key = normalizedPath === '/' ? 'index' : normalizedPath.replace(/^\//, '').replace(/\//g, '_');

    console.log('[PAGE] Looking for key:', key);

    const pageData = publishedData[key];

    if (pageData) {
        console.log('[PAGE] ✅ Found page:', pageData.name);
        console.log('[PAGE] Page path:', pageData.path);
    } else {
        console.log('[PAGE] ❌ Page not found for key:', key);
        console.log('[PAGE] Available pages:');
        Object.entries(publishedData).forEach(([k, v]: [string, PageData]) => {
            console.log(`  - ${k}: ${v.path} (${v.name})`);
        });
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return pageData || null;
}