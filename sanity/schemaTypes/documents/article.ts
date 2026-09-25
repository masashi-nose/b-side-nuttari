import { defineField, defineType } from "sanity";
import { articleCategories } from "@/lib/labels";
import { slugRule, toOptionList } from "../helpers";

export const article = defineType({
  name: "article",
  title: "読みもの（記事）",
  type: "document",
  groups: [
    { name: "basic", title: "基本", default: true },
    { name: "body", title: "本文" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "スラッグ（URL）",
      type: "slug",
      group: "basic",
      description:
        "/articles/{slug}/ になる。中身が分かる短い英語かローマ字。日付や連番は入れない",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required().custom(slugRule),
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      group: "basic",
      options: { list: toOptionList(articleCategories), layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "リード文",
      type: "text",
      rows: 3,
      group: "basic",
      description: "120字以内。一覧カードと検索結果の説明文に使う",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "mainImage",
      title: "メイン写真",
      type: "altImage",
      group: "basic",
      description: "OGP（SNSで共有したときの画像）にも使う",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "公開日",
      type: "datetime",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "更新日",
      type: "datetime",
      group: "basic",
      description: "書き直したときに入れる",
    }),

    defineField({
      name: "body",
      title: "本文",
      type: "articleBody",
      group: "body",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "relatedSpots",
      title: "関連店舗",
      type: "array",
      group: "body",
      description:
        "この記事に登場したお店。店舗ページの「登場する読みもの」はここから逆引きする",
      of: [{ type: "reference", to: [{ type: "spot" }] }],
    }),

    defineField({ name: "seo", type: "seo", group: "meta" }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      publishedAt: "publishedAt",
      media: "mainImage",
    },
    prepare: ({ title, category, publishedAt, media }) => ({
      title,
      subtitle: [
        articleCategories[category as keyof typeof articleCategories],
        publishedAt?.slice(0, 10),
      ]
        .filter(Boolean)
        .join(" ・ "),
      media,
    }),
  },
  orderings: [
    {
      name: "publishedDesc",
      title: "公開日が新しい順",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
