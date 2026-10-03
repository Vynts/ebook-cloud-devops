import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import type { Chapter } from "../lib/markdown";

type ChapterMeta = Omit<Chapter, "content">;

export default function ChapterContent({
  chapter,
  chapters,
}: {
  chapter: Chapter;
  chapters: ChapterMeta[];
}) {
  const currentIndex = chapters.findIndex(({ slug }) => slug === chapter.slug);
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < chapters.length - 1
      ? chapters[currentIndex + 1]
      : null;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-950 text-slate-100">
      <Navbar currentTitle={chapter.title} />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <Sidebar chapters={chapters} currentSlug={chapter.slug} />
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain">
          <article className="markdown-content mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight]}
            >
              {chapter.content}
            </ReactMarkdown>
            <nav
              aria-label="Navigasi bab"
              className="chapter-navigation mt-12 flex items-stretch justify-between gap-4 border-t border-slate-800 pt-6"
            >
              {previousChapter ? (
                <Link
                  href={`/docs/${previousChapter.slug}`}
                  className="flex min-w-0 flex-col rounded-lg border border-slate-700 px-4 py-3 text-left text-white no-underline transition-colors hover:border-sky-500 hover:bg-slate-900 hover:text-white hover:no-underline"
                >
                  <span className="text-xs font-medium text-white">
                    &larr; Kembali
                  </span>
                  <span className="mt-1 truncate text-sm font-semibold text-white">
                    {previousChapter.title}
                  </span>
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex min-w-0 flex-col rounded-lg border border-slate-800 px-4 py-3 text-left text-white"
                >
                  <span className="text-xs font-medium">&larr; Kembali</span>
                  <span className="mt-1 text-sm">Bab pertama</span>
                </span>
              )}
              {nextChapter ? (
                <Link
                  href={`/docs/${nextChapter.slug}`}
                  className="flex min-w-0 flex-col rounded-lg border border-slate-700 px-4 py-3 text-right text-white no-underline transition-colors hover:border-sky-500 hover:bg-slate-900 hover:text-white hover:no-underline"
                >
                  <span className="text-xs font-medium text-white">
                    Lanjut &rarr;
                  </span>
                  <span className="mt-1 truncate text-sm font-semibold text-white">
                    {nextChapter.title}
                  </span>
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex min-w-0 flex-col rounded-lg border border-slate-800 px-4 py-3 text-right text-white"
                >
                  <span className="text-xs font-medium no-underline">Lanjut &rarr;</span>
                  <span className="mt-1 text-sm">Bab terakhir</span>
                </span>
              )}
            </nav>
          </article>
        </main>
      </div>
    </div>
  );
}
