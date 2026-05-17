"use client";

import { PageTransition } from "../../../components/layout/page-transition";
import { Shell } from "../../../components/layout/shell";
import { Composer } from "../../../components/reflection/composer";

export default function NewReflectionPage() {
  return (
    <Shell eyebrow="Reflection">
      <PageTransition>
        <Composer />
      </PageTransition>
    </Shell>
  );
}

