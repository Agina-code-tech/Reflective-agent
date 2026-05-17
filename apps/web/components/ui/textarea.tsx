import { forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className = "", ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={`min-h-48 w-full resize-none rounded-[24px] border border-[hsl(var(--border))] bg-white/60 px-5 py-4 text-[17px] leading-8 text-[hsl(var(--foreground))] outline-none placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--ring))] focus:ring-2 focus:ring-[hsl(var(--ring))]/20 ${className}`}
        {...props}
      />
    );
  }
);

