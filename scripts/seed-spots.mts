/**
 * data/spots.json の46件を Sanity に一括登録する。
 *
 *   npm run typegen        # 型を作る（任意）
 *   npm run seed:spots     # 登録
 *
 * .env.local に NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET /
 * SANITY_API_WRITE_TOKEN が必要。
 *
 * - すでに同じ _id の書類があれば手を入れない（createIfNotExists）。何度実行してもよい
 * - 入れるのは名前・区分・ジャンル・状態だけ。位置・ひとこと紹介・最終確認日は
 *   取材してから Studio で入力する（ここで事実を作らない）
 * - slug は英字名から作る。日本語名は仮の slug にしておき、あとで手で直す
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

type SourceSpot = {
  name: string;
  category: string;
  genres: string[];
  status: string;
};

/** --dry-run を付けると、登録せずに slug の一覧だけ出す */
const dryRun = process.argv.includes("--dry-run");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!dryRun && (!projectId || !dataset || !token)) {
  console.error(
    "環境変数が足りません。.env.local に NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN を入れてください。",
  );
  process.exit(1);
}

/** 英数字だけの名前から slug を作る。作れないときは undefined */
function slugFromName(name: string): string | undefined {
  const slug = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) return undefined;
  // 日本語（漢字・かな・全角）が混ざる名前は、読みが決められないので手作業に回す
  if (/[　-ヿ㐀-鿿豈-﫿＀-￯]/.test(name)) {
    return undefined;
  }
  return slug;
}

/** 名前から決まる _id。何度実行しても同じ書類を指す */
function idFromName(name: string): string {
  const hash = createHash("sha1").update(name).digest("hex").slice(0, 12);
  return `spot.${hash}`;
}

const source: SourceSpot[] = JSON.parse(
  readFileSync(new URL("../data/spots.json", import.meta.url), "utf8"),
);

const needsManualSlug: string[] = [];
let placeholderCount = 0;

const documents = source.map((spot) => {
  let slug = slugFromName(spot.name);
  if (!slug) {
    placeholderCount += 1;
    slug = `todo-${String(placeholderCount).padStart(2, "0")}`;
    needsManualSlug.push(`${slug}\t${spot.name}`);
  }
  return {
    _id: idFromName(spot.name),
    _type: "spot" as const,
    name: spot.name,
    slug: { _type: "slug" as const, current: slug },
    category: spot.category,
    genres: spot.genres,
    status: spot.status,
  };
});

const duplicateSlugs = documents
  .map((doc) => doc.slug.current)
  .filter((slug, index, all) => all.indexOf(slug) !== index);
if (duplicateSlugs.length > 0) {
  console.error("slug が重複しています:", duplicateSlugs.join(", "));
  process.exit(1);
}

if (dryRun) {
  console.log(`${documents.length}件（登録はしていない）`);
  for (const doc of documents) {
    console.log(`${doc.slug.current}\t${doc.name}`);
  }
} else {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-09-25",
    token,
    useCdn: false,
  });
  const transaction = client.transaction();
  for (const doc of documents) transaction.createIfNotExists(doc);
  await transaction.commit();
  console.log(
    `${documents.length}件を登録しました（既にあるものはそのまま）。`,
  );
}

if (needsManualSlug.length > 0) {
  console.log(
    `\n次の${needsManualSlug.length}件は slug が仮置きです。Studio で店名のローマ字に直してください（公開前に）:`,
  );
  console.log(needsManualSlug.join("\n"));
}

console.log(
  "\nこのあと Studio で、各お店の「位置」「ひとこと紹介」「最終確認日」を入れてください。",
);
