import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const pathname = request.nextUrl.pathname;
    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'varnion-app.online';

    console.log('[MIDDLEWARE] hostname:', hostname);
    console.log('[MIDDLEWARE] pathname:', pathname);
    console.log('[MIDDLEWARE] mainDomain:', mainDomain);

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/assets') ||
        pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|css|js|json|xml|txt)$/)
    ) {
        console.log('[MIDDLEWARE] Skipping static/internal path:', pathname);
        return NextResponse.next();
    }

    if (hostname === mainDomain || hostname === `www.${mainDomain}`) {
        console.log('[MIDDLEWARE] Main domain, skip rewrite');
        return NextResponse.next();
    }

    const subdomain = hostname.replace(`.${mainDomain}`, '');

    console.log('[MIDDLEWARE] subdomain:', subdomain);
    console.log('[MIDDLEWARE] subdomain !== hostname:', subdomain !== hostname);

    if (subdomain && subdomain !== hostname && subdomain !== mainDomain) {
        const url = request.nextUrl.clone();
        url.pathname = `/site/${subdomain}${pathname}`;

        console.log('[MIDDLEWARE] Rewriting to:', url.pathname);
        return NextResponse.rewrite(url);
    }

    console.log('[MIDDLEWARE] No rewrite needed');
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|css|js)$).*)',
    ],
};