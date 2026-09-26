"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterPill } from "./FilterPill";
import { SpotCard } from "../SpotCard";
import { spotCategories, spotGenres } from "@/lib/labels";
import type { SpotCategory, SpotGenre } from "@/lib/labels";
import { knownGenres } from "@/lib/spot";
import type { SpotListQueryResult } from "@/sanity/types";

/** 区分の丸の色（絞り込みボタンの目印） */
const categoryDots: Record<SpotCategory, string> = {
  terrace: "var(--color-miso)",
  kura: "var(--color-indigo)",
  spot: "var(--color-ink)",
  local: "var(--color-cream)",
};

/** 最初に見せる件数。残りは「もっと見る」で開く（HTMLには全件ある） */
const INITIAL_VISIBLE = 12;

const categoryKeys = Object.keys(spotCategories) as SpotCategory[];
const genreKeys = Object.keys(spotGenres) as SpotGenre[];

type Props = { spots: SpotListQueryResult };

export function SpotList({ spots }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  // 絞り込みの状態はURLのクエリパラメータが正。戻る・進む・共有に耐える
  const categoryParam = searchParams.get("category");
  const category = categoryKeys.includes(categoryParam as SpotCategory)
    ? (categoryParam as SpotCategory)
    : null;
  const selectedGenres = (searchParams.get("genre") ?? "")
    .split(",")
    .filter((genre): genre is SpotGenre => genre in spotGenres);

  function updateParams(next: {
    category?: SpotCategory | null;
    genres?: SpotGenre[];
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = next.category === undefined ? category : next.category;
    const nextGenres = next.genres ?? selectedGenres;

    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");
    if (nextGenres.length > 0) params.set("genre", nextGenres.join(","));
    else params.delete("genre");

    const query = params.toString();
    // 履歴を汚さず、スクロール位置も動かさない
    router.replace(query ? `/spots/?${query}` : "/spots/", { scroll: false });
    setExpanded(false);
  }

  function toggleGenre(genre: SpotGenre) {
    const next = selectedGenres.includes(genre)
      ? selectedGenres.filter((value) => value !== genre)
      : [...selectedGenres, genre];
    updateParams({ genres: next });
  }

  // 絞り込みの計算。React Compiler が自動でメモ化するので useMemo は書かない
  const byCategory = category
    ? spots.filter((spot) => spot.category === category)
    : spots;

  const visibleSpots =
    selectedGenres.length === 0
      ? byCategory
      : byCategory.filter((spot) => {
          const genres = knownGenres(spot.genres);
          return selectedGenres.some((genre) => genres.includes(genre));
        });

  const categoryCounts = new Map<SpotCategory, number>(
    categoryKeys.map((key) => [
      key,
      spots.filter((spot) => spot.category === key).length,
    ]),
  );

  // ジャンルの件数は、選んでいる区分の中での件数を出す
  const genreCounts = new Map<SpotGenre, number>(
    genreKeys.map((key) => [
      key,
      byCategory.filter((spot) => knownGenres(spot.genres).includes(key))
        .length,
    ]),
  );

  const filtered = category !== null || selectedGenres.length > 0;
  const shown = expanded ? visibleSpots.length : INITIAL_VISIBLE;
  const rest = visibleSpots.length - shown;

  const summary = [
    category ? spotCategories[category] : null,
    ...selectedGenres.map((genre) => spotGenres[genre]),
  ]
    .filter(Boolean)
    .join(" ・ ");

  return (
    <>
      <section
        aria-label="絞り込み"
        className="flex flex-col gap-4 rounded-[18px] border-[3px] border-ink bg-white p-4 shadow-hard lg:gap-5 lg:rounded-[20px] lg:p-[28px_32px]"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
          <span className="w-22 shrink-0 font-mono text-[13px] tracking-[0.14em]">
            区分
          </span>
          <div
            role="group"
            aria-label="区分"
            className="-mx-4 flex gap-2.5 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          >
            <FilterPill
              label="すべて"
              count={spots.length}
              active={category === null}
              onClick={() => updateParams({ category: null })}
            />
            {categoryKeys.map((key) => (
              <FilterPill
                key={key}
                label={spotCategories[key]}
                count={categoryCounts.get(key)}
                active={category === key}
                dotColor={categoryDots[key]}
                onClick={() =>
                  updateParams({ category: category === key ? null : key })
                }
              />
            ))}
          </div>
        </div>

        <div className="border-t-2 border-dashed border-ink" />

        {/* スマホではジャンルを畳んでおく */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-expanded={genreOpen}
            onClick={() => setGenreOpen((open) => !open)}
            className="flex h-13 w-full items-center justify-between font-bold"
          >
            <span className="flex items-center gap-2.5">
              ジャンルで絞り込む
              {selectedGenres.length > 0 ? (
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo px-1.5 font-mono text-xs text-cream">
                  {selectedGenres.length}
                </span>
              ) : null}
            </span>
            <span aria-hidden="true">{genreOpen ? "▲" : "▼"}</span>
          </button>
        </div>

        <div
          className={`flex flex-col gap-3 lg:flex lg:flex-row lg:items-start lg:gap-6 ${
            genreOpen ? "flex" : "hidden"
          }`}
        >
          <span className="hidden w-22 shrink-0 pt-3 font-mono text-[13px] tracking-[0.14em] lg:block">
            ジャンル
          </span>
          <div
            role="group"
            aria-label="ジャンル（複数選べます）"
            className="flex flex-wrap gap-2"
          >
            {genreKeys.map((key) => {
              const count = genreCounts.get(key) ?? 0;
              return (
                <FilterPill
                  key={key}
                  label={spotGenres[key]}
                  count={count}
                  active={selectedGenres.includes(key)}
                  disabled={count === 0 && !selectedGenres.includes(key)}
                  showCheck
                  size="sm"
                  onClick={() => toggleGenre(key)}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 lg:gap-6">
          <div className="flex flex-wrap items-baseline gap-2 lg:gap-4">
            <span className="font-display text-[28px] lg:text-5xl">
              {visibleSpots.length}
              <span className="text-base lg:text-2xl">件</span>
            </span>
            {summary ? (
              <span className="text-[15px] font-bold">{summary}</span>
            ) : null}
            {filtered ? (
              <button
                type="button"
                onClick={() => updateParams({ category: null, genres: [] })}
                className="h-11 font-bold underline"
              >
                条件をリセット
              </button>
            ) : null}
          </div>
          <span className="text-xs lg:text-sm">
            閉店したお店は一覧に載せていません。
          </span>
        </div>

        {visibleSpots.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-2xl border-2 border-dashed border-ink p-7 lg:p-14">
            <p className="font-display text-xl leading-[1.5] lg:text-[28px]">
              条件に合うお店・スポットはありません
            </p>
            <button
              type="button"
              onClick={() => updateParams({ category: null, genres: [] })}
              className="h-13 rounded-full bg-indigo px-7 font-bold text-cream transition-colors hover:bg-ink"
            >
              条件をリセット
            </button>
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
          {visibleSpots.map((spot, index) => (
            <div
              key={spot.slug}
              // 全件をHTMLに出し、「もっと見る」までは見た目だけ畳む（SEOのため）
              hidden={index >= shown}
            >
              <SpotCard spot={spot} priority={index < 3} />
            </div>
          ))}
        </div>

        {rest > 0 ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="h-14 self-start rounded-full border-2 border-ink px-8 font-bold transition-colors hover:bg-ink hover:text-cream"
          >
            もっと見る（残り{rest}件）
          </button>
        ) : null}
      </section>
    </>
  );
}
