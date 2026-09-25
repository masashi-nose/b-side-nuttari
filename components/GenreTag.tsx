import { spotGenres, type SpotGenre } from "@/lib/labels";

const sizes = {
  md: "text-[13px] px-3 py-[3px] rounded-md",
  sm: "text-[11px] px-2 py-px rounded-[5px]",
};

type Props = {
  genre: SpotGenre;
  size?: keyof typeof sizes;
};

export function GenreTag({ genre, size = "md" }: Props) {
  return (
    <span
      className={`inline-flex border-2 border-ink font-bold ${sizes[size]}`}
    >
      {spotGenres[genre]}
    </span>
  );
}
