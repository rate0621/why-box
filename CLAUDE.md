# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

子供向けの教育メディアサイト「なんでBOX」。科学、自然、宇宙、動物、からだに関する子供の疑問に答えるコンテンツを提供。Next.js 14 (App Router) + TypeScript + microCMS (ヘッドレスCMS) で構築。

## 主要コマンド

**開発:**
```bash
npm run dev        # 開発サーバー起動 (http://localhost:3000)
npm run build      # 本番ビルド
npm start          # 本番サーバー起動
npm run lint       # ESLint実行
```

## 環境変数設定

`.env.example` から `.env.local` を作成:
```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain  # 例: "why-box" または "https://why-box.microcms.io"
MICROCMS_API_KEY=your-api-key                # READ権限のAPIキー
```

**重要:** microCMS未設定でも動作します。`src/lib/cms.ts` のフォールバックデータで動作するため、CMS接続なしでもUI確認が可能です。

## アーキテクチャ

### サーバー/クライアントコンポーネント分割

- **サーバーコンポーネント** (App Routerのデフォルト): microCMSからデータ取得、静的コンテンツレンダリング
  - `src/app/page.tsx` - ホームページ、`getArticles()` で記事一覧取得
  - `src/app/why/[id]/page.tsx` - 記事詳細ページ、`getArticleById()` で記事取得

- **クライアントコンポーネント** (`"use client"`): ユーザーインタラクション、絞り込み、検索
  - `src/components/ArticleExplorer.tsx` - 記事グリッド表示
  - `src/components/SearchBar.tsx` - 検索入力
  - その他インタラクティブなUIコンポーネント

### データ層 (`src/lib/cms.ts`)

CMS抽象化レイヤーが提供する機能:
- 型定義: `Article`, `ArticleTag`, `ArticleDetail`, `ArticleDetailSection`
- 主要関数:
  - `getArticles(queries?)` - 記事一覧取得 (上限100件、`-publishedAt` でソート)
  - `getArticleById(contentId)` - ID指定で記事1件取得
- フォールバック機構: microCMS利用不可時は `FALLBACK_ARTICLES` を返却
- フィールド正規化: 様々なmicroCMSフィールド形式に対応 (tags, imageQuery, readTime等)

### microCMS コンテンツモデル

想定されるmicroCMSエンドポイント:
- `tags`: シンプルな参照コンテンツ
  - `name` (text) - タグ表示名
- `blogs`: 記事コンテンツ
  - `title` (text)
  - `description` (text) - 記事の概要文
  - `tags` (multi-reference to `tags`)
  - `eyecatch` (image) - メイン画像
  - `imageQuery` (text, optional) - Unsplashクエリ文字列(フォールバック用)
  - `content` または `body` (rich text) - 記事本文
  - `highlights` または `points` (array) - 重要ポイント
  - `keywords` (array/string) - 関連キーワード

### スタイリングシステム

- **Tailwind CSS** - `src/app/globals.css` でカスタムCSS変数定義
- **shadcn/ui** コンポーネント - `src/components/ui/` に配置
- パスエイリアス: `@/*` → `./src/*`
- テーマ: 子供向けのグラデーションデザイン (青/紫/黄/オレンジ)

### 画像処理

Next.js Image コンポーネントは `next.config.mjs` で2つのリモートドメインを許可:
- `images.microcms-assets.io` - microCMS画像
- `source.unsplash.com` - Unsplashプレースホルダー画像

フォールバック: `src/lib/unsplash.ts` ヘルパーで `imageQuery` フィールドからUnsplash URLを生成。

## 重要な実装の詳細

### TypeScript設定

- Strictモード有効
- Target: ES2022
- Module resolution: "bundler" (Next.js 14標準)
- パスマッピング: `@/*` → `./src/*`

### データフロー

1. サーバーコンポーネント (`page.tsx`) が `getArticles()` または `getArticleById()` を呼び出し
2. `src/lib/cms.ts` がmicroCMS認証情報を確認
3. 設定あり: microCMS APIからリトライ付きで取得
4. 設定なし/エラー: フォールバックデータを返却
5. 生のmicroCMSデータを内部型に正規化
6. クライアントコンポーネントへpropsとして渡す

### 記事コンテンツのレンダリング

`src/app/why/[id]/page.tsx` は2種類のコンテンツ形式に対応:
- **`<h2>` セクション付きHTML**: 見出しごとにセクション分割してパース
- **プレーンテキストまたはhighlights配列**: 番号付きポイントとしてレンダリング

`SectionContent` コンポーネントは `section.isHtml` が true の場合のみ `dangerouslySetInnerHTML` を使用。

### 関連記事ロジック

詳細ページでは最大3件の関連記事を表示:
1. 現在の記事を除外
2. 最初のタグが一致する記事を抽出
3. 最初の3件を取得

## 開発ワークフロー

1. `src/components/` のコンポーネントまたは `src/app/` のページを編集
2. `npm run dev` でホットリロード付き確認
3. TypeScriptエラーはターミナルとIDEで確認可能
4. microCMS認証情報あり/なし両方でテストしフォールバック動作を確認
5. コミット前に `npm run lint` 実行
6. `npm run build` で本番環境の問題がないか確認

## コンポーネントライブラリ

UIコンポーネントは shadcn/ui (Radix UI primitives) ベースで `src/components/ui/` に配置。事前設定済みの再利用可能なコンポーネント。新しいUIパターン追加時は、新規作成よりもこれらのコンポーネント拡張を優先。

## 補足事項

- 日本語専用アプリケーション
- ターゲット: 小学生の子供たち
- コンテンツは世界に関する「なぜ?」の質問に答えることに焦点
- フォールバックデータの記事IDは数値文字列 ("1", "2"等)
- microCMSレスポンスにはソート用の `publishedAt` が含まれるが、スキーマではオプショナル
