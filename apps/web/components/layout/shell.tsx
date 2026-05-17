import Link from "next/link";
import { ReactNode } from "react";

export function Shell({
  children,
  eyebrow = "Reflective Memory Loop"
}: {
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 md:px-8">
      <header className="flex items-center justify-between pb-8">
        <Link href="/" className="font-serif text-lg tracking-wide text-[hsl(var(--foreground))]">
          {eyebrow}
        </Link>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">Calm continuity for inner work</div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

