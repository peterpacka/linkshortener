import { ShortLinkForm } from "@/components/home/ShortLinkForm";

export default function Home() {
  return (
    <main className="flex h-[100lvh] items-center justify-center">
      <section className="w-full max-w-lg">
        <ShortLinkForm />
      </section>
    </main>
  );
}
