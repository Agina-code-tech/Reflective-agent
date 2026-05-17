"use client";

import { PageTransition } from "../../components/layout/page-transition";
import { Shell } from "../../components/layout/shell";
import { TestingLab } from "../../components/reflection/testing-lab";

export default function LabPage() {
  return (
    <Shell eyebrow="Testing lab">
      <PageTransition>
        <TestingLab />
      </PageTransition>
    </Shell>
  );
}

