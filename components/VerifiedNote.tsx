import Link from "next/link";

/** 墨2pxの点線枠「この情報は［日付］に確認しました」 */
export function VerifiedNote({ date }: { date: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-ink px-4 py-3.5 text-[13px] leading-[1.8] lg:px-[22px] lg:py-[18px] lg:text-sm">
      この情報は <strong>{date}</strong>{" "}
      に確認しました。変わっているところがあれば、
      <Link href="/about/">お知らせください</Link>。
    </div>
  );
}
