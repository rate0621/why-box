import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/cms';

// 12時間ごとに再生成（ISR）
export const revalidate = 43200; // 12時間 = 43200秒

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const articles = await getArticles();

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/why/${article.id}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
  ];
}
