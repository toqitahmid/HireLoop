# HireLoop

**HireLoop** is a full-stack job portal platform that connects **Recruiters**, **Job Seekers**, and **Admins** in a secure, verified hiring ecosystem. Recruiters can register their companies, get verified by an admin, and post job openings. Job seekers can browse and apply to verified job listings. Admins oversee the platform by verifying companies, managing users, and monitoring job postings. Recruiters can unlock advanced features through subscription plans (**Active**, **Pro**, **Premium**) powered by **Stripe**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Subscription Plans](#subscription-plans)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Authentication Flow](#authentication-flow)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Database Schema (High-Level)](#database-schema-high-level)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 👤 Job Seeker
- Register/login with secure authentication (JWT + Better Auth)
- Build and edit personal profile / resume
- Browse verified job listings with filters (location, category, salary, job type)
- Apply to jobs and track application status
- Save/bookmark jobs for later
- View application history

### 🏢 Recruiter
- Register and verify company profile (submit company documents/details for admin approval)
- Create, edit, and manage job postings (only after company verification)
- View and manage applicants for each job posting
- Update applicant status (pending, shortlisted, rejected, hired)
- Subscribe to a plan (Active / Pro / Premium) via Stripe to unlock premium features
- Dashboard with analytics (views, applications received, active postings)

### 🛡️ Admin
- Review and verify/reject recruiter company registrations
- Monitor and moderate job postings
- Manage all users (job seekers & recruiters) — suspend/activate accounts
- View platform-wide statistics (total users, companies, jobs, subscriptions)
- Manage subscription plans and view Stripe payment records

### 💳 Subscriptions & Payments
- Stripe-powered checkout and billing
- Plan-based feature gating (job post limits, featured listings, analytics access, etc.)
- Webhook-based subscription status sync (active, canceled, past_due)

---

## Tech Stack

| Layer               | Technology                                  |
|----------------------|----------------------------------------------|
| Frontend             | Next.js (App Router), React, Tailwind CSS    |
| Backend              | Express.js (REST API)                        |
| Database             | MongoDB / PostgreSQL *(update based on your choice)* |
| Authentication       | JWT + Better Auth                            |
| Payments             | Stripe (Checkout, Subscriptions, Webhooks)    |
| State Management     | React Query / Zustand *(update as applicable)* |
| Validation           | Zod / Express-validator                       |
| API Communication    | REST API (Axios / Fetch)                      |
| Deployment           | Vercel (Frontend), Render/Railway/VPS (Backend) |

---

## User Roles

| Role         | Permissions                                                                 |
|--------------|-------------------------------------------------------------------------------|
| **Job Seeker** | Apply to jobs, manage profile, track applications                          |
| **Recruiter**  | Register company, post jobs (post-verification), manage applicants, subscribe to plans |
| **Admin**      | Verify companies, manage all users, moderate jobs, oversee subscriptions   |

---

## Subscription Plans

| Plan        | Target Users        | Example Benefits                                              |
|-------------|----------------------|------------------------------------------------------------------|
| **Active**  | New recruiters        | Limited job postings, basic dashboard access                     |
| **Pro**     | Growing companies      | Increased job posting limit, applicant analytics                 |
| **Premium** | Large-scale hiring     | Unlimited job postings, featured job listings, priority support, advanced analytics |

> Payments and subscription lifecycle (create, renew, cancel) are handled through **Stripe Checkout + Webhooks**.

---

## Project Architecture

```
┌─────────────────┐        REST API (JWT Auth)        ┌───────────────────┐
│   Next.js App     │ <-------------------------------> │   Express.js API    │
│ (Client / Server)  │                                  │  (Controllers,       │
│                    │                                  │   Routes, Middleware)│
└─────────────────┘                                    └────────┬──────────┘
                                                                  │
                                                     ┌────────────┴────────────┐
                                                     │        Database           │
                                                     │  (Users, Companies, Jobs, │
                                                     │  Applications, Subscriptions)│
                                                     └────────────┬────────────┘
                                                                  │
                                                          ┌───────┴───────┐
                                                          │     Stripe      │
                                                          │ (Plans/Webhooks)│
                                                          └────────────────┘
```

---

## Folder Structure

```
hireloop/
├── client/                      # Next.js frontend
│   ├── app/
│   │   ├── (auth)/              # Login, register, verify-email pages
│   │   ├── (seeker)/            # Job seeker dashboard & pages
│   │   ├── (recruiter)/         # Recruiter dashboard & pages
│   │   ├── (admin)/             # Admin dashboard & pages
│   │   └── api/                 # Next.js route handlers (if any)
│   ├── components/
│   ├── hooks/
│   ├── lib/                     # Better Auth config, API client
│   └── public/
│
├── server/                      # Express.js backend
│   ├── src/
│   │   ├── config/               # DB, Stripe, env config
│   │   ├── controllers/          # auth, company, job, application, admin, payment
│   │   ├── middlewares/          # auth (JWT), role-based access, error handler
│   │   ├── models/                # User, Company, Job, Application, Subscription
│   │   ├── routes/                # /api/auth, /api/companies, /api/jobs, etc.
│   │   ├── services/              # Business logic (Stripe service, email service)
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
│
├── .env.example
├── README.md
└── package.json
```

---

## Authentication Flow

1. **Registration** — Users sign up as either a Job Seeker or Recruiter.
2. **Better Auth** manages session/credential handling (email/password, optionally OAuth).
3. On successful login, the server issues a **JWT access token** (and optionally a refresh token) used to authorize subsequent REST API requests.
4. **Role-based middleware** on the Express API restricts routes:
   - `/api/recruiter/*` → Recruiter-only
   - `/api/admin/*` → Admin-only
   - `/api/seeker/*` → Job Seeker-only
5. **Company Verification Gate** — Recruiters cannot post jobs until their company is marked `verified` by an Admin.

---

## API Overview

> Base URL: `/api`

### Auth
| Method | Endpoint             | Description                     |
|--------|------------------------|--------------------------------|
| POST   | `/auth/register`         | Register a new user (seeker/recruiter) |
| POST   | `/auth/login`             | Login and receive JWT           |
| POST   | `/auth/refresh`           | Refresh access token            |
| POST   | `/auth/logout`            | Logout / invalidate session     |

### Company (Recruiter)
| Method | Endpoint                    | Description                       |
|--------|-------------------------------|-----------------------------------|
| POST   | `/companies`                    | Submit company for verification    |
| GET    | `/companies/:id`                | Get company details                |
| PUT    | `/companies/:id`                | Update company profile             |

### Jobs
| Method | Endpoint             | Description                          |
|--------|------------------------|---------------------------------------|
| POST   | `/jobs`                  | Create job posting (verified recruiters only) |
| GET    | `/jobs`                  | List/search/filter jobs               |
| GET    | `/jobs/:id`               | Get job details                       |
| PUT    | `/jobs/:id`               | Update job posting                    |
| DELETE | `/jobs/:id`               | Delete job posting                    |

### Applications
| Method | Endpoint                          | Description                     |
|--------|--------------------------------------|---------------------------------|
| POST   | `/jobs/:id/apply`                     | Apply to a job (job seeker)       |
| GET    | `/applications/me`                    | Get own applications (seeker)     |
| GET    | `/jobs/:id/applications`               | Get applicants for a job (recruiter) |
| PATCH  | `/applications/:id/status`             | Update applicant status (recruiter) |

### Admin
| Method | Endpoint                          | Description                       |
|--------|--------------------------------------|-------------------------------------|
| GET    | `/admin/companies/pending`             | List companies pending verification |
| PATCH  | `/admin/companies/:id/verify`          | Approve/reject company              |
| GET    | `/admin/users`                          | List/manage all users               |
| GET    | `/admin/stats`                          | Platform statistics                 |

### Payments / Subscriptions
| Method | Endpoint                       | Description                          |
|--------|-----------------------------------|---------------------------------------|
| POST   | `/payments/create-checkout-session` | Create Stripe Checkout session for a plan |
| POST   | `/payments/webhook`                  | Stripe webhook (subscription events)  |
| GET    | `/payments/subscription`             | Get current recruiter's subscription status |

---

## Environment Variables

Create a `.env` file in `server/` (and `client/` as needed):

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=your_database_connection_string

# JWT
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
STRIPE_PRICE_ID_ACTIVE=price_xxxxxxxxxxxx
STRIPE_PRICE_ID_PRO=price_xxxxxxxxxxxx
STRIPE_PRICE_ID_PREMIUM=price_xxxxxxxxxxxx

# Client
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn / pnpm
- MongoDB or PostgreSQL instance
- Stripe account (test mode keys)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/hireloop.git
cd hireloop
```

### 2. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` in both `server/` and `client/` and fill in the values described above.

### 4. Run database migrations (if applicable)
```bash
cd server
npm run migrate
```

### 5. Start development servers
```bash
# Backend (from /server)
npm run dev

# Frontend (from /client, in a separate terminal)
npm run dev
```

### 6. Stripe webhook (local testing)
```bash
stripe listen --forward-to localhost:5000/api/payments/webhook
```

The app should now be running at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

---

## Database Schema (High-Level)

**User**
- `id`, `name`, `email`, `password (hashed)`, `role (seeker | recruiter | admin)`, `createdAt`

**Company**
- `id`, `recruiterId`, `name`, `description`, `website`, `documents`, `verificationStatus (pending | verified | rejected)`

**Job**
- `id`, `companyId`, `title`, `description`, `location`, `type`, `salaryRange`, `status (open | closed)`, `createdAt`

**Application**
- `id`, `jobId`, `seekerId`, `resumeUrl`, `status (pending | shortlisted | rejected | hired)`, `appliedAt`

**Subscription**
- `id`, `recruiterId`, `plan (active | pro | premium)`, `stripeCustomerId`, `stripeSubscriptionId`, `status`, `currentPeriodEnd`

---

## Roadmap

- [ ] Email notifications (application status, verification updates)
- [ ] Resume parsing / AI-based job matching
- [ ] In-app messaging between recruiters and applicants
- [ ] Advanced search with Elasticsearch/Algolia
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## Contributing

Contributions are welcome! Please open an issue first to discuss any major changes.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

> **Note:** This README is a starting template based on the described project scope. Update the tech stack table (database choice, state management library), API routes, and schema fields to exactly match your implementation.
