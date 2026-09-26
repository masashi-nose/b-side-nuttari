"use client";

import { useState } from "react";
import { SanityImage, type SanityImageValue } from "../SanityImage";

type Props = {
  /** メイン写真＋ギャラリー。空でも仮置きの枠を出す */
  images: SanityImageValue[];
  spotName: string;
};

/** 大きな写真と、その下のサムネイル。押すと大きい方が切り替わる */
export function SpotGallery({ images, spotName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = images.length > 0 ? images : [null];
  const active = photos[activeIndex] ?? photos[0];

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <div className="relative h-70 overflow-hidden rounded-[18px] border-[3px] border-ink shadow-hard lg:h-140 lg:rounded-[20px] lg:shadow-hard-lg">
        <SanityImage
          image={active}
          fallbackLabel={`[写真：${spotName}]`}
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
        />
      </div>

      {photos.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 lg:gap-3">
          {photos.map((photo, index) => {
            const current = index === activeIndex;
            return (
              <button
                key={photo?.asset?._id ?? index}
                type="button"
                aria-label={`${index + 1}枚目の写真を見る`}
                aria-pressed={current}
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 overflow-hidden rounded-[10px] border-ink lg:h-[110px] lg:rounded-xl ${
                  current
                    ? "border-[3px] shadow-hard-sm"
                    : "border-2 opacity-80 hover:opacity-100"
                }`}
              >
                <SanityImage
                  image={photo}
                  fallbackLabel={`[写真${index + 1}]`}
                  sizes="(min-width: 1024px) 200px, 25vw"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
