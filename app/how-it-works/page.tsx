import type { Metadata } from "next";
import StepCard from "@/components/StepCard";
import Reveal from "@/components/Reveal";
import { LinkButton } from "@/components/Button";
import { howItWorks, business } from "@/lib/config";

export const metadata: Metadata = {
  title: "How It Works",
  description: `How ${business.name} meal subscriptions work, from choosing a plan to your first delivery.`,
};

export default function HowItWorksPage() {
  return (
    <section className="mx-auto max-w-content px-5 py-16 md:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-copper">How It Works</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-forest">From plan to plate in four steps</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 text-justify">
          No online payment, no account to set up. Submit a request and our team takes it from there.
        </p>
      </Reveal>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-sand to-transparent lg:block" />
        <div className="grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 100} className="h-full">
              <StepCard step={s.step} title={s.title} description={s.description} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={200}>
        <div className="mt-12 rounded-xl2 border border-sand bg-white p-8 text-center shadow-soft">
          <p className="font-display text-xl font-semibold text-forest">Ready to get started?</p>
          <p className="mt-2 text-sm text-ink/70">Pick a plan and tell us your preferences. It takes about two minutes.</p>
          <div className="mt-5">
            <LinkButton href="/plans" withArrow>
              Explore Meal Plans
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
