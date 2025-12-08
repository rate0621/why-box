import { ArticleExplorer } from "@/components/ArticleExplorer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getArticles } from "@/lib/cms";

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
