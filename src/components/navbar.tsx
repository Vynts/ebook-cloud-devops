import Link from "next/link";

export default function Navbar({ currentTitle }: { currentTitle: string }) {
  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-3 sm:h-16 sm:gap-4 sm:px-6">
      <Link
        href="/"
        className="min-w-0 truncate text-sm font-bold text-sky-400 sm:text-lg"
      >
        Dasar Cloud Computing &amp; DevOps
      </Link>
      <nav
        aria-label="Navigasi utama"
        className="flex shrink-0 items-center gap-3 text-xs sm:min-w-0 sm:gap-4 sm:text-sm"
      >
        <Link
          href="/"
          className="shrink-0 text-slate-300 transition-colors hover:text-white sm:ml-1"
        >
          Beranda
        </Link>
        <span
          aria-current="page"
          className="hidden max-w-56 truncate border-l border-slate-700 pl-4 text-slate-400 md:block lg:max-w-sm"
        >
          {currentTitle}
        </span>
      </nav>
    </header>
  );
}
