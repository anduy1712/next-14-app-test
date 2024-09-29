import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const headers = new Headers(request.headers);
  const value = searchParams.get("value");
  headers.set("duyan-test-header", "hahahaha");
  console.log("middleware", pathname);

  if (pathname === "/vlog") {
    if (value) {
      console.log("value", value);
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // return NextResponse.redirect(new URL("/blog", request.url));
  }

  if (pathname === "/blog") {
    // return NextResponse.next();
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/blog", "/vlog"],
};
