import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Sanity の画像CDNのURLを作る。GROQ で取った asset._id を渡す。
 * next/image の src に入れる。
 */
export function urlForImage(assetId: string) {
  return builder.image(assetId).auto("format").fit("max");
}
