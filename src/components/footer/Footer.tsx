import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 space-x-8">
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
