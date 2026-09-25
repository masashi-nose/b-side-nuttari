import { defineField, defineType } from "sanity";

/** 記事本文のブロック：店舗カード（spot を参照して差し込む） */
export const spotCard = defineType({
  name: "spotCard",
  title: "店舗カード",
  type: "object",
  fields: [
    defineField({
      name: "spot",
      title: "お店・スポット",
      type: "reference",
      to: [{ type: "spot" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "spot.name", subtitle: "spot.summary" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "（お店を選んでください）",
      subtitle,
    }),
  },
});
