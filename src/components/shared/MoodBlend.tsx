import type { CSSProperties } from "react";

/**
 * The aurora seam between a dark act and a light act (or back). Pass the
 * exact surface colors that sit above and below so the ramp lands flush;
 * `vivid` turns the horizon glow up for the page's two big moments.
 */
export default function MoodBlend({
  to,
  dark,
  light,
  vivid = false,
}: {
  /** which mood the page is heading into */
  to: "light" | "dark";
  /** the dark surface color at this seam */
  dark: string;
  /** the light surface color at this seam */
  light: string;
  vivid?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`mood-blend ${
        to === "light" ? "mood-blend--down" : "mood-blend--up"
      } ${vivid ? "mood-blend--vivid" : ""}`}
      style={{ "--dark": dark, "--light": light } as CSSProperties}
    />
  );
}
