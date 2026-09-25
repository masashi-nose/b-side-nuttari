# サイトマップとURL

ページの型は7つ（＋プライバシーポリシー、404）。階層は最大2段。

| ページ | URL | デザイン見本 | データ |
| --- | --- | --- | --- |
| トップ | / | design/Top.dc.html | siteSettings（heroSlides, pickupSpots, pickupArticles）、新着記事 |
| 店舗・スポット一覧 | /spots/ | design/Spots List.dc.html | spot（閉店以外すべて） |
| 店舗・スポット詳細 | /spots/{slug}/ | design/Spot Detail.dc.html | spot、参照している記事、近くの spot 3件 |
| 読みもの一覧 | /articles/ | design/Articles List.dc.html | article |
| 記事詳細 | /articles/{slug}/ | design/Article Detail.dc.html | article（本文の spotCard を展開） |
| アクセス | /access/ | design/Access.dc.html | コードに直接書く |
| このサイトについて | /about/ | design/About.dc.html | コード＋フォーム |
| プライバシーポリシー | /privacy/ | — | page |
| 404 | — | design/Not Found.dc.html | — |
| Studio | /studio | — | Sanity Studio（検索エンジンに出さない） |

スマホメニュー：design/SP Menu.dc.html。部品一覧：design/Components.dc.html。

## URLのルール

- 英小文字とハイフンのみ。日本語は入れない。末尾スラッシュあり
- 店舗は店名のローマ字か英字表記（例：/spots/imayotsukasa/、/spots/vost-coffee/）
- 記事は中身が分かる短い英語かローマ字。日付や連番は入れない
- 公開後にURLを変えない。表示名は変えてよい
- 閉店した店のページは消さず「閉店しました」と表示する
- 絞り込みの状態はクエリパラメータ（例：/spots/?category=kura）で持ち、canonical は /spots/ にする

## ページを増やさないためのルール

1. 新しい型を作るのは、後のフェーズが来たときだけ。思いつきは記事として書く
2. ジャンル別・タグ別の専用ページは、該当が5件以上になってから（/spots/genre/{genre}/）
3. 中身のないページ（準備中）は公開しない
