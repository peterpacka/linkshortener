import { connectDB } from "@/database/db";
import linkModel from "@/database/models/linkModel";
import { redis } from "@/utils/redis";
import { notFound, permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    link: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { link } = await params;

  if (link.length !== 6) {
    return notFound();
  }

  const cachedResult = await redis.get(`short:${link}`);
  if (cachedResult) {
    return permanentRedirect(cachedResult as string);
  }

  let found;
  try {
    await connectDB();
    found = await linkModel.findOne({ shorter: link });
  } catch (error) {
    console.error(error);
    return notFound();
  }

  if (!found) {
    return notFound();
  }

  await redis.set(`short:${link}`, found.url, { ex: 3600 });
  return permanentRedirect(`${found.url}`);
}
