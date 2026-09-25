# デザインシステム

採用デザイン：「レトロポップ × ネオ」。生成り色の紙のような地に、藍と橙の2色刷り。太い墨の枠線と、ぼかしのないずらした影。見本は `design/Components.dc.html` と各ページのファイル。

## 色

| トークン名 | 値 | 用途 | 上に載せる文字 |
| --- | --- | --- | --- |
| indigo | #22388F | メイン（蛇の目の藍） | cream（9.3） |
| miso | #D9782D | 差し色（味噌の橙） | 大きい文字は ink（5.5）／小さいラベルは white（3.2、デザイン優先で採用） |
| cream | #F7F3EA | 背景（生成り） | ink |
| cream-muted | #CFC9BC | フッターの注記（墨地の上） | — |
| ink | #1B1B1B | 文字・線（墨） | cream |
| sand | #E9E2D2 | 写真の仮置き・地図 | — |
| sand-dark | #D9D2C2 | 写真の仮置き（濃） | — |
| muted | #5A5448 | 仮置きの文字 | — |
| placeholder | #7A7366 | 入力欄のプレースホルダ | — |
| rule | #D8D1C2 | 表の区切り線 | — |
| open | #1F8A4C | 営業中の丸 | — |

Tailwind v4 の場合の例：

```css
@import "tailwindcss";

@theme {
  --color-indigo: #22388f;
  --color-miso: #d9782d;
  --color-cream: #f7f3ea;
  --color-ink: #1b1b1b;
  --color-sand: #e9e2d2;
  --color-sand-dark: #d9d2c2;
  --color-muted: #5a5448;
  --color-rule: #d8d1c2;
  --color-open: #1f8a4c;

  --font-display: var(--font-dela), sans-serif;
  --font-sans: var(--font-zen), sans-serif;
  --font-mono: var(--font-dm-mono), monospace;

  --shadow-hard-sm: 4px 4px 0 var(--color-ink);
  --shadow-hard: 6px 6px 0 var(--color-ink);
  --shadow-hard-lg: 8px 8px 0 var(--color-ink);
}
```

## 書体（next/font/google で読み込む）

| 用途 | 書体 | PC | スマホ |
| --- | --- | --- | --- |
| トップのキャッチ（h1） | Dela Gothic One | 88px / 行間1.2 | 48px |
| 店舗名・記事タイトル（h1） | Dela Gothic One | 60〜64px | 32〜36px |
| セクション見出し（h2） | Dela Gothic One | 48px（下層36px） | 28px（下層22〜24px） |
| カルーセル見出し | Dela Gothic One | 44px | 26px |
| 本文 | Zen Kaku Gothic New 400/500 | 17〜19px / 行間1.9〜2.1 | 15〜16px |
| ボタン・ナビ・タグ | Zen Kaku Gothic New 700 | 13〜16px | 11〜15px |
| 英字の小見出し | DM Mono、字間0.14em | 12〜15px | 11〜12px |

日本語フォントはファイルが大きいので、`preload: false` と `display: "swap"` を検討する。

## 形・余白

- 枠線：墨 3px（ナビ・ボタン・入力欄は 2px）
- ハードシャドウ：PC 6〜8px、スマホ 4〜5px。カードはホバーで `translate(-3px,-3px)` ＋影を広げる
- 角丸：カード 16〜24px、大きな帯 32px、タグ 6px、ボタン・ナビ・絞り込みはピル型
- 左右余白：PC 80px（1440px幅）、スマホ 16〜20px
- セクション間：PC 112px、スマホ 64px
- 記事本文の幅：720px

## 主なコンポーネント

| 部品 | 仕様 |
| --- | --- |
| Header | 藍の丸に「B」＋ロゴ文字。PCはピル型ナビ4つ（現在地は墨で塗る）、スマホはメニューボタン |
| SpMenu | 全画面のパネル。ナビ4つを大きなカードで。橙のアクセス導線。閉じるボタン、Escキー、フォーカストラップ |
| Button | primary（藍地）/ secondary（墨2px枠）/ dark（墨地、橙の上で使う） |
| KubunTag | 商店街＝橙地・白文字、蔵元＝藍地・生成り文字、スポット＝墨地・生成り文字、個人商店＝生成り地・墨枠 |
| GenreTag | 墨2px枠 |
| SpotCard | PC：写真が上。スマホ：写真が左の横長 |
| ArticleCard | 藍の帯の上に生成りのカード、または白地＋墨枠のカード |
| HeroCarousel | 墨3px枠＋ハードシャドウ。上に進行バー、左下に見出しカード、右下に「01 / 04」と前後ボタン |
| InfoTable | 白地・墨3px枠の dl（住所・営業時間・定休日） |
| SnsIconButton | アイコンだけの丸ボタン（56px／スマホ48px）。各SNSの公式ブランドアイコンを使う |
| VerifiedNote | 墨2pxの点線枠「この情報は［日付］に確認しました」 |
| ArticleHeading | 左に橙の縦長マーカーを付けた見出し |
| PullQuote | 藍地・生成り文字・Dela Gothic One |
| AccessCta | 橙地・墨3px枠・ハードシャドウ・墨のボタン |
| Footer | 墨地。ロゴ、ナビ、注記「このサイトは沼垂テラス商店街の公式サイトではありません。」 |
