import Link from "next/link";
import { Logo } from "./Logo";
import { disclaimer, navItems } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-cream lg:mt-28">
      <div className="page-gutter flex flex-col gap-6 py-10 lg:gap-8 lg:py-[72px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Logo size="lg" tone="cream" />
          <nav
            aria-label="フッター"
            className="grid grid-cols-2 gap-x-4 text-[15px] font-bold lg:flex lg:gap-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-cream hover:text-cream lg:min-h-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs leading-[1.8] text-cream-muted lg:text-sm">
          {disclaimer}
        </p>
      </div>
    </footer>
  );
}
