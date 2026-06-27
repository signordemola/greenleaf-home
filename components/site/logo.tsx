import Link from "next/link";

export function Logo({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const color = tone === "cream" ? "text-cream" : "text-ink";
  const accent =
    tone === "cream" ? "oklch(0.78 0.09 145)" : "oklch(0.45 0.08 148)";

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${color} group`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 3a13 13 0 1 0 13 13h-9"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20.5 11.2c-4.25 0-7.7 3.45-7.7 7.7 0 .35.03.69.08 1.02.33.05.67.08 1.02.08 4.25 0 7.7-3.45 7.7-7.7 0-.35-.03-.69-.08-1.02a7.9 7.9 0 0 0-1.02-.08z"
          fill={accent}
        />
        <path
          d="M13 20l7.5-7.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <span className="font-display text-[1.1rem] tracking-tight leading-none group-hover:text-forest transition-colors">
        Greenleaf
        <span className="ml-1.5 align-middle font-sans text-[0.65rem] font-normal uppercase tracking-[0.2em] text-muted-foreground">
          Home Co.
        </span>
      </span>
    </Link>
  );
}
