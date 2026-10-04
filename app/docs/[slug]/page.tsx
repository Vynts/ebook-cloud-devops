import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChapterContent from "../../../src/components/chapter-content";
import { getAllChapters, getChapterBySlug } from "../../../src/lib/markdown";
import {
  openGraphImage,
  siteDescription,
  siteName,
  siteUrl,
} from "../../../src/lib/site";

export function generateStaticParams() {
  return getAllChapters().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Halaman tidak ditemukan",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const firstChapterSlug = getAllChapters()[0]?.slug;
  const canonicalPath =
    chapter.slug === firstChapterSlug ? "/" : `/docs/${chapter.slug}`;
  const description = chapter.description || siteDescription;
  const image = {
    url: openGraphImage,
    width: 1200,
    height: 630,
    alt: "Ebook gratis belajar Cloud Computing, Linux, AWS, dan DevOps",
  };

  return {
    title: chapter.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: new URL(canonicalPath, siteUrl).href,
      siteName,
      title: chapter.title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.title,
      description,
      images: [openGraphImage],
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  const chapters = getAllChapters();

  if (!chapter) {
    notFound();
  }

  return <ChapterContent chapter={chapter} chapters={chapters} />;
}
