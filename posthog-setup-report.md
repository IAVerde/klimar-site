<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Klimar Next.js App Router project. The project already had a solid client-side foundation (`PostHogProvider`, `trackEvent`, `AnalyticsEvent` enum, and event calls in forms and marketing components). The wizard extended this with server-side tracking, user identification, error capture, and a reverse proxy.

**Changes made:**

- **`lib/posthog-server.ts`** _(new)_ — Server-side PostHog Node.js client using `posthog-node`, returns `null` when key is absent.
- **`app/api/signup/route.ts`** — On successful Supabase signup: calls `posthog.identify()` with the user's ID and email, then captures `signup_completed` with audience and confirmation status.
- **`app/api/waitlist/route.ts`** — After a new waitlist entry is persisted (not a duplicate): captures `waitlist_submitted` server-side with audience, source, and UTM properties.
- **`app/api/lead/route.ts`** — After a business lead is persisted: captures `business_lead_submitted` server-side with company, technician count, source, and UTM properties.
- **`components/forms/signup-form.tsx`** — On successful signup response: calls `posthog.identify(email, { email, audience })` to correlate client-side events with the new user.
- **`components/analytics/posthog-provider.tsx`** — Updated `api_host` to `/ingest` (reverse proxy), added `ui_host` pointing to the PostHog host env var, and enabled `capture_exceptions: true` for automatic error tracking.
- **`next.config.ts`** — Added `skipTrailingSlashRedirect: true` and three reverse proxy rewrites (`/ingest/static/*`, `/ingest/array/*`, `/ingest/*`) to route PostHog traffic through the app and improve ad-blocker resilience.
- **`.env.local`** — Confirmed `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` values are set.
- **`posthog-node`** — Installed as a production dependency.

| Event | Description | File |
|---|---|---|
| `signup_started` | User submits signup form (client) | `components/forms/signup-form.tsx` |
| `signup_completed` | Successful account creation (client + server) | `components/forms/signup-form.tsx`, `app/api/signup/route.ts` |
| `waitlist_submitted` | New waitlist entry persisted (client + server) | `components/forms/waitlist-form.tsx`, `app/api/waitlist/route.ts` |
| `business_lead_submitted` | Business lead persisted (client + server) | `components/forms/business-lead-form.tsx`, `app/api/lead/route.ts` |
| `cta_clicked` | CTA button/link click with location + label | `components/marketing/cta-button.tsx`, `components/marketing/nav.tsx` |
| `audience_toggled` | Solo/company toggle switch | `components/marketing/audience-toggle.tsx` |
| `pricing_billing_toggled` | Monthly/yearly billing toggle | `components/marketing/pricing-cards.tsx` |
| `faq_opened` | FAQ accordion item expanded | `components/marketing/faq.tsx` |
| `app_login_clicked` | "Entrar" link to the app clicked | `components/marketing/nav.tsx` |
| `identify` | User identified with email on signup | `components/forms/signup-form.tsx`, `app/api/signup/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/406030/dashboard/1534865
- **Signup Conversion Funnel** (signup_started → signup_completed): https://us.posthog.com/project/406030/insights/v6wPx92d
- **Waitlist Submissions (Daily)**: https://us.posthog.com/project/406030/insights/3hHyjg5V
- **Business Leads (Daily)**: https://us.posthog.com/project/406030/insights/0iLcFJEJ
- **CTA Clicks by Location**: https://us.posthog.com/project/406030/insights/Xlpecuf5
- **Top FAQ Questions Opened**: https://us.posthog.com/project/406030/insights/UJ5FwWaw

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
