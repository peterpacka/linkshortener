import { NextResponse } from "next/server";
import { ratelimit } from "./utils/ratelimit";

export async function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.endsWith("/json")) {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: "Rate limited",
          message: "Slow down buddy whos gonna pay for this requests? Not you!",
        },
        { status: 429 },
      );
    }
  }

  return NextResponse.next();
}
