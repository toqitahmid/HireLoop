import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1Tv9YB2N1XPXC4X3R0N6riH7",
  seeker_premium: "price_1TvCcC2N1XPXC4X3qcKNLP0o",
  recruiter_growth: "price_1TvCek2N1XPXC4X3rBAFQh55",
  recruiter_enterprise: "price_1TvChE2N1XPXC4X3pf5zKv2O",
};