import Link from "next/link";

const PortalNotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-linen/30 px-6">
    <div className="max-w-md rounded-sm border border-border bg-background p-10 text-center">
      <h1 className="font-display text-3xl">
        We couldn&apos;t find that portal.
      </h1>
      <p className="mt-3 text-muted-foreground">
        The link may be incorrect. Check the URL from your confirmation email.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-full bg-forest px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  </div>
);

export default PortalNotFound;
