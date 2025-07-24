"use client";

import { useRef, useState } from "react";

interface Props {
  copy: string;
}

export const CopyToClipboard = ({ copy }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showLabel, setShowLabel] = useState<boolean>(false);

  const fallbackCopy = () => {
    try {
      const textarea = document.createElement("textarea");
      textarea.style.position = "fixed";
      textarea.value = copy;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (successful) {
        setCopied(true);
        timeoutRef.current = window.setTimeout(() => setCopied(false), 1200);
      } else {
        alert("Copy to clipboard is not supported on this browser.");
      }
    } catch {
      alert("Copy to clipboard failed.");
    }
  };

  const timeoutRef = useRef<number | null>(null);
  const handleCopy = async () => {
    if (typeof window === "undefined") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setCopied(false);
    }

    if (
      window.navigator &&
      window.navigator.clipboard &&
      typeof window.navigator.clipboard.writeText === "function"
    ) {
      try {
        await window.navigator.clipboard.writeText(copy);
        setCopied(true);
        timeoutRef.current = window.setTimeout(() => setCopied(false), 1200);
        return;
      } catch {
        fallbackCopy();
        return;
      }
    }

    fallbackCopy();
  };

  return (
    <button
      onClick={handleCopy}
      className="relative cursor-pointer rounded-full p-2 hover:bg-green-500/20"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onPointerLeave={() => setShowLabel(false)}
      onFocus={() => setShowLabel(true)}
      onBlur={() => setShowLabel(false)}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
      {showLabel && (
        <span className="fadeIn absolute top-[110%] left-1/2 -translate-x-1/2 rounded-lg bg-green-500/40 px-2 py-0.5 font-bold text-green-950 backdrop-blur-2xl">
          {copied ? "copied" : "copy"}
        </span>
      )}
    </button>
  );
};
