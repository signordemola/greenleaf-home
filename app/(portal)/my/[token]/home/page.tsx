import { notFound } from "next/navigation";
import { loadPortalClient } from "@/lib/portal-data";
import { Card, CardContent } from "@/components/ui/card";
import { HomeDetailsForm } from "@/components/portal/home-details-form";

const PortalHome = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const client = await loadPortalClient(token);
  if (!client) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl leading-tight">Home details</h1>
        <p className="mt-2 text-muted-foreground">
          We share these with your crew before every visit.
        </p>
      </div>

      <Card className="border-border">
        <CardContent className="p-6">
          <HomeDetailsForm
            token={token}
            initial={{
              entryMethod: client.entryMethod ?? "",
              accessNotes: client.accessNotes ?? "",
              alarmCode: client.alarmCode ?? "",
              petInfo: client.petInfo ?? "",
              specialInstructions: client.specialInstructions ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalHome;
