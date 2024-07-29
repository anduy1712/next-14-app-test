import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.next();
  console.log('request');
}

export const config = {
  matcher: ["/", "/blog"],
};
