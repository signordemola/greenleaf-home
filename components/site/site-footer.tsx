import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-linen/50">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A small, careful cleaning team for homes in East Austin, Mueller,
            and South Lamar. Plant-based products. Same crew every visit.
          </p>
          <p className="mt-8 font-display text-2xl italic text-forest">
            Your home, handled.
          </p>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Visit
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/services" className="hover:text-forest">
                Services
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-forest">
                Book a clean
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-forest">
                Studio
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/login" className="hover:text-forest">
                Owner Login
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-forest">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-forest">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Studio
          </h4>
          <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
            <p>
              1108 E Cesar Chavez St
              <br />
              Austin, TX 78702
            </p>
            <p>
              hello@greenleafhome.co
              <br />
              (512) 555-0140
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[88rem] flex-col items-start justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Greenleaf Home Co. Licensed & insured in Texas.</p>
          <p>Designed in East Austin, cleaned across the city.</p>
        </div>
      </div>
    </footer>
  );
}
