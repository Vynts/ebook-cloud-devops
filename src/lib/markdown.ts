import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Chapter {
  slug: string;
  title: string;
  order: number;
  content: string;
}

type ChapterFile = Chapter & { fullPath: string };

function slugifyTitle(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function readChapterFile(fileName: string): ChapterFile {
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);
  const customMetadata = markdownContent.match(
    /^##[ \t]+title:[ \t]*(.+)\r?\n((?:[a-z][\w-]*:[^\r\n]*\r?\n)*)\r?\n/i,
  );
  const metadataTitle = customMetadata?.[1]
    .trim()
    .replace(/^(["'])(.*)\1$/, '$2');
  const content = customMetadata
    ? markdownContent.slice(customMetadata[0].length)
    : markdownContent;
  const headingTitle = content.match(/^#{1,6}[ \t]+(.+?)\s*#*\s*$/m)?.[1];
  const title =
    typeof data.title === 'string' && data.title.trim()
      ? data.title.trim()
      : metadataTitle || headingTitle || path.basename(fileName, '.md');
  const customOrder = customMetadata?.[2].match(/^order:[ \t]*(\d+)/im);
  const order =
    typeof data.order === 'number'
      ? data.order
      : customOrder
        ? Number(customOrder[1])
        : 99;

  return {
    fullPath,
    slug: slugifyTitle(title),
    title,
    order,
    content,
  };
}

function getChapterFiles(): ChapterFile[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(readChapterFile)
    .sort((a, b) => a.order - b.order);
}

export function getAllChapters(): Omit<Chapter, 'content'>[] {
  return getChapterFiles().map(({ slug, title, order }) => ({
    slug,
    title,
    order,
  }));
}

export function getChapterBySlug(slug: string): Chapter | null {
  const chapterFile = getChapterFiles().find((chapter) => chapter.slug === slug);
  if (!chapterFile) {
    return null;
  }

  return {
    slug: chapterFile.slug,
    title: chapterFile.title,
    order: chapterFile.order,
    content: chapterFile.content,
  };
}