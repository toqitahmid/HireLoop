
'use client';

import React, { useState } from "react";
import { Tabs, Card, Button, Chip, Accordion } from "@heroui/react";
import { Check, Users, Briefcase, ArrowRight } from "lucide-react";



const SIDES = {
  seekers: {
    label: "For Job Seekers",
    icon: Users,
    accent: "#F5B94A",
    accentSoft: "rgba(245, 185, 74, 0.12)",
    accentText: "#FBD98C",
    plans: [
      {
        name: "Free",
        id: "seeker_free",
        price: "0",
        cadence: "forever",
        tagline: "Get your search off the ground.",
        features: [
          "Browse & save up to 10 jobs",
          "Apply to up to 3 jobs per month",
          "Basic profile",
          "Email alerts",
        ],
        cta: "Start free",
        featured: false,
      },
      {
        name: "Pro",
        id: "seeker_pro",
        price: "19",
        cadence: "/month",
        tagline: "For an active, focused search.",
        features: [
          "Apply to up to 30 jobs per month",
          "Unlimited saved jobs",
          "Application tracking",
          "Salary insights",
        ],
        cta: "Go Pro",
        featured: true,
      },
      {
        name: "Premium",
        id: "seeker_premium",
        price: "39",
        cadence: "/month",
        tagline: "Everything, with no ceiling.",
        features: [
          "Everything in Pro",
          "Unlimited applications",
          "Profile boost to recruiters",
          "Early access to new jobs",
          "Priority support",
        ],
        cta: "Go Premium",
        featured: false,
      },
    ],
  },
  recruiters: {
    label: "For Recruiters",
    icon: Briefcase,
    accent: "#4FD1C5",
    accentSoft: "rgba(79, 209, 197, 0.12)",
    accentText: "#8FE6DC",
    plans: [
      {
        name: "Free",
        id: "recruiter_free",
        price: "0",
        cadence: "forever",
        tagline: "Great for a company's first year of hiring.",
        features: [
          "Up to 3 active job posts",
          "Basic applicant management",
          "Standard listing visibility",
        ],
        cta: "Start free",
        featured: false,
      },
      {
        name: "Growth",
        id: "recruiter_growth",
        price: "49",
        cadence: "/month",
        tagline: "For teams hiring on a regular cadence.",
        features: [
          "Up to 10 active job posts",
          "Applicant tracking",
          "Basic analytics",
          "Email support",
        ],
        cta: "Start Growth",
        featured: true,
      },
      {
        name: "Enterprise",
        id: "recruiter_enterprise",
        price: "149",
        cadence: "/month",
        tagline: "For high-volume, brand-forward hiring.",
        features: [
          "Up to 50 active job posts",
          "Advanced analytics dashboard",
          "Featured job listings",
          "Team collaboration",
          "Custom branding",
          "Priority support",
        ],
        cta: "Contact sales",
        featured: false,
      },
    ],
  },
};

const FAQS = [
  {
    id: "cancel",
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from Account → Billing whenever you like. You'll keep full access through the end of your current billing period — no forms, no calls.",
  },
  {
    id: "refunds",
    question: "What's your refund policy?",
    answer:
      "Any paid upgrade is fully refundable within 7 days. After that window, we don't pro-rate unused time, but you're always free to downgrade or cancel going forward.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "All major credit and debit cards, plus PayPal for monthly plans. Enterprise recruiters can also pay by invoice — just ask your account contact.",
  },
  {
    id: "switching",
    question: "Can I switch plans later?",
    answer:
      "Absolutely. Upgrades take effect immediately so you get new limits right away. Downgrades take effect at the start of your next billing cycle.",
  },
];


function PlanCard({ plan}) {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
  return (
    <Card
      className={[
        "relative flex flex-col rounded-2xl border bg-[#12151C] transition-transform duration-300",
        plan.featured
          ? "border-[var(--accent)]/60 md:-translate-y-3 shadow-[0_0_0_1px_var(--accent),0_20px_50px_-20px_var(--accent-soft)]"
          : "border-white/10 hover:border-white/20",
      ].join(" ")}
    >
      {plan.featured && (
        <Chip
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-[#12151C] font-semibold tracking-wide text-[11px] uppercase px-3"
          size="sm"
        >
          Most popular
        </Chip>
      )}

      <Card.Header className="flex flex-col gap-1 px-6 pt-8 pb-0">
        <span className="font-['Space_Grotesk'] text-xl font-bold text-white">
          {plan.name}
        </span>
        <span className="text-sm text-white/50">{plan.tagline}</span>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col gap-6 px-6 pt-5 pb-6">
        {/* Ledger-style price line */}
        <div
          className="flex items-baseline gap-1 border-b border-dashed border-white/15 pb-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 21px, rgba(255,255,255,0.035) 22px)",
          }}
        >
          <span className="font-['JetBrains_Mono'] text-sm text-white/40">
            $
          </span>
          <span className="font-['JetBrains_Mono'] text-5xl font-bold text-white">
            {plan.price}
          </span>
          <span className="font-['JetBrains_Mono'] text-sm text-white/40">
            {plan.cadence}
          </span>
        </div>

        <ul className="flex flex-1 flex-col gap-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-white/80"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
                strokeWidth={2.5}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card.Content>

      <Card.Footer className="px-6 pb-8 pt-0">
            <Button
            onClick={handleCheckout}
              type="button"
              className={[
                "w-[80vw] sm:w-[20vw] lg:w-[13vw] flex justify-center rounded-xl font-semibold",
                plan.featured
                  ? "bg-[var(--accent)] text-[#12151C] hover:brightness-95"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10",
              ].join(" ")}
            >
              {plan.cta}
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
        {/* <Button
          className={[
            "w-full justify-center rounded-xl font-semibold",
            plan.featured
              ? "bg-[var(--accent)] text-[#12151C] hover:brightness-95"
              : "bg-white/5 text-white hover:bg-white/10 border border-white/10",
          ].join(" ")}
        >
          {plan.cta}
          <ArrowRight className="ml-1.5 size-4" />
        </Button> */}
      </Card.Footer>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PricingPage() {
  const [side, setSide] = useState("seekers");
  const theme = SIDES[side];

  return (
    <div
      className="min-h-screen bg-[#0B0D12] text-white transition-colors duration-500"
      style={{
        "--accent": theme.accent,
        "--accent-soft": theme.accentSoft,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--accent)" }}
          >
            Pricing
          </span>
          <h1 className="mt-4 font-['Space_Grotesk'] text-4xl font-bold leading-tight sm:text-5xl">
            One board. Two sides of the desk.
          </h1>
          <p className="mt-4 text-white/55">
            Whether youre chasing your next role or trying to fill one, pick
            the side thats yours — pricing adjusts to match.
          </p>
        </div>

        {/* Side toggle */}
        <div className="mt-12 flex justify-center">
          <Tabs
            selectedKey={side}
            onSelectionChange={(key) => setSide(String(key))}
            className="w-full max-w-md"
          >
            <Tabs.ListContainer className="rounded-full border border-white/10 bg-white/[0.03] p-1">
              <Tabs.List
                aria-label="Choose your side of the desk"
                className="grid grid-cols-2 gap-1"
              >
                {Object.entries(SIDES).map(([key, s]) => {
                  const Icon = s.icon;
                  return (
                    <Tabs.Tab
                      key={key}
                      id={key}
                      className="relative flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/60 outline-none data-[selected=true]:text-[#0B0D12]"
                    >
                      <Icon className="size-4" />
                      {s.label}
                      <Tabs.Indicator
                        className="rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>
            </Tabs.ListContainer>

            {Object.keys(SIDES).map((key) => (
              <Tabs.Panel key={key} id={key} />
            ))}
          </Tabs>
        </div>

        {/* Plan cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {theme.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} theme={theme} />
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-28 max-w-2xl">
          <h2 className="text-center font-['Space_Grotesk'] text-2xl font-bold">
            Frequently asked questions
          </h2>

          <Accordion className="mt-8 flex flex-col gap-3">
            {FAQS.map((faq) => (
              <Accordion.Item
                key={faq.id}
                id={faq.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5"
              >
                <Accordion.Heading>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-white/90">
                    {faq.question}
                    <Accordion.Indicator className="text-white/40" />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="pb-4 text-sm leading-relaxed text-white/55">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
