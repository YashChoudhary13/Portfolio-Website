/**
 * Project status indicator — live builds get the accent pulse,
 * shipped builds a steady dot. Mono, quiet, unmistakable.
 */
export default function StatusChip({
  status,
  label,
  className,
}: {
  status: "live" | "shipped";
  label: string;
  className?: string;
}) {
  const live = status === "live";
  return (
    <span
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] ${
        live
          ? "border-accent/30 text-accent"
          : "hairline text-ink-65"
      } ${className ?? ""}`}
    >
      <span className="relative flex size-1.5">
        {live && (
          <span className="absolute size-full animate-ping rounded-full bg-accent opacity-60" />
        )}
        <span
          className={`relative size-1.5 rounded-full ${
            live ? "bg-accent" : "bg-white/40"
          }`}
        />
      </span>
      {label}
    </span>
  );
}
