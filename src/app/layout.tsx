import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "link shortener – free & fast URL shortener",
  description:
    "Shorten your long URLs instantly and securely with link shortener. Fast, reliable, and open source link shortening for everyone.",
  keywords: [
    "url shortener",
    "link shortener",
    "shorten url",
    "free url shortener",
    "secure link",
  ],
  authors: [{ name: "Peter Packa" }],
  creator: "iampitrdev",
  openGraph: {
    title: "link shortener – free & fast URL shortener",
    description:
      "Shorten your long URLs instantly and fastly with link shortener. you can use /json behind link to know where it redirects",
    url: "https://short.iampitrproject.xyz",
    siteName: "link shorter",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
