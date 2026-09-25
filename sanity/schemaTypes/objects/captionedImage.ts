import { defineField, defineType } from "sanity";

/** 記事本文のブロック：画像＋キャプション */
export const captionedImage = defineType({
  name: "captionedImage",
  title: "画像＋キャプション",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "代替テキスト",
      type: "string",
      description: "写真に何が写っているかを短く書く",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "caption",
      title: "キャプション",
      type: "string",
      description: "写真の下に出る説明。なくてもよい",
      validation: (rule) => rule.max(80),
    }),
  ],
  preview: {
    select: { imageUrl: "asset.url", title: "caption", subtitle: "alt" },
  },
});
