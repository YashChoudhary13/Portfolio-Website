import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Stacked-duplicate text hover (DESIGN_ANALYSIS §1.6): label slides up
 * and out while its twin enters from below. 0.45s expo.
 * Internal hrefs ("/...") render through next/link for client navigation.
 */
export default function SlideSwapLink({
  label,
  suffix,
  className,
  ...rest
}: {
  label: ReactNode;
  suffix?: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal =
    typeof rest.href === "string" && rest.href.startsWith("/");
  const Tag = (internal ? Link : "a") as "a";
  return (
    <Tag
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })}
      className={`group relative inline-flex items-center gap-1 overflow-hidden align-baseline ${className ?? ""}`}
    >
      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[110%]">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-0 block translate-y-[110%] transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {label}
      </span>
      {suffix ? <span className="shrink-0">{suffix}</span> : null}
    </Tag>
  );
}
