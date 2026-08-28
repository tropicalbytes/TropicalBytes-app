"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  business,
  durations,
  Duration,
  FoodType,
  MealTime,
  estimatePrice,
  buildMealOptionGroups,
  buildAddOnOptionGroups,
} from "@/lib/config";
import { submitToGoogleSheets, newClientRequestId } from "@/lib/submitForm";
import { REQUEST_TYPES, MAX_FUTURE_DATE_DAYS, MAX_LENGTHS, MEAL_PREFERENCE_OPTIONS, FOOD_PREFERENCE_OPTIONS, QUANTITY_OPTIONS } from "@/lib/constants";
import { isRequired, isValidEmail, isValidPhone, isValidPincode, isFutureOrTodayDate, isWithinFutureWindow, maxLength, isValidQuantity, validate } from "@/lib/validation";
import SuccessScreen from "@/components/SuccessScreen";
import ErrorMessage from "@/components/ErrorMessage";
import MultiSelectCombobox from "@/components/MultiSelectCombobox";
import { Button } from "@/components/Button";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  durationId: string;
  mealPreference: string;
  foodPreference: string;
  selectedMeals: string[];
  selectedAddOns: string[];
  quantity: string;
  startDate: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  notes: string;
  honeypot: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  durationId: "",
  mealPreference: "",
  foodPreference: "",
  selectedMeals: [],
  selectedAddOns: [],
  quantity: "1",
  startDate: "",
  address: "",
  area: "",
  city: business.serviceAreas[0],
  pincode: "",
  notes: "",
  honeypot: "",
};

const STEPS = ["Your Details", "Plan & Preferences", "Meals & Add-ons", "Delivery Details", "Review & Submit"];
const addOnGroups = buildAddOnOptionGroups();

function SubscribeForm() {
  const params = useSearchParams();
  const preselected = params.get("duration") || "";

  const [values, setValues] = useState<FormState>({ ...initialState, durationId: preselected });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(0);

  const selectedDuration = useMemo(() => durations.find((d) => d.id === values.durationId), [values.durationId]);

  const mealGroups = useMemo(() => {
    if (!values.foodPreference || !values.mealPreference) return [];
    return buildMealOptionGroups(values.foodPreference as FoodType, values.mealPreference as MealTime);
  }, [values.foodPreference, values.mealPreference]);

  const priceEstimate = useMemo(() => {
    if (!values.foodPreference || !values.mealPreference || !values.durationId) return null;
    return estimatePrice(values.foodPreference as FoodType, values.mealPreference as MealTime, values.durationId);
  }, [values.foodPreference, values.mealPreference, values.durationId]);

  // Smart logic: when food/meal preference changes, drop any selected dishes
  // that are no longer valid for the new combination.
  useEffect(() => {
    const validIds = new Set(mealGroups.flatMap((g) => g.options.map((o) => o.id)));
    setValues((v) => {
      const filtered = v.selectedMeals.filter((id) => validIds.has(id));
      if (filtered.length === v.selectedMeals.length) return v;
      return { ...v, selectedMeals: filtered };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.foodPreference, values.mealPreference]);

  const update = (field: keyof FormState, value: string) => setValues((v) => ({ ...v, [field]: value }));

  const stepRules: Record<number, { rules: Record<string, Array<(v: string) => boolean>>; messages: Record<string, string> }> = {
    0: {
      rules: { fullName: [isRequired, maxLength(MAX_LENGTHS.name)], phone: [isRequired, isValidPhone], email: [isRequired, isValidEmail] },
      messages: {
        fullName: "Please enter your full name.",
        phone: "Enter a valid 10-digit phone number.",
        email: "Enter a valid email address.",
      },
    },
    1: {
      rules: { durationId: [isRequired], mealPreference: [isRequired], foodPreference: [isRequired] },
      messages: {
        durationId: "Please choose a plan duration.",
        mealPreference: "Please choose lunch, dinner, or both.",
        foodPreference: "Please choose vegetarian or non-vegetarian.",
      },
    },
    2: {
      rules: { startDate: [isRequired, isFutureOrTodayDate, isWithinFutureWindow(MAX_FUTURE_DATE_DAYS)], quantity: [isRequired, isValidQuantity] },
      messages: {
        startDate: `Please choose a valid start date (today, up to ${MAX_FUTURE_DATE_DAYS} days out).`,
        quantity: "Please enter a valid quantity (minimum 1).",
      },
    },
    3: {
      rules: { address: [isRequired, maxLength(MAX_LENGTHS.address)], area: [isRequired], city: [isRequired], pincode: [isRequired, isValidPincode] },
      messages: {
        address: "Please enter your full address.",
        area: "Please enter your area or locality.",
        city: "Please enter your city.",
        pincode: "Enter a valid 6-digit pincode.",
      },
    },
  };

  const asStrings = (): Record<string, string> => ({
    fullName: values.fullName,
    phone: values.phone,
    email: values.email,
    durationId: values.durationId,
    mealPreference: values.mealPreference,
    foodPreference: values.foodPreference,
    quantity: values.quantity,
    startDate: values.startDate,
    address: values.address,
    area: values.area,
    city: values.city,
    pincode: values.pincode,
  });

  const validateStep = (stepIndex: number) => {
    const config = stepRules[stepIndex];
    if (!config) return {};
    return validate(asStrings(), config.rules, config.messages);
  };

  const goNext = () => {
    const foundErrors = validateStep(step);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (target: number) => {
    setStep(target);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const labelsFor = (ids: string[], groups: { options: { id: string; label: string }[] }[]) => {
    const all = groups.flatMap((g) => g.options);
    return ids.map((id) => all.find((o) => o.id === id)?.label || id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < STEPS.length - 1) {
      goNext();
      return;
    }

    if (values.honeypot) return; // silently drop bot submissions
    if (status === "submitting") return;

    const allErrors = { ...validateStep(0), ...validateStep(1), ...validateStep(2), ...validateStep(3) };
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      const firstInvalidStep = [0, 1, 2, 3].find((s) => Object.keys(validateStep(s)).length > 0);
      if (firstInvalidStep !== undefined) setStep(firstInvalidStep);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitToGoogleSheets({
      requestType: REQUEST_TYPES.SUBSCRIPTION,
      clientRequestId: newClientRequestId("SUB"),
      clientSubmittedAt: new Date().toISOString(),
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      durationId: values.durationId,
      mealPreference: values.mealPreference,
      foodPreference: values.foodPreference,
      // IDs, not label text — the backend looks these up in its own
      // allowlist and never trusts free-text labels from the browser.
      selectedMealIds: values.selectedMeals,
      selectedAddOnIds: values.selectedAddOns,
      quantity: values.quantity,
      startDate: values.startDate,
      clientEstimatedTotal: priceEstimate ? priceEstimate.total : null,
      address: values.address,
      area: values.area,
      city: values.city,
      pincode: values.pincode,
      notes: values.notes,
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  if (status === "success") {
    return <SuccessScreen />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress indicator */}
      <ol className="mb-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => (i < step ? goToStep(i) : undefined)}
              disabled={i > step}
              className="flex flex-col items-center gap-2 text-center disabled:cursor-default"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-semibold transition-colors duration-300 ${i < step ? "bg-forest text-cream" : i === step ? "bg-copper text-cream" : "bg-sand text-forest/50"
                  }`}
              >
                {i < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={`hidden text-[11px] font-medium sm:block ${i === step ? "text-forest" : "text-ink/50"}`}>{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span className={`mx-2 h-px flex-1 transition-colors duration-300 ${i < step ? "bg-forest" : "bg-sand"}`} />
            )}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <input
          type="text"
          name="company"
          value={values.honeypot}
          onChange={(e) => update("honeypot", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {step === 0 && (
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-semibold text-forest">Your Details</legend>
            <p className="text-sm text-ink/60">Let&apos;s start with how our team can reach you.</p>
            <Field label="Full Name" error={errors.fullName}>
              <input className="input" value={values.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Aditi Rao" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone Number" error={errors.phone}>
                <input className="input" value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="e.g. 98765 43210" inputMode="tel" />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input className="input" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
              </Field>
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-6">
            <legend className="font-display text-xl font-semibold text-forest">Plan &amp; Preferences</legend>
            <p className="text-sm text-ink/60">Pick a duration, then tell us when and what you&apos;d like to eat.</p>

            <Field label="Duration" error={errors.durationId}>
              <div className="grid gap-3 sm:grid-cols-3">
                {durations.map((d) => (
                  <DurationOption key={d.id} duration={d} selected={values.durationId === d.id} onSelect={() => update("durationId", d.id)} />
                ))}
              </div>
            </Field>

            <Field label="Meal Preference" error={errors.mealPreference}>
              <div className="flex flex-wrap gap-3">
                {MEAL_PREFERENCE_OPTIONS.map((m) => (
                  <SelectPill key={m} label={m} selected={values.mealPreference === m} onSelect={() => update("mealPreference", m)} />
                ))}
              </div>
            </Field>

            <Field label="Food Preference" error={errors.foodPreference}>
              <div className="flex gap-3">
                {FOOD_PREFERENCE_OPTIONS.map((f) => (
                  <SelectPill key={f} label={f} selected={values.foodPreference === f} onSelect={() => update("foodPreference", f)} />
                ))}
              </div>
            </Field>

            {priceEstimate && (
              <div className="rounded-xl2 border border-copper/30 bg-copper/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-copper">Estimated total</p>
                <p className="mt-1 font-display text-2xl font-semibold text-forest">
                  ₹{priceEstimate.total.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-ink/60">
                  {priceEstimate.combo.label} · {priceEstimate.duration.name}
                  {priceEstimate.discount > 0 && ` · ${priceEstimate.duration.discountPercent}% off applied`}. Our team will confirm the
                  final amount.
                </p>
              </div>
            )}
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-6">
            <legend className="font-display text-xl font-semibold text-forest">Meals &amp; Add-ons</legend>
            <p className="text-sm text-ink/60">
              Optional: tell us your favourite dishes and any extras. Leave blank and we&apos;ll rotate the
              full weekly menu.
            </p>

            {mealGroups.length > 0 ? (
              <MultiSelectCombobox
                label="Select Your Meals (optional)"
                placeholder="Search dishes..."
                groups={mealGroups}
                selected={values.selectedMeals}
                onChange={(ids) => setValues((v) => ({ ...v, selectedMeals: ids }))}
                helperText="Showing dishes for your chosen food and meal preference."
              />
            ) : (
              <p className="rounded-xl border border-sand bg-sand/30 px-4 py-3 text-sm text-ink/60">
                Choose a meal and food preference in the previous step to see matching dishes.
              </p>
            )}

            <MultiSelectCombobox
              label="Add-ons (optional)"
              placeholder="Search add-ons..."
              groups={addOnGroups}
              selected={values.selectedAddOns}
              onChange={(ids) => setValues((v) => ({ ...v, selectedAddOns: ids }))}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Quantity" error={errors.quantity}>
                <input
                  type="number"
                  className="input"
                  min="1"
                  step="1"
                  placeholder="Enter Quantity"
                  value={values.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e' || e.key === 'E') {
                      e.preventDefault();
                    }
                  }}
                />
              </Field>
              <Field label="Preferred Start Date" error={errors.startDate}>
                <input className="input" type="date" value={values.startDate} onChange={(e) => update("startDate", e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </Field>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-semibold text-forest">Delivery Details</legend>
            <p className="text-sm text-ink/60">Where should we send your meals?</p>
            <Field label="Full Address" error={errors.address}>
              <textarea className="input min-h-[90px]" value={values.address} onChange={(e) => update("address", e.target.value)} placeholder="House / flat no., street, landmark" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Area / Locality" error={errors.area}>
                <input className="input" value={values.area} onChange={(e) => update("area", e.target.value)} />
              </Field>
              <Field label="City" error={errors.city}>
                <input className="input" value={values.city} onChange={(e) => update("city", e.target.value)} />
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input className="input" value={values.pincode} onChange={(e) => update("pincode", e.target.value)} inputMode="numeric" />
              </Field>
            </div>
            <Field label="Additional Requirements">
              <textarea className="input min-h-[90px]" value={values.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Anything else we should know? (optional)" />
            </Field>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-semibold text-forest">Review &amp; Submit</legend>
            <p className="text-sm text-ink/60">Take a moment to check everything looks right.</p>

            <div className="space-y-4 rounded-xl2 border border-sand bg-white p-6 shadow-soft">
              <ReviewGroup title="Your Details" onEdit={() => goToStep(0)}>
                <ReviewRow label="Name" value={values.fullName} />
                <ReviewRow label="Phone" value={values.phone} />
                <ReviewRow label="Email" value={values.email} />
              </ReviewGroup>

              <ReviewGroup title="Plan & Preferences" onEdit={() => goToStep(1)}>
                <ReviewRow label="Duration" value={selectedDuration?.name || "-"} />
                <ReviewRow label="Meal" value={values.mealPreference || "-"} />
                <ReviewRow label="Food Type" value={values.foodPreference || "-"} />
                {priceEstimate && <ReviewRow label="Estimated Total" value={`₹${priceEstimate.total.toLocaleString("en-IN")}`} />}
              </ReviewGroup>

              <ReviewGroup title="Meals & Add-ons" onEdit={() => goToStep(2)}>
                <ReviewRow label="Selected Meals" value={labelsFor(values.selectedMeals, mealGroups).join(", ") || "Full weekly rotation"} />
                <ReviewRow label="Add-ons" value={labelsFor(values.selectedAddOns, addOnGroups).join(", ") || "None"} />
                <ReviewRow label="Quantity" value={`${values.quantity} ${values.quantity === "1" ? "person" : "people"}`} />
                <ReviewRow label="Start Date" value={values.startDate || "-"} />
              </ReviewGroup>

              <ReviewGroup title="Delivery Details" onEdit={() => goToStep(3)}>
                <ReviewRow label="Address" value={values.address} />
                <ReviewRow label="Area" value={values.area} />
                <ReviewRow label="City" value={values.city} />
                <ReviewRow label="Pincode" value={values.pincode} />
                {values.notes && <ReviewRow label="Notes" value={values.notes} />}
              </ReviewGroup>
            </div>
          </fieldset>
        )}

        {status === "error" && <ErrorMessage message={errorMessage} />}

        <div className="flex items-center justify-between gap-4 pt-2">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={goBack} disabled={status === "submitting"}>
              Back
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <Button key="continue-btn" type="button" withArrow onClick={(e) => { e.preventDefault(); goNext(); }}>
              Continue
            </Button>
          ) : (
            <Button key="submit-btn" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting…" : "Send Meal Request"}
            </Button>
          )}
        </div>

        {step === STEPS.length - 1 && (
          <p className="text-center text-xs text-ink/60">
            No online payment is required. Our team will contact you to confirm your request.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <span className="mb-1.5 block text-sm font-medium text-forest">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{error}</span>}
    </div>
  );
}

function SelectPill({
  label,
  selected,
  onSelect,
  className = "",
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${selected ? "border-forest bg-forest text-cream shadow-soft" : "border-sand bg-white text-forest"
        } ${className}`}
    >
      {selected && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {label}
    </button>
  );
}

function DurationOption({ duration, selected, onSelect }: { duration: Duration; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative flex flex-col items-start rounded-xl2 border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${selected ? "border-forest bg-forest text-cream shadow-soft" : "border-sand bg-white text-forest"
        }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-copper text-cream">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <span className="font-display text-base font-semibold">{duration.name}</span>
      <span className={`mt-0.5 text-xs ${selected ? "text-cream/70" : "text-ink/55"}`}>
        {duration.weeks} {duration.weeks === 1 ? "week" : "weeks"}
      </span>
      {duration.badge && (
        <span className={`mt-2 text-xs font-medium ${selected ? "text-copper-light" : "text-copper"}`}>{duration.badge}</span>
      )}
    </button>
  );
}

function ReviewGroup({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-sand pb-4 last:border-0 last:pb-0">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-copper">{title}</p>
        <button type="button" onClick={onEdit} className="text-xs font-medium text-forest underline underline-offset-2 hover:text-copper">
          Edit
        </button>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="shrink-0 text-ink/55">{label}</span>
      <span className="text-right font-medium text-ink/85">{value}</span>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <section className="mx-auto max-w-content px-5 py-16 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-copper">Subscription Request</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-4xl">Set up your meal plan</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 text-justify">
        A quick, guided form: this is a request, not a payment. Our team will contact you to confirm
        everything.
      </p>
      <div className="mt-10">
        <Suspense fallback={null}>
          <SubscribeForm />
        </Suspense>
      </div>
    </section>
  );
}
