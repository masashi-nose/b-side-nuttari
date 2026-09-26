import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SpotList } from "@/components/spot/SpotList";
import { client } from "@/sanity/lib/client";
import { spotListQuery } from "@/sanity/lib/queries";

const description =
  "沼垂テラス商店街のお店、酒蔵・味噌蔵などの蔵元、神社やお寺まで。沼垂エリアのお店とスポットを、区分とジャンルで探せます。";

export const metadata: Metadata = {
  title: "お店とスポット",
  description,
  // 絞り込みはクエリパラメータで持つので、canonical は /spots/ に寄せる
  alternates: { canonical: "/spots/" },
};

export default async function SpotsPage() {
  const spots = await client.fetch(spotListQuery);

  return (
    <div className="page-gutter flex flex-col gap-8 pb-16 lg:gap-12 lg:pb-28">
      <Breadcrumb items={[{ label: "お店・スポット" }]} />

      <section className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
        <div className="flex flex-col gap-3 lg:gap-4">
          <span className="font-mono text-xs tracking-[0.14em] lg:text-sm">
            SPOTS
          </span>
          <h1 className="font-display text-[34px] leading-[1.2] font-normal lg:text-[64px]">
            お店とスポット
          </h1>
        </div>
        <p className="text-base leading-[1.9] text-pretty lg:pb-2.5 lg:text-lg">
          {description}
        </p>
      </section>

      {/* 絞り込みは URL のクエリパラメータを読むので Suspense で囲む */}
      <Suspense fallback={null}>
        <SpotList spots={spots} />
      </Suspense>
    </div>
  );
}
