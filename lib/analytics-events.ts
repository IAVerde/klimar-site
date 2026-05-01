export const AnalyticsEvent = {
  // navegação
  landingViewed: "landing_viewed",
  pricingViewed: "pricing_viewed",
  aboutViewed: "about_viewed",

  // engajamento
  audienceToggled: "audience_toggled",
  ctaClicked: "cta_clicked",
  pricingPlanClicked: "pricing_plan_clicked",
  pricingBillingToggled: "pricing_billing_toggled",
  faqOpened: "faq_opened",
  comparisonViewed: "comparison_viewed",

  // conversão
  signupStarted: "signup_started",
  signupCompleted: "signup_completed",
  waitlistSubmitted: "waitlist_submitted",
  businessLeadSubmitted: "business_lead_submitted",

  // outbound
  appLoginClicked: "app_login_clicked",
  externalLinkClicked: "external_link_clicked",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];
