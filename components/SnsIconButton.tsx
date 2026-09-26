import type { ReactNode } from "react";

type Props = {
  href: string;
  /** 読み上げとツールチップに使う名前（例：Instagram） */
  label: string;
  children: ReactNode;
};

/** アイコンだけの丸ボタン（PC 56px／スマホ 48px） */
export function SnsIconButton({ href, label, children }: Props) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white transition-colors hover:bg-sand lg:size-14"
    >
      {children}
    </a>
  );
}

/** 公式サイト（地球のアイコン） */
export function WebsiteIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="lg:size-6"
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

/** Instagram（公式ブランドアイコンの形） */
export function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="lg:size-6"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
