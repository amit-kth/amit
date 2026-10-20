import type { HTMLAttributes } from "react";
import { cn } from "@/components/ui/shader-canvas-utils/cn";

type SectionCardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "white" | "lavender";
};

const cardSurface =
  "mx-auto w-full max-w-[1320px] overflow-hidden rounded-[30px] border border-[var(--mist)] shadow-[0_16px_48px_rgba(17,24,39,0.06)]";

export function SectionCard({ className, tone = "white", ...props }: SectionCardProps) {
  return (
    <div
      className={cn(
        cardSurface,
        tone === "lavender" ? "bg-[var(--lavender-field)]" : "bg-[var(--pure-white)]",
        className,
      )}
      {...props}
    />
  );
}
