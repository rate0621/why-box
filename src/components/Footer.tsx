export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="mb-4 text-gray-900">なんでBOX</h3>
            <p className="text-gray-600">子どもたちの好奇心を育てる明るい学びのプラットフォーム</p>
          </div>
          <div>
            <h4 className="mb-4 text-gray-900">サイトについて</h4>
            <ul className="space-y-2 text-gray-600">
              <li>運営者情報</li>
              <li>お問い合わせ</li>
              <li>プライバシーポリシー</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 pt-8 border-t border-gray-200">
          © 2025 なんでBOX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
