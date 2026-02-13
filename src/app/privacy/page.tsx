import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "プライバシーポリシー | なんでBOX",
  description: "なんでBOXのプライバシーポリシーについてご説明します。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          ホームに戻る
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">プライバシーポリシー</h1>
          <p className="text-gray-600 text-sm">最終更新日: 2026年2月13日</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">1. はじめに</h2>
            <p className="text-gray-700 leading-relaxed">
              なんでBOX（以下「当サイト」）は、お客様のプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、当サイトにおける情報の取り扱いについて説明するものです。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">2. 収集する情報</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、Google Analytics等のアクセス解析ツールを使用しており、アクセスログ（IPアドレス、ブラウザ情報、閲覧ページ等）を自動的に収集する場合があります。これらの情報は個人を特定するものではありません。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">3. Cookieの使用</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、ユーザー体験の向上やアクセス解析のためにCookieを使用しています。また、Google AdSense等の広告配信サービスを利用しており、第三者がCookieを使用して広告を配信する場合があります。ユーザーはブラウザの設定によりCookieの受け取りを拒否することができます。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">4. 広告について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、第三者配信の広告サービス（Google AdSense）を利用する予定です。広告配信事業者は、ユーザーの興味に応じた広告を表示するために、Cookieを使用することがあります。詳しくは<a href="https://policies.google.com/technologies/ads?hl=ja" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google広告に関するポリシー</a>をご確認ください。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">5. お子様の個人情報</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは子供向けのコンテンツを提供していますが、お子様から意図的に個人情報を収集することはありません。お子様の利用にあたっては、保護者の方の監督のもとでご利用いただくことをお勧めします。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">6. 免責事項</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトの情報は可能な限り正確な情報を掲載するよう努めていますが、情報の正確性や完全性を保証するものではありません。当サイトの利用により生じた損害について、一切の責任を負いかねます。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">7. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              プライバシーポリシーに関するお問い合わせは、<Link href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</Link>よりお願いいたします。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
