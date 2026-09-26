import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import type { RichText as RichTextValue } from "@/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] leading-[2] lg:text-[17px] lg:leading-[2.1]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-4 font-display text-[22px] font-normal lg:text-[28px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-2 text-lg font-bold lg:text-xl">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 text-[15px] leading-[2] lg:text-[17px]">
        {children}
      </ul>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <Link href={href}>{children}</Link>;
    },
  },
};

/** 店舗の紹介文・固定ページの本文（見出しと段落だけ） */
export function RichText({ value }: { value: RichTextValue }) {
  return (
    <div className="flex flex-col gap-4">
      <PortableText value={value} components={components} />
    </div>
  );
}
