export type InfoRow = {
  label: string;
  /** 未入力のときは仮置き（[住所を記入] など）を渡す */
  value: string;
};

/** 白地・墨3px枠の dl（住所・営業時間・定休日） */
export function InfoTable({ rows }: { rows: InfoRow[] }) {
  return (
    <dl className="flex flex-col rounded-2xl border-[3px] border-ink bg-white px-4 py-1 text-[15px] lg:rounded-2xl lg:px-6 lg:py-2 lg:text-base">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`grid grid-cols-[76px_minmax(0,1fr)] gap-3 py-3 lg:grid-cols-[110px_minmax(0,1fr)] lg:gap-4 lg:py-3.5 ${
            index < rows.length - 1 ? "border-b border-rule" : ""
          }`}
        >
          <dt className="font-bold">{row.label}</dt>
          <dd className="m-0 whitespace-pre-line">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
