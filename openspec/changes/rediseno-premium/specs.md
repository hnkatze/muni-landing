# Specs: Rediseño Premium Municipal

**Change**: rediseno-premium
**Status**: Draft
**Proposal**: [proposal.md](./proposal.md)

---

## 1. Global Theme

### SPEC-THEME-01: Color Palette

**Given** the Tailwind 4 `@theme` configuration in `src/styles/global.css`
**When** the theme is defined
**Then** it MUST include the following custom colors:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gov-navy` | `#003366` | Primary, authority, headers |
| `--color-gov-teal` | `#0B7A9F` | Accent, secondary elements |
| `--color-muni-green` | `#2ECC71` | Services, CTAs, success |
| `--color-muni-gold` | `#D4AF37` | Official accents, premium details |
| `--color-text-primary` | `#1A1A2E` | Body text, headings |
| `--color-text-secondary` | `#4A4A5C` | Descriptions, subtitles |
| `--color-text-tertiary` | `#8B8B9D` | Captions, metadata |
| `--color-bg-subtle` | `#F8F9FB` | Section backgrounds |

**And** all existing `text-gray-900` usages MUST be replaced with `text-text-primary`
**And** all existing `text-gray-600` usages MUST be replaced with `text-text-secondary`
**And** all existing `bg-gray-900` usages MUST be replaced with appropriate `bg-gov-navy` variants

### SPEC-THEME-02: Typography

**Given** the Layout component (`src/layouts/Layout.astro`)
**When** fonts are loaded
**Then** Inter MUST be the primary font family (already configured via Google Fonts)
**And** the body MUST use `font-sans text-text-primary antialiased`

### SPEC-THEME-03: Section Spacing

**Given** any `<section>` element across all pages
**When** vertical padding is applied
**Then** sections MUST use `py-16 lg:py-24` for consistent spacing
**And** horizontal padding MUST remain `px-4 sm:px-6 lg:px-8`
**And** max width MUST remain `max-w-7xl mx-auto`

---

## 2. Navigation (`src/components/Nav.astro`)

### SPEC-NAV-01: Official Badge

**Given** the navigation branding area
**When** the Nav component renders
**Then** the emoji `🇭🇳` MUST be replaced with a badge element
**And** the badge MUST display the text "BO"
**And** the badge MUST use `bg-gov-navy text-white rounded-lg font-bold` styling
**And** the badge MUST be approximately `w-10 h-10` with centered text

### SPEC-NAV-02: Two-Line Branding

**Given** the branding text next to the badge
**When** the Nav component renders
**Then** the branding MUST display on two lines:
  - Line 1: "Municipalidad" in `text-xs uppercase tracking-wider text-text-tertiary`
  - Line 2: "Bonito Oriental" in `text-sm font-bold text-text-primary`
**And** the badge and text MUST be in a `flex items-center gap-3` container

### SPEC-NAV-03: Desktop Links with Animated Underline

**Given** desktop navigation links (hidden on mobile, visible `lg:flex`)
**When** a link is hovered
**Then** a green underline (`bg-muni-green`) MUST grow from left to right
**And** the underline MUST be implemented as an `::after` pseudo-element or a `<span>` with `transition-transform origin-left scale-x-0 hover:scale-x-100`
**And** the underline height MUST be `h-0.5` (2px)
**And** link text MUST use `text-sm font-medium text-text-secondary hover:text-text-primary`

### SPEC-NAV-04: Mobile Slide Panel

**Given** the mobile menu (`#mobile-menu`)
**When** the hamburger button is clicked
**Then** the menu MUST slide in from the right (or top) instead of toggling `hidden`
**And** links MUST use the new color palette (`text-text-secondary`, `hover:text-gov-navy`)

### SPEC-NAV-05: Height and Styling

**Given** the `<nav>` element
**When** rendered
**Then** the nav height MUST be `h-20` (80px, up from current `h-16`)
**And** background MUST be `bg-white/95 backdrop-blur`
**And** the nav MUST remain `sticky top-0 z-50`
**And** the bottom border MUST use `border-gray-200/80`

### SPEC-NAV-06: GSAP Scroll Hide/Show

**Given** the user scrolls the page
**When** the user scrolls **down** more than 80px
**Then** the nav MUST animate to `y: -80` (hidden above viewport)
**When** the user scrolls **up** (any amount)
**Then** the nav MUST animate to `y: 0` (visible)
**And** the animation MUST use `duration: 0.4, ease: 'power2.out'`
**And** MUST NOT use `opacity: 0` — the nav slides out via `y` transform only

---

## 3. Hero (`src/components/Hero.astro`)

### SPEC-HERO-01: Gradient Background

**Given** the Hero section
**When** rendered
**Then** the background MUST use a subtle gradient: `bg-gradient-to-br from-gov-navy/5 via-gov-teal/5 to-transparent`
**And** the section MUST remain `min-h-screen flex flex-col items-center justify-center`

### SPEC-HERO-02: Decorative Blur Circles

**Given** the Hero section container
**When** rendered
**Then** there MUST be two decorative `<div>` elements positioned absolutely:
  - Circle 1: `bg-muni-gold/5 blur-3xl rounded-full w-96 h-96` positioned top-right area
  - Circle 2: `bg-gov-teal/5 blur-3xl rounded-full w-80 h-80` positioned bottom-left area
**And** these MUST have `pointer-events-none` and `absolute` positioning
**And** the parent container MUST have `relative overflow-hidden`

### SPEC-HERO-03: Logo GSAP Entrance

**Given** the municipal logo image (`muniLogo`)
**When** the page loads
**Then** GSAP MUST animate the logo from `{ scale: 0.7, y: 100 }` to `{ scale: 1, y: 0 }`
**And** the animation MUST use `ease: 'back.out(1.7)'` and `duration: 1.2`
**And** the logo MUST NOT start with `opacity: 0` — it MUST start fully visible at its transformed position
**And** the logo MUST have `force3D: true`

### SPEC-HERO-04: Title clipPath Reveal

**Given** the `<h1>` title element
**When** the page loads (after logo animation)
**Then** GSAP MUST animate the title using `clipPath`:
  - From: `clipPath: 'inset(0 100% 0 0)'` (clipped from right)
  - To: `clipPath: 'inset(0 0% 0 0)'` (fully revealed)
**And** the animation MUST use `duration: 1, ease: 'power3.out'`
**And** it MUST be delayed to start after the logo entrance (e.g., `delay: 0.5` or part of a timeline)

### SPEC-HERO-05: Subtitle

**Given** the Hero section below the title
**When** rendered
**Then** a subtitle paragraph MUST display: "Comprometidos con el bienestar y progreso de nuestra comunidad"
**And** it MUST use `text-lg text-text-secondary max-w-2xl`

### SPEC-HERO-06: Dual CTAs

**Given** the Hero section below the subtitle
**When** rendered
**Then** two CTA buttons MUST be displayed in a `flex gap-4` container:
  - **Primary CTA**: text "Conocer Servicios", links to `/servicios`
    - Style: `bg-muni-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-muni-green/90 transition-colors`
  - **Secondary CTA**: text "Sobre Nosotros", links to `/nosotros`
    - Style: `border-2 border-gov-navy text-gov-navy px-8 py-3 rounded-lg font-semibold hover:bg-gov-navy hover:text-white transition-colors`

### SPEC-HERO-07: Scroll Indicator

**Given** the bottom of the Hero section
**When** rendered
**Then** a bouncing arrow indicator MUST be displayed at the bottom
**And** it MUST use Tailwind's `animate-bounce` class
**And** the arrow MUST be a chevron-down SVG icon in `text-text-tertiary`
**And** it MUST be positioned with `absolute bottom-8`

---

## 4. About Section (`src/components/AboutSection.astro`)

### SPEC-ABOUT-01: Eyebrow Label

**Given** the About section
**When** rendered
**Then** above the title there MUST be an eyebrow label: "Conoce Nuestra Municipalidad"
**And** it MUST use `text-sm uppercase tracking-widest text-muni-green font-semibold`

### SPEC-ABOUT-02: Title Styling

**Given** the About section title ("Sobre Nosotros")
**When** rendered
**Then** the title MUST use `text-3xl lg:text-4xl font-bold text-gov-navy`

### SPEC-ABOUT-03: Image Gold Glow

**Given** the About section image
**When** rendered
**Then** the image container MUST have a gold glow effect behind it
**And** the glow MUST be implemented as a `<div>` with `absolute -inset-4 bg-muni-gold/20 blur-2xl rounded-2xl` behind the image
**And** the image container MUST have `relative` positioning
**And** the image MUST remain `rounded-lg object-cover`

### SPEC-ABOUT-04: Stats Row

**Given** the About section content area
**When** rendered
**Then** below the text content, a stats row MUST display three items:
  - "100%" with label "Compromiso"
  - "5+" with label "Departamentos"
  - "24/7" with label "Servicio"
**And** each stat MUST use the number in `text-2xl font-bold text-gov-navy` and label in `text-sm text-text-tertiary`
**And** stats MUST be separated by vertical dividers (`border-r border-gray-200`) on desktop
**And** the row MUST use `flex items-center justify-around mt-8 pt-8 border-t border-gray-200`

### SPEC-ABOUT-05: GSAP Scroll Animation

**Given** the About section enters the viewport
**When** ScrollTrigger fires (trigger: the section, start: `'top 80%'`)
**Then** the image MUST animate from `{ x: -100 }` to `{ x: 0 }`
**And** the content MUST animate from `{ x: 100 }` to `{ x: 0 }`
**And** both MUST use `duration: 1, ease: 'power3.out'`
**And** MUST use `toggleActions: 'play none none none'` (fire once)
**And** MUST NOT use `opacity: 0` — elements start visible at their offset positions
**And** MUST use `force3D: true`

---

## 5. Service Cards — Home (`src/components/ServiceCard.astro`)

### SPEC-SCARD-01: Rectangular Card with Image Overlay

**Given** a service card on the home page
**When** rendered
**Then** the card MUST be a rectangular card (`w-full md:w-[calc(33%-1rem)]`) with `rounded-xl overflow-hidden`
**And** the image MUST fill the top portion of the card (`h-48 w-full object-cover`)
**And** a gradient overlay MUST sit on the image: `bg-gradient-to-t from-gov-navy/80 via-gov-navy/30 to-transparent`
**And** the current circular image layout MUST be replaced with this rectangular format

### SPEC-SCARD-02: Service Badge

**Given** a service card
**When** rendered
**Then** a small pill badge MUST appear on the top-left corner of the image
**And** the badge MUST display "Servicio"
**And** styling: `bg-muni-green text-white text-xs font-semibold px-3 py-1 rounded-full absolute top-3 left-3`

### SPEC-SCARD-03: Image Hover Zoom

**Given** a service card
**When** the user hovers over the card
**Then** the image MUST scale to `scale-110` with `transition-transform duration-500`
**And** the card MUST have `overflow-hidden` to contain the zoom

### SPEC-SCARD-04: Arrow Link

**Given** the "Ver Mas" link on a service card
**When** rendered
**Then** the text MUST change to "Ver Detalles"
**And** a right-arrow icon (`→` or SVG arrow) MUST appear next to the text
**And** on hover, the arrow MUST translate right slightly (`hover:translate-x-1 transition-transform`)
**And** the link MUST use `text-muni-green font-semibold`

### SPEC-SCARD-05: GSAP Staggered Entrance

**Given** the service cards section on the home page
**When** the section enters the viewport (ScrollTrigger, start: `'top 80%'`)
**Then** all cards MUST animate in with `gsap.from` using `{ y: 60, scale: 0.9 }`
**And** the stagger MUST be `0.15` seconds between each card
**And** the ease MUST be `'back.out(1.4)'`
**And** MUST NOT use `opacity: 0`
**And** MUST use `force3D: true`

### SPEC-SCARD-06: Home Services Section Header

**Given** the "Servicios" heading on the home page (`src/pages/index.astro`)
**When** rendered
**Then** the heading MUST use `text-3xl lg:text-4xl font-bold text-gov-navy` (no underline)
**And** below the heading, a decorative gold bar MUST appear: `w-16 h-1 bg-muni-gold mx-auto mt-4 rounded-full`
**And** the existing `decoration-sky-300` underline MUST be removed

---

## 6. Servicios Page (`src/pages/servicios.astro`, `src/components/ServiceSection.astro`)

### SPEC-SERV-01: Page Header with Accent Line

**Given** the Servicios page heading
**When** rendered
**Then** the `<h1>` MUST use `text-gov-navy font-bold`
**And** below the title, a gold accent bar MUST appear: `w-20 h-1 bg-muni-gold mx-auto mt-4 rounded-full`

### SPEC-SERV-02: Service Section Styling

**Given** each `ServiceSection` component
**When** rendered
**Then** the section divider MUST use `border-gray-200/50` instead of `border-gray-200`
**And** the title MUST use `text-gov-navy` instead of `text-gray-900`
**And** the "Requisitos De:" subtitle MUST use `text-gov-navy/80`
**And** requirement buttons MUST use `border-muni-green/30 text-muni-green hover:bg-muni-green/10`

### SPEC-SERV-03: GSAP Scroll Reveals

**Given** each `ServiceSection` on the Servicios page
**When** it enters the viewport (ScrollTrigger, start: `'top 80%'`)
**Then** it MUST animate from `{ y: 40 }` to `{ y: 0 }`
**And** MUST use `duration: 0.8, ease: 'power2.out'`
**And** MUST NOT use `opacity: 0`
**And** MUST use `toggleActions: 'play none none none'`

### SPEC-SERV-04: Modal Updated Colors

**Given** the RequirementsModal dialog (`src/components/RequirementsModal.astro`)
**When** displayed
**Then** the modal title MUST use `text-gov-navy`
**And** checkmark icons MUST use `text-muni-green` (already green, verify consistency)
**And** the close button MUST use `bg-gov-navy hover:bg-gov-navy/90` instead of `bg-gray-900`

---

## 7. Nosotros Page (`src/pages/nosotros.astro`, `src/components/MissionVision.astro`)

### SPEC-NOS-01: Banner Gradient

**Given** the header banner on the Nosotros page
**When** rendered
**Then** the background MUST change from `bg-gray-50/90` to `bg-gradient-to-br from-gov-navy/5 via-gov-teal/5 to-bg-subtle`
**And** the heading MUST use `text-gov-navy`
**And** the subtitle MUST use `text-text-secondary`

### SPEC-NOS-02: Mission/Vision Cards with Accent Border

**Given** the MissionVision component
**When** rendered
**Then** each card (Mission and Vision) MUST have a left border accent:
  - Mission: `border-l-4 border-gov-navy`
  - Vision: `border-l-4 border-gov-teal`
**And** cards MUST have `bg-white rounded-lg p-8 shadow-sm`
**And** titles MUST use `text-gov-navy` (Mission) and `text-gov-teal` (Vision)

### SPEC-NOS-03: Download Buttons

**Given** the DownloadButton components (`src/components/DownloadButton.astro`)
**When** rendered
**Then** the border and text MUST change from `border-blue-600 text-blue-600` to `border-gov-navy text-gov-navy`
**And** hover MUST use `hover:bg-gov-navy/10` instead of `hover:bg-blue-50`

---

## 8. Contact Page (`src/pages/contact.astro`, `src/components/ContactForm.astro`, `src/components/ContactInfo.astro`)

### SPEC-CONTACT-01: Section Header

**Given** the Contact page
**When** rendered
**Then** a centered section header MUST appear above the grid:
  - Eyebrow: "Contáctanos" in `text-sm uppercase tracking-widest text-muni-green font-semibold`
  - Title: "Ponte en Contacto" in `text-3xl lg:text-4xl font-bold text-gov-navy`
  - Gold bar: `w-16 h-1 bg-muni-gold mx-auto mt-4 rounded-full`

### SPEC-CONTACT-02: Form Card Styling

**Given** the ContactForm component
**When** rendered
**Then** the form MUST be wrapped in a white card: `bg-white rounded-xl border border-gray-200 p-8 shadow-sm`
**And** the submit button MUST use `bg-muni-green hover:bg-muni-green/90 text-white` instead of `bg-gray-900`
**And** input focus states MUST use `focus:border-gov-teal focus:ring-gov-teal`

### SPEC-CONTACT-03: Info Panel Gradient Cards

**Given** the ContactInfo component
**When** rendered
**Then** each info block (Direccion, Telefono, Correo) MUST be an individual card with:
  - `bg-white rounded-lg p-5 shadow-sm border border-gray-100`
  - A colored icon circle: `w-10 h-10 rounded-full bg-muni-green/10 flex items-center justify-center` with `text-muni-green` icon inside
**And** the overall container background MUST change from `bg-gray-50` to `bg-bg-subtle rounded-xl p-6`
**And** titles MUST use `text-text-primary`

### SPEC-CONTACT-04: GSAP Entrance Animation

**Given** the Contact page content enters the viewport
**When** ScrollTrigger fires (start: `'top 80%'`)
**Then** the form MUST animate from `{ x: -80 }` to `{ x: 0 }`
**And** the info panel MUST animate from `{ x: 80 }` to `{ x: 0 }`
**And** both MUST use `duration: 0.8, ease: 'power3.out'`
**And** MUST NOT use `opacity: 0`
**And** MUST use `force3D: true`

---

## 9. Portal Page (`src/pages/portal.astro`, `src/components/ProjectCard.astro`)

### SPEC-PORTAL-01: Page Header

**Given** the Portal page heading
**When** rendered
**Then** the heading MUST use `text-gov-navy font-bold`
**And** a gold accent bar MUST appear below: `w-20 h-1 bg-muni-gold mx-auto mt-4 rounded-full`

### SPEC-PORTAL-02: Card Hover Lift Effect

**Given** a ProjectCard component
**When** the user hovers over the card
**Then** GSAP MUST animate the card to `{ y: -10, scale: 1.03, boxShadow: '0 20px 40px rgba(0,51,102,0.15)' }`
**When** the user stops hovering
**Then** GSAP MUST animate back to `{ y: 0, scale: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }`
**And** both animations MUST use `duration: 0.3, ease: 'power2.out'`

### SPEC-PORTAL-03: Card Styling

**Given** a ProjectCard
**When** rendered
**Then** the card border MUST use `border-gray-200/80`
**And** the title MUST use `text-text-primary`
**And** the "Ver Aqui!!" link MUST change to "Ver Proyecto →"
**And** the link MUST use `text-gov-teal hover:text-gov-teal/80` instead of `text-blue-600`

### SPEC-PORTAL-04: GSAP Staggered Grid Entrance

**Given** the project cards grid on the Portal page
**When** the grid enters the viewport (ScrollTrigger, start: `'top 80%'`)
**Then** cards MUST animate from `{ y: 50, scale: 0.95 }` to `{ y: 0, scale: 1 }`
**And** stagger MUST be `0.1` seconds
**And** ease MUST be `'back.out(1.2)'`
**And** MUST NOT use `opacity: 0`
**And** MUST use `force3D: true, toggleActions: 'play none none none'`

---

## 10. Footer (`src/components/Footer.astro`)

### SPEC-FOOTER-01: Navy Background

**Given** the Footer component
**When** rendered
**Then** the background MUST use `bg-gov-navy` instead of `bg-gray-900`
**And** text colors MUST use `text-gray-300` for body and `text-white` for headings (keep existing)

### SPEC-FOOTER-02: Gold Accent Line

**Given** the top of the Footer
**When** rendered
**Then** a gold accent line MUST appear at the very top of the footer
**And** it MUST be `h-1 bg-muni-gold w-full` (full width bar)

### SPEC-FOOTER-03: Badge Instead of Emoji

**Given** the footer branding
**When** rendered
**Then** the emoji `🇭🇳` MUST be replaced with the same "BO" badge as the Nav
**And** the badge MUST use `bg-white/10 text-white rounded-lg font-bold w-10 h-10` (inverted for dark bg)

### SPEC-FOOTER-04: Link Hover Color

**Given** navigation links in the footer
**When** hovered
**Then** links MUST use `hover:text-muni-green` instead of `hover:text-white`

### SPEC-FOOTER-05: Bottom Bar

**Given** the bottom copyright section
**When** rendered
**Then** the border MUST use `border-white/10` instead of `border-gray-700`
**And** the year MUST be dynamic or updated to current year

---

## 11. Animation Rules (Global)

### SPEC-ANIM-01: No Opacity Zero

**Given** ANY GSAP animation in the entire project
**When** defining the `from` or initial state
**Then** the animation MUST NOT use `opacity: 0` as an initial value
**And** the animation MUST NOT use `autoAlpha: 0`
**And** elements MUST always be visible — animations MUST rely solely on transforms (`y`, `x`, `scale`, `clipPath`, `rotate`)

### SPEC-ANIM-02: Transform-Only Animations

**Given** ANY GSAP animation
**When** defining properties
**Then** the animation MUST use ONLY these transform properties:
  - `y` — vertical translate
  - `x` — horizontal translate
  - `scale` — uniform scale
  - `scaleX`, `scaleY` — axis scale
  - `clipPath` — clip reveal
  - `rotate`, `rotateX`, `rotateY` — rotation
  - `boxShadow` — for hover elevation effects
**And** `force3D: true` MUST be set for GPU acceleration

### SPEC-ANIM-03: ScrollTrigger Configuration

**Given** any scroll-based animation
**When** configuring ScrollTrigger
**Then** `toggleActions` MUST be `'play none none none'` (fire once, do not reverse)
**And** `start` SHOULD be `'top 80%'` unless otherwise specified
**And** `markers` MUST NOT be enabled in production

### SPEC-ANIM-04: GSAP Setup in Layout

**Given** the Layout component (`src/layouts/Layout.astro`)
**When** the page loads
**Then** GSAP and ScrollTrigger MUST be imported and registered globally
**And** the GSAP library MUST be installed via npm (`gsap`)
**And** ScrollTrigger MUST be registered with `gsap.registerPlugin(ScrollTrigger)`

### SPEC-ANIM-05: Animation Performance

**Given** any GSAP animation on mobile devices
**When** executing
**Then** all animations MUST use `force3D: true` to leverage GPU
**And** animations SHOULD use `will-change: transform` on animated elements via Tailwind (`will-change-transform`)
**And** complex animations SHOULD be simplified on mobile (fewer stagger items, shorter durations)

---

## File Impact Summary

| File | Type | Changes |
|------|------|---------|
| `package.json` | Modified | Add `gsap` dependency |
| `src/styles/global.css` | Modified | Add `@theme` color tokens |
| `src/layouts/Layout.astro` | Modified | GSAP global setup |
| `src/components/Nav.astro` | Modified | Badge, underline, scroll hide/show |
| `src/components/Hero.astro` | Modified | Gradient, blurs, CTAs, GSAP entrance |
| `src/components/AboutSection.astro` | Modified | Eyebrow, gold glow, stats, GSAP |
| `src/components/ServiceCard.astro` | Modified | Rectangular, overlay, badge, GSAP |
| `src/components/Footer.astro` | Modified | Navy bg, gold line, badge |
| `src/components/ServiceSection.astro` | Modified | Colors, GSAP scroll reveal |
| `src/components/RequirementsModal.astro` | Modified | Navy/green colors |
| `src/components/MissionVision.astro` | Modified | Accent borders, card styling |
| `src/components/DownloadButton.astro` | Modified | Navy outlined style |
| `src/components/ContactForm.astro` | Modified | Card wrapper, green CTA, GSAP |
| `src/components/ContactInfo.astro` | Modified | Icon cards, gradient bg |
| `src/components/ProjectCard.astro` | Modified | Hover lift, GSAP, link text |
| `src/pages/index.astro` | Modified | Section header styling |
| `src/pages/servicios.astro` | Modified | Header accent bar |
| `src/pages/nosotros.astro` | Modified | Banner gradient |
| `src/pages/contact.astro` | Modified | Section header, GSAP setup |
| `src/pages/portal.astro` | Modified | Header, GSAP grid entrance |
