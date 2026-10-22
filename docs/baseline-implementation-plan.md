# Milestone A: Baseline Implementation Plan

- **Project**: Octis Website Reconstruction & Enhancement
- **Target URL**: [https://octis.in/](https://octis.in/)
- **Document Version**: 1.0 (Phase 3 Deliverable)
- **Status**: Approved Strategy & Architecture Specification
- **Milestone Scope**: Milestone A (Public Marketing Website Baseline Replica)

---

## 1. Executive Summary & Strategy Selection

The objective of Milestone A is to reconstruct the publicly accessible Octis website with pixel-accurate visual fidelity, exact responsive behavior across Desktop, Tablet, and Mobile viewports, and clean, maintainable modular code.

### Strategy Evaluation Summary

| Candidate Strategy | Runtime & Engine | Node.js Compatibility | API Keys / Costs | Asset Reuse | Visual Fidelity & Maintainability | Selected? |
|---|---|---|---|---|---|---|
| **Option A: Cloning Template (`JCodesMore/ai-website-cloner-template`)** | Next.js 16, React 19, shadcn/ui | **Incompatible** (Requires **Node.js 24+**; system has Node `v22.23.2`) | None | Manual mapping required | High risk of engine failure (`EBADENGINE`) and agent tool lock-in | **REJECTED** |
| **Option B: Direct Native Component Reconstruction (Next.js 15 App Router + Tailwind CSS v4)** | Next.js 15, React 19, TypeScript strict | **100% Compatible** (Node `v22.23.2` is native LTS tier) | **None** (100% local) | **Native direct reuse** of verified assets and CSS tokens | **Maximum fidelity**: Uses exact live DOM structure, CSS tokens, and extracted data | **SELECTED (PRIMARY)** |
| **Option C: Screenshot-to-Code / AI Vision Cloner** | Python backend, Docker, Vite frontend | Complex setup, high dependency risk | **Requires paid OpenAI/Anthropic API keys** | Fails (generates hallucinated approximations) | Low maintainability; produces brittle single-file approximations | **REJECTED** |

**Fallback Plan**: If any Next.js 15 App Router packaging constraint emerges during build, Vite 6 + React 19 + Tailwind CSS v4 will serve as the immediate, zero-friction client-side static fallback.

---

## 2. Chosen Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router with Static Site Generation / `output: 'export'`)
- **Language**: TypeScript 5.x (Strict mode enabled)
- **Styling**: Tailwind CSS v4 configured with the exact design tokens from `reference/design-tokens.md`
- **Typography**: `next/font/google` loading:
  - Heading: `Playfair Display` (serif, weights: 400, 600, 700)
  - Body: `Inter` (sans-serif, weights: 400, 500, 600, 700)
- **Icons**: `lucide-react` for exact SVG icon vectors matching the live site
- **Accordion Primitives**: `@radix-ui/react-accordion` (matching live Radix UI implementation)
- **Package Manager**: `npm` (v10.9.8)

---

## 3. Proposed Workspace & Component Structure

```text
octis redesign/
├── docs/                                # Project documentation & logs
│   ├── environment-audit.md
│   ├── live-site-reconnaissance.md
│   ├── baseline-implementation-plan.md
│   └── implementation-log.md
├── reference/                           # Verified evidence & reference pack
│   ├── assets/                          # Verified downloaded live assets
│   ├── screenshots/                     # 9 rendered multi-viewport captures
│   ├── design-tokens.md
│   └── REFERENCE_MANIFEST.md
├── public/                              # Application public assets
│   ├── logo.png                         # Verified brand logo (3660x1428)
│   ├── favicon.svg                      # Scalable SVG tab icon
│   ├── apple-touch-icon.png             # Mobile touch icon
│   ├── hero-product.png                 # Hero floating product mockup
│   ├── pos-mockup.png                   # POS feature mockup
│   └── inventory-mockup.png             # Inventory feature mockup
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # HTML shell, metadata, Google Fonts, OpenGraph
│   │   ├── page.tsx                     # Main landing page assembling all 10 sections
│   │   └── globals.css                  # Tailwind v4 theme, HSL CSS variables, animations
│   ├── components/
│   │   ├── Navbar.tsx                   # Header, logo, desktop nav, CTAs, mobile drawer
│   │   ├── Hero.tsx                     # Pill badge, H1 headline, subtitle, CTAs, metrics bar, mockup
│   │   ├── Features.tsx                 # Core features grid (6 cards with Lucide icons)
│   │   ├── SpotlightPos.tsx             # POS spotlight with benefit checklist & pos-mockup.png
│   │   ├── SpotlightInventory.tsx       # Inventory spotlight with HUID purity bullets & inventory-mockup.png
│   │   ├── Compliance.tsx               # Indian regulatory dark panel (BIS, IT Act, PMLA)
│   │   ├── Pricing.tsx                  # 3 pricing tiers (Starter, Professional featured, Enterprise)
│   │   ├── Faq.tsx                      # 8-item Radix UI accordion with verbatim Q&A
│   │   ├── CtaBanner.tsx                # Bottom conversion banner with Request Demo & Call Sales
│   │   └── Footer.tsx                   # Footer branding, links, contact numbers, copyright
│   └── lib/
│       ├── data.ts                      # Static content arrays (features, compliance, pricing, faqs, stats)
│       └── utils.ts                     # Tailwind class merging utility (`cn`)
├── package.json
├── tsconfig.json
├── next.config.ts
└── .gitignore
```

---

## 4. Section-to-Component Mapping Matrix

Each section observed on the live website maps to an isolated, maintainable component containing verified verbatim copy:

| # | Live Website Section | Component Path | Source Copy / Evidence Reference | Key Visual Elements |
|---|---|---|---|---|
| 1 | **Header & Navigation** | `src/components/Navbar.tsx` | `reference/REFERENCE_MANIFEST.md` § 4 | Sticky glass navbar (`.landing-nav`), logo link, navigation anchors (`#features`, `#inventory`, `#compliance`, `#pricing`), "Sign In" (`/login`), "Request Demo" (`#cta`), hamburger drawer. |
| 2 | **Hero Section** | `src/components/Hero.tsx` | `docs/live-site-reconnaissance.md` § 2.2 | Pill badge (`.luxury-gold-shimmer`), `H1` ("Grow your jewellery business with Octis."), subtitle, dual CTAs, live simulation card ("Today's Sales ₹4,85,200"), 4 stat cards, floating mockup frame (`hero-product.png`). |
| 3 | **Core Features Grid** | `src/components/Features.tsx` | `scratch/features_array.txt` | 6 feature cards: Lightning Fast POS, Intelligent Inventory, Live Metal Rate Sync, Customer Loyalty CRM, Karigar Management, Deep Analytics with Lucide icons. |
| 4 | **Spotlight: Point of Sale** | `src/components/SpotlightPos.tsx` | `docs/live-site-reconnaissance.md` § 2.4 | Two-column responsive split: H3 ("A Point of Sale that keeps the line moving"), body, 3 checkmark bullets (Old gold exchange, Split payments, WhatsApp invoices), `pos-mockup.png`. |
| 5 | **Spotlight: Inventory** | `src/components/SpotlightInventory.tsx` | `docs/live-site-reconnaissance.md` § 2.5 | Two-column responsive split (reversed): H3 ("Total visibility over your most valuable assets"), 3 checkmark bullets (HUID barcodes, Purity filtering, Stone vs net weight), `inventory-mockup.png`. |
| 6 | **Regulatory Compliance** | `src/components/Compliance.tsx` | `scratch/compliance_array.txt` | Dark gradient container (`.landing-section-dark`), gold badge ("Strictly Compliant"), 3 regulation cards: BIS Hallmarking & HUID, IT Act & KYC Rules (₹2L threshold), PMLA / FIU Reporting (₹10L threshold). |
| 7 | **Pricing Plans** | `src/components/Pricing.tsx` | `docs/live-site-reconnaissance.md` § 2.7 | 3 tiered pricing cards: Starter ("Custom / month"), Professional ("Popular" gold border, custom/mo), Enterprise ("Custom / month"), feature lists, "Contact for pricing" CTA buttons (`#cta`). |
| 8 | **FAQ Accordion** | `src/components/Faq.tsx` | `scratch/all_faqs.txt` (8 items) | Radix UI collapsible accordion, animated chevron icons, verified answers for HUID, gold schemes, multi-branch, GST, onboarding, old gold exchange. |
| 9 | **Final CTA Banner** | `src/components/CtaBanner.tsx` | `docs/live-site-reconnaissance.md` § 2.9 | Luxury gradient container (`.landing-cta-panel`), H2 ("Ready to transform your showroom?"), primary "Request a Demo" button (`mailto:demo@octis.in`), secondary "Call Sales" (`tel:+917396029339`), trust badge. |
| 10 | **Footer** | `src/components/Footer.tsx` | `docs/live-site-reconnaissance.md` § 2.10 | Multi-column footer: logo + description, Product links, Resources links, Contact details (+91 7396 029 339, hello@octis.in), copyright line ("© 2026 Octis Technologies. All rights reserved."). |

---

## 5. Asset Mapping & Verification

| Live Source Path | Local Project Path | Resolution / Format | Component Consumer |
|---|---|---|---|
| `/logo.png` | `public/logo.png` | 3660 × 1428 px PNG | `Navbar.tsx`, `Footer.tsx` |
| `/favicon.svg` | `public/favicon.svg` | Scalable Vector SVG | `app/layout.tsx` (`<link rel="icon">`) |
| `/apple-touch-icon.png` | `public/apple-touch-icon.png` | 180 × 180 px PNG | `app/layout.tsx` (`<link rel="apple-touch-icon">`) |
| `/landing/hero-product.png` | `public/hero-product.png` | 1536 × 1024 px PNG | `Hero.tsx` |
| `/landing/pos-mockup.png` | `public/pos-mockup.png` | 1585 × 846 px PNG | `SpotlightPos.tsx` |
| `/landing/inventory-mockup.png` | `public/inventory-mockup.png` | 1582 × 857 px PNG | `SpotlightInventory.tsx` |

*All assets are verified in `reference/assets/` and will be copied directly to `public/`.*

---

## 6. Responsive Layout & Breakpoint Strategy

The implementation adheres to Tailwind CSS standard responsive breakpoints, verified against the captured screenshots:

| Breakpoint | Target Width Range | Layout Adaptation Rules |
|---|---|---|
| **Mobile (`< 640px`)** | Target: 390 × 844 px | - Header collapses to logo + hamburger toggle button.<br>- Hero CTAs stack vertically (`w-full`).<br>- Stat cards stack in 2x2 grid or single column.<br>- Feature and compliance grids collapse to 1 column.<br>- Spotlight sections stack text above mockups.<br>- Pricing cards stack vertically (Starter -> Professional -> Enterprise).<br>- Padding reduced (`px-4 py-8`). |
| **Tablet (`640px - 1023px`)** | Target: 768 × 1024 px | - Header shows condensed navigation or hamburger drawer depending on width.<br>- Stat metrics arrange in a 2x2 or 4x1 grid.<br>- Feature cards arrange in 2-column grid.<br>- Spotlight sections adjust column widths with preserved side-by-side layout.<br>- Pricing cards display in responsive wrap or 3-column tight cards. |
| **Desktop (`≥ 1024px`)** | Target: 1440 × 900 px (up to 1920px) | - Full horizontal navigation with right-aligned CTAs ("Sign In" and "Request Demo").<br>- Container max width constrained to `max-w-7xl` (1280px) with centered auto-margins.<br>- 3-column feature grid.<br>- 3-column compliance card grid.<br>- 3-column side-by-side pricing matrix.<br>- Generous vertical rhythm (`py-24`). |

---

## 7. Interactive Behaviors & State Specifications

1. **Mobile Navigation Drawer**:
   - Triggered by hamburger icon in `Navbar.tsx`.
   - Smooth slide-down or overlay transition with backdrop blur (`backdrop-blur-md`).
   - Links automatically close drawer upon click and initiate smooth scroll to the target section.
   - Body scroll locked when drawer is active.
2. **Smooth Anchor Scrolling**:
   - Enabled via CSS `scroll-smooth` on `html` and standard header offset compensation (`scroll-mt-24`).
3. **Radix UI FAQ Accordion**:
   - Collapsible accordion with single-expanded mode (`type="single" collapsible`).
   - First question expanded by default on initial page load (matching live SSR state).
   - Smooth height transition (`transition-all duration-200 ease-out`).
4. **Action Links & External Routes**:
   - Sign In: Links to `/login` (entry to ERP).
   - Request Demo: Anchors to `#cta` or opens email client (`mailto:demo@octis.in`).
   - Call Sales: Direct telephone dialer trigger (`tel:+917396029339`).

---

## 8. Screenshot-Based Validation Plan

During Phase 4 (Milestone A Verification), the rendered application will be verified against the 9 reference screenshots:

| Reference Screenshot | Verification Gate |
|---|---|
| `reference/screenshots/desktop_1440_initial.png` | Verify navbar positioning, gold badge, headline, and top-fold alignment at 1440px desktop. |
| `reference/screenshots/desktop_1440_hero.png` | Verify stat card values, button typography, and hero product frame glow. |
| `reference/screenshots/desktop_1440_pricing.png` | Verify 3-column card alignment, "Popular" gold border on Professional plan, and checkmarks. |
| `reference/screenshots/desktop_1440_faq_expanded.png` | Verify FAQ question 1 answer typography, padding, and chevron rotation. |
| `reference/screenshots/tablet_768_hero.png` | Verify tablet header layout and hero responsive text wrapping at 768px. |
| `reference/screenshots/tablet_768_fullpage.png` | Verify full-page vertical flow, spacing, and grid transitions at 768px. |
| `reference/screenshots/mobile_390_hero.png` | Verify mobile hamburger button, full-width CTAs, and headline scale at 390px. |
| `reference/screenshots/mobile_390_fullpage.png` | Verify mobile single-column stacking and touch margins at 390px. |
| `reference/screenshots/mobile_390_nav_open.png` | Verify mobile drawer open state, link list, and button hierarchy. |

---

## 9. Git Baseline & Recovery Plan

1. **Current Status**: No Git repository currently exists in `c:\Users\srika\OneDrive\Desktop\octis redesign`.
2. **Initialization Protocol** (Executed at beginning of scaffolding):
   ```bash
   git init
   git branch -M main
   ```
3. **Commit Hierarchy**:
   - **Commit 1**: `chore: reference pack, documentation, and reconnaissance baseline` (Preserves all Phase 0–3 work).
   - **Commit 2**: `chore: initialize Next.js 15 application scaffold with Tailwind CSS v4` (Scaffolding checkpoint).
   - **Commit 3**: `feat: implement complete Milestone A baseline replica` (Tagged `v1.0.0-baseline`).
4. **Branching Strategy for Milestone B**:
   - `main`: Locked to `v1.0.0-baseline` until Milestone B passes final QA.
   - `feature/milestone-b-enhancements`: Branch where developer blueprint audit changes are applied.
   - If an enhancement breaks baseline behavior, immediate rollback to `v1.0.0-baseline` is guaranteed.

---

## 10. Sequential Order of Implementation (Phase 4 Execution)

The implementation must proceed strictly in this sequence:

1. **Git Initialization & Baseline Commit**:
   - Initialize Git and commit reference artifacts, manifests, and documentation.
2. **Project Scaffolding**:
   - Create Next.js 15 App Router skeleton with TypeScript and Tailwind CSS v4.
   - Populate `public/` with the 6 verified assets from `reference/assets/`.
   - Install required dependencies (`lucide-react`, `@radix-ui/react-accordion`, `clsx`, `tailwind-merge`).
3. **Global Tokens & Theme Setup**:
   - Configure `globals.css` with exact HSL variables and custom utilities from `reference/design-tokens.md`.
   - Set up `app/layout.tsx` with Google Fonts (`Inter`, `Playfair Display`) and SEO metadata.
4. **Header & Navigation (`Navbar.tsx`)**:
   - Implement logo, desktop links, CTA buttons, and mobile drawer.
5. **Hero Section (`Hero.tsx`)**:
   - Implement pill badge, headline, CTAs, live simulation card, 4 metrics cards, and hero product mockup frame.
6. **Core Features Grid (`Features.tsx`)**:
   - Implement section heading and 6 feature cards with Lucide icons.
7. **Spotlight Sections (`SpotlightPos.tsx` & `SpotlightInventory.tsx`)**:
   - Implement POS spotlight with `pos-mockup.png`.
   - Implement Inventory spotlight with `inventory-mockup.png`.
8. **Compliance Section (`Compliance.tsx`)**:
   - Implement dark gradient container and 3 Indian regulatory cards.
9. **Pricing Section (`Pricing.tsx`)**:
   - Implement 3 tiered pricing cards with feature matrices and CTAs.
10. **FAQ Accordion (`Faq.tsx`)**:
    - Implement 8 Q&A items using Radix UI accordion.
11. **CTA Banner & Footer (`CtaBanner.tsx` & `Footer.tsx`)**:
    - Implement conversion panel and multi-column footer.
12. **Responsive Polish & Build Check**:
    - Validate across Desktop (1440px), Tablet (768px), and Mobile (390px).
    - Run `npm run build` to verify zero static generation or type errors.
13. **Visual Regression Verification**:
    - Validate against all 9 reference screenshots.

---

## 11. Definition of Done (Milestone A Baseline Gate)

Milestone A passes and is ready for the Baseline Gate when:
- [ ] All 10 components exist, compile cleanly, and render in exact observed order.
- [ ] 100% of copy matches `docs/live-site-reconnaissance.md` verbatim.
- [ ] All 6 official media assets are properly loaded from `public/`.
- [ ] Zero missing styles, broken layouts, or unhandled responsive edge cases.
- [ ] Mobile navigation opens, closes, and navigates properly.
- [ ] FAQ accordion toggles correctly.
- [ ] Production build (`npm run build`) exits with code `0`.
- [ ] Visual side-by-side comparison with reference screenshots confirms high visual fidelity.
- [ ] Baseline is tagged `v1.0.0-baseline` in Git.

---

## 12. Separation of Milestone B (Developer Blueprint)

Under strict project governance:
- **No developer blueprint changes will be made during Milestone A**.
- `OCTIS_UIUX_Complete_Audit_and_Fix_Blueprint.docx` contains an audit of the private authenticated ERP system (`/dashboard`, `/sales`, `/inventory`).
- Marketing copy, public pricing plans, and public CTAs will remain pristine during Milestone A.
- Milestone B will be planned and executed only after Milestone A achieves formal sign-off.
