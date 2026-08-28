"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import MultiSelectCombobox from "@/components/MultiSelectCombobox";
import { business, FoodType, MealTime, buildMealOptionGroups, buildAddOnOptionGroups } from "@/lib/config";
import { submitToGoogleSheets, newClientRequestId } from "@/lib/submitForm";
import { isRequired, isValidEmail, isValidPhone, isFutureOrTodayDate, isWithinFutureWindow, maxLength, isValidQuantity, validate } from "@/lib/validation";
import { REQUEST_TYPES, MAX_FUTURE_DATE_DAYS, MAX_LENGTHS, MEAL_PREFERENCE_OPTIONS, FOOD_PREFERENCE_OPTIONS, QUANTITY_OPTIONS } from "@/lib/constants";
import SuccessScreen from "@/components/SuccessScreen";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/Button";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  mealTime: string;
  foodPreference: string;
  selectedMeals: string[];
  selectedAddOns: string[];
  quantity: string;
  date: string;
  location: string;
  notes: string;
  honeypot: string;
};

const addOnGroups = buildAddOnOptionGroups();

function RequestForm() {
  const [values, setValues] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    mealTime: "",
    foodPreference: "",
    selectedMeals: [],
    selectedAddOns: [],
    quantity: "1",
    date: "",
    location: "",
    notes: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const mealGroups = useMemo(() => {
    if (!values.foodPreference || !values.mealTime) return [];
    return buildMealOptionGroups(values.foodPreference as FoodType, values.mealTime as MealTime);
  }, [values.foodPreference, values.mealTime]);

  useEffect(() => {
    const validIds = new Set(mealGroups.flatMap((g) => g.options.map((o) => o.id)));
    setValues((v) => {
      const filtered = v.selectedMeals.filter((id) => validIds.has(id));
      if (filtered.length === v.selectedMeals.length) return v;
      return { ...v, selectedMeals: filtered };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.foodPreference, values.mealTime]);

  const update = (field: keyof FormState, value: string) => setValues((v) => ({ ...v, [field]: value }));

  const runValidation = () =>
    validate(
      {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        mealTime: values.mealTime,
        foodPreference: values.foodPreference,
        quantity: values.quantity,
        date: values.date,
        location: values.location,
      },
      {
        fullName: [isRequired, maxLength(MAX_LENGTHS.name)],
        phone: [isRequired, isValidPhone],
        email: [isRequired, isValidEmail],
        mealTime: [isRequired],
        foodPreference: [isRequired],
        quantity: [isRequired, isValidQuantity],
        date: [isRequired, isFutureOrTodayDate, isWithinFutureWindow(MAX_FUTURE_DATE_DAYS)],
        location: [isRequired],
      },
      {
        fullName: "Please enter your full name.",
        phone: "Enter a valid 10-digit phone number.",
        email: "Enter a valid email address.",
        mealTime: "Please choose lunch, dinner, or both.",
        foodPreference: "Please choose vegetarian or non-vegetarian.",
        quantity: "Please enter a valid quantity (minimum 1).",
        date: `Please choose a valid date (today, up to ${MAX_FUTURE_DATE_DAYS} days out).`,
        location: "Please enter your delivery location.",
      }
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.honeypot) return;
    if (status === "submitting") return;

    const foundErrors = runValidation();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitToGoogleSheets({
      requestType: REQUEST_TYPES.INDIVIDUAL_MEAL,
      clientRequestId: newClientRequestId("MEAL"),
      clientSubmittedAt: new Date().toISOString(),
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      mealTime: values.mealTime,
      foodPreference: values.foodPreference,
      selectedMealIds: values.selectedMeals,
      quantity: values.quantity,
      preferredDate: values.date,
      deliveryLocation: values.location,
      selectedAddOnIds: values.selectedAddOns,
      notes: values.notes,
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  if (status === "success") return <SuccessScreen />;

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <input
          type="text"
          value={values.honeypot}
          onChange={(e) => update("honeypot", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <fieldset className="space-y-5">
          <legend className="font-display text-lg font-semibold text-forest">Your Details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" error={errors.fullName} className="sm:col-span-2">
              <input className="input" value={values.fullName} onChange={(e) => update("fullName", e.target.value)} />
            </Field>
            <Field label="Phone Number" error={errors.phone}>
              <input className="input" value={values.phone} onChange={(e) => update("phone", e.target.value)} inputMode="tel" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="input" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="font-display text-lg font-semibold text-forest">Meal Details</legend>

          <Field label="Meal Type" error={errors.mealTime}>
            <div className="flex flex-wrap gap-3">
              {MEAL_PREFERENCE_OPTIONS.map((m) => (
                <SelectPill key={m} label={m} selected={values.mealTime === m} onSelect={() => update("mealTime", m)} />
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

          {mealGroups.length > 0 ? (
            <MultiSelectCombobox
              label="Menu Selection"
              placeholder="Search menu..."
              groups={mealGroups}
              selected={values.selectedMeals}
              onChange={(ids) => setValues((v) => ({ ...v, selectedMeals: ids }))}
              helperText="Select one or more dishes for your food and meal preference."
            />
          ) : (
            <p className="rounded-xl border border-sand bg-sand/30 px-4 py-3 text-sm text-ink/60">
              Choose a meal type and food preference above to see matching dishes.
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
            <Field label="Preferred Date" error={errors.date}>
              <input
                className="input"
                type="date"
                value={values.date}
                onChange={(e) => update("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </Field>
          </div>

          <Field label="Delivery Location" error={errors.location}>
            <input
              className="input"
              value={values.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder={`Address, area (serving ${business.serviceAreas.join(", ")})`}
            />
          </Field>

          <Field label="Additional Notes">
            <textarea className="input min-h-[90px]" value={values.notes} onChange={(e) => update("notes", e.target.value)} />
          </Field>
        </fieldset>

        {status === "error" && <ErrorMessage message={errorMessage} />}

        <div>
          <Button type="submit" className="w-full sm:w-auto" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Send Meal Request"}
          </Button>
          <p className="mt-3 text-xs text-ink/60">
            Our {business.name} team will contact you to confirm this request. No payment is needed now.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`block ${className}`}>
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

export default function IndividualMealRequestPage() {
  return (
    <section className="mx-auto max-w-content px-5 py-16 md:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-copper">Individual Meal Request</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-4xl">Request a single meal</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 text-justify">
          Not ready for a subscription? Order a one-off meal and we&apos;ll confirm availability and delivery
          with you.
        </p>
      </Reveal>
      <div className="mt-10">
        <RequestForm />
      </div>
    </section>
  );
}
