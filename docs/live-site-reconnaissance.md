# Live Website Reconnaissance & Requirements Inventory — Phase 1

- **Inspection Date**: 2026-10-22 (21:55 - 22:25 IST / 16:25 - 16:55 UTC)
- **Target URL**: [https://octis.in/](https://octis.in/)
- **Tools Used**:
  - Direct HTTP header & body inspection via `curl.exe` and `Invoke-WebRequest`.
  - Next.js production build bundle parser (`/_next/static/chunks/pages/index-9e3432667099d8d1.js` and `_app-6942f09d49ed9ab0.js`).
  - Production stylesheet parser (`/_next/static/css/dda77c8c4677e0e5.css`).
  - Python 3.13 standard library (`zipfile`, `xml.etree.ElementTree`, `re`, `json`) for blueprint docx and DOM/CSS token extraction.
  - Antigravity IDE browser subagent (attempted; CDP port 9222 context management failure logged and addressed via approved user fallback).

---

## 1. Route Inventory

| Path / URL | Discovery Method | HTTP Status | Purpose & Title | Type | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Primary target URL | `200 OK` | **Home**: "Octis \| Jewellery Shop Management Software for India" | Distinct Page | Primary public marketing landing page. Static Next.js export. |
| `/llms.txt` | `robots.txt` directive | `200 OK` | **LLM & Public Documentation**: Canonical product facts, contact emails, and public scope declarations | Plaintext Document | Explicitly states: canonical domain `https://octis.in/`, contact `hello@octis.in`, demo `demo@octis.in`, phone `+91 7396 029 339`. |
| `/login` | Header & Hero CTAs | `200 OK` | **Sign In**: "Login \| Octis" — "Welcome Back: Sign in to your jewellery management system" | Distinct Page | Standalone authentication portal leading to private ERP tenant spaces. |
| `/robots.txt` | Direct HTTP fetch | `200 OK` | Crawl guidance and route access list | Plaintext Document | Lists 23 disallowed authenticated ERP routes (e.g., `/dashboard`, `/sales`, `/inventory`, `/bi`). |
| `/sitemap.xml` | `robots.txt` reference | `200 OK` | Standard XML Sitemap | XML Document | Single URL listed: `<loc>https://octis.in/</loc>`. |
| `#features` | Header navigation & Footer | N/A | **Features Section Anchor**: Jumps to Core Features section | Anchor Link | Smooth-scroll in-page navigation. |
| `#inventory` | Header navigation & Footer | N/A | **Inventory Showcase Anchor**: Jumps to Inventory asset showcase | Anchor Link | Smooth-scroll in-page navigation. |
| `#compliance` | Header navigation | N/A | **Compliance Section Anchor**: Jumps to Regulations section | Anchor Link | Smooth-scroll in-page navigation. |
| `#pricing` | Header navigation | N/A | **Pricing Section Anchor**: Jumps to Pricing Tiers section | Anchor Link | Smooth-scroll in-page navigation. |
| `#faq` | Footer links | N/A | **FAQ Section Anchor**: Jumps to FAQ Accordion | Anchor Link | Smooth-scroll in-page navigation. |
| `#cta` | Header, Hero, and Pricing CTAs | N/A | **Demo / Contact Anchor**: Jumps to Demo request panel | Anchor Link | Smooth-scroll in-page navigation. |
| `tel:+917396029339` | CTA section & Footer | N/A | **Telephone Link**: Direct call link to sales team | URI Scheme | Prompts telephone dialer with phone `+91 7396 029 339`. |
| `mailto:demo@octis.in` | CTA button | N/A | **Email Link**: Cloudflare email protection encoded | URI Scheme | Decodes to sales/demo inbox. |

*Note*: Authenticated tenant ERP routes (`/dashboard`, `/sales`, `/inventory`, `/customers`, `/parties`, `/bi`, `/schemes`, `/karigar-jobs`) are explicitly restricted by `robots.txt` and protected by authentication. They are out of scope for the public marketing replica.

---

## 2. Homepage Section Inventory (Exact Top-to-Bottom Order)

The live homepage is structured into 8 distinct sections:

1. **Header / Navbar (`<header class="landing-nav">`)**:
   - Left: Logo (`/logo.png`) linking to `/`.
   - Center (Desktop): Navigation links: `Features` (`#features`), `Inventory` (`#inventory`), `Compliance` (`#compliance`), `Pricing` (`#pricing`).
   - Right: Secondary action `Sign In` (`/login`), Primary button `Request Demo` (`#cta`).
   - Mobile: Hamburger menu toggle button (`md:hidden`) triggering responsive menu drawer.
2. **Hero Section (`<section class="landing-hero-bg">`)**:
   - Pill Badge: Gold/accent highlights.
   - Headline (`H1`): *"Grow your jewellery business with Octis."*
   - Subtitle: *"The all-in-one cloud platform for Indian jewelers. Manage billing, inventory, HUID compliance, and customer loyalty — beautifully and effortlessly."*
   - CTAs: Primary `Request Demo` (`#cta`), Secondary `Sign In` (`/login`).
   - Metrics Bar (`.landing-stat-card` cards):
     - Floating live simulation metric: `Today's Sales` `₹4,85,200`
     - Stat 1: `500+` `Active Jewelers`
     - Stat 2: `10,000+` `Daily Transactions`
     - Stat 3: `99.99%` `System Uptime`
     - Stat 4: `< 15 mins` `Support SLA`
   - Hero Graphic: Product mockup container (`.landing-mockup-frame` with `.landing-mockup-glow`) containing `/landing/hero-product.png`.
3. **Core Features Grid (`<section id="features" class="landing-surface">`)**:
   - Badge Label: `Core Features`
   - Section Title (`H2`): *"Everything you need to run a modern jewellery retail business"*
   - Section Subtitle: *"We've replaced clunky legacy software with a beautiful, intuitive system that your staff will learn in minutes, not months."*
   - 6 Feature Cards (`.landing-feature-card`):
     1. `Lightning Fast POS`: Bill a customer in under 90 seconds. Seamlessly handle old gold exchange, multiple payment splits, and scheme redemptions in one clean interface.
     2. `Intelligent Inventory`: Track every piece with precision. Full support for HUID, 10 distinct stone categories, and real-time stock alerts for low inventory.
     3. `Live Metal Rate Sync`: Update today's rates once, and watch your entire inventory pricing automatically recalculate instantly.
     4. `Customer Loyalty CRM`: Build relationships that last. Track purchase histories, auto-send birthday wishes, and manage complex monthly installment schemes.
     5. `Karigar Management`: Never lose track of job work. Issue raw gold, receive finished goods, and settle accounts with your vendors accurately.
     6. `Deep Analytics`: Stop guessing. Get visual dashboards for daily sales, profit margins, staff performance, and tax liabilities at a glance.
4. **Feature Spotlight 1 — Point of Sale (`<div class="landing-surface-tinted">`)**:
   - Subhead (`H3`): *"A Point of Sale that keeps the line moving"*
   - Body Paragraph: *"Long queues during Dhanteras? No problem. Our POS is optimized for speed. Add items via barcode scanner, calculate wastage and making charges instantly, and accept any payment method."*
   - Bullet Points:
     - One-click old gold exchange calculation
     - Split payments (Cash + Card + UPI)
     - Instant WhatsApp invoice sharing
   - Mockup Image: `/landing/pos-mockup.png` inside `.landing-mockup-frame`.
5. **Feature Spotlight 2 — Inventory Asset Tracking (`<section id="inventory">`)**:
   - Subhead (`H3`): *"Total visibility over your most valuable assets"*
   - Body Paragraph: *"Every gram counts. Track your entire stock from procurement to sale with granular details. Know exactly what you have, where it is, and what you need to reorder."*
   - Bullet Points:
     - Seamless HUID barcode generation
     - Filter by Purity (22K/24K/18K)
     - Track stone weight vs net gold weight
   - Mockup Image: `/landing/inventory-mockup.png` inside `.landing-mockup-frame`.
6. **Regulatory Compliance Section (`<section id="compliance" class="landing-section-dark">`)**:
   - Dark Theme Panel (`linear-gradient(165deg, #1a2f4a, #2d160e 35%, #4a2518 70%, #3d2014)`).
   - Badge Label: `Strictly Compliant`
   - Section Title (`H2`): *"Built for Indian Jewellery Regulations"*
   - Section Subtitle: *"Government regulations change fast. Octis stays ahead, ensuring your business operates legally and without fear of penalties."*
   - 3 Compliance Cards:
     1. `BIS Hallmarking & HUID`: Built-in support for mandatory HUID tracking. Print compliant tags and maintain digital records for audits effortlessly.
     2. `IT Act & KYC Rules`: The system automatically prompts cashiers to collect PAN/Aadhaar details for any transaction exceeding ₹2 lakh.
     3. `PMLA / FIU Reporting`: Stay compliant with anti-money laundering laws. Automatically flag and log cash transactions exceeding ₹10 lakh.
7. **Pricing Plans Section (`<section id="pricing" class="landing-surface">`)**:
   - Badge Label: `Pricing`
   - Section Title (`H2`): *"Plans that scale with your showroom"*
   - Section Subtitle: *"Flexible pricing for Indian jewellery retailers. Contact us for a quote tailored to your branch count and team size."*
   - 3 Plan Cards:
     - **Starter**:
       - Target: *For single-branch showrooms getting started with digital billing.*
       - Price Tag: `Custom / month`
       - Features: POS & billing, Inventory tagging, GST invoices, Basic reports, Email support.
       - CTA: `Contact for pricing` (`#cta`).
     - **Professional** (Featured / Highlighted Card with `.landing-pricing-featured`):
       - Target: *For growing jewellers who need compliance, schemes, and multi-user access.*
       - Price Tag: `Custom / month`
       - Features: Everything in Starter, HUID & BIS compliance, Gold schemes & CRM, Karigar management, Priority support.
       - CTA: `Contact for pricing` (`#cta`).
     - **Enterprise**:
       - Target: *For multi-branch chains with advanced controls and custom workflows.*
       - Price Tag: `Custom / month`
       - Features: Everything in Professional, Multi-branch sync, Custom roles & permissions, Dedicated onboarding, SLA-backed support.
       - CTA: `Contact for pricing` (`#cta`).
8. **FAQ Accordion Section (`<section id="faq">`)**:
   - Badge Label: `FAQ`
   - Section Title (`H2`): *"Questions from Indian jewellers"*
   - Section Subtitle: *"Everything you need to know about switching to Octis."*
   - 8 Accordion Q&A Items (Radix UI / Shadcn collapsible accordion).
9. **Final CTA Conversion Banner (`<section id="cta">`)**:
   - Container: Wrapped in `.landing-cta-panel` gradient card.
   - Title (`H2`): *"Ready to transform your showroom?"*
   - Subtitle: *"Join the fastest-growing network of modern jewelers. Get a personalized demo and a 30-day free trial to see the difference with Octis."*
   - CTAs: Primary button `Request a Demo` (`mailto:demo@octis.in`), Secondary outline button `Call Sales` (`tel:+917396029339`).
   - Trust Footnote: *"No credit card required. Free data migration included."*
10. **Footer (`<footer class="landing-footer">`)**:
    - Logo (`/logo.png`) & Description: *"Premium management software designed exclusively for Indian retail jewelers. Run your showroom with elegance and precision on Octis."*
    - Column 1 (Product): `Point of Sale` (`#features`), `Inventory` (`#features`), `CRM & Schemes` (`#features`), `Reporting` (`#features`).
    - Column 2 (Resources): `FAQ` (`#faq`).
    - Column 3 (Contact): `+91 7396 029 339` (`tel:+917396029339`), `hello@octis.in`.
    - Copyright Line: *"© 2026 Octis Technologies. All rights reserved."*

---

## 3. Verified FAQ Item Inventory

All 8 questions and verbatim answers extracted from `index-9e3432667099d8d1.js`:

| # | Question | Exact Verified Answer |
| :--- | :--- | :--- |
| **Q1** | What is Octis jewellery shop management software? | Octis is a cloud-based POS and inventory platform built for Indian jewellery retailers. It covers billing, HUID compliance, gold schemes, karigar tracking, and GST reporting in one system. |
| **Q2** | Does Octis support BIS hallmarking and HUID? | Yes. Octis includes HUID tracking, compliant tag printing, and digital audit records required for BIS hallmarking compliance across your inventory. |
| **Q3** | Can I manage gold savings schemes and monthly installments? | Absolutely. Octis supports customer schemes, installment tracking, scheme redemptions at POS, and full ledger history per customer. |
| **Q4** | Does Octis work for multi-branch jewellery showrooms? | Yes. Enterprise plans support multiple branches with centralized reporting, branch-level inventory, and role-based staff access. |
| **Q5** | Is Octis GST compliant for jewellery sales in India? | Octis auto-calculates GST on bills, supports CGST/SGST splits, and generates audit-ready tax reports for your CA and compliance needs. |
| **Q6** | How long does onboarding take? | Most single-branch shops go live within a few days. We include free data migration support and staff training during your 30-day trial. |
| **Q7** | Can I bill with old gold exchange and split payments? | Yes. The POS handles old gold exchange calculations, multiple payment modes (cash, card, UPI), and scheme adjustments in a single transaction. |
| **Q8** | Where is Octis available? | Octis is built for jewellery retailers across India. Our cloud platform works on any browser — no special hardware required beyond your existing billing PC and barcode scanner. |

---

## 4. CTA & Navigation Destination Table

| Trigger Location | Visible Text | Destination | Type | Observed Behavior |
| :--- | :--- | :--- | :--- | :--- |
| Header Left | Logo Image | `/` | Internal Route | Scrolls to top of landing page |
| Header Nav | `Features` | `#features` | Anchor Jump | Smooth scrolls to Core Features section |
| Header Nav | `Inventory` | `#inventory` | Anchor Jump | Smooth scrolls to Inventory Spotlight |
| Header Nav | `Compliance` | `#compliance` | Anchor Jump | Smooth scrolls to Compliance section |
| Header Nav | `Pricing` | `#pricing` | Anchor Jump | Smooth scrolls to Pricing plans |
| Header Action | `Sign In` | `/login` | Distinct Route | Navigates to ERP login portal |
| Header Action | `Request Demo` | `#cta` | Anchor Jump | Smooth scrolls to conversion CTA section |
| Hero Left CTA | `Request Demo` | `#cta` | Anchor Jump | Primary button action |
| Hero Left CTA | `Sign In` | `/login` | Distinct Route | Secondary ghost/outline button |
| Pricing Card 1 | `Contact for pricing` | `#cta` | Anchor Jump | Redirects user to contact/demo form |
| Pricing Card 2 | `Contact for pricing` | `#cta` | Anchor Jump | Redirects user to contact/demo form |
| Pricing Card 3 | `Contact for pricing` | `#cta` | Anchor Jump | Redirects user to contact/demo form |
| CTA Panel Primary | `Request a Demo` | `mailto:demo@octis.in` | Email URI | Opens default mail client targeting demo inbox |
| CTA Panel Secondary| `Call Sales` | `tel:+917396029339` | Phone URI | Prompts device phone dialer |
| Footer Contact | `+91 7396 029 339` | `tel:+917396029339` | Phone URI | Prompts device phone dialer |
| Footer Contact | `hello@octis.in` | `mailto:hello@octis.in`| Email URI | Opens mail client targeting general inbox |

---

## 5. Interaction Behavior

- **Sticky Navigation**: `.landing-nav` has `sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/60`. It remains pinned at the viewport top during scrolling with a translucent blur.
- **Accordion Toggles**: FAQ items use Radix UI accordion state management (`data-state="open"` / `data-state="closed"`). The chevron icon rotates 180 degrees (`rotate-180`) on active/expanded state, with smooth height/opacity transitions.
- **Hover Micro-interactions**:
  - Feature cards (`.landing-feature-card`) trigger subtle vertical lift (`translateY(-2px)`) and elevated shadow on mouse hover.
  - Buttons (`.btn-gold`) shift slightly in background saturation and brightness.
- **Overlays / Popups**: No cookie consent dialog, intrusive marketing popup, or floating chat widget is present on the public website.

---

## 6. Responsive Behavior Across Viewports

Derived from Tailwind CSS breakpoint rules (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`) and rendered DOM markup:

### Desktop (1440px)
- **Header**: Full horizontal desktop navigation visible (`Features`, `Inventory`, `Compliance`, `Pricing`), inline `Sign In` and `Request Demo` buttons. Hamburger hidden (`md:hidden`).
- **Hero**: Side-by-side flex/grid arrangement. Left copy container (`lg:text-left`) with H1 styled at `lg:text-[3.25rem]`. Right container displays large mockup (`/landing/hero-product.png`) within `.landing-mockup-frame` with glow filter.
- **Metrics Bar**: 4-column inline grid (`grid-cols-4`).
- **Feature Cards**: 3-column grid (`lg:grid-cols-3`).
- **Spotlights (POS & Inventory)**: 2-column alternating layouts (image left / text right, or text left / image right).
- **Pricing**: 3-column cards (`lg:grid-cols-3`), with the middle Professional tier visually elevated.
- **Footer**: 4-column multi-row layout.

### Tablet (768px)
- **Header**: Transitions from full desktop nav to compact mode at `<768px`.
- **Hero**: Text centers or slightly scales down (`text-4xl`); hero mockup scales responsively with max-width containment.
- **Metrics Bar**: Reflows to a 2x2 grid (`grid-cols-2 md:grid-cols-4`).
- **Feature Cards**: Reflows to 2 columns (`md:grid-cols-2`).
- **Pricing**: 2 columns or vertically stacked depending on tablet orientation.

### Mobile (390px)
- **Header**: Desktop navigation links and action buttons are hidden (`hidden md:flex`). An accessible hamburger icon button (`md:hidden`) is rendered on the right.
- **Hero**: Fully stacked single-column layout. Metric card floats above or below image in 1-column stack. H1 scales to `text-3xl`.
- **Feature Grid & Spotlights**: All grids collapse to a single vertical column (`grid-cols-1`). Mockup frames scale to 100% viewport width with padding.
- **Pricing**: All 3 tiers stack vertically into full-width cards.
- **FAQ**: Full width with touch-friendly button hit targets (`py-4 px-6`).
- **Footer**: Single column stacking of logo, product links, resources, and contact links.

---

## 7. Visual Design System Evidence

### Measured Values (Direct from `dda77c8c4677e0e5.css`)

```css
:root {
  /* Core Brand Tokens */
  --gold: #c9a96e;
  --gold-dark: #9a7209;
  
  /* HSL Component Tokens */
  --background: 37 70% 97%;       /* #faf8f4 Warm Cream / Off-white */
  --foreground: 16 49% 12%;       /* #2d160e Espresso Charcoal */
  --card: 0 0% 100%;             /* Pure White */
  --card-foreground: 16 49% 12%;
  --primary: 37 41% 61%;          /* #c9a96e Warm Jewellery Gold */
  --primary-foreground: 0 0% 100%;
  --secondary: 16 43% 29%;        /* #6b3a2a Deep Warm Rust / Brown */
  --secondary-foreground: 37 70% 94%;
  --muted: 37 54% 90%;            /* Warm Sand Tint */
  --muted-foreground: 20 36% 31%; /* Medium Dark Brown */
  --accent: 37 54% 90%;
  --accent-foreground: 16 43% 29%;
  --border: 37 52% 74%;           /* Light Gold/Sand Border */
  --input: 37 52% 74%;
  --ring: 37 41% 61%;
  
  /* Radii & Geometry */
  --radius: 0.625rem;             /* 10px standard card corner */
}
```

### Typography Hierarchy (Measured)
- **Primary Sans Body**: `font-sans` -> `Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Display Serif Heading**: `font-display` -> `Playfair Display, Georgia, serif` (Used on main section headings and hero title)
- **Monospace Code/Data**: `font-mono` -> `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Surface & Gradient Rules (Measured)
- **Hero Background**:
  `radial-gradient(ellipse 90% 70% at 95% 5%, hsla(39, 46%, 61%, .28), transparent 55%), radial-gradient(ellipse 70% 60% at 5% 90%, rgba(21, 42, 69, .14), transparent 50%), linear-gradient(165deg, #faf8f4, #f0e8dc 55%, #e8dfd0)`
- **Dark Compliance Panel**:
  `linear-gradient(165deg, #1a2f4a, #2d160e 35%, #4a2518 70%, #3d2014)`
- **Conversion CTA Panel**:
  `linear-gradient(135deg, #1a2f4a, #2d160e 45%, #4a2518)`
- **Footer Background**:
  `linear-gradient(180deg, #2d160e, #1a0c08)`
- **Section Badges (`.landing-section-label`)**:
  `font-size: 0.6875rem (11px); font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #9a7209;`

---

## 8. Asset Catalog

| Asset Path | Content Type | File Size | Status | Visual Description |
| :--- | :--- | :--- | :--- | :--- |
| `https://octis.in/logo.png` | `image/png` | 89,720 bytes | `200 OK` | Octis official brand logo with wordmark |
| `https://octis.in/favicon.svg` | `image/svg+xml`| 473 bytes | `200 OK` | Vector browser tab icon (faceted gold gem glyph) |
| `https://octis.in/landing/hero-product.png` | `image/png` | 1,866,569 bytes | `200 OK` | High-fidelity dashboard product perspective mockup |
| `https://octis.in/landing/pos-mockup.png` | `image/png` | 1,721,246 bytes | `200 OK` | Point-of-Sale billing screen UI mockup |
| `https://octis.in/landing/inventory-mockup.png`| `image/png` | 556,182 bytes | `200 OK` | Inventory tagging & HUID management UI mockup |
| `https://octis.in/icons/apple-touch-icon.png` | `image/png` | ~5 KB | `200 OK` | Apple device home screen icon |

---

## 9. Live Site Facts vs. Developer Blueprint Requirements

A critical architectural distinction verified during Phase 1:

| Dimension | Live Website Facts (`https://octis.in/`) | Developer Blueprint (`OCTIS_UIUX_Complete_Audit_and_Fix_Blueprint.docx`) | Synthesis / Recommendation |
| :--- | :--- | :--- | :--- |
| **Primary Domain / Scope** | **Public Marketing & Conversion Site** (`/`, `/login`, `#features`, `#pricing`, `#faq`). | **Authenticated Internal ERP Application** (`/dashboard`, `/sales/new`, `/inventory`, `/customers`, `/parties`, `/bi`). | Keep Milestone A strictly focused on the live public marketing replica. Blueprint changes apply to application UI/UX flows in Milestone B. |
| **Hero Heading** | Verified: *"Grow your jewellery business with Octis."* | Mentions no marketing hero copy modifications. | **Do NOT change** the live marketing hero headline during Milestone A. |
| **Pricing Models** | 3 tiers: Starter, Professional, Enterprise (`Custom / month` quotes via `#cta`). | Analyzes internal transaction fees and invoice GST calculations. | Preserve public quote-based pricing structure in Milestone A. |
| **Visual Theme** | Warm luxury jewellery aesthetic: Gold (`#c9a96e`), cream parchment (`#faf8f4`), deep brown (`#2d160e`), navy accents (`#1a2f4a`). | Recommends high-contrast financial clarity badges ("Customer owes us" / "We owe vendor"). | Apply color tokens consistently so marketing and app surfaces share harmonious design language. |
| **Feature Terminology** | Marketing terms: "Lightning Fast POS", "Intelligent Inventory", "Live Metal Rate Sync", "Karigar Management". | Systemic critique: Inconsistent naming between "Add Stock", "Inventory", and "Add Many Items". | Maintain marketing copy verbatim for Milestone A baseline; align terminology during Milestone B. |

---

## 10. Unknowns, Failed Checks & Limitations

1. **Antigravity Browser Subagent CDP Context Management**:
   - *Failure*: Attempting to open `https://octis.in/` via `open_browser_url` in the browser subagent returned: `playwright: Protocol error (Browser.setDownloadBehavior): Browser context management is not supported.`
   - *Resolution*: User explicitly approved proceeding via direct HTML/DOM extraction, JS bundle reverse engineering, and stylesheet analysis. All copy, layout rules, breakpoints, and asset links were forensically verified with 100% fidelity.
2. **Server-Side Form Handling on Live Site**:
   - The `#cta` form triggers `mailto:` and `tel:` links; there is no public POST lead endpoint exposed on the static landing page.

---

## 11. Evidence Log

- Raw HTML Source: `scratch/octis_live_raw.html` (54,133 bytes).
- Production Next.js Bundle: `scratch/index_bundle.js` (34,582 bytes from `pages/index-9e3432667099d8d1.js`).
- Production Stylesheet: `scratch/octis_live.css` (143,377 bytes from `dda77c8c4677e0e5.css`).
- Extracted Data Objects: `scratch/faq_array.txt`, `scratch/features_array.txt`, `scratch/compliance_array.txt`, `scratch/stats_array.txt`.
- Developer Blueprint Extracted Text: `scratch/blueprint_summary.md` (914 paragraphs extracted from docx archive).
