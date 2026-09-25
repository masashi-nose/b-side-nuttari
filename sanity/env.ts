export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-25";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "環境変数が足りません：NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "環境変数が足りません：NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) throw new Error(errorMessage);
  return value;
}
