import { defineField, defineType } from "sanity";

/** title / description の上書き。空なら本文から自動で作る */
export const seo = defineType({
  name: "seo",
  title: "SEO（任意）",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "タイトルの上書き",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "description",
      title: "説明文の上書き",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(120),
    }),
  ],
});
