"use client";

import {
  Field,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSet,
} from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ServiceTypeSlug } from "@/types/booking";
import { SERVICE_LABELS, ADDONS } from "@/lib/booking-constants";
import { formatUsd } from "@/lib/utils";

const SERVICE_OPTIONS: { value: ServiceTypeSlug; hint: string }[] = [
  { value: "standard", hint: "Floors, surfaces, kitchen & baths" },
  { value: "deep", hint: "Adds baseboards, fixtures, scale" },
  { value: "moveout", hint: "Empty home, every cabinet & oven" },
];

interface Props {
  service: ServiceTypeSlug;
  addons: string[];
  onChange: (s?: ServiceTypeSlug, a?: string[]) => void;
}

export const ServiceTypePicker = ({ service, addons, onChange }: Props) => {
  const toggleAddon = (id: string) => {
    const newAddons = addons.includes(id)
      ? addons.filter((a) => a !== id)
      : [...addons, id];
    onChange(undefined, newAddons);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
          Which kind of visit?
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Recurring clients usually start with a deep clean and then move to
          standard.
        </p>
      </div>

      <FieldSet className="border-none p-0">
        <div className="grid gap-3">
          {SERVICE_OPTIONS.map((opt) => {
            const isSelected = service === opt.value;
            return (
              <FieldLabel
                key={opt.value}
                className="cursor-pointer"
                onClick={() => onChange(opt.value)}
              >
                <Card
                  className={`transition-colors border h-full w-full ${
                    isSelected
                      ? "border-forest bg-forest/5"
                      : "border-border bg-background hover:border-forest/40"
                  }`}
                >
                  <CardContent className="flex items-center justify-between p-5">
                    <Field className="space-y-1">
                      <FieldTitle className="block font-display text-xl text-foreground">
                        {SERVICE_LABELS[opt.value]}
                      </FieldTitle>
                      <FieldDescription className="block text-sm text-muted-foreground">
                        {opt.hint}
                      </FieldDescription>
                    </Field>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-forest bg-forest text-cream"
                          : "border-border"
                      }`}
                    >
                      {isSelected && (
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          className="size-3"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FieldLabel>
            );
          })}
        </div>
      </FieldSet>

      <div>
        <h2 className="text-sm font-medium text-foreground">Add-ons</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Optional. Toggle any.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ADDONS.map((a) => {
            const on = addons.includes(a.id);
            return (
              <FieldLabel
                key={a.id}
                className="cursor-pointer"
                onClick={() => toggleAddon(a.id)}
              >
                <Card
                  className={`transition-colors border h-full w-full ${
                    on
                      ? "border-forest bg-forest/5"
                      : "border-border bg-background hover:border-forest/40"
                  }`}
                >
                  <CardContent className="flex items-center justify-between p-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                          on
                            ? "border-forest bg-forest text-cream"
                            : "border-border"
                        }`}
                      >
                        {on && (
                          <HugeiconsIcon
                            icon={Tick02Icon}
                            className="size-2.5"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="text-sm font-medium">{a.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      +{formatUsd(a.price)}
                    </span>
                  </CardContent>
                </Card>
              </FieldLabel>
            );
          })}
        </div>
      </div>
    </div>
  );
};
