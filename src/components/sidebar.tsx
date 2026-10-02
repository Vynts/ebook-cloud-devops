import Link from 'next/link';

interface ChapterMeta {
  slug: string;
  title: string;
  order: number;
}

function ChapterLinks({
  chapters,
  currentSlug,
}: {
  chapters: ChapterMeta[];
  currentSlug?: string;
}) {
  return (
    <nav aria-label="Daftar bab" className="space-y-1">
      {chapters.map((chap) => {
        const isActive = chap.slug === currentSlug;
        return (
          <Link
            key={chap.slug}
            href={`/docs/${chap.slug}`}
            aria-current={isActive ? 'page' : undefined}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-sky-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {chap.title}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar({
  chapters,
  currentSlug,
}: {
  chapters: ChapterMeta[];
  currentSlug?: string;
}) {
  return (
    <>
      <details className="group relative z-20 shrink-0 border-b border-slate-800 bg-slate-900 text-slate-200 md:hidden">
        <summary className="flex h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-medium marker:hidden">
          Daftar Isi
          <span
            aria-hidden="true"
            className="text-slate-400 transition-transform group-open:rotate-180"
          >
            &#9662;
          </span>
        </summary>
        <div className="absolute left-0 right-0 top-full max-h-[min(50dvh,24rem)] overflow-y-auto overscroll-contain border-b border-slate-700 bg-slate-900 p-3 shadow-xl">
          <ChapterLinks chapters={chapters} currentSlug={currentSlug} />
        </div>
      </details>
      <aside className="hidden h-full w-64 shrink-0 overflow-y-auto overscroll-contain border-r border-slate-800 bg-slate-900 p-4 text-slate-200 md:block">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Daftar Isi
        </div>
        <ChapterLinks chapters={chapters} currentSlug={currentSlug} />
      </aside>
    </>
  );
}
