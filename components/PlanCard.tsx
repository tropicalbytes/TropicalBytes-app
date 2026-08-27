import { Duration } from "@/lib/config";
import { LinkButton } from "./Button";

export default function PlanCard({ duration, popular = false }: { duration: Duration; popular?: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl2 border p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(31,58,46,0.4)] ${
        popular ? "border-copper bg-forest text-cream" : "border-sand bg-white text-ink"
      }`}
    >
      {(popular || duration.badge) && (
        <span
          className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            popular ? "bg-copper text-cream" : "bg-forest text-cream"
          }`}
        >
          {popular ? "Most Popular" : duration.badge}
        </span>
      )}
      <p className={`font-display text-2xl font-semibold ${popular ? "text-cream" : "text-forest"}`}>{duration.name}</p>
      <p className={`mt-1 text-sm ${popular ? "text-cream/70" : "text-ink/60"}`}>
        {duration.weeks} {duration.weeks === 1 ? "week" : "weeks"}
      </p>
      <p className={`mt-4 text-sm leading-relaxed ${popular ? "text-cream/85" : "text-ink/75"}`}>{duration.description}</p>

      {duration.discountPercent > 0 && (
        <div className={`mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
          popular ? "bg-cream/15 text-copper-light" : "bg-copper/10 text-copper"
        }`}>
          Save {duration.discountPercent}% vs. weekly
        </div>
      )}

      <div className="mt-auto pt-6">
        <LinkButton
          href={`/plans/subscribe?duration=${duration.id}`}
          variant={popular ? "secondary" : "primary"}
          withArrow
          className={`w-full ${popular ? "!border-cream !text-cream hover:!bg-cream hover:!text-forest" : ""}`}
        >
          Choose {duration.name}
        </LinkButton>
      </div>
    </div>
  );
}
