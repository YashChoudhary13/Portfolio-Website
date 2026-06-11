import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-svh flex-col items-center justify-center py-24 text-center">
      <h1 className="text-display text-[length:var(--text-display-md)]">404</h1>
      <p className="mt-6 text-lg text-ink-65">
        This page doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg border hairline bg-white/[0.04] px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:bg-white/[0.08]"
      >
        Back home
      </Link>
    </main>
  );
}
