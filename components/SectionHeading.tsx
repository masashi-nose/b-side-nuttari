import Link from "next/link";

type Props = {
  /** セクション見出し（h2） */
  title: string;
  /** 英字の小見出し（DM Mono）。省略可 */
  en?: string;
  /** 右端のリンク（例：46件すべて見る →） */
  action?: { label: string; href: string };
  /** 下層ページでは小さめ（PC 36px / SP 22〜24px） */
  level?: "top" | "sub";
};

export function SectionHeading({ title, en, action, level = "top" }: Props) {
  const size =
    level === "top" ? "text-[28px] lg:text-5xl" : "text-[22px] lg:text-[36px]";

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-4">
        {en ? (
          <span className="font-mono text-xs tracking-[0.14em] lg:text-[13px]">
            {en}
          </span>
        ) : null}
        <h2 className={`font-display font-normal ${size}`}>{title}</h2>
      </div>
      {action ? (
        <Link href={action.href} className="text-sm font-bold lg:text-base">
          {action.label} →
        </Link>
      ) : null}
    </div>
  );
}
