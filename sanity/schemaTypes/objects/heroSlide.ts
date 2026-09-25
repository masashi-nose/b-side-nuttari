import { defineField, defineType } from "sanity";

/** トップのヒーローカルーセル1枚ぶん */
export const heroSlide = defineType({
  name: "heroSlide",
  title: "ヒーロースライド",
  type: "object",
  fields: [
    defineField({
      name: "tag",
      title: "タグ",
      type: "string",
      description: "左上に出る短いラベル（例：特集、商店街）",
      validation: (rule) => rule.required().max(8),
    }),
    defineField({
      name: "kicker",
      title: "英字の小見出し",
      type: "string",
      description: "例：FEATURE、SHOPS、GUIDE",
      validation: (rule) =>
        rule
          .required()
          .max(16)
          .regex(/^[A-Z0-9 ·]+$/, { name: "英大文字" }),
    }),
    defineField({
      name: "title",
      title: "見出し",
      type: "string",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "ctaLabel",
      title: "ボタンの文字",
      type: "string",
      validation: (rule) => rule.required().max(16),
    }),
    defineField({
      name: "image",
      title: "写真",
      type: "altImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reference",
      title: "リンク先（サイト内）",
      type: "reference",
      to: [{ type: "article" }, { type: "spot" }],
      description: "サイト内へ送るときはこちら。外部URLと両方は入れない",
    }),
    defineField({
      name: "url",
      title: "リンク先（外部URL）",
      type: "url",
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const slide = value as { reference?: unknown; url?: unknown } | undefined;
      if (!slide) return true;
      if (slide.reference && slide.url) {
        return "リンク先はサイト内・外部URLのどちらか片方にしてください";
      }
      if (!slide.reference && !slide.url) {
        return "リンク先を入れてください";
      }
      return true;
    }),
  preview: {
    select: { title: "title", subtitle: "kicker", media: "image" },
  },
});
