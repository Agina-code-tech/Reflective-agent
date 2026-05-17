"use client";

import { PageTransition } from "../../components/layout/page-transition";
import { Shell } from "../../components/layout/shell";
import { Dashboard } from "../../components/reflection/dashboard";

export default function DashboardPage() {
  return (
    <Shell eyebrow="Home">
      <PageTransition>
        <Dashboard />
      </PageTransition>
    </Shell>
  );
}

