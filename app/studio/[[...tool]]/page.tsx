import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Studio は検索エンジンに出さない（metadata に robots: noindex が入っている）
export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
