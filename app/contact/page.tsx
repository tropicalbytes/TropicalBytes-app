"use client";

import { useState } from "react";
import { business, faqs } from "@/lib/config";
import { submitToGoogleSheets, newClientRequestId } from "@/lib/submitForm";
import { isRequired, isValidEmail, isValidPhone, maxLength, validate } from "@/lib/validation";
import { REQUEST_TYPES, MAX_LENGTHS } from "@/lib/constants";
import { Button } from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const [values, setValues] = useState({ fullName: "", phone: "", email: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: keyof typeof values, value: string) => setValues((v) => ({ ...v, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.honeypot) return;
    if (status === "submitting") return;

    const foundErrors = validate(
      values,
      {
        fullName: [isRequired, maxLength(MAX_LENGTHS.name)],
        phone: [isRequired, isValidPhone],
        email: [isRequired, isValidEmail],
        message: [isRequired, maxLength(MAX_LENGTHS.message)],
      },
      {
        fullName: "Please enter your full name.",
        phone: "Enter a valid 10-digit phone number.",
        email: "Enter a valid email address.",
        message: `Please tell us a little about your enquiry (max ${MAX_LENGTHS.message} characters).`,
      }
    );
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitToGoogleSheets({
      requestType: REQUEST_TYPES.CONTACT,
      clientRequestId: newClientRequestId("CNT"),
      clientSubmittedAt: new Date().toISOString(),
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      message: values.message,
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  return (
    <>
      <section className="bg-forest px-5 py-16 text-cream md:px-8">
        <Reveal className="mx-auto max-w-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">We&apos;d love to hear from you</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content grid gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="space-y-4 rounded-xl2 border border-sand bg-white p-7 shadow-soft">
            <ContactRow label="Phone" value={business.phoneDisplay} href={`tel:${business.phone.replace(/\s/g, "")}`} />
            <ContactRow label="WhatsApp" value={business.phoneDisplay} href={`https://wa.me/${business.whatsapp}`} />
            <ContactRow label="Email" value={business.email} href={`mailto:${business.email}`} />
            <ContactRow label="Address" value={business.address} />
            <ContactRow label="Service Areas" value={business.serviceAreas.join(", ")} />
            <ContactRow label="Hours" value={business.hours} />
          </div>

          <div className="mt-6 overflow-hidden rounded-xl2 border border-sand shadow-soft">
            <iframe
              title="TropicalBytes location map"
              src={business.mapsEmbedUrl}
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          {status === "success" ? (
            <div className="rounded-xl2 border border-sand bg-white p-8 text-center shadow-soft">
              <p className="font-display text-xl font-semibold text-forest">Thanks for reaching out!</p>
              <p className="mt-2 text-sm text-ink/70">
                We&apos;ve received your message and will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl2 border border-sand bg-white p-7 shadow-soft">
              <input
                type="text"
                value={values.honeypot}
                onChange={(e) => update("honeypot", e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Full Name</span>
                <input className="input" value={values.fullName} onChange={(e) => update("fullName", e.target.value)} />
                {errors.fullName && <span className="mt-1 block text-xs font-medium text-copper-dark">{errors.fullName}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Phone Number</span>
                <input className="input" value={values.phone} onChange={(e) => update("phone", e.target.value)} inputMode="tel" />
                {errors.phone && <span className="mt-1 block text-xs font-medium text-copper-dark">{errors.phone}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Email</span>
                <input className="input" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
                {errors.email && <span className="mt-1 block text-xs font-medium text-copper-dark">{errors.email}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest">Message</span>
                <textarea className="input min-h-[110px]" value={values.message} onChange={(e) => update("message", e.target.value)} />
                {errors.message && <span className="mt-1 block text-xs font-medium text-copper-dark">{errors.message}</span>}
              </label>

              {status === "error" && <ErrorMessage message={errorMessage} />}

              <Button type="submit" className="w-full" withArrow disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </Reveal>
      </section>

      <section className="bg-sand/50 px-5 py-16 md:px-8">
        <Reveal className="mx-auto max-w-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-copper">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest">Quick answers</h2>
          <div className="mt-8 max-w-2xl">
            <FaqAccordion items={faqs.slice(0, 4)} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-sand pb-3 last:border-0 last:pb-0">
      <span className="text-xs font-semibold uppercase tracking-widest text-copper">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="text-sm text-forest transition-colors hover:text-copper"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-forest">{value}</span>
      )}
    </div>
  );
}
