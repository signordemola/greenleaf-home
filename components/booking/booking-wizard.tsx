"use client";

import { useMemo, useState } from "react";
import { BookingProgress } from "./booking-progress";
import { HomeSizeForm } from "./home-size-form";
import { ServiceTypePicker } from "./service-type-picker";
import { FrequencySelector } from "./frequency-selector";
import { DetailsForm } from "./details-form";
import { InstantQuoteDisplay } from "./instant-quote-display";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HomeSize, ServiceTypeSlug, PlanFrequency } from "@/types/booking";
import { calculateQuote } from "@/lib/quote";
import { createBookingAction } from "@/actions/booking.actions";
import Link from "next/link";

export const BookingWizard = () => {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState<HomeSize>("medium");
  const [service, setService] = useState<ServiceTypeSlug>("standard");
  const [frequency, setFrequency] = useState<PlanFrequency>("biweekly");
  const [addons, setAddons] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [portalToken, setPortalToken] = useState("");

  const quote = useMemo(
    () => calculateQuote(service, size, frequency, addons),
    [service, size, frequency, addons],
  );

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setError("");

    const result = await createBookingAction({
      service,
      size,
      frequency,
      addons,
      name,
      email,
      phone,
      address,
      zipCode,
      notes,
    });

    setSubmitting(false);

    if (result.ok) {
      setPortalToken(result.data.portalToken);
      setStep(5);
    } else {
      setError(result.error);
    }
  };

  const handlePrimary = () => {
    if (step === 4) {
      submit();
    } else {
      setStep((s) => Math.min(s + 1, 5));
    }
  };

  const isConfirmed = step === 5;

  return (
    <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
      <section className="lg:col-span-7">
        {!isConfirmed ? (
          <>
            <BookingProgress currentStep={step} />

            <div className="min-h-[400px]">
              {step === 0 && (
                <HomeSizeForm size={size} onChange={(s) => setSize(s)} />
              )}
              {step === 1 && (
                <ServiceTypePicker
                  service={service}
                  addons={addons}
                  onChange={(s, a) => {
                    if (s) setService(s);
                    if (a) setAddons(a);
                  }}
                />
              )}
              {step === 2 && (
                <FrequencySelector
                  frequency={frequency}
                  onChange={(f) => setFrequency(f)}
                />
              )}
              {step === 3 && (
                <div className="py-20 text-center">
                  <h2 className="font-display text-3xl">
                    Scheduling coming soon...
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Proceed to details for now.
                  </p>
                </div>
              )}
              {step === 4 && (
                <DetailsForm
                  data={{ name, email, phone, address, zipCode, notes }}
                  onChange={(d) => {
                    if (d.name !== undefined) setName(d.name);
                    if (d.email !== undefined) setEmail(d.email);
                    if (d.phone !== undefined) setPhone(d.phone);
                    if (d.address !== undefined) setAddress(d.address);
                    if (d.zipCode !== undefined) setZipCode(d.zipCode);
                    if (d.notes !== undefined) setNotes(d.notes);
                  }}
                />
              )}
            </div>

            {error && (
              <p className="mt-6 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-8">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={step === 0 || submitting}
                className="rounded-full px-6 text-muted-foreground hover:text-foreground"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 size-4" />{" "}
                Back
              </Button>
              <Button
                onClick={handlePrimary}
                disabled={submitting}
                className="rounded-full bg-forest px-8 text-white hover:opacity-90"
              >
                {step === 4
                  ? submitting
                    ? "Booking..."
                    : "Confirm booking"
                  : "Continue"}
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="ml-2 size-4"
                />
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-sm border border-border bg-background p-10 shadow-sm transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white">
              <HugeiconsIcon icon={SparklesIcon} className="size-5" />
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight">
              You&apos;re on the schedule, {name.split(" ")[0] || "friend"}.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              We sent the details to {email || "your inbox"}. Your portal is
              ready — pause, skip, or rate visits anytime.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/my/${portalToken}`}
                className="inline-flex h-10 items-center justify-center rounded-sm bg-forest px-8 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Open my portal
              </Link>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-sm border border-border bg-background px-8 text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </section>

      <aside className="lg:col-span-5">
        <InstantQuoteDisplay
          quote={quote}
          size={size}
          service={service}
          frequency={frequency}
        />
      </aside>
    </div>
  );
};
