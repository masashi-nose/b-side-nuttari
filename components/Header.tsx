"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { SpMenu } from "./SpMenu";
import { navItems } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // /spots/imayotsukasa/ のような下層でも「お店・スポット」を現在地にする
  const currentHref = navItems.find((item) =>
    pathname.startsWith(item.href),
  )?.href;

  return (
    <>
      <header className="page-gutter flex items-center justify-between py-4 lg:py-7">
        <Logo />

        <nav
          aria-label="メイン"
          className="hidden gap-3 text-[15px] font-bold lg:flex"
        >
          {navItems.map((item) => {
            const current = item.href === currentHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full border-2 border-ink px-5 py-2.5 no-underline transition-colors ${
                  current
                    ? "bg-ink text-cream"
                    : "hover:bg-ink hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="flex size-12 items-center justify-center rounded-full border-2 border-ink bg-cream lg:hidden"
        >
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="1" y1="2" x2="19" y2="2" />
            <line x1="1" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </header>

      <SpMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentHref={currentHref}
      />
    </>
  );
}
