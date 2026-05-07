import { cn } from "@/lib/utils";

export function FitScoreBadge({ score, size = "md" }: { score?: number | null; size?: "sm" | "md" }) {
  const normalised = typeof score === "number" ? Math.max(0, Math.min(100, score)) : null;
  const tone =
    normalised === null
      ? "border-slate-200 text-slate-500"
      : normalised >= 85
        ? "border-emerald-400 text-emerald-700"
        : normalised >= 70
          ? "border-amber-400 text-amber-700"
          : "border-rose-400 text-rose-700";

  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full border-4 bg-white font-semibold",
        tone,
        size === "sm" ? "h-12 w-12 text-sm" : "h-16 w-16 text-base"
      )}
      aria-label={normalised === null ? "Fit score pending" : `Fit score ${normalised}`}
    >
      {normalised ?? "--"}
    </div>
  );
}
