"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { saveProfile } from "../../lib/storage";
import type { ReflectionIntent, ReflectionPacing, ReflectionProfile, ReflectionStyle } from "../../lib/types";
import { Button } from "../ui/button";
import { Panel } from "../ui/panel";

const intentOptions: ReflectionIntent[] = [
  "understand emotions",
  "organize thoughts",
  "reflect consistently",
  "process experiences"
];

const styleOptions: ReflectionStyle[] = ["gentle", "analytical", "exploratory", "concise"];
const pacingOptions: ReflectionPacing[] = ["daily", "few-times-weekly", "weekly"];

function ChoiceRow<T extends string>({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: readonly T[];
  value: T | "";
  onChange: (next: T) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">{label}</div>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            className={`rounded-[20px] border px-4 py-4 text-left text-sm transition-colors duration-300 ${
              value === option
                ? "border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                : "border-[hsl(var(--border))] bg-white/50 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-strong))]"
            }`}
            onClick={() => onChange(option)}
            type="button"
          >
            <div className="capitalize">{option}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<ReflectionProfile>({
    intent: "",
    reflectionStyle: "",
    pacingPreference: ""
  });

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(profile.intent);
    if (step === 1) return Boolean(profile.reflectionStyle);
    return Boolean(profile.pacingPreference);
  }, [profile, step]);

  function finish() {
    saveProfile(profile);
    router.push("/dashboard");
  }

  return (
    <Panel className="mx-auto max-w-3xl p-6 md:p-10">
      <div className="mb-8 space-y-3">
        <div className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">Onboarding</div>
        <h1 className="font-serif text-4xl leading-none text-[hsl(var(--foreground))] md:text-5xl">Set the tone for reflection.</h1>
        <p className="max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
          A few quiet preferences help the system mirror your pace, not impose one.
        </p>
      </div>

      <div className="space-y-8">
        {step === 0 && (
          <ChoiceRow
            label="What brings you here lately?"
            options={intentOptions}
            value={profile.intent}
            onChange={(intent) => setProfile((current) => ({ ...current, intent }))}
          />
        )}

        {step === 1 && (
          <ChoiceRow
            label="How would you like reflection to feel?"
            options={styleOptions}
            value={profile.reflectionStyle}
            onChange={(reflectionStyle) => setProfile((current) => ({ ...current, reflectionStyle }))}
          />
        )}

        {step === 2 && (
          <ChoiceRow
            label="How often would you like to reflect?"
            options={pacingOptions}
            value={profile.pacingPreference}
            onChange={(pacingPreference) => setProfile((current) => ({ ...current, pacingPreference }))}
          />
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Step {step + 1} of 3
          </div>
          <div className="flex items-center gap-3">
            {step > 0 ? (
              <Button variant="secondary" onClick={() => setStep((current) => current - 1)}>
                Back
              </Button>
            ) : null}
            {step < 2 ? (
              <Button disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>
                Continue
              </Button>
            ) : (
              <Button disabled={!canContinue} onClick={finish}>
                Enter the room
              </Button>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}

