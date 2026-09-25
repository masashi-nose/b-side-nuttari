# CMSデータ設計（Sanity）

ドキュメントは4種類だけ。ジャンルやカテゴリは独立したドキュメントにせず、スキーマの選択肢としてコードで持つ。

## spot（店舗・スポット）

| 項目 | フィールド | 型 | 必須 | メモ |
| --- | --- | --- | --- | --- |
| 名前 | name | string | ✓ |  |
| スラッグ | slug | slug | ✓ | URL（/spots/{slug}/）。公開後は変えない |
| 区分 | category | string（選択肢） | ✓ | terrace 商店街 / kura 蔵元 / spot スポット / local 個人商店 |
| ジャンル | genres | string[]（選択肢） | ✓ | 下の一覧。複数可 |
| 状態 | status | string（選択肢） | ✓ | open 営業中 / paused 休業中 / closed 閉店。閉店は一覧から外し、ページは残す |
| ひとこと紹介 | summary | string | ✓ | 60字以内。一覧カードと meta description |
| 位置 | location | geopoint | ✓ | 地図と「近くのお店」の計算 |
| 最終確認日 | lastVerifiedAt | date | ✓ | ページに表示 |
| メイン写真 | mainImage | image＋alt |  | ないときはジャンル別のイラスト |
| 写真 | gallery | image＋alt の配列 |  | 6枚まで |
| 紹介文 | body | Portable Text |  |  |
| 住所 | address | string |  |  |
| 営業時間 | hours | text |  | 自由記述 |
| 定休日 | holidays | string |  | 自由記述 |
| Webサイト | website | url |  |  |
| Instagram | instagram | string |  | アカウント名のみ |
| 電話番号 | phone | string |  | 公開の可否を店に確認してから |
| SEO | seo | object |  | title / description の上書き |

## article（記事）

| 項目 | フィールド | 型 | 必須 | メモ |
| --- | --- | --- | --- | --- |
| タイトル | title | string | ✓ |  |
| スラッグ | slug | slug | ✓ | /articles/{slug}/ |
| カテゴリ | category | string（選択肢） | ✓ | guide まとめ / interview インタビュー / history 歴史 / course コース / report レポート |
| リード文 | excerpt | text | ✓ | 120字以内 |
| メイン写真 | mainImage | image＋alt | ✓ | OGPにも使う |
| 本文 | body | Portable Text | ✓ | ブロックは4つ：見出し（h2/h3）、画像＋キャプション、spotCard（spot参照）、pullQuote |
| 公開日 | publishedAt | datetime | ✓ |  |
| 更新日 | updatedAt | datetime |  |  |
| 関連店舗 | relatedSpots | spot参照の配列 |  | 店舗ページの「登場する読みもの」はこれを GROQ の references() で逆引き |
| SEO | seo | object |  |  |

「この記事に登場したお店」は、本文中の spotCard と relatedSpots から集める。

## page（固定ページ）

プライバシーポリシーなど、文章だけのページに使う。title / slug / body / seo。
アクセスページの中身（徒歩の手順・バス・駐車場）はコードに直接書く。

## siteSettings（1件だけ）

| 項目 | フィールド | 型 | メモ |
| --- | --- | --- | --- |
| キャッチコピー | tagline | string | 沼垂の、すぐそばに。 |
| サイトの説明 | description | text | トップの meta description |
| ヒーロースライド | heroSlides | object[] | 最大4枚。tag / kicker（英字） / title / ctaLabel / image＋alt / link（article・spot参照 または URL） |
| ピックアップ店舗 | pickupSpots | spot参照[] | トップに6件まで |
| ピックアップ記事 | pickupArticles | article参照[] | 空なら新着順 |
| 運営者名 | operatorName | string | 記事の「文・写真」表示 |
| SNS | socialLinks | url[] |  |
| 共通OGP画像 | ogImage | image |  |

## 選択肢の値

| 選択肢 | 値と表示名 |
| --- | --- |
| spot.category | terrace 商店街 / kura 蔵元 / spot スポット / local 個人商店 |
| spot.genres | cafe カフェ / food 飲食 / sweets お菓子 / goods 雑貨・ファッション / craft 工房・ギャラリー / ferment 酒・発酵 / shrine 寺社・史跡 / stay 宿 / service サービス |
| spot.status | open 営業中 / paused 休業中 / closed 閉店 |
| article.category | guide まとめ / interview インタビュー / history 歴史 / course コース / report レポート |

## 入力ルール（バリデーション）

- 画像には alt 必須
- summary 60字、excerpt 120字まで
- slug は英小文字・数字・ハイフンのみ
- lastVerifiedAt が180日より前なら Studio で警告（公開は止めない）

## 実装メモ

- Sanity TypeGen でスキーマと GROQ から型を生成
- 公開時は Webhook → Next.js の revalidateTag で該当ページだけ再生成
- 画像は Sanity の画像CDN で最適化
- 構造化データ：spot → LocalBusiness、article → Article、全ページにパンくず
- 初期データは `data/spots.json` の46件をスクリプトで一括登録（名前・区分・ジャンル・状態まで。位置や紹介文は後から手入力）
