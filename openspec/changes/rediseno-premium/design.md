# Design: Rediseno Premium

## 1. Architecture Overview

### GSAP Integration with Astro 6

**Installation:** `npm install gsap` (single dependency, no extras)

**Import strategy:** Each component imports GSAP in its own `<script>` tag. Astro automatically deduplicates identical imports, so there is no bundle penalty.

```astro
<!-- Per-component pattern -->
<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  // component-specific animations...
</script>
```

**ScrollTrigger registration:** Registered inside each component script (Astro deduplicates the import). No global registration file needed.

**Critical rule:** NEVER use `opacity: 0` as initial state. Elements must always be visible before JS loads (SSR-safe). Use `y`, `scale`, `clipPath`, `x` transforms instead so content is still readable if JS fails.

### Tailwind 4 @theme Configuration

All design tokens defined in `src/styles/global.css` using Tailwind 4's `@theme` syntax:

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', sans-serif;
  --color-gov-navy: #003366;
  --color-gov-navy-light: #004B87;
  --color-gov-teal: #0B7A9F;
  --color-muni-green: #2ECC71;
  --color-muni-green-dark: #27AE60;
  --color-muni-gold: #D4AF37;
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #4A4A5C;
  --color-text-tertiary: #8B8B9D;
  --color-bg-subtle: #F8F9FB;
}
```

These become usable as `bg-gov-navy`, `text-muni-green`, `border-muni-gold`, etc.

---

## 2. Component Redesign Specs

### 2.1 Layout (`Layout.astro`)

**Current:** Plain white body, no color identity.

**Redesign:**
- Body: `bg-bg-subtle text-text-primary` base colors
- Add smooth scroll: `scroll-smooth` on `<html>`
- Load GSAP via a `<script>` in the `<head>` that registers ScrollTrigger globally (so it's available before component scripts run)

### 2.2 Nav (`Nav.astro`)

**Current:** White sticky nav with gray text, plain hamburger.

**Redesign:**
- Background: `bg-gov-navy/95 backdrop-blur-md` (navy with glass effect)
- Logo text: `text-white` with `text-muni-gold` accent on "Bonito Oriental"
- Links: `text-white/80 hover:text-muni-gold` with Tailwind `transition-colors duration-200`
- Mobile menu: `bg-gov-navy` with `border-gov-navy-light` divider
- Active link indicator: `border-b-2 border-muni-gold` underline
- Hamburger icon: `text-white/80 hover:text-white`

**GSAP animation:** Hide/show on scroll direction
- Scroll down: `gsap.to(nav, { y: -100, duration: 0.3 })`
- Scroll up: `gsap.to(nav, { y: 0, duration: 0.3 })`
- Uses ScrollTrigger with `onUpdate` to detect scroll direction

### 2.3 Hero (`Hero.astro`)

**Current:** Centered logo + title, plain white background, no CTAs.

**Redesign:**
- Background: subtle gradient `bg-gradient-to-b from-gov-navy via-gov-navy-light to-gov-teal`
- Title: `text-white` uppercase, `tracking-wider`
- Subtitle line below title: `text-white/70` with tagline
- Two CTA buttons below:
  - Primary: `bg-muni-green hover:bg-muni-green-dark text-white` (rounded-full, px-8)
  - Secondary: `border-2 border-white/30 text-white hover:border-white/60` (rounded-full, px-8)
- Logo image: existing `muniLogo` centered above title

**GSAP entrance animations (on page load, NOT scroll-triggered):**
- Logo: `gsap.from(logo, { y: 40, scale: 0.9, duration: 1, ease: 'power3.out' })`
- Title: `gsap.from(title, { clipPath: 'inset(0 100% 0 0)', duration: 1.2, delay: 0.3, ease: 'power4.out' })` (text reveals left to right)
- CTAs: `gsap.from(ctas, { y: 30, duration: 0.8, delay: 0.6, ease: 'power2.out', stagger: 0.15 })`

### 2.4 AboutSection (`AboutSection.astro`)

**Current:** Simple 2-column grid with image + text.

**Redesign:**
- Image: Add `rounded-2xl shadow-xl` and a `ring-4 ring-muni-gold/20` gold glow border
- Title: `text-gov-navy` color, add a small `border-b-4 border-muni-gold` accent bar below (inline, `w-16`)
- Text: `text-text-secondary leading-relaxed`
- Add stat badges row below text: 3 small badges showing key stats (e.g., "Fundado 1860", "50k+ Habitantes", "100+ Proyectos")
  - Badge style: `bg-gov-navy/5 text-gov-navy rounded-full px-4 py-1.5 text-sm font-medium`

**GSAP animations (ScrollTrigger):**
- Image: `gsap.from(image, { x: -80, duration: 1, scrollTrigger: { trigger, start: 'top 80%' } })`
- Text block: `gsap.from(textBlock, { x: 80, duration: 1, scrollTrigger: { trigger, start: 'top 80%' } })`
- Stat badges: `gsap.from(badges, { y: 20, scale: 0.9, stagger: 0.1, duration: 0.6, scrollTrigger: ... })`

### 2.5 ServiceCard (`ServiceCard.astro`)

**Current:** White card with shadow, round image, gray button.

**Redesign:**
- Card: `bg-white rounded-2xl shadow-lg hover:shadow-2xl` with `border border-gray-100`
- Image: keep rounded-full but add `ring-4 ring-gov-teal/20`
- Title: `text-gov-navy font-bold`
- Button: `bg-gov-teal hover:bg-gov-navy text-white rounded-full` with Tailwind `transition-all duration-300`
- Hover effect (Tailwind): `hover:-translate-y-1 transition-transform duration-300`

**GSAP animation (ScrollTrigger, on cards container):**
- Staggered entrance: `gsap.from(cards, { y: 60, scale: 0.95, stagger: 0.12, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: container, start: 'top 85%' } })`

### 2.6 ServiceSection (`ServiceSection.astro`)

**Current:** 5-column grid with image + text + requirement buttons. Green-themed buttons.

**Redesign:**
- Section divider: replace `border-b border-gray-200` with `border-b border-gov-navy/10`
- Image: `rounded-2xl shadow-md`
- Title: `text-gov-navy`
- Sub-service buttons: `border-gov-teal/30 text-gov-teal hover:bg-gov-teal/10` (replace green with teal)
- "Requisitos De:" label: `text-gov-navy font-semibold`

**GSAP animation (ScrollTrigger):**
- Each section slides in: `gsap.from(section, { y: 40, duration: 0.8, scrollTrigger: { trigger: section, start: 'top 85%' } })`

### 2.7 RequirementsModal (`RequirementsModal.astro`)

**Current:** White modal, gray/green checkmarks, gray close button.

**Redesign:**
- Modal: `rounded-2xl` with top accent bar `border-t-4 border-muni-green`
- Title: `text-gov-navy font-bold`
- Checkmark icons: `text-muni-green` (keep green, it works here)
- Close button: `bg-gov-navy hover:bg-gov-navy-light text-white rounded-full`
- Backdrop: keep `backdrop:bg-black/50`

**No GSAP needed:** The native `<dialog>` handles show/hide. Keep it simple.

### 2.8 ContactForm (`ContactForm.astro`)

**Current:** Gray-themed form with plain inputs.

**Redesign:**
- Heading: `text-gov-navy`
- Input focus states: `focus:border-gov-teal focus:ring-gov-teal/30`
- Submit button: `bg-muni-green hover:bg-muni-green-dark text-white rounded-full`
- Success feedback: `bg-muni-green/10 text-muni-green-dark`
- Error feedback: keep red

**GSAP animation (ScrollTrigger):**
- Form container: `gsap.from(form, { x: -60, duration: 0.8, scrollTrigger: ... })`

### 2.9 ContactInfo (`ContactInfo.astro`)

**Current:** Gray background card with plain text.

**Redesign:**
- Card: `bg-gov-navy text-white rounded-2xl p-8`
- Sub-headings: `text-muni-gold font-semibold`
- Text: `text-white/80`
- Add icon cards for each contact method (small inline SVG icons with `text-muni-gold`)

**GSAP animation (ScrollTrigger):**
- Card: `gsap.from(card, { x: 60, duration: 0.8, scrollTrigger: ... })`

### 2.10 MissionVision (`MissionVision.astro`)

**Current:** Two-column grid, plain text.

**Redesign:**
- Each card: `bg-white rounded-2xl shadow-md p-8 border-t-4` with `border-gov-teal` for Mission and `border-muni-gold` for Vision
- Titles: `text-gov-navy`
- Text: `text-text-secondary`

**GSAP animation (ScrollTrigger):**
- Cards stagger in: `gsap.from(cards, { y: 40, stagger: 0.2, duration: 0.8, scrollTrigger: ... })`

### 2.11 ProjectCard (`ProjectCard.astro`)

**Current:** White bordered card, blue link.

**Redesign:**
- Card: `bg-white rounded-2xl shadow-md hover:shadow-xl border-0` with Tailwind `hover:-translate-y-1 transition-all duration-300`
- Title: `text-gov-navy`
- Zone text: `text-gov-teal`
- Link: `text-muni-green hover:text-muni-green-dark font-semibold`
- Top accent: add `border-t-4 border-gov-teal`

**GSAP animation (ScrollTrigger):**
- Staggered entrance: `gsap.from(cards, { y: 50, scale: 0.95, stagger: 0.1, duration: 0.7, scrollTrigger: ... })`

### 2.12 DownloadButton (`DownloadButton.astro`)

**Current:** Blue outlined button.

**Redesign:**
- Style: `border-2 border-gov-teal text-gov-teal hover:bg-gov-teal hover:text-white rounded-full` with Tailwind `transition-all duration-300`
- Icon: `text-current` (inherits color on hover)

**No GSAP needed:** Parent section handles animation.

### 2.13 Footer (`Footer.astro`)

**Current:** `bg-gray-900` with gray text.

**Redesign:**
- Background: `bg-gov-navy` (darker navy)
- Top accent: Add a `div` with `h-1 bg-gradient-to-r from-muni-gold via-gov-teal to-muni-green` at the very top of the footer
- Branding: `text-white`, gold emoji or icon accent
- Navigation links: `text-white/60 hover:text-muni-gold`
- Contact info: `text-white/60` with `text-muni-gold` icons
- Bottom bar: `border-gov-navy-light` divider, `text-white/40`
- Author link: `text-muni-gold hover:text-white`

**GSAP animation (ScrollTrigger):**
- Footer columns: `gsap.from(columns, { y: 30, stagger: 0.15, duration: 0.6, scrollTrigger: { trigger: footer, start: 'top 90%' } })`

---

## 3. Animation Strategy Summary

### Entrance Patterns (all use `gsap.from()`)

| Pattern | Properties | Use Case |
|---------|-----------|----------|
| Slide Up | `{ y: 40-60 }` | Cards, sections, text blocks |
| Slide Left | `{ x: -60-80 }` | Images, form containers |
| Slide Right | `{ x: 60-80 }` | Text blocks, info cards |
| Scale Up | `{ scale: 0.9-0.95 }` | Cards (combined with y) |
| ClipPath Reveal | `{ clipPath: 'inset(0 100% 0 0)' }` | Hero title only |
| Stagger | `{ stagger: 0.1-0.15 }` | Card groups, list items |

### Timing Defaults

- Duration: `0.6 - 1.0s` for most elements
- Ease: `power2.out` (general), `power3.out` (hero elements), `power4.out` (clipPath)
- ScrollTrigger start: `'top 80%'` or `'top 85%'` (trigger when element is near viewport)
- No `scrub` (animations play once, not tied to scroll position)
- `once: true` implicit via default ScrollTrigger behavior

### Hover Effects (Tailwind only, NO GSAP)

All hover states use Tailwind utility classes for simplicity and performance:
- Cards: `hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`
- Buttons: `hover:bg-{color} transition-colors duration-200`
- Links: `hover:text-{color} transition-colors duration-200`

---

## 4. Page-Level Composition

### Home (`index.astro`)
- Services section heading: replace `text-gray-900 underline decoration-sky-300` with `text-gov-navy` and a `border-b-4 border-muni-gold w-20 mx-auto mt-4` accent bar div below

### Servicios (`servicios.astro`)
- Page heading: `text-gov-navy`
- Background: keep `bg-bg-subtle`

### Nosotros (`nosotros.astro`)
- Header banner: `bg-gov-navy` gradient instead of `bg-gray-50`
- Title + subtitle: `text-white`
- Map image: add `drop-shadow-lg`

### Contact (`contact.astro`)
- Page: `bg-bg-subtle` background
- Two-column layout stays, but with redesigned ContactForm + ContactInfo components

### Portal (`portal.astro`)
- Page heading: `text-gov-navy uppercase`
- Grid: stays 4-column on desktop, redesigned ProjectCards handle the visual upgrade

---

## 5. Responsive Considerations

No layout changes needed. The existing responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4`) works well. The redesign is purely visual (colors, shadows, borders, animations).

GSAP animations should use `matchMedia` or be conservative enough to work on mobile without jank. Recommend disabling stagger on screens < 768px if performance is a concern (optional optimization, not required for launch).
