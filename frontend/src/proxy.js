import { NextResponse } from "next/server";

const publicRoutes = [
    "/login"
];

const privateRoutes = [
    "/dashboard",
    "/tickets"
];

export function proxy(request) {
    const { pathname } = request.nextUrl;

    const isPublicRoute = publicRoutes.includes(pathname);

    const isPrivateRoute = privateRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    const hasSession = request.cookies.has("refresh_token");

    if (isPrivateRoute && !hasSession) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isPublicRoute && hasSession) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\..*$).*)"],
};
