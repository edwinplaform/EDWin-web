import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export default async function middleware (req) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    const {pathname} = req.nextUrl;

    const publicRoutes = ['/', '/login', '/signup', '/tutor/signup'];
    if (publicRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.startsWith('/tutor') && token.role !== 'TUTOR') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/student') && token.role !== 'STUDENT') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/portal') && token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (token.role === 'TUTOR' && !token.isOnboarding && !pathname.startsWith('/tutor/onboarding')) {
        return NextResponse.redirect(new URL('/tutor/onboarding', req.url));
    }

    if (token.role === 'STUDENT' && !token.isOnboarding && !pathname.startsWith('/student/onboarding')) {
        return NextResponse.redirect(new URL('/student/onboarding', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/webhook).*)',
    ],
};