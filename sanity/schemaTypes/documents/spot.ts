import { defineField, defineType } from "sanity";
import { spotCategories, spotGenres, spotStatuses } from "@/lib/labels";
import { slugRule, staleVerifiedWarning, toOptionList } from "../helpers";

export const spot = defineType({
  name: "spot",
  title: "お店・スポット",
  type: "document",
  groups: [
    { name: "basic", title: "基本", default: true },
    { name: "info", title: "店の情報" },
    { name: "media", title: "写真" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "名前",
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
        "/spots/{slug}/ になる。店名のローマ字か英字表記。公開後は変えない",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required().custom(slugRule),
    }),
    defineField({
      name: "category",
      title: "区分",
      type: "string",
      group: "basic",
      options: { list: toOptionList(spotCategories), layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "genres",
      title: "ジャンル",
      type: "array",
      group: "basic",
      of: [{ type: "string" }],
      options: { list: toOptionList(spotGenres) },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "status",
      title: "状態",
      type: "string",
      group: "basic",
      description: "閉店は一覧から外れるが、ページは残る",
      initialValue: "open",
      options: { list: toOptionList(spotStatuses), layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "ひとこと紹介",
      type: "string",
      group: "basic",
      description: "60字以内。一覧カードと検索結果の説明文に使う",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "location",
      title: "位置",
      type: "geopoint",
      group: "basic",
      description: "地図と「近くのお店」の計算に使う",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "最終確認日",
      type: "date",
      group: "basic",
      description: "ページに表示する。取材・確認した日を入れる",
      options: { dateFormat: "YYYY-MM-DD" },
      // 180日より古いときは警告だけ出し、公開は止めない
      validation: (rule) => [
        rule.required(),
        rule.custom(staleVerifiedWarning).warning(),
      ],
    }),

    defineField({
      name: "address",
      title: "住所",
      type: "string",
      group: "info",
    }),
    defineField({
      name: "hours",
      title: "営業時間",
      type: "text",
      rows: 3,
      group: "info",
    }),
    defineField({
      name: "holidays",
      title: "定休日",
      type: "string",
      group: "info",
    }),
    defineField({
      name: "website",
      title: "Webサイト",
      type: "url",
      group: "info",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "string",
      group: "info",
      description: "アカウント名だけ（@ もURLも入れない）",
      validation: (rule) =>
        rule.regex(/^[A-Za-z0-9._]+$/, {
          name: "アカウント名",
          invert: false,
        }),
    }),
    defineField({
      name: "phone",
      title: "電話番号",
      type: "string",
      group: "info",
      description: "公開してよいかお店に確認してから入れる",
    }),
    defineField({
      name: "body",
      title: "紹介文",
      type: "richText",
      group: "info",
    }),

    defineField({
      name: "mainImage",
      title: "メイン写真",
      type: "altImage",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "写真",
      type: "array",
      group: "media",
      of: [{ type: "altImage" }],
      validation: (rule) => rule.max(6),
    }),

    defineField({ name: "seo", type: "seo", group: "meta" }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      status: "status",
      media: "mainImage",
    },
    prepare: ({ title, category, status, media }) => ({
      title,
      subtitle: [
        spotCategories[category as keyof typeof spotCategories],
        status === "open"
          ? undefined
          : spotStatuses[status as keyof typeof spotStatuses],
      ]
        .filter(Boolean)
        .join(" ・ "),
      media,
    }),
  },
  orderings: [
    {
      name: "nameAsc",
      title: "名前",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      name: "verifiedAsc",
      title: "最終確認日が古い順",
      by: [{ field: "lastVerifiedAt", direction: "asc" }],
    },
  ],
});
