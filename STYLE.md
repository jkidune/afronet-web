# AfrONet — Style Guide
> **afronet.bio** — African Organic Network  
> Version: 1.0 | Last updated: April 17, 2026

This document defines the visual and design language for AfrONet. It serves as the source of truth for all frontend work, including the planned Next.js rebuild.

---

## Brand Identity

**Brand essence:** Grounded, continental, authoritative, hopeful. AfrONet represents organic farmers and advocates across Africa — the visual language should feel rooted in the earth (greens, golds, cream) while projecting institutional credibility.

**Tone:** Professional yet approachable. Scientific but human. Pan-African and forward-looking.

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|---|---|---|
| Forest Green (Dark) | `#1a3a1a` | Primary brand color — headers, nav bg, hero overlays, primary buttons |
| Forest Green (Mid) | `#2d5a27` | Hover states, gradients, section accents |
| Accent Yellow / Gold | `#F5D83C` | Display hero text, CTA button fill, icon highlights |
| Gold (softer) | `#FFEE58` | Alternate yellow — lighter contexts |

### Neutral Colors

| Name | Hex | Usage |
|---|---|---|
| Cream | `#FFFAED` | Footer backgrounds, warm card surfaces |
| Off-white | `#FBFAF3` | Alternate page sections |
| White | `#FFFFFF` | Base page background, text on dark |
| Body Text | `#111111` | All main readable text |
| Muted Text | `#777777` | Secondary paragraphs, captions, metadata |

### Accent/Link Color

| Name | Hex | Usage |
|---|---|---|
| Medium Green | `#2d6a4f` | Hyperlinks, author names, active nav states, inline highlights |

### CSS Variables (for Next.js build)

```css
:root {
  /* Brand */
  --color-primary:        #1a3a1a;
  --color-primary-mid:    #2d5a27;
  --color-primary-link:   #2d6a4f;
  --color-accent:         #F5D83C;
  --color-accent-soft:    #FFEE58;

  /* Surfaces */
  --color-bg:             #FFFFFF;
  --color-surface:        #FBFAF3;
  --color-surface-warm:   #FFFAED;

  /* Text */
  --color-text:           #111111;
  --color-text-muted:     #777777;
  --color-text-inverse:   #FFFFFF;
}
```

---

## Typography

### Typeface Roles

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Hero | **Instrument Sans** | 700–900 | Large hero text, bold display labels ("ACROSS AFRICA") |
| Editorial / Decorative | **Instrument Serif** | 400 Italic | Hero titles ("Making Africa an Organic Food Basket"), testimonials, pull quotes |
| Section Headings | **Archivo** | 600–700 | Programme cards, impact numbers, section labels |
| Body / UI | **Manrope** | 400, 500, 600 | Navigation, body paragraphs, buttons, captions |
| Fallback | System UI | — | Automatic browser fallback only |

### Type Scale

```css
:root {
  --text-hero:   clamp(3rem, 0.5rem + 7vw, 8rem);      /* 48px → 128px — hero display only */
  --text-3xl:    clamp(2.5rem, 1rem + 4vw, 5rem);       /* 40px → 80px — hero subtitles */
  --text-2xl:    clamp(2rem, 1.2rem + 2.5vw, 3.5rem);   /* 32px → 56px — page h1 titles */
  --text-xl:     clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem); /* 24px → 36px — section h2 */
  --text-lg:     clamp(1.125rem, 1rem + 0.75vw, 1.5rem); /* 18px → 24px — card h3 */
  --text-base:   clamp(1rem, 0.95rem + 0.25vw, 1.125rem); /* 16px → 18px — body */
  --text-sm:     clamp(0.875rem, 0.8rem + 0.35vw, 1rem);  /* 14px → 16px — buttons, nav */
  --text-xs:     clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); /* 12px → 14px — captions */
}
```

### Font Loading (Next.js)

```tsx
// app/layout.tsx
import { Manrope, Instrument_Sans, Instrument_Serif } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' });
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-display' });
const instrumentSerif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-editorial' });
```

> **Note:** Archivo can be added via `next/font/google` as well — `Archivo({ subsets: ['latin'], variable: '--font-heading' })`.

---

## Spacing System

All spacing uses a 4px base grid.

```css
:root {
  --space-1:  0.25rem;  /*  4px */
  --space-2:  0.5rem;   /*  8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

Section padding pattern:
```css
.section { padding-block: clamp(var(--space-12), 6vw, var(--space-24)); }
```

---

## Components

### Buttons

#### Primary CTA
- Background: `var(--color-primary)` (`#1a3a1a`)
- Text: `#FFFFFF`
- Shape: Full pill — `border-radius: 9999px`
- Includes: Yellow circle arrow icon on the right
- Example usage: "Explore our programmes", "Learn more"

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: 9999px;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  transition: background 180ms ease;
}
.btn-primary:hover { background: var(--color-primary-mid); }
```

#### Nav Contact Button
- Background: `var(--color-accent)` (`#F5D83C`)
- Text: `var(--color-primary)` (dark green)
- Shape: Pill
- Placement: Top-right of navigation

#### Ghost / Label Pill
- Border: `1px solid #FFFFFF`
- Text: `#FFFFFF`
- Background: transparent
- Used for: section labels on dark hero backgrounds ("About Us", "Our Impact")

### Cards

- Background: `var(--color-surface)` or `#FFFFFF`
- Border: subtle — `1px solid rgba(0,0,0,0.08)`
- Border radius: `var(--radius-lg)` (12px)
- Shadow: `0 2px 8px rgba(0,0,0,0.06)`
- Image: 16:9 ratio, `object-fit: cover`, rounded top corners

### Partner Logo Strip
- All logos should be **equal height (40–48px)** and displayed in **grayscale**
- On hover: transition to full color
- Layout: Flexbox row, centered, `gap: var(--space-8)`

---

## Layout Patterns

### Grid System

```css
.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(var(--space-4), 5vw, var(--space-16));
}
```

| Pattern | Used for |
|---|---|
| Full-width (100vw) | Hero sections |
| 2-column 50/50 | Alternating image + text sections |
| 3-column grid | Programme pillars |
| 4-column grid | Blog/article cards |
| Single column (65ch max) | Body prose, article content |

### Hero Sections
- Full viewport width and height (`100vw × 100dvh` or `min-height: 90dvh`)
- Background: Full-bleed photography
- Overlay: `rgba(26, 58, 26, 0.55)` (dark green tint) for text legibility
- Text alignment: Left-aligned (not centered)
- Text color: White (`#FFFFFF`) for body, Accent Yellow (`#F5D83C`) for display emphasis

---

## Photography & Imagery

### Style
- Authentic African agricultural photography — real people, real farms
- Subject: close-ups of crops, farmers at work, hands in soil, community gatherings
- Mood: warm, grounded, hopeful

### Hero Overlay Treatment
```css
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(26, 58, 26, 0.6) 0%,
    rgba(26, 58, 26, 0.3) 60%,
    rgba(26, 58, 26, 0.7) 100%
  );
}
```

### Image Ratios
| Context | Ratio |
|---|---|
| Hero / full-bleed | 16:9 or full viewport |
| Blog cards | 16:9 |
| About / feature sections | 4:3 or 1:1 |
| Team photos | 1:1 (circle crop) |

---

## Iconography

- Use **Lucide Icons** (React package: `lucide-react`) — clean, consistent stroke weight
- Stroke width: 1.5px
- Size: 20px (inline UI), 24px (standalone), 32–48px (feature icons)
- Color: Inherit from parent — never hardcode icon colors

---

## Animation Principles (Framer Motion)

- **Entrance:** `opacity: 0 → 1`, `y: 20 → 0`, duration `0.5s`, easing `easeOut`
- **Stagger children:** `staggerChildren: 0.08s`
- **Hover (cards):** `scale: 1.02`, `y: -4px`, duration `200ms`
- **Page transitions:** fade in/out, `duration: 0.3s`
- Always wrap in `AnimatePresence` for exit animations
- Respect `prefers-reduced-motion` — disable all motion when set

```tsx
// Reusable section entrance variant
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};
```

---

## Accessibility Standards

- **Colour contrast:** Minimum WCAG AA (4.5:1 for body text, 3:1 for large text)
- **Text alignment:** Left-align all body text — no justified text
- **Alt text:** Required on all images
- **Focus rings:** Visible, using `outline: 2px solid var(--color-accent)`
- **Heading hierarchy:** One `<h1>` per page, sequential levels
- **Touch targets:** Minimum 44×44px for all interactive elements

---

## Do's and Don'ts

### ✅ Do
- Use dark green + yellow as the primary brand combination
- Use field photography with warm green overlays
- Left-align body text always
- Use Instrument Serif italic for emotive/editorial headings
- Standardise partner logos to equal height + grayscale

### ❌ Don't
- Justify body text (creates awkward word-spacing gaps)
- Use more than 2 typefaces on any single section
- Use more than 2 text colors in hero display type simultaneously
- Use colored side-borders on cards (use elevation/shadow instead)
- Add decorative blobs, gradients, or floating shapes as backgrounds

---

## Version History

| Version | Date | Notes |
|---|---|---|
| 1.0 | 2026-04-17 | Initial style guide extracted from live WordPress site audit |

