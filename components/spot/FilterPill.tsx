type Props = {
  label: string;
  count?: number;
  active: boolean;
  disabled?: boolean;
  /** 区分の色の丸（商店街＝橙 など）。ジャンルには付けない */
  dotColor?: string;
  /** 複数選べるジャンルは選択中にチェックを出す */
  showCheck?: boolean;
  onClick: () => void;
  size?: "md" | "sm";
};

/** 絞り込みのピル。選択中は墨地（ジャンルは藍地） */
export function FilterPill({
  label,
  count,
  active,
  disabled = false,
  dotColor,
  showCheck = false,
  onClick,
  size = "md",
}: Props) {
  const height = size === "md" ? "h-12 px-5 text-[15px]" : "h-11 px-4 text-sm";
  const tone = active
    ? showCheck
      ? "bg-indigo text-cream"
      : "bg-ink text-cream"
    : "bg-transparent hover:bg-sand";

  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink font-bold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-40 ${height} ${tone}`}
    >
      {dotColor ? (
        <span
          aria-hidden="true"
          className="size-3 shrink-0 rounded-full border-2 border-current"
          style={{ backgroundColor: dotColor }}
        />
      ) : null}
      {showCheck && active ? <span aria-hidden="true">✓</span> : null}
      <span>{label}</span>
      {count !== undefined ? (
        <span className="font-mono text-xs font-medium">{count}</span>
      ) : null}
    </button>
  );
}
