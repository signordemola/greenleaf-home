import { notFound } from "next/navigation";
import { loadPortalClient } from "@/lib/portal-data";
import { PortalNav } from "@/components/portal/portal-nav";
import { Logo } from "@/components/site/logo";

const PortalLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  return (
    <div className="min-h-screen bg-linen/30">
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Logo />
          <p className="text-sm text-muted-foreground">
            {client.name.split(" ")[0]}&apos;s home
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">
        <PortalNav token={token} />
        <div className="py-8">{children}</div>
      </main>
    </div>
  );
};

export default PortalLayout;
