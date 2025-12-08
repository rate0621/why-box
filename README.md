# 子供向けオウンドメディアデザイン（Next.js版）

Next.js 14 + App Router へ移行し、microCMS を使った運用を想定した構成にリファクタリングしました。サーバーコンポーネントで microCMS から記事・カテゴリを取得し、クライアント側では検索やカテゴリ絞り込みなどのUIロジックのみを担います。

## 必要環境

- Node.js 18 以上
- npm / pnpm / yarn のいずれか
- microCMS サービス（任意ですが、本番運用時は必須）

## セットアップ

1. 依存関係をインストール
   ```bash
   npm install
   ```
2. 環境変数を設定
   ```bash
   cp .env.example .env.local
   ```
   - `MICROCMS_SERVICE_DOMAIN`: microCMS のサービスドメイン（例: `my-media` または `https://my-media.microcms.io`）
   - `MICROCMS_API_KEY`: コンテンツ取得用 API キー（READ 権限）
3. 開発サーバーを起動
   ```bash
   npm run dev
   ```
4. ビルド／本番起動
   ```bash
   npm run build
   npm start
   ```

> 環境変数を未設定の場合は、`src/lib/cms.ts` に定義したスタティックなダミー記事＆タグで UI のみ確認できます。

## microCMS モデル例

- `tags`
  - `name` (text) — タグ表示名
- `blogs`
  - `title` (text)
  - `description` (text) — カードで使う概要文
  - `tags` (multi-reference) — `tags` コンテンツへの参照フィールド（複数選択可）
  - `eyecatch` (image) — カードのメイン画像
  - `imageQuery` (text, optional) — 画像が無い場合に使う Unsplash のクエリ文字列

上記以外のフィールドがあっても問題ありません。記事は `publishedAt` の降順で取得しており、取得件数や並び順は `src/lib/cms.ts` の `getArticles` で調整できます。

## ディレクトリ構成（抜粋）

```
why-box/
├─ src/
│  ├─ app/              # Next.js App Router (layout, page, global styles)
│  ├─ components/       # UI コンポーネント群（shadcn系 + プロジェクト固有）
│  └─ lib/              # microCMS クライアントやユーティリティ
├─ .env.example
├─ next.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## その他

- Tailwind CSS + `tailwindcss-animate` でスタイルを構築しています。テーマ用の CSS 変数は `src/app/globals.css` に集約しました。
- `src/lib/cms.ts` では API エラー時／未設定時にフォールバックデータを返すため、ローカルで CMS 接続が無くても UI を確認できます。
