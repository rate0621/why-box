import { ArticleExplorer } from "@/components/ArticleExplorer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getArticles } from "@/lib/cms";

// ISR: 1時間ごとに記事を再取得
export const revalidate = 3600;

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ArticleExplorer articles={articles} />
      <Footer />
    </div>
  );
}
