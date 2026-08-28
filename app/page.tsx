import Image from "next/image";
import { LinkButton } from "@/components/Button";
import PlanCard from "@/components/PlanCard";
import Reveal from "@/components/Reveal";
import StickyMobileCta from "@/components/StickyMobileCta";
import { business, durations, howItWorks, placeholderImages } from "@/lib/config";

const signatureDishes = [
  {
    name: "Chicken Biryani",
    note: "Saturday Non-Veg Lunch",
    image: "https://images.pexels.com/photos/18601877/pexels-photo-18601877.jpeg?auto=compress&cs=tinysrgb&w=480&h=360&fit=crop",
  },
  {
    name: "Paneer Tikka with Ghee Rice",
    note: "Monday Veg Lunch",
    image: "https://images.pexels.com/photos/33430558/pexels-photo-33430558.jpeg?auto=compress&cs=tinysrgb&w=480&h=360&fit=crop",
  },
  {
    name: "Chicken Ghee Roast with Neer Dosa",
    note: "Friday Non-Veg Lunch",
    image: "https://images.pexels.com/photos/38400477/pexels-photo-38400477.jpeg?auto=compress&cs=tinysrgb&w=480&h=360&fit=crop",
  },
  {
    name: "Tropical Chicken Salad",
    note: "Thursday Salad",
    image: "https://images.pexels.com/photos/19904309/pexels-photo-19904309.jpeg?auto=compress&cs=tinysrgb&w=480&h=360&fit=crop",
  },
];

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const highlights = ["Weekly Plans", "Bi-Weekly Plans", "Monthly Plans", "Lunch", "Dinner", "Veg", "Non-Veg"];
const whyChoose = [
  { title: "Consistent Quality", body: "Every plate is prepped fresh, the same way, every single day." },
  { title: "Flexible By Design", body: "Pause, swap, or adjust your plan: your routine leads, not ours." },
  { title: "Real Home Cooking", body: "No mass-catering shortcuts. Recipes built around real households." },
  { title: "Personal, Not Automated", body: "A real person confirms every request, never a faceless checkout." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-float-slow rounded-full bg-copper/20 blur-3xl" />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-forest-light/40 blur-3xl animate-float-slow"
          style={{ animationDelay: "-3s" }}
        />
        <div className="relative mx-auto grid max-w-content items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-light">
                Home-style meal subscriptions in {business.serviceAreas[0]}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                {business.tagline}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80 text-justify">
                {business.description}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-4">
                <LinkButton href="/plans" withArrow className="!bg-copper hover:!bg-copper-dark">
                  Explore Meal Plans
                </LinkButton>
                <LinkButton href="/menu" variant="secondary" className="!border-cream !text-cream hover:!bg-cream hover:!text-forest">
                  View Menu
                </LinkButton>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-11 flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-cream/25 px-3.5 py-1.5 text-xs font-medium text-cream/85 transition-colors hover:border-copper-light/60 hover:text-cream"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Signature element: the weekly rhythm strip, layered over a food photo */}
          <Reveal delay={180}>
            <div className="relative">

              <div className="relative z-10 rounded-xl2 border border-cream/10 bg-cream/5 p-7 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Your week, planned</p>
                <div className="mt-5 grid grid-cols-7 gap-2">
                  {week.map((day, i) => (
                    <div
                      key={day}
                      className="flex flex-col items-center gap-2 rounded-xl bg-cream/10 py-4 transition-colors duration-200 hover:bg-cream/15"
                    >
                      <span className="text-[11px] font-medium text-cream/60">{day}</span>
                      <span className={`h-2 w-2 rounded-full ${i % 3 === 0 ? "bg-copper" : "bg-cream/30"}`} />
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-cream/75 text-justify">
                  Set your plan once (lunch, dinner, or both) and every day takes care of itself until you
                  tell us otherwise.
                </p>
                <p className="mt-4 border-t border-cream/10 pt-4 text-xs font-medium uppercase tracking-widest text-copper-light">
                  Freshly prepared. Designed around your routine.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="relative mx-auto max-w-content px-5 py-24 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-copper">About {business.name}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl">
              Meals built around your routine, not a menu built around ours.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-ink/70 text-justify">
              {business.name} started with a simple idea: good, home-style food shouldn&apos;t require you to
              cook it or choose it every single day. We plan the week, you choose the rhythm: lunch, dinner,
              or both, vegetarian or not, for as long as suits you.
            </p>
            <p className="mt-4 font-display text-lg text-copper-dark">
              Good food shouldn&apos;t be complicated.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PLANS */}
      <section className="bg-sand/50 py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-copper">Subscription Plans</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-forest">Choose your rhythm</h2>
              </div>
              <LinkButton href="/plans" variant="ghost" withArrow>
                View all plans
              </LinkButton>
            </div>
          </Reveal>
          <div className="mt-10 grid auto-rows-fr items-stretch gap-6 md:grid-cols-3">
            {durations.map((duration, i) => (
              <Reveal key={duration.id} delay={i * 100} className="h-full">
                <PlanCard duration={duration} popular={duration.id === "bi-weekly"} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MEALS */}
      <section className="mx-auto max-w-content px-5 py-24 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-copper">On the Menu</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-forest">A taste of what&apos;s cooking</h2>
            </div>
            <LinkButton href="/menu" variant="ghost" withArrow>
              View full menu
            </LinkButton>
          </div>
        </Reveal>
        <div className="mt-10 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.image} delay={i * 80} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-sand bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(31,58,46,0.35)]">
                <div className="relative h-40 w-full shrink-0 overflow-hidden bg-sand">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/25 via-forest/0 to-forest/0" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-base font-semibold text-forest">{dish.name}</p>
                  <p className="mt-1 text-xs text-ink/55">{dish.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-forest-dark py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-copper/10 blur-3xl" />
        <div className="relative mx-auto max-w-content px-5 md:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">How It Works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cream">From plan to plate in four steps</h2>
          </Reveal>
          <div className="relative mt-10">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent lg:block" />
            <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-4">
              {howItWorks.map((s, i) => (
                <Reveal key={s.step} delay={i * 100} className="h-full">
                  <div className="group flex h-full flex-col rounded-xl2 border border-cream/10 bg-cream/5 p-7 transition-colors duration-300 hover:bg-cream/10">
                    <span className="font-display text-4xl font-semibold text-cream/20 transition-colors duration-300 group-hover:text-copper-light/50">
                      {s.step}
                    </span>
                    <p className="mt-3 font-display text-lg font-semibold text-cream">{s.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-content px-5 py-24 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper">Why Choose {business.name}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest">Convenience without compromise</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-xl2 border border-sand bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(31,58,46,0.3)]">
                <p className="font-display text-lg font-semibold text-forest">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-copper py-20 text-center text-cream">
        <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-cream/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to let us take care of dinner?</h2>
          <p className="mt-3 text-cream/85">
            Pick a plan that fits your week. Our team confirms every detail with you before anything starts.
          </p>
          <div className="mt-8">
            <LinkButton href="/plans" withArrow className="!bg-forest hover:!bg-forest-dark">
              Explore Meal Plans
            </LinkButton>
          </div>
        </Reveal>
      </section>

      <StickyMobileCta label="Explore Meal Plans" href="/plans" />
    </>
  );
}
