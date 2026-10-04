"use client";

import { useState, type FormEvent } from "react";
import { submitContact } from "@/lib/contact";
import { ArrowRight, Check } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/use-copy";
import { useServices } from "@/lib/use-content";

type FormValues = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  projectDetails: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  service: "",
  projectDetails: "",
};

type Messages = {
  fullName: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  service: string;
  details: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues, messages: Messages): FormErrors {
  const errors: FormErrors = {};
  const digits = values.phone.replace(/\D/g, "");

  if (values.fullName.trim().length < 2) {
    errors.fullName = messages.fullName;
  }
  if (!values.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }
  if (!values.phone.trim()) {
    errors.phone = messages.phoneRequired;
  } else if (digits.length < 6) {
    errors.phone = messages.phoneInvalid;
  }
  if (!values.service) {
    errors.service = messages.service;
  }
  if (values.projectDetails.trim().length < 20) {
    errors.projectDetails = messages.details;
  }

  return errors;
}

const fieldClasses = (hasError: boolean) =>
  cn(
    "h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-navy-900 placeholder:text-navy-900/40 transition-colors focus:outline-none focus:ring-2",
    hasError
      ? "border-pink-500 focus:border-pink-500 focus:ring-pink-200"
      : "border-navy-900/15 focus:border-green-500 focus:ring-green-200",
  );

export function ContactForm() {
  const { t, list } = useLocale();
  const serviceOptions = [...useServices().map((service) => service.name), t("form.other")];
  const countries = list("form.countries");
  const messages: Messages = {
    fullName: t("form.errors.fullName"),
    emailRequired: t("form.errors.emailRequired"),
    emailInvalid: t("form.errors.emailInvalid"),
    phoneRequired: t("form.errors.phoneRequired"),
    phoneInvalid: t("form.errors.phoneInvalid"),
    service: t("form.errors.service"),
    details: t("form.errors.details"),
  };

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const setField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, messages);
    setErrors(nextErrors);
    setStatus("idle");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    const result = await submitContact({
      fullName: values.fullName.trim(),
      companyName: values.companyName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      country: values.country.trim(),
      service: values.service,
      projectDetails: values.projectDetails.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setValues(initialValues);
    } else {
      setStatus("error");
      setErrorMessage(result.error);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex h-full min-h-96 flex-col items-start justify-center rounded-2xl border border-green-200 bg-green-50 p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-navy-950">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-navy-900">
          {t("form.successTitle")}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-900/70">
          {t("form.successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-green-600 hover:text-green-500"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8"
      aria-describedby="contact-form-hint"
    >
      {status === "error" ? (
        <div
          className="mb-6 rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <p id="contact-form-hint" className="mb-6 text-xs text-navy-900/50">
        {t("form.requiredHint")}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("form.fullName")}
          name="fullName"
          required
          error={errors.fullName}
          input={
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder={t("form.fullNamePlaceholder")}
              className={fieldClasses(Boolean(errors.fullName))}
              value={values.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
          }
          errorId="fullName-error"
        />
        <Field
          label={t("form.companyName")}
          name="companyName"
          error={errors.companyName}
          input={
            <input
              id="companyName"
              type="text"
              autoComplete="organization"
              placeholder={t("form.companyPlaceholder")}
              className={fieldClasses(false)}
              value={values.companyName}
              onChange={(e) => setField("companyName", e.target.value)}
            />
          }
        />
        <Field
          label={t("form.email")}
          name="email"
          required
          error={errors.email}
          input={
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("form.emailPlaceholder")}
              className={fieldClasses(Boolean(errors.email))}
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          }
          errorId="email-error"
        />
        <Field
          label={t("form.phone")}
          name="phone"
          required
          error={errors.phone}
          input={
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t("form.phonePlaceholder")}
              className={fieldClasses(Boolean(errors.phone))}
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          }
          errorId="phone-error"
        />
        <Field
          label={t("form.country")}
          name="country"
          error={errors.country}
          input={
            <input
              id="country"
              type="text"
              list="country-options"
              autoComplete="country-name"
              placeholder={t("form.countryPlaceholder")}
              className={fieldClasses(false)}
              value={values.country}
              onChange={(e) => setField("country", e.target.value)}
            />
          }
        >
          <datalist id="country-options">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </Field>
        <Field
          label={t("form.service")}
          name="service"
          required
          error={errors.service}
          input={
            <select
              id="service"
              className={cn(fieldClasses(Boolean(errors.service)), "appearance-none")}
              value={values.service}
              onChange={(e) => setField("service", e.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="" disabled>
                {t("form.selectService")}
              </option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          }
          errorId="service-error"
        />

        <div className="sm:col-span-2">
          <Field
            label={t("form.projectDetails")}
            name="projectDetails"
            required
            error={errors.projectDetails}
            input={
              <textarea
                id="projectDetails"
                rows={5}
                placeholder={t("form.detailsPlaceholder")}
                className={cn(
                  fieldClasses(Boolean(errors.projectDetails)),
                  "h-auto min-h-32 resize-y py-3",
                )}
                value={values.projectDetails}
                onChange={(e) => setField("projectDetails", e.target.value)}
                aria-invalid={Boolean(errors.projectDetails)}
                aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
              />
            }
            errorId="projectDetails-error"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-none bg-brand-500 px-7 text-sm font-medium text-white transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
      >
        {status === "submitting" ? t("form.sending") : t("form.send")}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  input,
  errorId,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
  errorId?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
        {required ? (
          <span className="text-pink-500" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {input}
      {children}
      <p
        className={cn(
          "mt-1 text-xs text-pink-600",
          !error && "pointer-events-none invisible",
        )}
        id={errorId}
        role="alert"
      >
        {error ?? ""}
      </p>
    </div>
  );
}