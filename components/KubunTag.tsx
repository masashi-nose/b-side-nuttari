import { spotCategories, type SpotCategory } from "@/lib/labels";

/** 区分ごとの色（docs/design-system.md） */
const tones: Record<SpotCategory, string> = {
  terrace: "border-miso bg-miso text-white",
  kura: "border-indigo bg-indigo text-cream",
  spot: "border-ink bg-ink text-cream",
  local: "border-ink bg-cream text-ink",
};

const sizes = {
  md: "text-[13px] px-3 py-[3px] rounded-md",
  sm: "text-[11px] px-2 py-px rounded-[5px]",
};

type Props = {
  category: SpotCategory;
  size?: keyof typeof sizes;
};

export function KubunTag({ category, size = "md" }: Props) {
  return (
    <span
      className={`inline-flex border-2 font-bold ${tones[category]} ${sizes[size]}`}
    >
      {spotCategories[category]}
    </span>
  );
}
