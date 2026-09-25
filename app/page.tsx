import { Button } from "@/components/Button";

// Step 5 でカルーセル・ピックアップ・エリアマップを載せる
export default function Home() {
  return (
    <div className="page-gutter flex flex-col gap-8 py-10 lg:gap-10 lg:py-16">
      <span className="font-mono text-xs tracking-[0.14em] lg:text-[13px]">
        新潟・沼垂の非公式ガイド
      </span>
      <h1 className="font-display text-5xl leading-[1.25] font-normal text-indigo lg:text-[88px] lg:leading-[1.2]">
        沼垂の、
        <br className="lg:hidden" />
        すぐそばに。
      </h1>
      <p className="max-w-[720px] text-base leading-[2] lg:text-lg">
        沼垂のお店とスポットをひとつにまとめました。新しいけど、どこか懐かしい。発酵と醸造のまちを、もっと身近に。
      </p>
      <div className="flex flex-wrap gap-4">
        <Button href="/spots/">お店とスポットを見る</Button>
        <Button href="/access/" variant="secondary">
          アクセス
        </Button>
      </div>
    </div>
  );
}
