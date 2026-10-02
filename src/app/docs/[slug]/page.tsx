import { notFound } from 'next/navigation';
import ChapterContent from '../../../components/chapter-content';
import { getAllChapters, getChapterBySlug } from '../../../lib/markdown';

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((chap: { slug: string }) => ({
    slug: chap.slug,
  }));
}

export default async function ChapterPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  const chapters = getAllChapters();

  if (!chapter) {
    notFound();
  }

  return <ChapterContent chapter={chapter} chapters={chapters} />;
}