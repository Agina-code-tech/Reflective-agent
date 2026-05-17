"use client";

import { PageTransition } from "../../components/layout/page-transition";
import { Shell } from "../../components/layout/shell";
import { WeeklySummaryView } from "../../components/reflection/weekly-summary";

export default function WeeklyPage() {
  return (
    <Shell eyebrow="Weekly synthesis">
      <PageTransition>
        <WeeklySummaryView />
      </PageTransition>
    </Shell>
  );
}

