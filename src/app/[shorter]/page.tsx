import { connectDB } from "@/database/db";
import linkModel from "@/database/models/linkModel";
import { redis } from "@/utils/redis";
import { notFound, permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    shorter: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { shorter } = await params;

  if (shorter.length !== 6) {
    return notFound();
  }

  const cachedResult = await redis.get(`short:${shorter}`);
  if (cachedResult) {
    return permanentRedirect(cachedResult as string);
  }

  let found;
  try {
    await connectDB();
    found = await linkModel.findOne({ shorter: shorter });
  } catch (error) {
    console.error(error);
    return notFound();
  }

  if (!found) {
    return notFound();
  }

  await redis.set(`short:${shorter}`, found.url, { ex: 3600 });
  return permanentRedirect(`${found.url}`);
}
