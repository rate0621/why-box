import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "運営者情報 | なんでBOX",
  description: "なんでBOXの運営者情報です。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          ホームに戻る
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">運営者情報</h1>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="bg-blue-50 px-6 py-4 text-left text-gray-700 font-medium w-1/3">サイト名</th>
                  <td className="px-6 py-4 text-gray-700">なんでBOX</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-blue-50 px-6 py-4 text-left text-gray-700 font-medium">URL</th>
                  <td className="px-6 py-4 text-gray-700">
                    <a href="https://why-box.chatlatte.com" className="text-blue-600 hover:underline">https://why-box.chatlatte.com</a>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-blue-50 px-6 py-4 text-left text-gray-700 font-medium">サイト概要</th>
                  <td className="px-6 py-4 text-gray-700">子どもたちの「なんで？」「どうして？」という疑問に、わかりやすく答える教育メディアです。</td>
                </tr>
                <tr>
                  <th className="bg-blue-50 px-6 py-4 text-left text-gray-700 font-medium">お問い合わせ</th>
                  <td className="px-6 py-4 text-gray-700">
                    <Link href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</Link>よりお願いいたします
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
