import { Reveal } from "./Reveal";

/**
 * Section eyebrow row — mono index left, optional meta right,
 * sitting on a hairline (DESIGN_ANALYSIS §2).
 */
export default function Eyebrow({
  children,
  right,
  className,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={`flex items-baseline justify-between gap-6 border-b hairline pb-4 ${className ?? ""}`}
    >
      <span className="text-eyebrow">{children}</span>
      {right ? <span className="text-eyebrow">{right}</span> : null}
    </Reveal>
  );
}
