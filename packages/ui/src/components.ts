export type SurfaceVariant = "quiet" | "lifted" | "bordered";

export const surfaceStyles: Record<SurfaceVariant, string> = {
  quiet: "bg-[hsl(var(--surface))]/70",
  lifted: "bg-white/65 shadow-soft",
  bordered: "bg-white/40 border border-[hsl(var(--border))]"
};

