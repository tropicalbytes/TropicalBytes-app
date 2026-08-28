import type { Metadata } from "next";
import PlanCard from "@/components/PlanCard";
import { LinkButton } from "@/components/Button";
import Reveal from "@/components/Reveal";
import StickyMobileCta from "@/components/StickyMobileCta";
import { durations, comboPricing, business } from "@/lib/config";

export const metadata: Metadata = {
  title: "Meal Plans",
  description: `Weekly, bi-weekly, and monthly meal subscription plans from ${business.name}.`,
};

export default function PlansPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest px-5 py-20 text-cream md:px-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-float-slow rounded-full bg-copper/20 blur-3xl" />
        <div className="relative mx-auto max-w-content">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Meal Plans</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Choose the rhythm that fits your week
            </h1>
            <p className="mt-4 max-w-xl text-cream/80 text-justify">
              Every plan includes your choice of lunch and/or dinner, vegetarian or non-vegetarian meals, and
              optional add-ons. Submitting a request doesn&apos;t charge you. Our team confirms everything
              with you first.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-20 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper">1. Choose a duration</p>
        </Reveal>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {durations.map((duration, i) => (
            <Reveal key={duration.id} delay={i * 100}>
              <PlanCard duration={duration} popular={duration.id === "bi-weekly"} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-14 rounded-xl2 border border-sand bg-white p-8 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-widest text-copper">2. Then pick your combination</p>
            <p className="mt-3 font-display text-xl font-semibold text-forest">Weekly pricing by meal type</p>
            <p className="mt-1 text-sm text-ink/70 text-justify">
              Bi-Weekly and Monthly apply a 5% discount on top of these weekly rates. See the exact daily
              menu on our{" "}
              <a href="/menu#meal-plans" className="underline underline-offset-2 hover:text-copper-dark">
                Menu page
              </a>
              .
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {comboPricing.map((c) => (
                <div key={c.id} className="rounded-xl border border-sand bg-sand/30 px-5 py-4">
                  <p className="text-sm font-semibold text-forest">{c.label}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-copper">₹{c.pricePerWeek.toLocaleString("en-IN")} / week</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mt-10 overflow-hidden rounded-xl2 border border-copper/30 bg-gradient-to-br from-forest to-forest-dark p-8 text-center text-cream shadow-soft sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-copper/25 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-copper-light">
                No subscription needed
              </span>
              <p className="mt-4 font-display text-2xl font-semibold sm:text-3xl">Not looking for a subscription?</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream/80 text-justify">
                Try TropicalBytes one plate at a time: request a single meal and we&apos;ll confirm delivery with
                you directly, no commitment required.
              </p>
              <div className="mt-6">
                <LinkButton href="/menu/request" withArrow className="!bg-copper hover:!bg-copper-dark">
                  Request an Individual Meal
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <StickyMobileCta label="Start Your Subscription" href="/plans/subscribe" />
    </>
  );
}
