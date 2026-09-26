import { spotGenres, type SpotGenre } from "./labels";

/**
 * GROQ の戻り値では genres が string[] なので、
 * 知っているジャンルだけに絞ってから表示に使う。
 * （スキーマの選択肢を減らしても古いデータで落ちないように）
 */
export function knownGenres(genres: readonly string[] | null): SpotGenre[] {
  if (!genres) return [];
  return genres.filter((genre): genre is SpotGenre => genre in spotGenres);
}

/** 地図アプリで開くURL。位置が無いときは undefined */
export function mapAppUrl(
  location: { lat?: number; lng?: number } | null,
): string | undefined {
  if (location?.lat === undefined || location.lng === undefined) {
    return undefined;
  }
  return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
}

export function instagramUrl(account: string | null): string | undefined {
  if (!account) return undefined;
  return `https://www.instagram.com/${account}/`;
}

/** 2026-09-25 → 2026年9月25日。日付が無いときは undefined */
export function formatDate(date: string | null): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(parsed);
}
