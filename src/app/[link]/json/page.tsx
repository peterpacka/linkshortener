import { connectDB } from "@/database/db";
import linkModel from "@/database/models/linkModel";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <main className="flex h-[100lvh] items-center justify-center">
      <section className="flex flex-col flex-wrap gap-2 px-4 text-center text-lg md:text-2xl">
        <span>id: {found._id.toString()}</span>
        <span>shorter: {found.shorter}</span>
        <span>
          url:{" "}
          <Link
            href={found.url}
            className="hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {found.url}
          </Link>
        </span>
        <span>created: {found.createdAt.toLocaleString()}</span>
      </section>
    </main>
  );
}
