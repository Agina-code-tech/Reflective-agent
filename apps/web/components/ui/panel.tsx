import { ReactNode } from "react";

export function Panel({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 shadow-soft backdrop-blur ${className}`}>
      {children}
    </section>
  );
}

