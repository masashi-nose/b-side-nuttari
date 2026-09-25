import { defineArrayMember, defineType } from "sanity";

const textBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "本文", value: "normal" },
    { title: "見出し", value: "h2" },
    { title: "小見出し", value: "h3" },
  ],
  lists: [{ title: "箇条書き", value: "bullet" }],
  marks: {
    decorators: [
      { title: "太字", value: "strong" },
      { title: "斜体", value: "em" },
    ],
    annotations: [{ name: "link", type: "link" }],
  },
});

/** 店舗の紹介文・固定ページの本文。見出しと段落だけの素朴な本文 */
export const richText = defineType({
  name: "richText",
  title: "本文",
  type: "array",
  of: [textBlock],
});

/**
 * 記事の本文。ブロックは4つだけ（docs/cms-schema.md）：
 * 見出し（h2/h3）、画像＋キャプション、店舗カード、引用
 */
export const articleBody = defineType({
  name: "articleBody",
  title: "本文",
  type: "array",
  of: [
    textBlock,
    defineArrayMember({ type: "captionedImage" }),
    defineArrayMember({ type: "spotCard" }),
    defineArrayMember({ type: "pullQuote" }),
  ],
});
