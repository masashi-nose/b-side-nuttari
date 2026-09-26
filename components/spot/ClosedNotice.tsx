import Link from "next/link";

/**
 * 閉店したお店のページは消さずに残し、いちばん上でそれを伝える
 * （docs/sitemap.md）。休業中はこの帯を出さず、状態の丸で示す。
 */
export function ClosedNotice({ spotName }: { spotName: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-ink px-5 py-4 text-cream lg:px-8 lg:py-6">
      <p className="font-display text-lg lg:text-2xl">閉店しました</p>
      <p className="text-[13px] leading-[1.8] lg:text-sm">
        {spotName}
        は閉店しています。このページは記録として残しています。
        <Link href="/spots/" className="text-cream underline hover:text-cream">
          いま開いているお店を見る
        </Link>
      </p>
    </div>
  );
}
