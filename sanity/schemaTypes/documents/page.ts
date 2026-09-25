import { defineField, defineType } from "sanity";
import { slugRule } from "../helpers";

/**
 * 文章だけの固定ページ（プライバシーポリシーなど）。
 * アクセスページの中身はコードに直接書くので、ここには載せない。
 */
export const page = defineType({
  name: "page",
  title: "固定ページ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "スラッグ（URL）",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required().custom(slugRule),
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "richText",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
