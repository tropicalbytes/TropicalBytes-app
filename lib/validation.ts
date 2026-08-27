export type FieldErrors = Record<string, string>;

export const isRequired = (value: string) => value.trim().length > 0;

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

// Accepts Indian 10-digit numbers, optionally with +91 / 0 prefix, spaces or dashes.
export const isValidPhone = (value: string) => {
  const digits = value.replace(/[\s-]/g, "");
  return /^(\+?91)?0?[6-9]\d{9}$/.test(digits);
};

export const isValidPincode = (value: string) => /^\d{6}$/.test(value.trim());

export const isValidQuantity = (value: string) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1;
};

export const isFutureOrTodayDate = (value: string) => {
  if (!value) return false;
  const chosen = new Date(value + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return chosen.getTime() >= today.getTime();
};

/** Rejects dates further out than `maxDays` from today — matches the server-side rule. */
export const isWithinFutureWindow = (maxDays: number) => (value: string) => {
  if (!isFutureOrTodayDate(value)) return false;
  const chosen = new Date(value + "T00:00:00");
  const limit = new Date();
  limit.setHours(0, 0, 0, 0);
  limit.setDate(limit.getDate() + maxDays);
  return chosen.getTime() <= limit.getTime();
};

export const maxLength = (max: number) => (value: string) => value.trim().length <= max;

/** Optional-positive-number check — passes on empty (field is optional), fails on non-positive or non-numeric. */
export const isEmptyOrPositiveNumber = (value: string) => {
  if (!value.trim()) return true;
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
};

export const validate = (
  values: Record<string, string>,
  rules: Record<string, Array<(v: string) => boolean>>,
  messages: Record<string, string>
): FieldErrors => {
  const errors: FieldErrors = {};
  for (const field of Object.keys(rules)) {
    const value = values[field] ?? "";
    const failed = rules[field].some((rule) => !rule(value));
    if (failed) {
      errors[field] = messages[field] || "This field is invalid.";
    }
  }
  return errors;
};
