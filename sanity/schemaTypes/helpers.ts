import type { CustomValidatorResult, Slug } from "sanity";

/** URLは英小文字・数字・ハイフンのみ（docs/sitemap.md） */
export function slugRule(value: Slug | undefined): CustomValidatorResult {
  const current = value?.current;
  if (!current) return true;
  if (!/^[a-z0-9-]+$/.test(current)) {
    return "英小文字・数字・ハイフンだけで書いてください（日本語は入れない）";
  }
  if (current.startsWith("-") || current.endsWith("-")) {
    return "前後のハイフンを取ってください";
  }
  return true;
}

/** 最終確認日が180日より前なら警告（公開は止めない） */
export function staleVerifiedWarning(
  value: string | undefined,
): CustomValidatorResult {
  if (!value) return true;
  const days = (Date.now() - new Date(value).getTime()) / 86_400_000;
  if (days > 180) {
    return "確認から180日以上たっています。お店の情報を見直してください";
  }
  return true;
}

/** { key: "表示名" } を Sanity の options.list に変換する */
export function toOptionList<T extends Record<string, string>>(labels: T) {
  return Object.entries(labels).map(([value, title]) => ({ value, title }));
}
