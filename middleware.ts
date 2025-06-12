import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/lib/auth";

const authRoutes = ["/sign-in", "/sign-up"];


export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);


  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session) {
    if (isAuthRoute ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute ) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/server", 
    "/api/me", 
    "/admin/:path*", 
    "/sign-in",
    "/onboarding",

  ], 
};
