import { NextRequest, NextResponse } from "next/server";

import { getServerUser } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/auth/role";

const protectedClientRoutes = ["/portal"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedClient = protectedClientRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedClient && !isAdminRoute) {
    return NextResponse.next();
  }

  const { user } = await getServerUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = await getUserRole(user.id);

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};

