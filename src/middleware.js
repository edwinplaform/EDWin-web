import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export default async function middleware(req) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    const {pathname} = req.nextUrl;

    // Allow public routes (e.g., login, signup, home)
    const publicRoutes = ['/', '/login', '/signup', '/tutor/signup', '/contact-us', '/become-tutor','/tutors', /^\/tutors\/[^/]+$/];
    const onboardingRoutes = ['/tutor/onboarding', '/student/onboarding'];

    if (publicRoutes.some(route => typeof route === 'string' ? route === pathname : route.test(pathname))) {
        return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if user is accessing a protected `/portal/*` route
    if (pathname.startsWith('/portal')) {
        // Redirect tutors to onboarding if they haven't completed it
        if (token.role === 'TUTOR' && !token.isOnboarding) {
            return NextResponse.redirect(new URL('/tutor/onboarding', req.url));
        }

        // Redirect students to onboarding if they haven't completed it
        if (token.role === 'STUDENT' && !token.isOnboarding) {
            return NextResponse.redirect(new URL('/student/onboarding', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:png|jpg|svg)).*)",
    ],
};

