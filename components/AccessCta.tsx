import { Button } from "./Button";

type Props = {
  /** 所要時間などの事実は書かない。必要なら呼び出し側で仮置きの文字列を渡す */
  description?: string;
};

/** 橙地・墨3px枠・ハードシャドウ・墨のボタン */
export function AccessCta({ description }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border-[3px] border-ink bg-miso p-6 shadow-hard lg:p-[40px_44px] lg:shadow-hard-lg">
      <p className="font-display text-xl leading-[1.45] lg:text-[32px]">
        新潟駅から、
        <br className="lg:hidden" />
        歩いて沼垂へ。
      </p>
      {description ? (
        <p className="text-sm lg:text-base">{description}</p>
      ) : null}
      <Button href="/access/" variant="dark" className="self-start">
        行き方を見る
      </Button>
    </div>
  );
}
