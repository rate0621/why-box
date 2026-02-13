import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata = {
  title: "お問い合わせ | なんでBOX",
  description: "なんでBOXへのお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          ホームに戻る
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">お問い合わせ</h1>

          <p className="text-gray-700 leading-relaxed">
            なんでBOXに関するご質問、ご意見、記事のリクエストなどがございましたら、以下のメールアドレスまでお気軽にご連絡ください。
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">メールでのお問い合わせ</h2>
            </div>
            <a href="mailto:chat.rate0621@gmail.com" className="text-blue-600 hover:underline text-lg">
              chat.rate0621@gmail.com
            </a>
          </div>

          <div className="text-gray-600 text-sm space-y-2">
            <p>※ お返事までにお時間をいただく場合がございます。</p>
            <p>※ すべてのお問い合わせにお返事できない場合がございます。あらかじめご了承ください。</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
