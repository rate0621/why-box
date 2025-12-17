import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenCheck, Sparkles, SunMedium } from "lucide-react";

import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getArticleById, getArticles } from "@/lib/cms";
import type { ArticleDetailSection } from "@/lib/cms";
import { unsplash_tool } from "@/lib/unsplash";

// ISR: 1時間ごとに記事を再取得
export const revalidate = 3600;

// 動的ルートの静的生成
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const article = await getArticleById(params.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  if (!article) {
    return {
      title: "記事が見つかりませんでした"
    };
  }

  const ogImage = article.imageUrl || (article.imageQuery ? unsplash_tool(article.imageQuery) : `${siteUrl}/opengraph-image`);

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      type: "article",
      url: `${siteUrl}/why/${article.id}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      tags: article.tags.map(tag => tag.name),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage]
    }
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const relatedSource = await getArticles();
  const primaryTagId = article.tags[0]?.id;

  const relatedArticles = relatedSource
    .filter((related) => {
      if (related.id === article.id) {
        return false;
      }
      if (!primaryTagId) {
        return true;
      }
      return related.tags.some((tag) => tag.id === primaryTagId);
    })
    .slice(0, 3);

  const primaryTag = article.tags[0]?.name ?? "ナレッジ";

  const heroImage = article.imageUrl || (article.imageQuery ? unsplash_tool(article.imageQuery) : undefined);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: heroImage || `${siteUrl}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'なんでBOX',
    },
    publisher: {
      '@type': 'Organization',
      name: 'なんでBOX',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.svg`,
      },
    },
    keywords: article.keywords.join(', '),
    articleSection: article.tags.map(tag => tag.name).join(', '),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          記事一覧に戻る
        </Link>

        <div className="space-y-6">
          <section className="bg-white/80 rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
            {heroImage ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={heroImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video border border-dashed border-gray-300 bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center text-gray-400">
                <SunMedium className="w-12 h-12 mb-2" />
                イメージを準備中
              </div>
            )}
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                #{primaryTag}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{article.title}</h1>
              <p className="text-gray-600 border-l-4 border-blue-400 pl-4 py-2 bg-blue-50 rounded-r-lg">
                {article.excerpt}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">もっと詳しく！</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100/60">
              {article.sections.length ? (
                article.sections.map((section, index) => (
                  <div key={`${section.heading}-${index}`} className="mb-8 last:mb-0">
                    <h3 className="mb-4 text-gray-900 flex items-center gap-3 text-base font-semibold">
                      <span className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full">
                        {index + 1}
                      </span>
                      {section.heading}
                    </h3>
                    <div className="pl-12">
                      <SectionContent
                        section={section}
                        className="text-gray-700 leading-relaxed text-sm md:text-base"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">本文を準備中です。</p>
              )}

              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                <h3 className="mb-3 text-gray-900 flex items-center gap-2 text-base font-semibold">
                  <span>💡</span>
                  まとめ
                </h3>
                <p className="text-gray-700 text-sm md:text-base">{article.excerpt}</p>
              </div>
            </div>
          </section>

          {article.keywords.length ? (
            <section className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">キーワード</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {relatedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                関連する質問
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

function SectionContent({ section, className }: { section: ArticleDetailSection; className?: string }) {
  if (section.isHtml) {
    return (
      <div
        className={`article-content text-sm text-gray-700 leading-relaxed [&_p]:mb-1.5 [&_strong]:text-gray-900 ${className ?? ""}`}
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    );
  }

  return (
    <p className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line ${className ?? ""}`}>
      {section.content}
    </p>
  );
}
