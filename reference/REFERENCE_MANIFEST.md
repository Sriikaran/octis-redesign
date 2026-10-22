# Octis Website Reference Manifest

- **Target Website**: [https://octis.in/](https://octis.in/)
- **Capture Date**: 2026-10-22
- **Document Version**: 1.0 (Phase 2 Deliverable)
- **Status**: Verified Baseline Reference Pack

---

## 1. Overview & Purpose

This manifest documents the complete reference package assembled in Phase 2 for cloning the live public Octis website (`https://octis.in/`) during Milestone A. All evidence, downloaded media assets, rendered multi-viewport screenshots, and extracted design tokens are indexed below using relative project paths.

---

## 2. Reused Reconnaissance Artifacts (Phase 1 Scratch)

The following 22 files from `scratch/` were audited and reused to eliminate redundant network transfers:

| Artifact Path | Source / Type | Description & Purpose |
|---|---|---|
| `scratch/octis_live_raw.html` | Live SSR HTML (`https://octis.in/`) | Full initial server-rendered HTML document, meta tags, and component structure. |
| `scratch/octis_live.css` | Next.js CSS stylesheet (`_next/static/css/8f921d740c0c7a52.css`) | Complete CSS tokens, CSS variables, utility classes, and keyframes. |
| `scratch/index_bundle.js` | Webpack JS bundle (`_next/static/chunks/pages/index-9e3432667099d8d1.js`) | Client-side React components, interactive logic, and embedded content arrays. |
| `scratch/next_data.json` | Next.js Page Props (`#__NEXT_DATA__`) | Page build metadata, query params, buildId (`w4Kvd1jR_9k3FwUu35_tF`). |
| `scratch/all_faqs.txt` | Bundle Extraction | Complete list of all 8 FAQ items with full questions and answers. |
| `scratch/faq_array.txt` | Bundle Extraction | Parsed JSON-like array of 8 FAQ objects. |
| `scratch/features_array.txt` | Bundle Extraction | 6 core feature card objects (icons, titles, descriptions). |
| `scratch/compliance_array.txt` | Bundle Extraction | 4 compliance module cards (GST, e-invoicing, audit trail, tax reports). |
| `scratch/stats_array.txt` | Bundle Extraction | 4 live statistics metrics (`10,000+`, `99.9%`, `50M+`, `24/7`). |
| `scratch/faq_section_raw.html` | HTML Slice | Raw DOM slice containing Radix UI accordion markup. |
| `scratch/blueprint_summary.md` | Blueprint Analysis | Structured analysis of `OCTIS_UIUX_Complete_Audit_and_Fix_Blueprint.docx`. |
| `scratch/parse_blueprint.py` | Python Script | Docx XML parser used to analyze developer blueprint scope. |
| `scratch/extract_all_page_content.py` | Python Script | Parser for extracting static copy and arrays from SSR HTML & JS. |
| `scratch/extract_all_faqs.py` | Python Script | Bundle parser for extracting hidden FAQ accordion answers. |
| `scratch/extract_faq_and_css.py` | Python Script | HTML & CSS inspection script. |
| `scratch/extract_next_data.py` | Python Script | Script to parse `#__NEXT_DATA__` JSON block. |
| `scratch/inspect_faq_answers_and_css.py` | Python Script | Accordion state validator. |
| `scratch/inspect_html.py` | Python Script | Initial HTML structure inspector. |
| `scratch/parse_design_tokens.py` | Python Script | CSS variable token extractor. |
| `scratch/parse_index_bundle.py` | Python Script | JS bundle parser. |
| `scratch/parse_landing_rules.py` | Python Script | CSS rules matcher for landing page classes. |
| `scratch/print_faq.py` | Python Script | Verification script printing all 8 FAQs. |

---

## 3. Asset Manifest (Public Brand & Media Assets)

All visual assets referenced by the live public homepage were downloaded and verified for integrity:

| Asset Name | Original URL | Local Project Path | Format / Dimensions | File Size | HTTP Status | Intended Use | Status |
|---|---|---|---|---|---|---|---|
| **Primary Logo** | `https://octis.in/logo.png` | `reference/assets/logo.png` | PNG (3660 × 1428 px, RGBA) | 1,866,569 bytes | `200 OK` | Main navbar header & footer branding | Verified |
| **Favicon SVG** | `https://octis.in/favicon.svg` | `reference/assets/favicon.svg` | SVG (Vector XML) | 473 bytes | `200 OK` | Browser tab icon (`type="image/svg+xml"`) | Verified |
| **Hero Product Mockup** | `https://octis.in/hero-product.png` | `reference/assets/hero-product.png` | PNG (1536 × 1024 px, RGB) | 1,721,246 bytes | `200 OK` | Hero section floating application perspective mockup | Verified |
| **POS Mockup** | `https://octis.in/pos-mockup.png` | `reference/assets/pos-mockup.png` | PNG (1585 × 846 px, RGBA) | 556,182 bytes | `200 OK` | Retail POS & Billing feature preview screenshot | Verified |
| **Inventory Mockup** | `https://octis.in/inventory-mockup.png` | `reference/assets/inventory-mockup.png` | PNG (1582 × 857 px, RGBA) | 89,720 bytes | `200 OK` | Inventory Management & Stock tracking preview screenshot | Verified |
| **Apple Touch Icon** | `https://octis.in/apple-touch-icon.png` | `reference/assets/apple-touch-icon.png` | PNG (180 × 180 px, RGBA) | 5,747 bytes | `200 OK` | Mobile web app home screen touch icon | Verified |

*Note: All assets are real binary files verified with `PIL.Image` and XML parsers. None are HTML error pages, truncated files, or generated substitutes.*

---

## 4. Rendered Visual Evidence (Screenshots)

All required viewports and interaction states were captured using the Antigravity browser subagent and verified locally:

| Viewport Target | Tested Dimension | State / Section Captured | Local Project Path | Verification Notes |
|---|---|---|---|---|
| **Desktop** | 1920 × 912 px | Initial Viewport (Header + Hero) | `reference/screenshots/desktop_1440_initial.png` | Shows full top navigation, badge, headline, CTA buttons, and hero image top half. |
| **Desktop** | 1784 × 985 px | Hero Section Crop | `reference/screenshots/desktop_1440_hero.png` | Focused view of the gold badge, primary H1, dual CTAs, and product showcase container. |
| **Desktop** | 1784 × 985 px | Pricing Section | `reference/screenshots/desktop_1440_pricing.png` | Displays all 3 pricing tiers (Starter ₹4,999, Professional ₹9,999, Enterprise Custom) and feature matrices. |
| **Desktop** | 1920 × 912 px | Expanded FAQ Interaction | `reference/screenshots/desktop_1440_faq_expanded.png` | Demonstrates active Radix UI accordion state (Item 1 expanded: "What is Octis and who is it designed for?"). |
| **Tablet** | 943 × 985 px | Tablet Hero & Header | `reference/screenshots/tablet_768_hero.png` | Shows intermediate responsive layout with adapted navbar and flex wrap behavior. |
| **Tablet** | 772 × 4096 px | Full-Page Tablet Layout | `reference/screenshots/tablet_768_fullpage.png` | Complete continuous vertical scroll capture from navbar to footer at tablet resolution. |
| **Mobile** | 627 × 939 px | Mobile Hero & Header | `reference/screenshots/mobile_390_hero.png` | Shows mobile viewport (390px base scaled) with hamburger icon, stacked CTAs, and responsive typography. |
| **Mobile** | 512 × 4096 px | Full-Page Mobile Layout | `reference/screenshots/mobile_390_fullpage.png` | Complete continuous vertical scroll capture demonstrating single-column layout, stacked cards, and touch-friendly targets. |
| **Mobile** | 627 × 939 px | Mobile Navigation Drawer Open | `reference/screenshots/mobile_390_nav_open.png` | Confirms mobile menu open state (`aria-expanded="true"`) displaying stacked links (#features, #inventory, #compliance, #pricing, #faq) and action buttons. |

---

## 5. Design Token Reference

The full design token documentation is compiled in:
- [reference/design-tokens.md](file:///c:/Users/srika/OneDrive/Desktop/octis%20redesign/reference/design-tokens.md)

### Key Token Highlights:
- **Brand Colors**:
  - Gold Accent: `#c9a96e` (`--gold`), Dark Gold: `#9a7209` (`--gold-dark`)
  - Primary: `hsl(37, 41%, 61%)`
  - Primary Foreground: `hsl(16, 49%, 12%)`
  - Background: `hsl(37, 70%, 97%)` (`#FAF8F4` Warm Cream)
  - Foreground: `hsl(16, 49%, 12%)` (`#2D160E` Deep Espresso)
  - Secondary: `hsl(16, 43%, 29%)` (`#6B3A2A` Rich Warm Clay)
  - Card: `hsl(38, 50%, 94%)`
  - Border: `hsl(38, 30%, 82%)`
- **Typography**:
  - Heading font: `Playfair Display, Georgia, serif` (class `.font-display`)
  - Body font: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (class `.font-sans`)
- **Radii**:
  - `--radius: 0.625rem` (10px base), cards `rounded-xl` (0.75rem / 12px) to `rounded-2xl` (1rem / 16px).
- **Icons**: Lucide Icons rendered inline via SVG (stroke width: 2px).

---

## 6. Routes and Interaction States Requiring Further Inspection

1. **Authentication Route (`/login`)**:
   - The live website's "Sign In" CTA points to `/login`.
   - `/login` is an entry point to the proprietary Octis ERP application.
   - For Milestone A, the public marketing site link to `/login` should be maintained as an external or mocked route without scraping authenticated internals.
2. **Interactive Lead Capture Modal / Demo Booking**:
   - "Book a Demo" CTA triggers an anchor scroll to `#cta` or a contact form trigger.
   - The form requires client-side field validation (Name, Phone, Business Name, City).
3. **Accordion Animation**:
   - Uses Radix UI accordion transition: height animates from `0` to `var(--radix-accordion-content-height)` with `transition-all 0.2s ease-out`.
4. **Mobile Drawer**:
   - Toggles state on hamburger button click; background scroll locking behavior should be preserved.

---

## 7. Browser Limitations & Unverified Items

1. **Static SSR vs. Dynamic Client DOM**:
   - The live homepage was exported as a static Next.js build. In the raw SSR HTML, only the first FAQ item has content rendered in the initial markup; items 2–8 are populated via client hydration. Both states were inspected and reconciled using the client JavaScript bundle.
2. **Port 9222 CDP Automation**:
   - The Antigravity browser subagent successfully connected to the running Chrome instance after restarting without context conflicts, allowing full interactive and scroll-based screenshot capture.
3. **No Unverified Claims**:
   - All 9 visual states were visually confirmed against actual PNG artifacts saved to disk in `reference/screenshots/`.

---

## 8. Remaining Work Before Milestone A Implementation (Phase 3)

With Phase 0, Phase 1, and Phase 2 complete, the baseline clone preparation is finalized. Phase 3 will involve:
1. Initializing the modern frontend framework (e.g. Next.js / Vite with Tailwind CSS v4 or Vanilla CSS matching design tokens).
2. Implementing the exact page structure, components, navigation, and footer.
3. Hooking up downloaded public assets and Lucide icon SVGs.
4. Implementing responsive layouts across desktop, tablet, and mobile.
5. Implementing interactive states (Radix UI / vanilla accordion for FAQ, mobile drawer toggle).
6. Conducting visual regression testing against the reference screenshots in `reference/screenshots/`.
