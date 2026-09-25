import { defineField, defineType } from "sanity";

/** 本文中のリンク（Portable Text のアノテーション） */
export const link = defineType({
  name: "link",
  title: "リンク",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
});
