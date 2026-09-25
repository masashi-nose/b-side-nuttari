import { defineField, defineType } from "sanity";

/** サイト全体の設定。1件だけ作る */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "サイトの設定",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "キャッチコピー",
      type: "string",
      initialValue: "沼垂の、すぐそばに。",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "description",
      title: "サイトの説明",
      type: "text",
      rows: 3,
      description: "トップの紹介文と検索結果の説明文に使う。120字以内",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "heroSlides",
      title: "ヒーロースライド",
      type: "array",
      description: "トップのカルーセル。4枚まで",
      of: [{ type: "heroSlide" }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "pickupSpots",
      title: "ピックアップ店舗",
      type: "array",
      description: "トップに出すお店。6件まで",
      of: [{ type: "reference", to: [{ type: "spot" }] }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "pickupArticles",
      title: "ピックアップ記事",
      type: "array",
      description: "空にすると新着順で出る",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "operatorName",
      title: "運営者名",
      type: "string",
      description: "記事の「文・写真」に出す名前",
    }),
    defineField({
      name: "socialLinks",
      title: "SNS",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "ogImage",
      title: "共通OGP画像",
      type: "altImage",
      description: "個別の画像がないページで使う",
    }),
  ],
  preview: {
    prepare: () => ({ title: "サイトの設定" }),
  },
});
