import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
    const { pathname } = request.nextUrl

    const isAuthPage: boolean = ['/auth/sign-in', '/auth/sign-up'].includes(pathname)

    if (!token) {
        if (pathname !== '/' && !isAuthPage) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (isAuthPage || pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!_next|api|favicon.ico|auth).*)",
        "/auth/sign-in",
        "/auth/sign-up"
    ],
}
