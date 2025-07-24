import { connectDB } from "@/database/db";
import linkModel from "@/database/models/linkModel";
import { generateShorter } from "@/utils/generateShorter";
import { ratelimit } from "@/utils/ratelimit";
import { redis } from "@/utils/redis";
import { validateRecaptha } from "@/utils/validateRecaptcha";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : null;

  if (!ip) {
    return NextResponse.json(
      {
        success: false,
        error: "Bad request",
      },
      { status: 400 },
    );
  }

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limited",
      },
      { status: 429 },
    );
  }

  const { link, recaptchaToken } = await req.json();

  if (!recaptchaToken || typeof recaptchaToken !== "string") {
    return NextResponse.json(
      {
        success: false,
        error: "Recaptcha failed",
      },
      { status: 400 },
    );
  }

  const validRecaptcha = await validateRecaptha(recaptchaToken);

  if (!validRecaptcha) {
    return NextResponse.json(
      {
        success: false,
        error: "Recaptcha failed",
      },
      { status: 400 },
    );
  }

  if (!link || typeof link !== "string" || !link.trim()) {
    return NextResponse.json(
      {
        success: false,
        error: "Enter valid link to shorten",
      },
      { status: 400 },
    );
  }

  const url = new URL(link.trim());
  const hasDomain = !!url.hostname && url.hostname.includes(".");
  const isHttp = url.protocol === "http:" || url.protocol === "https:";
  const normalizedUrl = url.href.toLowerCase().replace(/\/$/, "");

  if (
    !url ||
    !isHttp ||
    !hasDomain ||
    normalizedUrl.startsWith("javascript:")
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Enter valid link to shorten",
      },
      { status: 400 },
    );
  }

  if (url.href.includes(BASE_URL)) {
    return NextResponse.json(
      {
        success: false,
        error: "You cannot shorten a link that is already shortened",
      },
      { status: 409 },
    );
  }

  // FIND CACHE
  const cachedShort = await redis.get<string>(`short:${link}`);
  if (cachedShort) {
    return NextResponse.json(
      {
        success: true,
        newLink: `${BASE_URL}/${cachedShort}`,
      },
      { status: 200 },
    );
  }

  try {
    await connectDB();

    // Check if the same url is in db and give already existing shorter
    const found = await linkModel.findOne({ url: link });
    if (found) {
      // REDIS CACHE
      const shortUrl = `${BASE_URL}/${found.shorter}`;
      await redis.set(`short:${found.shorter}`, link, { ex: 3600 });
      await redis.set(`short:${link}`, `${found.shorter}`, {
        ex: 3600,
      });

      return NextResponse.json(
        {
          success: true,
          newLink: shortUrl,
        },
        { status: 200 },
      );
    }

    // Create new shorter
    const shorter = generateShorter();
    const newLink = await linkModel.create({
      shorter: shorter,
      url: link,
    });
    await newLink.save();

    // REDIS CACHE
    const shortUrl = `${BASE_URL}/${newLink.shorter}`;
    await redis.set(`short:${shorter}`, link, { ex: 3600 });
    await redis.set(`short:${link}`, `${shorter}`, {
      ex: 3600,
    });

    return NextResponse.json(
      {
        success: true,
        newLink: shortUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
