// このファイルはサーバー専用。クライアントコンポーネントから import すると
// ビルドが失敗する（トークンがブラウザに漏れないようにするため）
import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error(
    "環境変数が足りません：SANITY_API_READ_TOKEN（Viewer 権限の読み取り専用トークン）",
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  // 公開済みのデータだけを読む。下書きはサイトに出さない
  perspective: "published",
  // トークン付きでも画像・データのCDNは使える
  useCdn: true,
});
