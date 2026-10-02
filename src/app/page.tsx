import { notFound } from 'next/navigation';
import ChapterContent from '../components/chapter-content';
import { getAllChapters, getChapterBySlug } from '../lib/markdown';

export default function Home() {
  const chapters = getAllChapters();
  const firstChapter = chapters[0]
    ? getChapterBySlug(chapters[0].slug)
    : null;

  if (!firstChapter) {
    notFound();
  }

  return <ChapterContent chapter={firstChapter} chapters={chapters} />;
}