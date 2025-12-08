import Link from 'next/link';
import { Clock, Eye } from 'lucide-react';
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
    <Link href={`/blogs/${article.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-gray-100">
        <div className="aspect-video overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              #{primaryTag}
            </span>
          </div>
          
          <h3 className="mb-2 text-gray-900 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
