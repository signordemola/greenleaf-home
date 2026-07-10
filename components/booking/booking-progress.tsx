"use client";

const STEPS = ["Home", "Service", "Frequency", "When", "Details"];

export const BookingProgress = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className="flex-1 h-1 rounded-full bg-border overflow-hidden"
          >
            <div
              className={`h-full transition-all duration-500 ${
                i <= currentStep ? "bg-forest" : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Step {currentStep + 1} of {STEPS.length} · {STEPS[currentStep]}
      </p>
    </div>
  );
};
