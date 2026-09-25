import { NextStudioLayout } from "next-sanity/studio";

/** Studio はサイトのヘッダー・フッターを付けず、画面いっぱいに出す */
export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}
