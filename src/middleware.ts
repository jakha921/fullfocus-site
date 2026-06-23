import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  normalizePath,
  stripLocaleFromPath,
} from "@/lib/routing";

const PUBLIC_PAGE_CACHE =
  "public, max-age=0, s-maxage=300, stale-while-revalidate=86400";

const PUBLIC_FILE = /\.(?:.*)$/;
const DYNAMIC_PREFIXES = ["/api", "/admin", "/login", "/report"];

function isPublicPageRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isPublicRouteRequest(pathname, request.method)) return false;
  return request.headers.get("accept")?.includes("text/html") ?? false;
}

function isPublicRouteRequest(pathname: string, method: string) {
  if (method !== "GET") return false;
  if (PUBLIC_FILE.test(pathname)) return false;
  if (DYNAMIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }
  return true;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  const { pathname } = request.nextUrl;

  if (host === "site.fullfocus.dev") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "fullfocus.dev";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  let response: NextResponse;
  const pathLocale = stripLocaleFromPath(pathname);

  if (
    pathLocale.hadLocalePrefix &&
    pathLocale.locale === defaultLocale &&
    isPublicRouteRequest(pathname, request.method)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathLocale.path;
    response = NextResponse.redirect(url, 301);
  } else if (
    pathLocale.hadLocalePrefix &&
    isLocale(pathLocale.locale) &&
    isPublicRouteRequest(pathname, request.method)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathLocale.path;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-fullfocus-locale", pathLocale.locale);
    requestHeaders.set("x-fullfocus-public-path", normalizePath(pathname));
    response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-fullfocus-locale", defaultLocale);
    requestHeaders.set("x-fullfocus-public-path", normalizePath(pathname));
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isPublicPageRequest(request)) {
    response.headers.set("Cache-Control", PUBLIC_PAGE_CACHE);
    response.headers.append("Vary", "Cookie");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
