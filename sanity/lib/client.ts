import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // 公開済みのデータだけを、Next.js のキャッシュ越しに読む
  useCdn: true,
  perspective: "published",
});
