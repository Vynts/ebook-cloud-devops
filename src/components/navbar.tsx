import Link from "next/link";
import Image from "next/image";
import SearchModal from "./search-modal";
import type { ChapterSearchItem } from "../lib/markdown";

export default function Navbar({
  searchItems,
}: {
  searchItems: ChapterSearchItem[];
}) {
  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-3 sm:h-16 sm:gap-4 sm:px-6">
      <Link
        href="/"
        className="flex min-w-0 items-center gap-2 text-sm font-bold sm:gap-3 sm:text-lg"
      >
        <Image
          src="/images/icons.png"
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
          className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
        />
        <span className="truncate">Dasar Cloud Computing &amp; DevOps</span>
      </Link>
      <nav
        aria-label="Navigasi utama"
        className="flex min-w-0 shrink-0 items-center gap-2 md:gap-3"
      >
        <div className="hidden items-center gap-2 md:flex">
          <div className="inline-flex h-9 shrink-0 items-center overflow-hidden rounded-md border border-slate-700 bg-slate-900">
            <a
              href="https://github.com/Vynts/ebook-cloud-devops"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-full items-center px-4 text-sm text-slate-200"
            >
              Repository
            </a>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=Vynts&repo=ebook-cloud-devops&type=star&count=true"
              title="Star ebook-cloud-devops di GitHub"
              width="80"
              height="20"
              loading="lazy"
              className="block border-0"
            />
          </div>
          <div className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 px-1">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=Vynts&type=follow&count=false"
              title="Follow Vynts di GitHub"
              width="105"
              height="20"
              loading="lazy"
              className="block border-0"
            />
          </div>
        </div>
        <SearchModal searchItems={searchItems} />
      </nav>
    </header>
  );
}
