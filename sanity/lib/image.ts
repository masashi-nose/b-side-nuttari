import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Sanity の画像CDNのURLを作る。next/image の src に渡す */
export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
