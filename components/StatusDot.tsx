import { spotStatuses, type SpotStatus } from "@/lib/labels";

/** 営業中は緑の丸、休業中は墨の輪。閉店はページ上部の帯で伝えるので出さない */
export function StatusDot({ status }: { status: SpotStatus }) {
  if (status === "closed") return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold lg:text-[13px]">
      <span
        className={
          status === "open"
            ? "size-2.5 rounded-full bg-open"
            : "size-2.5 rounded-full border-2 border-ink"
        }
      />
      {spotStatuses[status]}
    </span>
  );
}
