export type FieldErrors = Record<string, string>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
  /** Echo of submitted values so fields keep their content after an error. */
  values?: Record<string, string>;
  redirectTo?: string;
};

export const initialFormState: FormState = { status: "idle" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts international formats: optional +, digits, spaces, dashes, dots, parentheses; 7–15 digits.
const PHONE_CHARS_RE = /^\+?[\d\s().-]+$/;

export function str(fd: FormData, key: string, max = 2000): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function isEmail(v: string) {
  return v.length <= 254 && EMAIL_RE.test(v);
}

export function isPhone(v: string) {
  if (!PHONE_CHARS_RE.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}
