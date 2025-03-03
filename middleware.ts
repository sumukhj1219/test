import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname;

                if (
                    pathname.startsWith("/api/auth") || 
                    pathname === "/login" || 
                    pathname === "/register" || 
                    pathname === "/"
                ) {
                    return true;
                }

                return !!token;
            }
        }
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/protected/:path*"]
};
