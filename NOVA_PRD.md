# Nova-FLOW: PRD FORMAT

**# Nova Flow — Product Requirements Document (PRD)**

- ***Version:**** 1.0
- ***Status:**** Draft
- ***Owner:**** Vishnu
- ***Last Updated:**** August 17, 2026

**## 1. Executive Summary**

Nova Flow is a portfolio-based web platform that allows individuals and small sellers to showcase products, track performance analytics, and share a clean, personalized gallery link (`novaflow.com/username`). It combines a private analytics dashboard with a public-facing storefront-style gallery, laying the groundwork for future in-platform payments via Flutterwave.

**## 2. Problem Statement**

Independent sellers, makers, and creators often lack a lightweight way to present their product catalog professionally without building a full e-commerce site. They need:

- A simple, branded public page to share their work.
- Basic analytics to understand traffic and sales performance.
- A dashboard that doesn't require technical setup.

Nova Flow solves this by giving every user a dashboard + a public gallery under one clean username-based URL.

**## 3. Goals & Objectives**

| Goal | Description |

| Fast onboarding | Users can sign up, set a username, and publish a gallery in minutes |

| Actionable insights | Users see visitors, sales, and top products at a glance |

| Shareable identity | Every user gets a clean, public, brandable link |

| Scalable foundation | Architecture supports future payments and admin oversight |

**### Out of Scope (Phase 1–3)**

- Live payment processing (reserved for Phase 4)
- Multi-currency support
- Team/collaborator accounts

**## 4. Target Users**

- ***Primary:**** Independent sellers/makers (e.g., product-based small businesses, artisans, digital creators) who want a shareable catalog.
- ***Secondary:**** Platform administrators who need visibility into overall platform health.

**## 5. Tech Stack**

| Layer | Technology |

| Backend Framework | Laravel (hosted on Laravel Cloud) |

| Frontend | React (Laravel React Starter Kit) |

| Database | PostgreSQL |

| Future Payments | Flutterwave API |

**## 6. Core Features**

**### 6.1 overview dashboard** 

- ***Authentication:**** Standard login/logout flow.
- ***Theming:**** Full light/dark mode support, persisted per user (`theme` field on `users` table).
- ***Analytics Widgets:****

- Sales progress — Pie chart

- Most sold products — Histogram/bar chart

- Daily visitors & milestone tracking

**### 6.2 Product Management**

- ***Fields:**** Name, Price, Images, Availability (in stock/out of stock), Description.
- ***Categories:**** Users define their own custom categories and assign products to them.
- Full CRUD (Create, Read, Update, Delete) for both products and categories.

**### 6.3 Public Product Gallery**

- Clean, shareable public URL per user: `novaflow.com/username`.
- Displays all ***active**** products, grouped by category, with pricing.
- No login required to view.
- ***Future phase:**** In-gallery checkout via Flutterwave.

**### 6.4 Super Admin Panel**

- Platform-wide health monitoring.
- Global user count, visitor metrics, and usage trends.
- Not visible to standard users; role-gated.

**## 7. Design System**

Nova Flow uses a calm, nature-inspired palette (mint/emerald tones) paired with a strong royal-blue accent for data visualization and primary actions. Both light and dark modes are first-class citizens of the design system, not an afterthought.

**### 7.1 Light Mode**

- ***Primary Colors****

| Token | Hex | Usage |

| Background (Canvas) | `#F4F7F5` | Very light cool gray/mint |

| Card / Surface | `#FFFFFF` | Pure white |

| Sidebar Background | `#EAF4EE` | Soft pastel mint green |

| Primary Text | `#111827` | Dark charcoal |

| Secondary/Muted Text | `#6B7280` | Cool gray |

- ***Secondary Colors****

| Token | Hex | Usage |

| Accent / Primary Action | `#0F52BA` | Royal blue — line graphs, active sidebar |

| Active Item Highlight | `#E8F0FE` | Soft blue tint, active sidebar bg |

| Primary Green (Gauge/Goal) | `#1E5128` | Deep forest green |

| Secondary Green (Badge) | `#D8EFE2` | Soft sage green |

- ***Extra Colors****

| Token | Hex | Usage |

|---|---|---|

| Borders / Dividers | `#E5E7EB` | Light gray |

| Bar Chart (Prod A & B) | `#1E5288` | Medium slate blue |

| Bar Chart (Prod C) | `#C2D6C8` | Muted sage gray |

| Negative / Alert Text | `#DC2626` | Muted red, e.g. -2.1% indicator |

**### 7.2 Dark Mode**

- ***Primary Colors****

| Token | Hex | Usage |

|---|---|---|

| Background (Canvas) | `#0F1715` | Very dark emerald gray |

| Card / Surface | `#15221F` | Dark slate green |

| Sidebar Background | `#121C1A` | Deep dark green-gray |

| Primary Text | `#F9FAFB` | Off-white |

| Secondary/Muted Text | `#8C9B96` | Muted greenish-gray |

- ***Secondary Colors****

| Token | Hex | Usage |

|---|---|---|

| Primary Action Blue | `#3B82F6` | Bright electric blue — primary button, donut chart |

| Active Item Highlight | `#213242` | Dark blue-gray overlay |

| Primary Accent Green | `#2D6A4F` | Emerald — top product bar highlight |

| Badge Green (Positive) | `#1A382B` | Background for +12.4% style badges |

| Badge Text Green | `#4ADE80` | Vibrant light green text |

- ***Extra Colors****

| Token | Hex | Usage |

|---|---|---|

| Borders / Dividers | `#1E2D29` | Subtle dark green-gray |

| Inactive / Muted Bar Chart | `#263B36` | Dark muted green-blue |

| Quick Action Card Bg | `#1A2825` | Elevated dark surface |

| Donut Chart Base | `#1B2B28` | Base segment background |

**### 7.3 CSS Variable Reference**

```css

/* Light Mode */

:root [data-theme="light"] {

--bg-main: #F4F7F5;

--bg-surface: #FFFFFF;

--bg-sidebar: #EAF4EE;

--text-primary: #111827;

--text-secondary: #6B7280;

--accent-blue: #0F52BA;

--accent-green: #1E5128;

--border: #E5E7EB;

}

/* Dark Mode */

:root [data-theme="dark"] {

--bg-main: #0F1715;

--bg-surface: #15221F;

--bg-sidebar: #121C1A;

--text-primary: #F9FAFB;

--text-secondary: #8C9B96;

--accent-blue: #3B82F6;

--accent-green: #2D6A4F;

--border: #1E2D29;

}

```

**### 7.4 Design Principles**

1. ****Calm, data-forward UI**** — mint/emerald surfaces keep dashboards from feeling clinical; blue accents draw the eye to key actions and metrics.

2. ****Consistent elevation**** — cards sit clearly above canvas background in both modes via subtle contrast, not heavy shadows.

3. ****Status color discipline**** — green = positive/growth, red = negative/alert, blue = primary action only. Don't mix semantic meaning.

4. ****Theme parity**** — every component must be designed and tested in both light and dark mode before shipping.

5. ****Charts as first-class citizens**** — pie, histogram, bar, and donut charts follow the defined chart-specific color tokens, not ad hoc colors.

- **--**

**## 8. Database Schema (PostgreSQL)**

| Table | Key Fields |

|---|---|

| ****Users**** | `id`, `name`, `username` (unique), `email`, `password`, `theme`, `created_at` |

| ****Categories**** | `id`, `user_id`, `name` |

| ****Products**** | `id`, `user_id`, `category_id`, `name`, `description`, `price`, `availability`, `image_url` |

| ****Analytics**** | `id`, `user_id`, `product_id` (nullable), `metric_type` (visitor / view / sale), `date` |

| ****Sales**** **(Phase 4)** | `id`, `product_id`, `user_id`, `amount`, `status`, `transaction_ref` |

- ***Relationships:****
- A `User` has many `Categories` and `Products`.
- A `Product` belongs to one `Category` and one `User`.
- `Analytics` records are scoped to a `User`, optionally tied to a specific `Product`.
- `Sales` (future) ties a transaction to both a `Product` and the owning `User`.
- **--**

**## 9. Roadmap & Milestones**

**### Phase 1 — Foundation & Auth ✅** **Complete**

- Set up Laravel Cloud & PostgreSQL
- Initialize React Starter Kit
- Implement authentication (login/logout)
- Implement light/dark mode toggle

**### Phase 2 — Products & Public Gallery**

- Build Category & Product CRUD forms
- Set up dynamic public routing (`/username`)
- Build the Public Product Gallery view

**### Phase 3 — Analytics & Super Admin**

- Build analytics tracking (page views, daily visitors)
- Build User Dashboard charts (pie & histogram)
- Build Super Admin dashboard for global monitoring

**### Phase 4 — Payments**

- Integrate Flutterwave API
- Implement checkout flow on public galleries
- **--**

**## 10. Success Metrics**

| Metric | Target (Post-Launch) |

|---|---|

| Time to first published gallery | < 10 minutes from signup |

| Dashboard load time | < 1.5s |

| % users who add ≥1 product in first session | > 60% |

| Public gallery page load | < 2s |

- **--**

**## 11. Risks & Open Questions**

- ***Image storage:**** Confirm hosting strategy for product images (S3-compatible bucket vs. Laravel Cloud storage).
- ***Username collisions & reserved words:**** Need validation rules (e.g., block `admin`, `api`, `dashboard` as usernames).
- ***Flutterwave integration timing:**** Confirm whether Phase 4 requires KYC/compliance steps that should start earlier.
-