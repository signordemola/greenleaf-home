"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    notes: string;
  };
  onChange: (d: Partial<Props["data"]>) => void;
}

export const DetailsForm = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
          One last thing.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          We text the day before to confirm. No card charged until after the
          clean.
        </p>
      </div>

      <div className="space-y-6">
        <Field>
          <FieldLabel
            htmlFor="name"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Name
          </FieldLabel>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Priya Mehta"
            className="rounded-sm border-border bg-background px-4 py-6 text-base focus:border-forest"
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="email"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@home.com"
            className="rounded-sm border-border bg-background px-4 py-6 text-base focus:border-forest"
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="phone"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Phone
          </FieldLabel>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="(512) 555-0142"
            className="rounded-sm border-border bg-background px-4 py-6 text-base focus:border-forest"
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="address"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Address
          </FieldLabel>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="1108 E Cesar Chavez St"
            className="rounded-sm border-border bg-background px-4 py-6 text-base focus:border-forest"
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="zipCode"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            ZIP code
          </FieldLabel>
          <Input
            id="zipCode"
            inputMode="numeric"
            value={data.zipCode}
            onChange={(e) => onChange({ zipCode: e.target.value })}
            placeholder="78702"
            className="rounded-sm border-border bg-background px-4 py-6 text-base focus:border-forest"
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="notes"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Anything we should know? (pets, alarm, entry)
          </FieldLabel>
          <Textarea
            id="notes"
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Code is 4421. Two cats, both friendly. Side gate is unlocked."
            className="rounded-sm border-border bg-background px-4 py-3 text-base focus:border-forest"
            rows={4}
          />
        </Field>

        <p className="text-xs text-muted-foreground leading-relaxed">
          By booking you agree to our cancellation policy. We&apos;ll ask for a
          card on the next screen — it isn&apos;t charged today.
        </p>
      </div>
    </div>
  );
};
