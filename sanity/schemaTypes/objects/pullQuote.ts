import { defineField, defineType } from "sanity";

/** 記事本文のブロック：引用（藍地・生成り文字） */
export const pullQuote = defineType({
  name: "pullQuote",
  title: "引用",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "引用する言葉",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "source",
      title: "話した人・出典",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "source" },
  },
});
