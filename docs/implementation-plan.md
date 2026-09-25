# 実装計画

上から順に1ステップずつ進める。各ステップの終わりに動作確認し、コミットする。

## Step 0：プロジェクトの準備

- [ ] `trailingSlash: true`、画像のドメイン設定（Sanity CDN）
- [ ] Prettier（＋ Tailwind のクラス並べ替えプラグイン）
- [ ] GitHub リポジトリ、Vercel に接続してプレビュー環境を作る
- [ ] CLAUDE.md の「よく使うコマンド」を埋める

## Step 1：デザインの土台

- [ ] `docs/design-system.md` のトークンを Tailwind に定義
- [ ] next/font で Dela Gothic One / Zen Kaku Gothic New / DM Mono
- [ ] 共通部品：Header、Footer、SpMenu、Button、KubunTag、GenreTag、Breadcrumb、SectionHeading、AccessCta
- [ ] 部品の確認用ページ（開発時のみ表示。本番では 404）

## Step 2：Sanity

- [ ] Sanity プロジェクト作成、`/studio` に埋め込み（next-sanity）
- [ ] スキーマ：spot / article / page / siteSettings（`docs/cms-schema.md`）
- [ ] バリデーション（alt 必須、文字数、slug 形式、最終確認日の警告）
- [ ] Sanity TypeGen の設定と npm スクリプト
- [ ] `data/spots.json` から46件を一括登録するスクリプト（slug は英字名から自動生成、日本語名は仮のslugにしてあとで手で直す）

## Step 3：店舗ページ

- [ ] 店舗・スポット詳細 /spots/[slug]/（generateStaticParams、写真の切り替えだけクライアント）
- [ ] 店舗・スポット一覧 /spots/（全件をサーバーで取得、絞り込みはクライアント、クエリパラメータと同期）
- [ ] 閉店した店の表示

## Step 4：記事ページ

- [ ] 記事詳細 /articles/[slug]/（@portabletext/react で4つのブロックを描画）
- [ ] 読みもの一覧 /articles/（0本のカテゴリは出さない）
- [ ] 店舗ページの「登場する読みもの」「近くのお店」

## Step 5：トップ

- [ ] ヒーローカルーセル（Embla ＋ autoplay、1枚目 priority、reduced-motion で停止、ホバー・操作で一時停止）
- [ ] ピックアップ店舗、読みもの、エリアマップ、アクセス導線

## Step 6：アクセス・このサイトについて・その他

- [ ] アクセス（PCは3つの入口カード、スマホはタブ）
- [ ] このサイトについて＋お問い合わせフォーム（送信方法は要相談：Route Handler＋メール送信サービス、または外部フォーム）
- [ ] プライバシーポリシー、404

## Step 7：地図

- [ ] 地図ライブラリとタイルの提供元を決める（要相談。無料枠で収まるもの）
- [ ] 店舗一覧・トップ・店舗詳細の地図、区分ごとの色のピン

## Step 8：SEOと公開準備

- [ ] generateMetadata（title / description / OGP / canonical）
- [ ] sitemap.ts、robots.ts（/studio は除外）
- [ ] 構造化データ（LocalBusiness、Article、BreadcrumbList）
- [ ] Sanity Webhook → revalidateTag
- [ ] アクセス解析、Search Console
- [ ] Lighthouse で Core Web Vitals とアクセシビリティを確認

## 決まっていないこと

- 地図のライブラリとタイルの提供元
- お問い合わせフォームの送信方法
- カルーセルの切り替え方（フェード／スライド）
- ドメイン
