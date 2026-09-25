import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark";

const base =
  "inline-flex items-center justify-center rounded-full font-bold transition-colors disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // 藍地・生成り文字。ホバーで墨
  primary: "bg-indigo text-cream hover:bg-ink hover:text-cream",
  // 墨2px枠。ホバーで墨地
  secondary: "border-ink hover:bg-ink hover:text-cream border-2",
  // 墨地・生成り文字（橙の上で使う）。ホバーで藍
  dark: "bg-ink text-cream hover:bg-indigo hover:text-cream",
};

const sizes = {
  md: "h-14 px-8 text-base",
  sm: "h-12 px-5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export function Button(props: LinkProps | ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <Link href={href} className={`${cls} no-underline`} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}
