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
import { HomeSize } from "@/types/booking";
import { SIZE_LABELS } from "@/lib/booking-constants";

const OPTIONS: { value: HomeSize; hint: string }[] = [
  { value: "small", hint: "Studio, 1 BR, or compact 2 BR" },
  { value: "medium", hint: "Most Austin bungalows" },
  { value: "large", hint: "Larger homes & guest suites" },
];

interface Props {
  size: HomeSize;
  onChange: (s: HomeSize) => void;
}

export const HomeSizeForm = ({ size, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
          Tell us about your home.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Helps us send the right crew with the right time.
        </p>
      </div>

      <FieldSet className="mt-10 border-none p-0">
        <div className="grid gap-3">
          {OPTIONS.map((opt) => {
            const isSelected = size === opt.value;
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
                        {SIZE_LABELS[opt.value]}
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
    </div>
  );
};
