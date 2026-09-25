/**
 * 選択肢の値と表示名（docs/cms-schema.md）。
 * Sanity のスキーマでも同じ値を使う。
 */

export const spotCategories = {
  terrace: "商店街",
  kura: "蔵元",
  spot: "スポット",
  local: "個人商店",
} as const;

export const spotGenres = {
  cafe: "カフェ",
  food: "飲食",
  sweets: "お菓子",
  goods: "雑貨・ファッション",
  craft: "工房・ギャラリー",
  ferment: "酒・発酵",
  shrine: "寺社・史跡",
  stay: "宿",
  service: "サービス",
} as const;

export const spotStatuses = {
  open: "営業中",
  paused: "休業中",
  closed: "閉店",
} as const;

export const articleCategories = {
  guide: "まとめ",
  interview: "インタビュー",
  history: "歴史",
  course: "コース",
  report: "レポート",
} as const;

export type SpotCategory = keyof typeof spotCategories;
export type SpotGenre = keyof typeof spotGenres;
export type SpotStatus = keyof typeof spotStatuses;
export type ArticleCategory = keyof typeof articleCategories;
