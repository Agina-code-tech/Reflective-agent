"use client";

import { PageTransition } from "../components/layout/page-transition";
import { Shell } from "../components/layout/shell";
import { Button } from "../components/ui/button";
import { Panel } from "../components/ui/panel";

export default function LandingPage() {
  return (
    <Shell eyebrow="Reflective Memory Loop">
      <PageTransition>
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl space-y-6 py-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">Calm intelligence</div>
            <h1 className="font-serif text-6xl leading-[0.92] text-[hsl(var(--foreground))] md:text-7xl">
              A calm space for reflection, emotional clarity, and narrative continuity.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              Externalize thought, notice emotional patterns, and return to your own continuity over time.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/onboarding" className="px-6">
                Begin reflecting
              </Button>
              <Button href="/dashboard" variant="secondary" className="px-6">
                Enter the room
              </Button>
            </div>
          </div>

          <Panel className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="rounded-[24px] border border-[hsl(var(--border))] bg-white/50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">What this is</div>
                <p className="mt-3 text-base leading-8">
                  A reflective environment that helps thought become visible, organized, and continuous.
                </p>
              </div>
              <div className="rounded-[24px] border border-[hsl(var(--border))] bg-white/50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">What it avoids</div>
                <p className="mt-3 text-base leading-8">
                  No chat loop, no performance layer, no emotional authority. Just quiet synthesis.
                </p>
              </div>
            </div>
          </Panel>
        </section>
      </PageTransition>
    </Shell>
  );
}
