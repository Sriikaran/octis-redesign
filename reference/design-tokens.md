# Octis Design System Tokens & Style Guide — Reference Pack

This document details all verified, evidence-backed design tokens extracted from the live production stylesheet (`/_next/static/css/dda77c8c4677e0e5.css`, preserved in `scratch/octis_live.css`) and verified against rendered DOM components.

---

## 1. Color Palette & Theming Tokens

### Core Brand Constants (Exact CSS Values)
| Token Name | Value | Hex / Computed | Role & Intended Usage |
| :--- | :--- | :--- | :--- |
| `--gold` | `#c9a96e` | `#C9A96E` | Primary brand luxury gold accent; button backgrounds, borders |
| `--gold-dark` | `#9a7209` | `#9A7209` | Dark gold tone; section labels, badge text, icon shadow borders |

### Component HSL Tokens (`:root` Theme)
All tokens are defined in HSL space in the live stylesheet:

| Variable | Raw HSL | Hex Equivalent | Description |
| :--- | :--- | :--- | :--- |
| `--background` | `37 70% 97%` | `#FAF8F4` | Warm ivory / parchment page background |
| `--foreground` | `16 49% 12%` | `#2D160E` | Deep charcoal espresso brown for primary body & headings |
| `--card` | `0 0% 100%` | `#FFFFFF` | Feature cards and stat cards solid background |
| `--card-foreground`| `16 49% 12%` | `#2D160E` | High-contrast card text |
| `--primary` | `37 41% 61%` | `#C9A96E` | Brand CTA button fill (`.btn-gold`) and focal highlights |
| `--primary-foreground`| `0 0% 100%` | `#FFFFFF` | Inverted white text on primary buttons |
| `--secondary` | `16 43% 29%` | `#6B3A2A` | Secondary warm terracotta / dark copper brown |
| `--secondary-foreground`| `37 70% 94%` | `#F7EFE1` | Light sand text on secondary containers |
| `--muted` | `37 54% 90%` | `#EFE4D3` | Warm sand tint for secondary chips, dividers, and disabled states |
| `--muted-foreground` | `20 36% 31%` | `#6C4233` | Subtitle and supporting body text |
| `--accent` | `37 54% 90%` | `#EFE4D3` | Hover container tint on light cards |
| `--accent-foreground` | `16 43% 29%` | `#6B3A2A` | Hover label text color |
| `--border` | `37 52% 74%` | `#D9BF97` | Light gold border on panels, inputs, and card containers |
| `--input` | `37 52% 74%` | `#D9BF97` | Input field stroke |
| `--ring` | `37 41% 61%` | `#C9A96E` | Focus outline ring |

---

## 2. Gradients & Surface Formulas (Exact Measured Rules)

| Surface Class | Exact CSS Declaration | Visual Character |
| :--- | :--- | :--- |
| `.landing-hero-bg` | `radial-gradient(ellipse 90% 70% at 95% 5%, hsla(39, 46%, 61%, .28), transparent 55%), radial-gradient(ellipse 70% 60% at 5% 90%, rgba(21, 42, 69, .14), transparent 50%), linear-gradient(165deg, #faf8f4, #f0e8dc 55%, #e8dfd0)` | Multi-stop luxury radial wash with gold glow top-right and navy shadow bottom-left |
| `.landing-surface` | `background: var(--landing-surface); border-top: 1px solid hsla(39, 46%, 61%, .15); border-bottom: 1px solid hsla(39, 46%, 61%, .12);` | Neutral warm content section divider |
| `.landing-surface-tinted` | `background: linear-gradient(180deg, #e8dfd0, #ebe3d6 50%, #e5dcd0); border-top: 1px solid rgba(107, 58, 42, .08); border-bottom: 1px solid rgba(107, 58, 42, .08);` | Tinted parchment section (used behind POS spotlight) |
| `.landing-section-dark` | `background: linear-gradient(165deg, #1a2f4a, #2d160e 35%, #4a2518 70%, #3d2014); border-top: 1px solid hsla(39, 46%, 61%, .2); border-bottom: 1px solid hsla(39, 46%, 61%, .15); box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, .06);` | Deep navy-espresso gradient for Regulatory Compliance section |
| `.landing-pricing-featured`| `background: linear-gradient(160deg, #fff, #faf5ec 40%, #f5ead8); border: 2px solid hsla(39, 46%, 61%, .5); box-shadow: 0 12px 40px -12px rgba(154, 114, 9, .3), inset 0 1px 0 hsla(0, 0%, 100%, .8);` | Highlighted Professional pricing card |
| `.landing-cta-panel` | `background: linear-gradient(135deg, #1a2f4a, #2d160e 45%, #4a2518); border: 1px solid hsla(39, 46%, 61%, .35); border-radius: 2rem; box-shadow: 0 20px 50px -15px rgba(15, 31, 51, .5), inset 0 1px 0 hsla(0, 0%, 100%, .08);` | Curved conversion card container |
| `.landing-footer` | `background: linear-gradient(180deg, #2d160e, #1a0c08); border-top: 2px solid hsla(39, 46%, 61%, .3); color: #f5ead8;` | Deep dark espresso-to-black footer base |
| `icon-gradient-gold` | `background: linear-gradient(135deg, #d4a96a, #c9a96e 40%, #9a7209); box-shadow: 0 2px 10px -1px rgba(154, 114, 9, .6), inset 0 1px 0 hsla(0, 0%, 100%, .2);` | Shimmering gold gradient for icon circular badges |

---

## 3. Typography Stack & Scale

### Font Families
- **Body & Controls (`font-sans`)**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Headings & Display (`font-display`)**: `Playfair Display, Georgia, serif`
- **Monospace (`font-mono`)**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Typography Hierarchy & Scaling
| Role | Element / Class | Desktop (1440px) | Mobile (390px) | Weight | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `H1` | `3.25rem` (52px) | `2rem` (32px) / `text-3xl` | 700 / Bold | `font-display` (Playfair Display) |
| **Section Title** | `H2` | `2.25rem` (36px) | `1.875rem` (30px) | 700 / Bold | `font-display` (Playfair Display) |
| **Spotlight Subhead**| `H3` | `1.75rem` (28px) | `1.5rem` (24px) | 600 / Semi | `font-sans` (Inter) |
| **Card Title** | `H4` | `1.25rem` (20px) | `1.125rem` (18px) | 600 / Semi | `font-sans` (Inter) |
| **Section Label** | `.landing-section-label` | `0.6875rem` (11px) | `0.6875rem` (11px) | 700 / Bold | `font-sans` (Tracking: `0.16em`, uppercase, `#9a7209`) |
| **Body Large** | Subtitles | `1.125rem` (18px) | `1rem` (16px) | 400 / Normal | `font-sans` (Line height: `1.75`) |
| **Body Regular** | Card body & FAQ | `0.875rem` (14px) | `0.875rem` (14px) | 400 / Normal | `font-sans` (Leading: `1.625`) |

---

## 4. Elevation, Shadows & Border Radii

### Border Radii
- **Base Variable (`--radius`)**: `0.625rem` (10px)
- **Buttons (`.btn-gold`)**: `0.625rem` (10px)
- **Feature Cards (`.landing-feature-card`)**: `calc(var(--radius) + 6px)` = `1rem` (16px)
- **Stat Cards (`.landing-stat-card`)**: `calc(var(--radius) + 4px)` = `0.875rem` (14px)
- **Product Mockup Frame (`.landing-mockup-frame`)**: `1.25rem` (20px)
- **Glow Filter (`.landing-mockup-glow`)**: `1.5rem` (24px)
- **CTA Conversion Panel (`.landing-cta-panel`)**: `2rem` (32px)

### Shadows
- **Card Shadow**: `0 2px 6px rgba(45, 22, 14, 0.05), 0 14px 32px -12px rgba(21, 42, 69, 0.1)`
- **Hero Mockup Frame**: `0 8px 32px -8px rgba(21, 42, 69, 0.2), 0 32px 64px -24px rgba(45, 22, 14, 0.25), inset 0 1px 0 hsla(0, 0%, 100%, 0.9)`
- **CTA Panel**: `0 20px 50px -15px rgba(15, 31, 51, 0.5), inset 0 1px 0 hsla(0, 0%, 100%, 0.08)`
- **Featured Pricing Card**: `0 12px 40px -12px rgba(154, 114, 9, 0.3), inset 0 1px 0 hsla(0, 0%, 100%, 0.8)`

---

## 5. Layout & Breakpoint Conventions

| Breakpoint | Minimum Width | Behavior & Reflow Rules |
| :--- | :--- | :--- |
| **Default / Mobile** | `<640px` | Single column grid (`grid-cols-1`). Desktop navigation hidden (`hidden md:flex`). Hamburger button active. Hero text centered or left-aligned with fluid scaling. |
| **`sm`** | `640px` | Padding shifts (`px-6 sm:px-8`). Accordion and cards slightly expand horizontal padding. |
| **`md`** | `768px` | Desktop nav revealed (`md:flex`), mobile hamburger hidden (`md:hidden`). Stats reflow to 2x2 or 4-col. Features grid reflows to 2 columns (`md:grid-cols-2`). |
| **`lg`** | `1024px` | Features grid expands to 3 columns (`lg:grid-cols-3`). Pricing tier grid expands to 3 columns. Spotlight sections alternate horizontally (side-by-side mockup and text). |
| **`xl`** | `1280px` | Maximum container width constraint (`max-w-7xl mx-auto px-6 lg:px-8`). |

---

## 6. Component Specs

### Button (`.btn-gold`)
- **Default State**: Background `hsl(var(--primary))` (`#c9a96e`), Text `hsl(var(--primary-foreground))` (`#ffffff`), font weight 600, font size `0.875rem`, padding `0.625rem 1.25rem`, border-radius `0.625rem`, box-shadow `0 1px 3px rgba(0, 0, 0, 0.1)`.
- **Hover State**: `hover:bg-primary/90`, subtle scale transition `cubic-bezier(0.4, 0, 0.2, 1)`.

### Secondary Outline Button
- **Default State**: Border `1px solid hsla(39, 46%, 61%, 0.35)`, Background `transparent` or `white/10`, Text `inherit`.
- **Hover State**: Background `white/15`, Border `hsla(39, 46%, 61%, 0.6)`.

### Accordion Item
- **Border**: Border-t `1px solid hsla(39, 46%, 61%, 0.2)`.
- **Trigger**: Full width flex row, justify-between, items-center, hover `bg-gold-50/50`.
- **Chevron**: 20px Lucide `ChevronDown`, rotated 180deg when open (`rotate-180`).
- **Answer Container**: Padding `0 1.5rem 1rem`, font size `0.875rem`, line height `1.625`, text color `#6c4233`.
