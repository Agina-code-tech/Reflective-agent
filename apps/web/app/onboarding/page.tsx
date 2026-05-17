"use client";

import { PageTransition } from "../../components/layout/page-transition";
import { Shell } from "../../components/layout/shell";
import { OnboardingFlow } from "../../components/reflection/onboarding-flow";

export default function OnboardingPage() {
  return (
    <Shell eyebrow="Onboarding">
      <PageTransition>
        <OnboardingFlow />
      </PageTransition>
    </Shell>
  );
}

