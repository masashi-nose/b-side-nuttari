import type { SchemaTypeDefinition } from "sanity";

import { article } from "./documents/article";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";
import { spot } from "./documents/spot";

import { altImage } from "./objects/altImage";
import { captionedImage } from "./objects/captionedImage";
import { heroSlide } from "./objects/heroSlide";
import { link } from "./objects/link";
import { pullQuote } from "./objects/pullQuote";
import { articleBody, richText } from "./objects/richText";
import { seo } from "./objects/seo";
import { spotCard } from "./objects/spotCard";

export const schemaTypes: SchemaTypeDefinition[] = [
  // ドキュメントは4種類だけ（docs/cms-schema.md）
  spot,
  article,
  page,
  siteSettings,
  // 部品
  altImage,
  captionedImage,
  heroSlide,
  link,
  pullQuote,
  richText,
  articleBody,
  seo,
  spotCard,
];
