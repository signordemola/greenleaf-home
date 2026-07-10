"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { updateHomeAccessAction } from "@/actions/client.actions";

type Values = {
  entryMethod: string;
  accessNotes: string;
  alarmCode: string;
  petInfo: string;
  specialInstructions: string;
};

export const HomeDetailsForm = ({
  token,
  initial,
}: {
  token: string;
  initial: Values;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<Values>(initial);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  };

  const submit = () =>
    startTransition(async () => {
      setError("");
      const result = await updateHomeAccessAction(token, values);
      if (result.ok) {
        setSaved(true);
        router.refresh();
      } else {
        setError(result.error);
      }
    });

  return (
    <div className="space-y-5">
      <Field>
        <FieldLabel htmlFor="entryMethod">Entry method</FieldLabel>
        <Input
          id="entryMethod"
          value={values.entryMethod}
          onChange={(e) => set("entryMethod", e.target.value)}
          placeholder="Lockbox, keypad, side gate…"
          className="rounded-sm"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="accessNotes">Access notes</FieldLabel>
        <Textarea
          id="accessNotes"
          value={values.accessNotes}
          onChange={(e) => set("accessNotes", e.target.value)}
          rows={2}
          className="rounded-sm"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="alarmCode">Alarm code</FieldLabel>
          <Input
            id="alarmCode"
            value={values.alarmCode}
            onChange={(e) => set("alarmCode", e.target.value)}
            className="rounded-sm"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="petInfo">Pets</FieldLabel>
          <Input
            id="petInfo"
            value={values.petInfo}
            onChange={(e) => set("petInfo", e.target.value)}
            className="rounded-sm"
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="specialInstructions">
          Special instructions
        </FieldLabel>
        <Textarea
          id="specialInstructions"
          value={values.specialInstructions}
          onChange={(e) => set("specialInstructions", e.target.value)}
          rows={2}
          className="rounded-sm"
        />
      </Field>
      <div className="flex items-center gap-3">
        <Button
          onClick={submit}
          disabled={pending}
          className="rounded-full bg-forest px-6 text-white hover:opacity-90"
        >
          {pending ? "Saving..." : "Save"}
        </Button>
        {saved && (
          <p className="text-sm text-forest">Saved. Shared with your crew.</p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};
