import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg">
              <span className="text-7xl">🤔</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            あれれ？ページが見つからないよ
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              <Home className="w-5 h-5" />
              ホームに戻る
            </Link>
            <Link
              href="/#popular"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-700 font-medium border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              <Search className="w-5 h-5" />
              記事をさがす
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
