import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.JWT_SECRET });
    const { pathname } = request.nextUrl; // Mendapatkan URL path

    if (!token && pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (token && pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|api|favicon.ico|auth).*)", // Lindungi semua halaman kecuali yang dikecualikan
    ],
}
