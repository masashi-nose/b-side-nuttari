import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteName } from "@/lib/nav";

export const metadata: Metadata = {
  title: siteName,
  description:
    "沼垂のお店とスポットをひとつにまとめました。新しいけど、どこか懐かしい。発酵と醸造のまちを、もっと身近に。",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
