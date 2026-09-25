import {
  DM_Mono,
  Dela_Gothic_One,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";

// 日本語フォントはファイルが大きいので preload せず、swap で出す
const dela = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-dela",
});

const zen = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-zen",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

/**
 * サイト共通のヘッダー・フッターは app/(site)/layout.tsx にある。
 * Studio（/studio）はこの layout の下でサイトの枠組みを付けずに描画する。
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${dela.variable} ${zen.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
