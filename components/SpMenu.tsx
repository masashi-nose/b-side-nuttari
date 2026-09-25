"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { disclaimer, navItems } from "@/lib/nav";

type Props = {
  open: boolean;
  onClose: () => void;
  /** 現在地のナビ（href）。ヘッダーから渡す */
  currentHref?: string;
};

const focusableSelector =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function SpMenu({ open, onClose, currentHref }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 開いたら閉じるボタンにフォーカスを移し、背面のスクロールを止める
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  // Esc で閉じる／Tab をパネル内に閉じ込める
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="メニュー"
      // 閉じているときは visibility でフォーカスの対象から外す
      className={`fixed inset-0 z-50 flex flex-col bg-cream transition-transform duration-300 ease-out lg:hidden ${
        open ? "visible translate-x-0" : "invisible translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <Logo />
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="メニューを閉じる"
          onClick={onClose}
          className="flex size-12 items-center justify-center rounded-full border-2 border-ink bg-ink"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="text-cream"
            aria-hidden="true"
          >
            <line x1="2" y1="2" x2="16" y2="16" />
            <line x1="16" y1="2" x2="2" y2="16" />
          </svg>
        </button>
      </div>

      <nav aria-label="メイン" className="flex flex-col gap-3 px-4 pt-4">
        {navItems.map((item) => {
          const current = item.href === currentHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onClose}
              className={`flex min-h-[76px] items-center gap-3.5 rounded-2xl border-[3px] border-ink px-5 no-underline shadow-hard-sm ${
                current ? "bg-ink text-cream" : "bg-white"
              }`}
            >
              <span className="flex grow flex-col gap-0.5">
                <span className="font-mono text-[11px] tracking-[0.14em]">
                  {item.en}
                </span>
                <span className="font-display text-[22px]">{item.label}</span>
              </span>
              <span aria-hidden="true" className="text-xl font-bold">
                →
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-4 mt-7 flex items-center justify-between gap-3 rounded-2xl border-[3px] border-ink bg-miso p-5">
        <span className="font-display text-[17px] leading-[1.45]">
          新潟駅から、
          <br />
          歩いて沼垂へ。
        </span>
        <Button
          href="/access/"
          variant="dark"
          size="sm"
          className="shrink-0"
          onClick={onClose}
        >
          行き方を見る
        </Button>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t-[3px] border-ink p-5">
        <div className="flex gap-5 text-[13px] font-bold">
          <Link
            href="/about/"
            onClick={onClose}
            className="inline-flex min-h-11 items-center"
          >
            お問い合わせ
          </Link>
          <Link
            href="/privacy/"
            onClick={onClose}
            className="inline-flex min-h-11 items-center"
          >
            プライバシーポリシー
          </Link>
        </div>
        <p className="text-[11px] leading-[1.7]">{disclaimer}</p>
      </div>
    </div>
  );
}
