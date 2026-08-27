"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import MultiSelectCombobox from "@/components/MultiSelectCombobox";
import { business, partyBulkOrders, slugify, MenuOptionGroup } from "@/lib/config";
import { submitToGoogleSheets, newClientRequestId } from "@/lib/submitForm";
import { isRequired, isValidEmail, isValidPhone, isFutureOrTodayDate, isWithinFutureWindow, isEmptyOrPositiveNumber, maxLength, validate } from "@/lib/validation";
import { REQUEST_TYPES, MAX_FUTURE_DATE_DAYS, MAX_LENGTHS } from "@/lib/constants";
import SuccessScreen from "@/components/SuccessScreen";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/Button";

const partyGroups: MenuOptionGroup[] = [
  {
    group: "Non-Veg",
    options: partyBulkOrders.nonVeg.map((item, idx) => ({
      id: slugify(`nonveg-${item.name}-${idx}`),
      label: item.name,
      meta: item.pricePerKg === "Seasonal" ? "Seasonal" : `₹${item.pricePerKg.toLocaleString("en-IN")}/kg`,
    })),
  },
  {
    group: "Veg",
    options: partyBulkOrders.veg.map((item, idx) => ({
      id: slugify(`veg-${item.name}-${idx}`),
      label: item.name,
      meta: item.pricePerKg === "Seasonal" ? "Seasonal" : `₹${item.pricePerKg.toLocaleString("en-IN")}/kg`,
    })),
  },
];

export default function PartyRequestPage() {
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventDate: "",
    approxKg: "",
    location: "",
    notes: "",
    honeypot: "",
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: keyof typeof values, value: string) => setValues((v) => ({ ...v, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.honeypot) return;
    if (status === "submitting") return;

    const foundErrors = validate(
      { ...values, selectedItems: selectedItems.join(",") },
      {
        fullName: [isRequired, maxLength(MAX_LENGTHS.name)],
        phone: [isRequired, isValidPhone],
        email: [isRequired, isValidEmail],
        eventDate: [isRequired, isFutureOrTodayDate, isWithinFutureWindow(MAX_FUTURE_DATE_DAYS)],
        location: [isRequired],
        approxKg: [isEmptyOrPositiveNumber],
        selectedItems: [isRequired],
      },
      {
        fullName: "Please enter your full name.",
        phone: "Enter a valid 10-digit phone number.",
        email: "Enter a valid email address.",
        eventDate: `Please choose a valid date (today, up to ${MAX_FUTURE_DATE_DAYS} days out).`,
        location: "Please enter the delivery location.",
        approxKg: "Enter a positive number, or leave this blank.",
        selectedItems: "Please select at least one item.",
      }
    );
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitToGoogleSheets({
      requestType: REQUEST_TYPES.PARTY_BULK,
      clientRequestId: newClientRequestId("PARTY"),
      clientSubmittedAt: new Date().toISOString(),
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      // IDs, not label text — the backend looks these up in its own
      // allowlist and never trusts free-text labels from the browser.
      selectedItemIds: selectedItems,
      approxQuantityKg: values.approxKg,
      eventDate: values.eventDate,
      deliveryLocation: values.location,
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
    return (
      <section className="mx-auto max-w-content px-5 py-16 md:px-8">
        <SuccessScreen />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-content px-5 py-16 md:px-8">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest">
          Bulk &amp; Catering
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">Request a Bulk Order</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
          For parties and events, priced per kg, {partyBulkOrders.minimumOrderLabel.toLowerCase()}. This is
          a separate request from our meal subscriptions; our team will follow up to confirm quantities and
          final pricing.
        </p>
      </Reveal>

      <div className="mt-10 mx-auto max-w-2xl">
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
              <div className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-forest">Full Name</span>
                <input className="input" value={values.fullName} onChange={(e) => update("fullName", e.target.value)} />
                {errors.fullName && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{errors.fullName}</span>}
              </div>
              <div className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Phone Number</span>
                <input className="input" value={values.phone} onChange={(e) => update("phone", e.target.value)} inputMode="tel" />
                {errors.phone && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{errors.phone}</span>}
              </div>
              <div className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Email</span>
                <input className="input" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
                {errors.email && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{errors.email}</span>}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="font-display text-lg font-semibold text-forest">Order Details</legend>

            <div>
              <MultiSelectCombobox
                label="Select Items"
                placeholder="Search bulk menu..."
                groups={partyGroups}
                selected={selectedItems}
                onChange={setSelectedItems}
                helperText={partyBulkOrders.minimumOrderLabel}
              />
              {errors.selectedItems && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{errors.selectedItems}</span>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Approx. Total Quantity (kg)</span>
                <input className="input" value={values.approxKg} onChange={(e) => update("approxKg", e.target.value)} placeholder="e.g. 5" inputMode="numeric" />
              </div>
              <div className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Event Date</span>
                <input
                  className="input"
                  type="date"
                  value={values.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.eventDate && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{errors.eventDate}</span>}
              </div>
            </div>

            <div className="block">
              <span className="mb-1.5 block text-sm font-medium text-forest">Delivery Location</span>
              <input
                className="input"
                value={values.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder={`Venue / address (serving ${business.serviceAreas.join(", ")})`}
              />
              {errors.location && <span className="mt-1.5 block text-xs font-medium text-copper-dark">{errors.location}</span>}
            </div>

            <div className="block">
              <span className="mb-1.5 block text-sm font-medium text-forest">Additional Notes</span>
              <textarea className="input min-h-[90px]" value={values.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Guest count, timing, serving style, etc. (optional)" />
            </div>
          </fieldset>

          {status === "error" && <ErrorMessage message={errorMessage} />}

          <div>
            <Button type="submit" className="w-full sm:w-auto" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting…" : "Submit Request"}
            </Button>
            <p className="mt-3 text-xs text-ink/60">
              No online payment is required. Our team will contact you to confirm quantities and final pricing.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
