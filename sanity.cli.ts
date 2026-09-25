import { defineCliConfig } from "sanity/cli";

// Sanity CLI（schema extract / typegen / dataset 操作）用。
// Studio は Next.js に埋め込んでいるので、ここでは studioHost を持たない。
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    // スキーマと、コード中の defineQuery() から sanity/types.ts を作る
    path: "./**/*.{ts,tsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity/types.ts",
    overloadClientMethods: true,
  },
});
