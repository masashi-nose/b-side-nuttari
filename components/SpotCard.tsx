import Link from "next/link";
import { KubunTag } from "./KubunTag";
import { GenreTag } from "./GenreTag";
import { SanityImage, type SanityImageValue } from "./SanityImage";
import { knownGenres } from "@/lib/spot";
import type { SpotCategory } from "@/lib/labels";

export type SpotCardData = {
  name: string | null;
  slug: string | null;
  category: SpotCategory | null;
  summary?: string | null;
  genres?: Array<string> | null;
  mainImage: SanityImageValue;
};

type Props = {
  spot: SpotCardData;
  /** PC は写真が上、スマホは写真が左の横長（既定）。row はどの幅でも横長 */
  layout?: "auto" | "row";
  priority?: boolean;
};

/** 店舗カード。写真がまだ無いときは砂色の仮置きが入る */
export function SpotCard({ spot, layout = "auto", priority = false }: Props) {
  if (!spot.slug) return null;
  const genres = knownGenres(spot.genres ?? null);

  const shell =
    "border-ink flex overflow-hidden border-[3px] no-underline transition-transform duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] bg-white";
  const shape =
    layout === "row"
      ? "rounded-[14px] shadow-hard-sm hover:shadow-hard"
      : "rounded-[14px] shadow-hard-sm hover:shadow-hard lg:rounded-2xl lg:flex-col lg:shadow-hard lg:hover:shadow-hard-hover";

  const photo =
    layout === "row"
      ? "relative w-28 shrink-0 self-stretch border-r-[3px] border-ink min-h-[116px]"
      : "relative w-28 shrink-0 self-stretch border-r-[3px] border-ink min-h-[116px] lg:h-55 lg:w-full lg:border-r-0 lg:border-b-[3px]";

  return (
    <Link href={`/spots/${spot.slug}/`} className={`${shell} ${shape}`}>
      <div className={photo}>
        <SanityImage
          image={spot.mainImage}
          fallbackLabel={`[写真：${spot.name ?? ""}]`}
          sizes={
            layout === "row" ? "112px" : "(min-width: 1024px) 400px, 112px"
          }
          priority={priority}
        />
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-3.5 lg:gap-3 lg:p-6">
        <div className="flex flex-wrap gap-1.5 lg:gap-2">
          {spot.category ? (
            <KubunTag category={spot.category} size="sm" />
          ) : null}
          {genres.slice(0, 1).map((genre) => (
            <GenreTag key={genre} genre={genre} size="sm" />
          ))}
        </div>
        <div className="text-lg font-bold lg:text-2xl">{spot.name}</div>
        {spot.summary ? (
          <div className="text-[13px] leading-[1.6] lg:text-[15px] lg:leading-[1.7]">
            {spot.summary}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
