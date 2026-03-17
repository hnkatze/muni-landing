# Design: Migracion Landing Muni

## Architecture Overview

Static site built with Astro 6 (SSG mode) + Tailwind 4. All pages are server-rendered at build time with zero client-side JavaScript except for three interactive islands:

1. **Mobile nav toggle** — vanilla JS `<script>` in Nav component (no framework needed)
2. **Requirements modal** — vanilla JS `<script>` using native `<dialog>` element
3. **Contact form** — vanilla JS `<script>` for fetch-based submission + feedback

No React, no UI libraries. All interactivity is handled with inline `<script>` tags in Astro components.

Portal page fetches project data at **build time** from a static JSON file (not Firebase). If dynamic data is needed later, the page can switch to `export const prerender = false` with an Astro server adapter.

## Directory Structure

```
muni-landing/
├── public/
│   ├── favicon.svg
│   ├── image/
│   │   ├── central-park.png
│   │   ├── finance.jpg
│   │   ├── justice.png
│   │   ├── map.png
│   │   ├── architecture.png
│   │   └── operator.png
│   └── doc/
│       ├── HISTORIA.pdf
│       └── Mision Y Vision.pdf
│
├── src/
│   ├── assets/
│   │   ├── Muni.png
│   │   ├── Bonitomap.svg
│   │   └── servicios/
│   │       ├── architecture.png
│   │       ├── finance.jpg
│   │       ├── justice.png
│   │       ├── map.png
│   │       └── operator.png
│   │
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── AboutSection.astro
│   │   ├── ServiceCard.astro
│   │   ├── ServiceSection.astro
│   │   ├── RequirementsModal.astro
│   │   ├── ProjectCard.astro
│   │   ├── ContactForm.astro
│   │   ├── ContactInfo.astro
│   │   ├── MissionVision.astro
│   │   └── DownloadButton.astro
│   │
│   ├── data/
│   │   ├── servicios.ts            # All service requirement data (consolidated)
│   │   ├── proyectos.json          # Static project data for portal
│   │   ├── navigation.ts           # Nav/footer link definitions
│   │   └── historia.json           # Historical data (migrated for future use)
│   │
│   ├── types/
│   │   └── index.ts                # All TypeScript interfaces
│   │
│   ├── layouts/
│   │   └── Layout.astro            # Root layout (html, head, Nav, Footer)
│   │
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── servicios.astro         # Services
│   │   ├── nosotros.astro          # About
│   │   ├── contact.astro           # Contact
│   │   └── portal.astro            # Projects portal
│   │
│   └── styles/
│       └── global.css              # Tailwind import + custom animations
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Component Architecture

```
Layout.astro
├── Nav.astro
├── <slot /> (page content)
└── Footer.astro

index.astro
├── Hero.astro { title }
├── AboutSection.astro { title, content, imageUrl }
└── ServiceCard.astro x5 { title, description, imageUrl, href }

servicios.astro
└── ServiceSection.astro x5 { title, description, imageSrc, subServices }
    └── RequirementsModal.astro (single shared instance at page bottom)

nosotros.astro
├── (header banner — inline)
├── MissionVision.astro
└── DownloadButton.astro x2 { label, href }

contact.astro
├── ContactForm.astro
└── ContactInfo.astro

portal.astro
└── ProjectCard.astro x N { proyecto }
```

### Key Patterns

- **No prop drilling for data** — pages import data directly from `src/data/` and pass to components via props.
- **Single modal instance** — the servicios page has ONE `<dialog>` at the page bottom. Buttons set its content via JS `data-*` attributes, avoiding per-button modals.
- **Interactive components use `<script>` tags** — Astro bundles and deduplicates these automatically. No framework island needed.

## Data Architecture

### Consolidated Service Data (`src/data/servicios.ts`)

Instead of 5 separate files + index, consolidate into one file with a single exported structure:

```typescript
import type { ServiceDepartment } from '../types';

export const serviceDepartments: ServiceDepartment[] = [
  {
    id: 'secretaria',
    title: 'Secretaria',
    description: 'Esta oficina se encarga de las gestiones directas con el alcalde...',
    image: 'operator.png',
    subServices: [
      {
        title: 'Requisitos para Matrimonio',
        requirements: [
          'Acta de Soltería (de ambos)',
          // ... all 9 items
        ],
      },
      // ...
    ],
  },
  // ... 4 more departments
];
```

All requirement string arrays are preserved exactly from the source files.

### Navigation Data (`src/data/navigation.ts`)

```typescript
import type { NavLink } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Portal', href: '/portal' },
  { label: 'Contacto', href: '/contact' },
];
```

### Projects Data (`src/data/proyectos.json`)

Static JSON file with project entries. Populated manually from the current Firebase data:

```json
[
  {
    "titulo": "...",
    "descripcion": "...",
    "zonas": "...",
    "enlace": "https://..."
  }
]
```

### Historia Data (`src/data/historia.json`)

Direct copy from source `src/utilities/Historia.json`. Not used by any page currently, kept for future use.

## Page Architecture

### Home (`/`) — `index.astro`

| Section | Component | Data Source |
|---------|-----------|-------------|
| Hero | `Hero.astro` | Props: `title` (hardcoded in page) |
| Sobre Nosotros | `AboutSection.astro` | Props: `title`, `content`, `imageUrl` (hardcoded) |
| Servicios heading | Inline `<p>` | Hardcoded |
| 5 service cards | `ServiceCard.astro` x5 | Hardcoded array in page frontmatter |

### Servicios (`/servicios`) — `servicios.astro`

| Section | Component | Data Source |
|---------|-----------|-------------|
| 5 service sections | `ServiceSection.astro` x5 | `serviceDepartments` from `src/data/servicios.ts` |
| Requirements modal | `RequirementsModal.astro` x1 | Populated via JS from `data-*` attributes |

**Modal interaction flow:**
1. Each sub-service button has `data-title` and `data-requirements` (JSON-encoded) attributes
2. A single `<dialog id="requirements-modal">` exists at page bottom
3. Click handler reads `data-*`, populates modal content, calls `dialog.showModal()`
4. "Cerrar" button calls `dialog.close()`

### Nosotros (`/nosotros`) — `nosotros.astro`

| Section | Component | Data Source |
|---------|-----------|-------------|
| Header banner | Inline markup | Hardcoded text + `Bonitomap.svg` import |
| Mission/Vision | `MissionVision.astro` | Hardcoded text in component |
| PDF downloads | `DownloadButton.astro` x2 | Props: `label`, `href` |

### Contact (`/contact`) — `contact.astro`

| Section | Component | Data Source |
|---------|-----------|-------------|
| Form | `ContactForm.astro` | Self-contained with `<script>` |
| Info panel | `ContactInfo.astro` | Hardcoded contact data |

### Portal (`/portal`) — `portal.astro`

| Section | Component | Data Source |
|---------|-----------|-------------|
| Heading | Inline `<h1>` | Hardcoded |
| Project grid | `ProjectCard.astro` x N | `import proyectos from '../data/proyectos.json'` |

## Contact Form Design

### Approach: Astro API Endpoint (SSR for this route only)

**Option chosen**: Static HTML form with client-side `fetch` to an external service.

Since the project is SSG by default and adding a server adapter just for one endpoint adds complexity, the contact form will use **Formspree** (or equivalent free service) as the form backend.

```
ContactForm.astro
├── <form> with native validation (required attributes)
├── <script>
│   ├── Intercept submit event
│   ├── POST to Formspree endpoint (or configurable URL)
│   ├── On success: show inline success message, clear fields
│   └── On error: show inline error message
└── Success/error message <div> (hidden by default)
```

**Alternative**: If the user wants Firebase, the form can POST to a Firebase Cloud Function URL instead. The `<script>` logic is identical — only the URL changes.

**No toast library needed** — success/error feedback is an inline `<div>` that toggles visibility with Tailwind classes (`hidden` / `block`).

### Form Validation

- All fields use HTML `required` attribute
- Email field uses `type="email"` for browser-native validation
- No custom JS validation needed

## Styling Strategy

### Tailwind 4 Setup

`src/styles/global.css`:
```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', sans-serif;
}
```

Font loaded via Google Fonts CDN in `Layout.astro` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Color Palette (from source)

The source project uses default Tailwind colors. Key colors used:

| Usage | Class |
|-------|-------|
| Text primary | `text-gray-900` |
| Text secondary | `text-gray-500` |
| Background light | `bg-gray-50/90` |
| Accent (servicios heading) | `decoration-sky-300` |
| Success (checkmarks) | `text-green-500` |
| Buttons (sub-services) | `text-green-600 hover:bg-green-50` |
| Download buttons | `border-blue-600 text-blue-600 hover:bg-blue-50` |
| Submit button | `bg-gray-900 text-white hover:bg-gray-800` |
| Footer copyright | `text-gray-500` |

### Responsive Breakpoints

Standard Tailwind breakpoints, matching source patterns:

| Breakpoint | Usage |
|------------|-------|
| Default (mobile) | Single column, hamburger nav |
| `md:` (768px) | 2-column grids, side-by-side layouts |
| `lg:` (1024px) | Full desktop nav, multi-column layouts |
| `xl:` (1280px) | Max-width text sizing |

### No Dark Mode

The source project has some `dark:` classes but no theme toggle. These will be **omitted** in the migration to keep scope minimal.

## Asset Management

### `src/assets/` — Optimized by Astro

Images imported in Astro components use the `<Image>` component from `astro:assets`:

```astro
---
import { Image } from 'astro:assets';
import muniLogo from '../assets/Muni.png';
---
<Image src={muniLogo} alt="Muni" width={550} height={650} />
```

Used for:
- `Muni.png` (hero logo) — large image, benefits from optimization
- `Bonitomap.svg` (nosotros map) — SVG, passed through as-is
- `servicios/*.png|jpg` — service section images on servicios page

### `public/` — Served As-Is

Used for:
- `image/` — service card images on home page (referenced by URL string in data)
- `doc/` — PDF downloads (must not be processed)
- `favicon.svg`

**Why split?** The servicios page uses `<Image>` for optimization (import-based). The home page service cards reference images by URL string from hardcoded data, which requires `public/`.

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering mode | SSG (static) | Content is 100% static, no user-specific data |
| Interactive components | Vanilla JS `<script>` | Only 3 small interactions; no framework overhead justified |
| Modal implementation | Native `<dialog>` | Zero dependencies, accessible by default, supported in all modern browsers |
| Contact form backend | External service (Formspree) | Avoids needing a server adapter for one endpoint |
| Service data format | Single TS file | Easier to maintain than 5 files + index; type-safe imports |
| Project data | Static JSON | Decouples from Firebase; data rarely changes |
| Font loading | Google Fonts CDN | Simpler than npm package; good caching via CDN |
| Dark mode | Omitted | Source has partial dark classes but no toggle; out of scope |
| Icons | Inline SVG | Source uses Ant Design icons only for arrows/flags; trivial to inline |
| Nav mobile menu | CSS + vanilla JS | `<script>` toggles a class; menu animated with Tailwind transitions |
| Image optimization | `astro:assets` `<Image>` | Automatic WebP/AVIF conversion, lazy loading, size hints |
| Consolidated data file | Yes | 5 source files merged into 1 typed array; reduces file count without losing structure |

## Component Interfaces

```typescript
// src/types/index.ts

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
}

/** Sub-service with its requirements list */
export interface SubService {
  title: string;
  requirements: string[];
}

/** A municipal service department */
export interface ServiceDepartment {
  id: string;
  title: string;
  description: string;
  image: string;         // filename in src/assets/servicios/
  subServices: SubService[];
}

/** Home page service card data */
export interface ServiceCardData {
  title: string;
  description: string;
  imageUrl: string;      // path in public/image/
}

/** Portal project entry */
export interface Proyecto {
  titulo: string;
  descripcion: string;
  zonas: string;
  enlace: string;
}

/** Contact form submission payload */
export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Historical period entry (future use) */
export interface HistoriaEntry {
  fecha: string;
  eventos: string;
  alcalde: string;
  regidores: string[];
  vice_alcalde?: string;
  vice_alcaldesa?: string;
  logros?: string;
  presidencia_edificio_municipal?: string;
}
```

### Component Props (Astro `Props` interface pattern)

**Hero.astro**
```typescript
interface Props {
  title: string;
}
```

**AboutSection.astro**
```typescript
interface Props {
  title: string;
  content: string;
  imageUrl: string;  // public/ path
}
```

**ServiceCard.astro**
```typescript
interface Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}
```

**ServiceSection.astro**
```typescript
import type { SubService } from '../types';
import type { ImageMetadata } from 'astro';

interface Props {
  title: string;
  description: string;
  imageSrc: ImageMetadata;  // imported image for astro:assets
  subServices: SubService[];
}
```

**ProjectCard.astro**
```typescript
import type { Proyecto } from '../types';

interface Props {
  proyecto: Proyecto;
}
```

**DownloadButton.astro**
```typescript
interface Props {
  label: string;
  href: string;
}
```

**ContactForm.astro** — No props (self-contained)

**ContactInfo.astro** — No props (hardcoded contact data)

**Nav.astro** — No props (imports `navLinks` from data)

**Footer.astro** — No props (imports `navLinks` from data)
