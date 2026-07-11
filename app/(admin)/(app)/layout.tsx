import { requireOwner } from "@/lib/dal";
import { Logo } from "@/components/site/logo";
import { OwnerNav } from "@/components/dashboard/owner-nav";
import { LogoutButton } from "@/components/dashboard/logout-button";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireOwner();

  return (
    <div className="flex min-h-screen bg-linen/20">
      <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-border/60 bg-background px-4 py-6 md:flex">
        <div className="space-y-8">
          <Logo />
          <OwnerNav />
        </div>
        <div className="border-t border-border/60 pt-4">
          <p className="text-sm font-medium text-foreground">
            {session.user.name}
          </p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
    </div>
  );
};

export default AppLayout;
