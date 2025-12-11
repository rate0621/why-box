"use client";

import { Lightbulb } from "lucide-react";
import type { Article } from "@/lib/cms";
import { ArticleCard } from "./ArticleCard";

interface ArticleExplorerProps {
  articles: Article[];
}

export function ArticleExplorer({ articles }: ArticleExplorerProps) {
  const hasArticles = articles.length > 0;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8" id="top">
      <div className="text-center py-12">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg">
          <Lightbulb className="w-10 h-10 text-white fill-white" />
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-xl">?</span>
          </div>
        </div>
        <h1 className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          なんでBOX
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          子どもたちの「なんで？」を楽しく解き明かす、明るい学びのメディアです。
        </p>
      </div>

      <div className="mb-8" id="popular">
        <h2 className="mb-6 text-gray-700">
          すべての疑問
          <span className="ml-2 text-gray-500">({articles.length}件)</span>
        </h2>

        {hasArticles ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">🔍</div>
            <p className="text-gray-500">記事が見つかりませんでした</p>
          </div>
        )}
      </div>
    </main>
  );
}
