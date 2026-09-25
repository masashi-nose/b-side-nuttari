import { defineType } from "sanity";

/** 画像＋代替テキスト。alt は必須（docs/cms-schema.md） */
export const altImage = defineType({
  name: "altImage",
  title: "画像",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      title: "代替テキスト",
      type: "string",
      description: "写真に何が写っているかを短く書く（読み上げと検索で使う）",
      validation: (rule) => rule.required().max(120),
    },
  ],
  preview: {
    select: { imageUrl: "asset.url", title: "alt" },
  },
});
