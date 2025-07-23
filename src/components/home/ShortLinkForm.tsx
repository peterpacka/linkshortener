"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

export const ShortLinkForm = () => {
  const [link, setLink] = useState<string>("");
  const oldLink = useRef<string>("");
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateLink = (link: string) => {
    if (typeof link !== "string" || !link || !link.trim()) {
      return false;
    }

    try {
      const url = new URL(link.trim());
      const hasDomain = !!url.hostname && url.hostname.includes(".");
      const isHttp = url.protocol === "http:" || url.protocol === "https:";
      return isHttp && hasDomain;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateLink(link)) return;

    if (error) setError("");
    setPending(true);

    oldLink.current = link;
    const request = await fetch("/api/short", {
      method: "POST",
      body: JSON.stringify({ link }),
    });

    const response = await request.json();

    if (!response.success) {
      setPending(false);
      setError(response.error);
      return;
    }

    setGeneratedLink(response.newLink);
    setPending(false);
  };

  return (
    <div className="space-y-4 p-6">
      <form
        onSubmit={handleSubmit}
        className={`relative ${pending && "pointer-events-none opacity-50"}`}
      >
        <input
          onChange={(e) => setLink(e.target.value)}
          className={`peer min-h-[3rem] w-full rounded-xl bg-gray-300/95 p-4 text-lg ring-2 ring-neutral-400 outline-0 transition-all duration-100 not-placeholder-shown:pt-6 focus:pt-6 ${validateLink(link) === true ? "focus:ring-green-900" : "focus:ring-blue-900"}`}
          type="text"
          placeholder=" "
          disabled={pending}
        />
        <label className="pointer-events-none absolute left-4 -translate-y-1/2 text-sm text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:top-4 peer-not-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-focus:top-4 peer-focus:text-base">
          Enter URL
        </label>
        <button
          disabled={!validateLink(link) || pending}
          className="text-background absolute top-1/2 right-3 grid min-h-[2.1rem] min-w-[3.5rem] -translate-y-1/2 place-content-center rounded-xl bg-neutral-600 px-2 py-1 text-lg font-bold transition-all duration-100 not-disabled:cursor-pointer not-disabled:bg-green-900 not-disabled:hover:scale-[1.05] not-disabled:hover:bg-green-900/90 not-disabled:active:scale-[0.98]"
          type="submit"
        >
          {pending ? <div className="loading-spinner" /> : "short"}
        </button>
      </form>
      {generatedLink && !pending && !error && (
        <div className="fadeIn flex flex-col bg-green-100 p-2">
          <span className="text-neutral-700/80">
            {oldLink.current.slice(0, 25)}
            {oldLink.current.length > 25 && "..."}{" "}
            <svg
              className="inline-block"
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
              <path d="m10 15 5 5 5-5" />
              <path d="M4 4h7a4 4 0 0 1 4 4v12" />
            </svg>
          </span>
          <Link
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center text-lg text-green-900 hover:text-green-900/80 hover:underline"
          >
            {generatedLink}
          </Link>
        </div>
      )}
      {error && (
        <div className="fadeIn flex flex-col bg-red-100 p-2">{error}</div>
      )}
    </div>
  );
};
