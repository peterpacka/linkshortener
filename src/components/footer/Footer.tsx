import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-x-8 gap-y-1">
      <Link
        className="text-neutral-500 hover:underline"
        href="https://github.com/peterpacka/linkshortener"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open source project
      </Link>
      <Link
        className="text-neutral-500 hover:underline"
        href="https://iampitr.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Build by Pitr
      </Link>
    </footer>
  );
};
