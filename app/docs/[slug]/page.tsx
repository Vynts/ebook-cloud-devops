import { notFound } from "next/navigation";
import ChapterContent from "../../../src/components/chapter-content";
import { getAllChapters, getChapterBySlug } from "../../../src/lib/markdown";

export function generateStaticParams() {
  return getAllChapters().map(({ slug }) => ({ slug }));
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
