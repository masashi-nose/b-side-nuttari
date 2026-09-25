import Link from "next/link";

export type Crumb = {
  label: string;
  /** 最後の項目（現在地）は href を付けない */
  href?: string;
};

type Props = {
  items: Crumb[];
};

/** トップ ／ お店・スポット ／ 今代司酒造 */
export function Breadcrumb({ items }: Props) {
  return (
    <nav
      aria-label="パンくず"
      className="flex flex-wrap gap-2 pt-1 pb-4 text-[13px] lg:gap-2.5 lg:pt-2 lg:pb-8 lg:text-sm"
    >
      <Link href="/">トップ</Link>
      {items.map((item) => (
        <span key={item.label} className="flex gap-2 lg:gap-2.5">
          <span aria-hidden="true">／</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
