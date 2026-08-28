import type { Metadata } from "next";
import MenuSubNav from "@/components/MenuSubNav";
import Reveal from "@/components/Reveal";
import { LinkButton } from "@/components/Button";
import {
  business,
  DAYS_OF_WEEK,
  weeklyMealPlans,
  comboPricing,
  salads,
  addOnCategories,
  partyBulkOrders,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Menu",
  description: `The full ${business.name} menu — weekly meal plans, salads, add-ons, and party & bulk orders.`,
};

function dayLunch(foodType: "veg" | "nonVeg", day: string) {
  return weeklyMealPlans[foodType].lunch.days.find((d) => d.day === day)?.item;
}
function dayDinner(foodType: "veg" | "nonVeg", day: string) {
  return weeklyMealPlans[foodType].dinner.days.find((d) => d.day === day)?.item;
}

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest px-5 py-16 text-cream md:px-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-float-slow rounded-full bg-copper/20 blur-3xl" />
        <div className="relative mx-auto max-w-content">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Our Menu</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Everything we cook, Monday through Saturday
            </h1>
            <p className="mt-4 max-w-xl text-cream/80 text-justify">
              Weekly meal plans, salads, à la carte add-ons, and bulk catering — jump to any section below.
            </p>
          </Reveal>
        </div>
      </section>

      <MenuSubNav />

      {/* MEAL PLANS */}
      <section id="meal-plans" className="mx-auto max-w-content scroll-mt-32 px-5 py-16 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper">Meal Plans</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest">This week&apos;s menu</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 text-justify">
            Every subscription follows the same Monday–Saturday rhythm (Sunday is off). Choose Veg or
            Non-Veg, Lunch, Dinner, or both — here&apos;s exactly what&apos;s cooking each day.
          </p>
        </Reveal>

        <div className="mt-10 space-y-4">
          {DAYS_OF_WEEK.map((day, i) => (
            <Reveal key={day} delay={Math.min(i * 60, 240)}>
              <div className="rounded-xl2 border border-sand bg-white p-6 shadow-soft sm:p-7">
                <p className="font-display text-lg font-semibold text-forest">{day}</p>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-copper">Lunch</p>
                    <p className="mt-1.5 text-sm text-ink/80">
                      <span className="font-medium text-forest">Veg</span> — {dayLunch("veg", day)}
                    </p>
                    <p className="mt-1 text-sm text-ink/80">
                      <span className="font-medium text-forest">Non-Veg</span> — {dayLunch("nonVeg", day)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-copper">Dinner</p>
                    <p className="mt-1.5 text-sm text-ink/80">
                      <span className="font-medium text-forest">Veg</span> — {dayDinner("veg", day)}
                    </p>
                    <p className="mt-1 text-sm text-ink/80">
                      <span className="font-medium text-forest">Non-Veg</span> — {dayDinner("nonVeg", day)}
                    </p>
                  </div>
                </div>
                {day === "Thursday" && (
                  <p className="mt-4 border-t border-sand pt-3 text-xs text-ink/50 text-justify">
                    On the combined Lunch + Dinner plan, Thursday&apos;s Non-Veg lunch is Nasi Lemak Chicken
                    with Butter Garlic Rice instead of the Thai Green Curry Chicken shown above.
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-12 rounded-xl2 border border-sand bg-sand/40 p-7 sm:p-8">
            <p className="font-display text-xl font-semibold text-forest">Plan pricing</p>
            <p className="mt-1 text-sm text-ink/70">Priced per week — choose your combination when you subscribe.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {comboPricing.map((c) => (
                <div key={c.id} className="rounded-xl border border-sand bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-forest">{c.label}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-copper">₹{c.pricePerWeek.toLocaleString("en-IN")} / week</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink/60">
              Bi-Weekly and Monthly plans get a 5% discount on the total. See{" "}
              <a href="/plans" className="underline underline-offset-2 hover:text-copper-dark">
                Meal Plans
              </a>{" "}
              for durations, or head straight to the subscription form.
            </p>
            <div className="mt-5">
              <LinkButton href="/plans/subscribe" withArrow>
                Start Your Subscription
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SALADS */}
      <section id="salads" className="scroll-mt-32 bg-forest-dark px-5 py-16 text-cream md:px-8">
        <div className="mx-auto max-w-content">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Salads</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Fresh, composed daily</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75 text-justify">
              Every salad is priced at {salads.priceLabel}, available for lunch or dinner.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {salads.days.map((d, i) => (
              <Reveal key={d.day} delay={Math.min(i * 60, 240)}>
                <div className="h-full rounded-xl2 border border-cream/10 bg-cream/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">{d.day}</p>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-cream">{d.nonVeg.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-cream/60">{d.nonVeg.description}</p>
                  </div>
                  <div className="mt-4 border-t border-cream/10 pt-4">
                    <p className="text-sm font-semibold text-cream">{d.veg.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-cream/60">{d.veg.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section id="add-ons" className="mx-auto max-w-content scroll-mt-32 px-5 py-16 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper">Add-ons</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest">Round out your order</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 text-justify">
            Optional extras across breakfast, Chinese, burgers, pastas, desserts, ice creams, and drinks —
            add any of these when you submit a request.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {addOnCategories.map((cat, i) => (
            <Reveal key={cat.category} delay={Math.min(i * 60, 240)}>
              <div className="h-full rounded-xl2 border border-sand bg-white p-6 shadow-soft">
                <p className="font-display text-lg font-semibold text-forest">{cat.category}</p>
                <div className="mt-3 divide-y divide-sand">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 py-2 text-sm">
                      <span className="text-ink/80">
                        {item.name}
                        {item.type && <span className="ml-2 text-xs text-ink/45">({item.type})</span>}
                      </span>
                      <span className="shrink-0 font-medium text-copper">{item.price !== undefined ? `₹${item.price}` : "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTY / BULK ORDERS */}
      <section id="party-bulk" className="scroll-mt-32 bg-sand/50 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-content">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest">
              Bulk &amp; Catering
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest">Party &amp; Bulk Orders</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 text-justify">
              Priced per kg, {partyBulkOrders.minimumOrderLabel.toLowerCase()}. For events and bulk catering
              only — handled separately from meal subscriptions.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl2 border border-sand bg-white p-6 shadow-soft">
                <p className="font-display text-lg font-semibold text-forest">Non-Veg</p>
                <div className="mt-3 max-h-96 divide-y divide-sand overflow-y-auto pr-1">
                  {partyBulkOrders.nonVeg.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="flex items-center justify-between gap-3 py-2 text-sm">
                      <span className="text-ink/80">{item.name}</span>
                      <span className="shrink-0 font-medium text-copper">
                        {item.pricePerKg === "Seasonal" ? "Seasonal" : `₹${item.pricePerKg.toLocaleString("en-IN")}/kg`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-xl2 border border-sand bg-white p-6 shadow-soft">
                <p className="font-display text-lg font-semibold text-forest">Veg</p>
                <div className="mt-3 max-h-96 divide-y divide-sand overflow-y-auto pr-1">
                  {partyBulkOrders.veg.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="flex items-center justify-between gap-3 py-2 text-sm">
                      <span className="text-ink/80">{item.name}</span>
                      <span className="shrink-0 font-medium text-copper">
                        {item.pricePerKg === "Seasonal" ? "Seasonal" : `₹${item.pricePerKg.toLocaleString("en-IN")}/kg`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="mt-10 text-center">
              <LinkButton href="/party-request" withArrow className="!bg-forest hover:!bg-forest-dark">
                Request a Bulk Order
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
