"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ChapterSearchItem } from "../lib/markdown";

export default function SearchModal({
  searchItems,
}: {
  searchItems: ChapterSearchItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return [];

    const terms = normalizedQuery.split(/\s+/);
    return searchItems.flatMap((item) => {
      const content = item.content
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[#*_`>-]/g, " ")
        .replace(/\s+/g, " ");
      const normalizedContent = content.toLocaleLowerCase();
      const searchableText = `${item.title} ${content}`.toLocaleLowerCase();
      if (!terms.every((term) => searchableText.includes(term))) return [];

      const matchTerm = terms.find((term) => normalizedContent.includes(term));
      const matchIndex = matchTerm ? normalizedContent.indexOf(matchTerm) : -1;
      const excerpt =
        matchIndex < 0
          ? ""
          : `${matchIndex > 70 ? "..." : ""}${content.slice(
              Math.max(0, matchIndex - 70),
              matchIndex + 130,
            )}${matchIndex + 130 < content.length ? "..." : ""}`;

      return [{ slug: item.slug, title: item.title, excerpt }];
    }).slice(0, 10);
  }, [query, searchItems]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Cari materi"
        className="flex h-9 w-36 shrink-0 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 text-left text-sm text-slate-400 sm:w-56"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="m13 13 4 4" />
        </svg>
        <span className="truncate">Cari materi...</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
          Ctrl K
        </kbd>
      </button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-label="Pencarian materi"
              className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 px-4">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <path d="m13 13 4 4" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  placeholder="Cari di seluruh materi..."
                  aria-label="Cari di seluruh materi"
                  className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <kbd className="rounded border border-slate-700 px-1.5 py-0.5 text-xs text-slate-400">Esc</kbd>
              </div>
              <div className="max-h-[60dvh] overflow-y-auto p-2">
                {!query.trim() && (
                  <p className="px-3 py-8 text-center text-sm text-slate-500">
                    Ketik kata kunci untuk mencari di judul dan isi materi.
                  </p>
                )}
                {query.trim() && results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-slate-500">
                    Tidak ada materi yang cocok.
                  </p>
                )}
                {results.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/docs/${result.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-3 text-slate-200 transition-colors hover:bg-slate-800"
                  >
                    <span className="block text-sm font-medium">{result.title}</span>
                    {result.excerpt && (
                      <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                        {result.excerpt}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
