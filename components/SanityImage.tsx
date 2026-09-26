import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export type SanityImageValue = {
  alt: string | null;
  asset: {
    _id: string;
    url: string | null;
    lqip: string | null;
    aspectRatio: number | null;
  } | null;
} | null;

type Props = {
  image: SanityImageValue;
  /** 写真が無いときに枠内へ出す文字（例：[写真：今代司酒造]） */
  fallbackLabel: string;
  /** 画面幅ごとの表示幅。next/image が配信サイズを選ぶのに使う */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Sanity の画像を next/image で出す。写真がまだ無いときは砂色の仮置きを出す。
 * 親要素に position: relative と高さ（または aspect-ratio）を持たせて使う。
 */
export function SanityImage({
  image,
  fallbackLabel,
  sizes,
  priority = false,
  className = "",
}: Props) {
  const asset = image?.asset;

  if (!asset?.url) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-sand p-4 text-center text-xs text-muted lg:text-sm ${className}`}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      // 幅は sizes から決まるので、ここでは十分大きい値を渡す
      src={urlForImage(asset._id).width(1600).url()}
      alt={image?.alt ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={asset.lqip ? "blur" : "empty"}
      blurDataURL={asset.lqip ?? undefined}
      className={`object-cover ${className}`}
    />
  );
}
