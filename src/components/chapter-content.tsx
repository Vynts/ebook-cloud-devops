import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
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
          </article>
        </main>
      </div>
    </div>
  );
}
