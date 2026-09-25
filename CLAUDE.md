# B SIDE NUTTARI

新潟・沼垂エリアの非公式ポータルサイト。沼垂のお店・スポットと読みもの（記事）をまとめ、「沼垂」関連ワードで検索上位に入ることが目標。

- サイト名：B SIDE NUTTARI（B面＝もうひとつの沼垂／BESIDE＝沼垂のそばに）
- 運営：一人（東京在住のエンジニア）。帰省時に取材
- 公開目標：2026年12月末（MVP）
- 詳しい仕様は `docs/` を参照。デザインの見本は `design/`（Claude Design の書き出し）

## 進め方

- 返答・コメント・コミットメッセージは日本語
- ユーザーは Vue / Nuxt の経験者で、React / Next.js は学習中。新しい概念（Server/Client Components、hooks など）が出てきたら、Vue/Nuxt との違いを短く添える
- 1タスクずつ進め、区切りごとに動作確認の手順を伝える。`docs/implementation-plan.md` の順番に沿う
- 大きな設計判断（ライブラリ追加、ページの型の追加、CMSの項目追加）は、実装前にユーザーに確認する

## 技術構成

- Next.js（App Router）＋ TypeScript（strict）
- Tailwind CSS（デザイントークンは `docs/design-system.md`）
- Sanity（CMS）。Studio は `/studio` に埋め込む（next-sanity）。型は Sanity TypeGen で生成
- カルーセル：Embla Carousel（embla-carousel-react ＋ autoplay）
- ホスティング：Vercel（収益化の前にプランを見直す）
- パッケージマネージャ：npm（pnpm が未導入だったため npm に決定）

## 守るルール

### ページとCMS

- ページの型は7つだけ：トップ、店舗・スポット一覧、店舗・スポット詳細、読みもの一覧、記事詳細、アクセス、このサイトについて（＋プライバシーポリシー、404）。新しい型は作らない
- CMSのドキュメントは4種類：spot / article / page / siteSettings（`docs/cms-schema.md`）
- 記事の本文ブロックは4つ：見出し、画像＋キャプション、店舗カード（spot参照）、引用
- アクセスページの中身はコードに直接書く（CMSに載せない）
- 中身のないページや「準備中」表示は出さない。記事が0本のカテゴリは絞り込みボタンごと出さない

### コンテンツ

- 店舗情報・日付・所要時間などの事実を作らない。不明な値は `[住所を記入]` のような仮置きにする
- 「公式ガイドには載らない」のような文言は使わない
- フッターの注記は「このサイトは沼垂テラス商店街の公式サイトではありません。」

### 実装

- Server Components を基本にし、`"use client"` は動きのある部品だけ（カルーセル、店舗一覧の絞り込み、写真の切り替え、スマホメニュー、アクセスのタブ、問い合わせフォーム、リンクのコピー）
- 画像は `next/image`。トップのカルーセル1枚目は `priority`
- `prefers-reduced-motion` のときはカルーセルの自動送りを止める
- 押せる要素は44px以上。フォーカスリングは藍 3px
- 店舗一覧は全件をHTMLに出力し、「もっと見る」は見た目だけ畳む（SEOのため）
- URLは英小文字とハイフン。末尾スラッシュあり（`trailingSlash: true`）。公開後に変えない
- Claude Design のファイルにある `style-hover` などの独自属性は Tailwind の `hover:` に置き換える

## よく使うコマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run build` | 本番ビルド |
| `npm start` | ビルド結果を起動 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript の型チェック（`tsc --noEmit`） |
| `npm run format` | Prettier で整形（`*.md` と `design/` は対象外） |
| `npm run format:check` | 整形漏れの確認 |

Sanity 用の `typegen` / `seed` は Step 2 で追記する。
