import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/cms';
import { unsplash_tool } from '@/lib/unsplash';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl =
    article.imageUrl ||
    (article.imageQuery ? unsplash_tool(article.imageQuery) : unsplash_tool('curiosity kids learning'));
  const primaryTag = article.tags[0]?.name ?? 'ナレッジ';
  
  return (
    <Link href={`/why/${article.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-gray-100 gap-3">
        <div className="aspect-video overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="px-5 pt-0 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              #{primaryTag}
            </span>
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2 h-[3.5rem] leading-snug">
            {article.title}
          </h3>

          <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-3"></div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3 h-[4.5rem] leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
              もっとくわしく
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
