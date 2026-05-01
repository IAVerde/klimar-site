import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[resend] RESEND_API_KEY missing — emails will be skipped.");
    }
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL ?? "Klimar <onboarding@resend.dev>";
