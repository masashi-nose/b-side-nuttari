import { notFound } from "next/navigation";
import { AccessCta } from "@/components/AccessCta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { GenreTag } from "@/components/GenreTag";
import { KubunTag } from "@/components/KubunTag";
import { SectionHeading } from "@/components/SectionHeading";
import { spotCategories, spotGenres } from "@/lib/labels";
import type { SpotCategory, SpotGenre } from "@/lib/labels";

// 開発時だけ見るページ。本番では 404
export const metadata = { robots: { index: false, follow: false } };

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border-[3px] border-ink bg-white p-6 lg:p-8">
      <span className="font-mono text-xs tracking-[0.14em]">{label}</span>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="page-gutter flex flex-col gap-16 pb-16 lg:gap-24 lg:pb-28">
      <div className="flex flex-col gap-3 border-b-[3px] border-ink pb-8">
        <span className="font-mono text-sm tracking-[0.14em]">
          DESIGN SYSTEM
        </span>
        <h1 className="font-display text-[32px] leading-[1.2] font-normal lg:text-[64px]">
          コンポーネント一覧
        </h1>
      </div>

      <section className="flex flex-col gap-8">
        <SectionHeading en="01 — COLOR" title="配色" level="sub" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {(
            [
              ["藍", "bg-indigo", "text-cream", "#22388F"],
              ["橙", "bg-miso", "text-ink", "#D9782D"],
              ["生成り", "bg-cream", "text-ink", "#F7F3EA"],
              ["墨", "bg-ink", "text-cream", "#1B1B1B"],
              ["砂", "bg-sand", "text-ink", "#E9E2D2"],
              ["砂（濃）", "bg-sand-dark", "text-ink", "#D9D2C2"],
              ["仮置きの文字", "bg-muted", "text-cream", "#5A5448"],
              ["営業中", "bg-open", "text-cream", "#1F8A4C"],
            ] as const
          ).map(([name, bg, fg, hex]) => (
            <div
              key={hex}
              className="overflow-hidden rounded-2xl border-[3px] border-ink bg-white"
            >
              <div
                className={`flex h-24 items-start p-5 font-display text-[22px] lg:h-40 lg:text-[28px] ${bg} ${fg}`}
              >
                {name}
              </div>
              <div className="border-t-[3px] border-ink p-4">
                <span className="font-mono text-[13px]">{hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading en="02 — TYPE" title="書体と見出し" level="sub" />
        <div className="flex flex-col divide-y divide-[color:var(--color-rule)] rounded-[20px] border-[3px] border-ink bg-white px-6 lg:px-10">
          <div className="flex flex-col gap-3 py-7 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-baseline lg:gap-8">
            <span className="font-mono text-[13px] leading-[1.7]">
              キャッチ h1
              <br />
              Dela Gothic One 88 / SP 48
            </span>
            <span className="font-display text-5xl leading-[1.2] text-indigo lg:text-[88px]">
              沼垂の、すぐそばに。
            </span>
          </div>
          <div className="flex flex-col gap-3 py-7 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-baseline lg:gap-8">
            <span className="font-mono text-[13px] leading-[1.7]">
              店名・記事 h1
              <br />
              60–64 / SP 32–36
            </span>
            <span className="font-display text-[32px] leading-[1.2] lg:text-[64px]">
              今代司酒造
            </span>
          </div>
          <div className="flex flex-col gap-3 py-7 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-baseline lg:gap-8">
            <span className="font-mono text-[13px] leading-[1.7]">
              記事の見出し
              <br />
              32 / SP 22 ＋橙マーカー
            </span>
            <span className="flex items-center gap-3.5 font-display text-[22px] lg:text-[32px]">
              <span className="h-8 w-3.5 rounded border-2 border-ink bg-miso lg:h-9" />
              まずは今代司酒造へ
            </span>
          </div>
          <div className="flex flex-col gap-3 py-7 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-baseline lg:gap-8">
            <span className="font-mono text-[13px] leading-[1.7]">
              本文
              <br />
              Zen Kaku Gothic New 17–19 / 1.9–2.1
            </span>
            <span className="text-base leading-[2] lg:text-lg">
              沼垂のお店とスポットをひとつにまとめました。新しいけど、どこか懐かしい。発酵と醸造のまちを、もっと身近に。
            </span>
          </div>
          <div className="flex flex-col gap-3 py-7 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-baseline lg:gap-8">
            <span className="font-mono text-[13px] leading-[1.7]">
              英字の小見出し
              <br />
              DM Mono 12–15 / 字間 0.14em
            </span>
            <span className="font-mono text-[15px] tracking-[0.14em]">
              FEATURE · GUIDE · HISTORY · SPOT
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading en="03 — BUTTONS" title="ボタン・ナビ" level="sub" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Row label="PRIMARY 主">
            <Button href="/spots/" className="self-start">
              お店とスポットを見る
            </Button>
            <span className="text-[13px]">藍地・生成り文字。ホバーで墨</span>
          </Row>
          <Row label="SECONDARY 副">
            <Button href="/access/" variant="secondary" className="self-start">
              アクセス
            </Button>
            <span className="text-[13px]">墨2px枠。ホバーで墨地</span>
          </Row>
          <div className="flex flex-col gap-4 rounded-[20px] border-[3px] border-ink bg-miso p-6 lg:p-8">
            <span className="font-mono text-xs tracking-[0.14em]">
              DARK 濃（橙の上）
            </span>
            <Button href="/access/" variant="dark" className="self-start">
              行き方を見る
            </Button>
            <span className="text-[13px]">墨地・生成り文字</span>
          </div>
        </div>
        <Row label="BUTTON（押せない状態）">
          <Button disabled className="self-start">
            送信する
          </Button>
          <span className="text-[13px]">同意前は押せない（45%）</span>
        </Row>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading en="04 — TAGS" title="タグ" level="sub" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Row label="区分（KubunTag）">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(spotCategories) as SpotCategory[]).map((key) => (
                <KubunTag key={key} category={key} />
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(spotCategories) as SpotCategory[]).map((key) => (
                <KubunTag key={key} category={key} size="sm" />
              ))}
            </div>
          </Row>
          <Row label="ジャンル（GenreTag・墨2px枠）">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(spotGenres) as SpotGenre[]).map((key) => (
                <GenreTag key={key} genre={key} />
              ))}
            </div>
          </Row>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading
          en="05 — BLOCKS"
          title="見出し・パンくず・アクセス導線"
          level="sub"
        />
        <Row label="SECTION HEADING">
          <SectionHeading
            title="お店とスポット"
            action={{ label: "46件すべて見る", href: "/spots/" }}
          />
          <SectionHeading title="近くのお店" level="sub" />
        </Row>
        <Row label="BREADCRUMB">
          <Breadcrumb
            items={[
              { label: "お店・スポット", href: "/spots/" },
              { label: "今代司酒造" },
            ]}
          />
        </Row>
        <AccessCta description="徒歩ルート・バス・駐車場 [所要時間は確認して記入]" />
      </section>
    </div>
  );
}
