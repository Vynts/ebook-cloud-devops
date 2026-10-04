import type { MetadataRoute } from "next";
import { getAllChapters } from "../src/lib/markdown";
import { siteUrl } from "../src/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getAllChapters();
  const firstChapterSlug = chapters[0]?.slug;

  return [
    {
      url: siteUrl.href,
      priority: 1,
    },
    ...chapters
      .filter(({ slug }) => slug !== firstChapterSlug)
      .map(({ slug }) => ({
        url: new URL(`/docs/${slug}`, siteUrl).href,
        priority: 0.8,
      })),
  ];
}
