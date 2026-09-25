import Link from "next/link";
import { siteName } from "@/lib/nav";

type Props = {
  /** ヘッダー・スマホメニュー用の小さめ（既定）か、フッター用の大きめか */
  size?: "sm" | "lg";
  /** フッター（墨地）では文字を生成りにする */
  tone?: "ink" | "cream";
};

export function Logo({ size = "sm", tone = "ink" }: Props) {
  if (size === "lg") {
    return (
      <Link
        href="/"
        className={`font-display text-[26px] lg:text-[36px] ${
          tone === "cream" ? "text-cream hover:text-cream" : ""
        }`}
      >
        {siteName}
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 lg:gap-3">
      <span className="flex size-9 items-center justify-center rounded-full bg-indigo font-display text-base text-cream lg:size-11 lg:text-xl">
        B
      </span>
      <span className="font-display text-lg lg:text-2xl">{siteName}</span>
    </Link>
  );
}
