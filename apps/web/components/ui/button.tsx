import Link from "next/link";
import { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))]";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
};

export function Button({ children, variant = "primary", className = "", href, ...props }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border-[hsl(var(--foreground))] hover:opacity-90"
      : variant === "secondary"
        ? "bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-strong))]"
        : "bg-transparent text-[hsl(var(--foreground))] border-transparent hover:bg-[hsl(var(--surface))]";

  if (href) {
    return (
      <Link className={`${base} ${styles} ${className}`} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
