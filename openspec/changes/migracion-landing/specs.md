# Specs: Migracion Landing Muni

> Source: Next.js 14 (`C:\Users\Camilo\proyectos\muni`)
> Target: Astro 6 + Tailwind 4 (`C:\Users\Camilo\proyectos\muni-landing`)

---

## 1. Layout y Navegacion

### 1.1 Root Layout

**Description**: Base HTML wrapper for all pages. Sets lang, loads font, renders Nav + content + Footer.

**Scenarios**:

- **Given** a user visits any page, **When** the page loads, **Then** the document MUST have `<html lang="es">`, load the Inter font (or equivalent system/web font), and render the Nav component at the top, the page content in a `<main>`, and the Footer at the bottom.
- **Given** the root layout, **When** rendered, **Then** the `<title>` MUST default to "Bonito Oriental" and `<meta name="description">` MUST be "Municipalidad de Bonito Oriental".
- **Given** Astro target, **When** migrating, **Then** the layout MUST NOT include NextUI `Providers`, `ToastContainer`, or any React-specific client wrappers. Toasts SHALL be replaced with native browser feedback or a lightweight Astro-compatible alternative.

### 1.2 Navigation (Nav)

**Description**: Top navigation bar with links. Responsive: full horizontal nav on desktop (lg+), hamburger menu on mobile.

**Scenarios**:

- **Given** a desktop viewport (lg+), **When** the Nav renders, **Then** it MUST display the following links horizontally: "Inicio" (`/`), "Servicios" (`/servicios`), "Nosotros" (`/nosotros`), "Portal" (`/portal`), "Contacto" (`/contact`).
- **Given** a mobile viewport (<lg), **When** the Nav renders, **Then** it MUST show a hamburger icon button. **When** the user clicks the hamburger, **Then** a side panel or dropdown MUST appear with the same 5 links.
- **Given** the source has a "Recursos" link, **When** migrating, **Then** the "Recursos" link MUST be **excluded** (out of scope).
- **Given** any nav link, **When** clicked, **Then** the mobile menu (if open) MUST close.
- **Given** the Nav, **When** rendered, **Then** a screen-reader-only label "Bonito Oriental" MUST be present on the logo/home link area.

### 1.3 Footer

**Description**: Site-wide footer with branding, navigation links, contact info, and copyright.

**Scenarios**:

- **Given** the Footer renders, **When** displayed, **Then** it MUST contain:
  - A flag icon + text "Municipalidad Bonito Oriental"
  - Navigation links: Inicio, Servicios, Nosotros, Portal, Contacto (NO Recursos)
  - Address: "Calle Central Este, Barrio Las Acacias"
  - Email: "municipalidadbonitoriental@gmail.com"
  - Phone: "+504 2438-9111"
  - Copyright text: "© 2023 Municipalidad Bonito Oriental. All rights reserved."
  - Author credit: "By Camilo Henriquez" linking to `https://www.linkedin.com/in/hnkatze/`
- **Given** the Footer, **When** rendered, **Then** all links MUST use standard `<a>` tags (no NextUI `Link` component).

---

## 2. Home Page (`/`)

**Description**: Landing page with hero section, "Sobre Nosotros" blurb, and 5 service cards.

### 2.1 Hero Section (Principal)

**Scenarios**:

- **Given** a user visits `/`, **When** the page loads, **Then** it MUST display a full-viewport-height hero section containing:
  - The municipality logo image (`Muni.png`) at approximately 550x650px
  - The title "MUNICIPALIDAD DE BONITO ORIENTAL" in uppercase, centered, large text (text-4xl on mobile, text-6xl on lg+)
- **Given** the hero image, **When** rendered, **Then** it MUST have `alt="Muni"` and use Astro's `<Image>` component for optimization.

### 2.2 Sobre Nosotros Section

**Scenarios**:

- **Given** the home page, **When** scrolled past the hero, **Then** it MUST display a section with:
  - Title: "Sobre Nosotros"
  - Content: "Somos una municipalidad comprometida fervientemente con el bienestar y progreso de nuestra amada comunidad. Nos dedicamos incansablemente a velar por cada uno de nuestros ciudadanos, buscando constantemente su prosperidad y calidad de vida. Nuestro compromiso es inquebrantable, enfocado en construir un futuro donde todos puedan sentirse seguros, escuchados y respaldados. Porque juntos, creamos un lugar mejor para todos!"
  - Image: `central-park.png`
- **Given** this section, **When** on md+, **Then** it MUST render as a 2-column grid (image left, text right). On mobile it MUST stack vertically.

### 2.3 Service Cards

**Scenarios**:

- **Given** the home page, **When** displayed below the Sobre Nosotros section, **Then** it MUST show a "Servicios" heading (text-5xl, centered, underlined with sky-300 decoration).
- **Given** the services area, **When** rendered, **Then** it MUST display exactly 5 cards in a responsive flex-wrap layout (3/4 width mobile, 1/4 on md+):

| Card | Title | Description | Image |
|------|-------|-------------|-------|
| 1 | Tributacion | Oficina encargada de la seguridad y que los derechos se respeten | `/image/finance.jpg` |
| 2 | Justicia | Oficina encargada de llevar el progreso del municipio al siguiente nivel | `/image/justice.png` |
| 3 | Catastro | Oficina encargada de la seguridad y que los derechos se respeten | `/image/map.png` |
| 4 | Desarrollo Comunitario | Oficina encargada de llevar el progreso del municipio al siguiente nivel | `/image/architecture.png` |
| 5 | Secretaria | Oficina encargada de llevar el progreso del municipio al siguiente nivel | `/image/operator.png` |

- **Given** each service card, **When** rendered, **Then** it MUST display: a rounded image (120x120, aspect-ratio 1:1, object-cover), the title in bold, a description, and a "Ver Mas" button linking to `/servicios`.

---

## 3. Servicios Page (`/servicios`)

**Description**: Detailed listing of all 5 municipal service departments, each with sub-services and their requirements shown via expandable/modal UI.

### 3.1 Service Sections

**Scenarios**:

- **Given** a user visits `/servicios`, **When** the page loads, **Then** it MUST display 5 service sections in this order:

| # | Title | Description | Image |
|---|-------|-------------|-------|
| 1 | Secretaria | Esta oficina se encarga de las gestiones directas con el alcalde y todo lo relacionado con la administracion de la municipalidad. | `operator.png` |
| 2 | Tributacion | Oficina encargada de la gestion de impuestos y tributos en el municipio. | `finance.jpg` |
| 3 | Catastro | Oficina encargada con lo relacionado con los bienes y muebles(Pagos, gestiones de dominios plenos, impuestos). | `map.png` |
| 4 | Desarrollo Comunitario | Oficina encargada del desarrollo y bienestar comunitario en el municipio. | `architecture.png` |
| 5 | Justicia | Oficina encargada de los tramites legales y judiciales dentro del municipio. | `justice.png` |

- **Given** each service section, **When** rendered, **Then** it MUST show the image on the left (1/5 width on md+), and title + description + sub-service buttons on the right (4/5 width on md+). On mobile it MUST stack vertically.

### 3.2 Sub-services and Requirements

**Scenarios**:

- **Given** each service section, **When** rendered, **Then** it MUST display a "Requisitos De:" heading followed by buttons for each sub-service (2-column grid on md+, single column on mobile).
- **Given** a user clicks a sub-service button, **When** clicked, **Then** a modal/dialog MUST open showing the sub-service title and a bulleted list of requirements with green checkmark icons.
- **Given** the modal, **When** open, **Then** a "Cerrar" button MUST close it.
- **Given** the source uses NextUI Modal, **When** migrating to Astro, **Then** the modal MUST be implemented with native HTML `<dialog>` element or a lightweight Astro-compatible solution (no React dependency required).

### 3.3 Sub-service Data (Complete Reference)

**Secretaria** (2 sub-services):
- "Requisitos para Matrimonio": 9 requirements
- "Requisitos para Patronato y Juntas de Agua": 5 requirements

**Tributacion** (4 sub-services):
- "Permisos de Operacion": 5 requirements
- "Solicitud de Solvencia Municipal": 2 requirements
- "Permisos para Rotulos Publicitarios": 4 requirements
- "Servicio de Tren de Aseo": 3 requirements

**Catastro** (7 sub-services):
- "Constancias Catastrales": 2 requirements
- "Lotificacion": 7 requirements
- "Urbanizacion": 9 requirements
- "Dominio Pleno": 8 requirements
- "Declaracion Jurada": 2 requirements
- "Medidas y Croquis": 2 requirements
- "Permisos de Construccion": 2 requirements

**Desarrollo** (2 sub-services):
- "Solicitud de Carnet de Auxiliar": 3 requirements
- "Solicitud de Ayudas": 4 requirements

**Justicia** (13 sub-services):
- "Matricula de Motosierra": 4 requirements
- "Guia de Traslado de Ganado": 7 requirements
- "Cancelacion de Herrar": 5 requirements
- "Transporte de Queso": 6 requirements
- "Transporte de Carne": 6 requirements
- "Permiso para Carpa": 4 requirements
- "Permiso para Maraton": 4 requirements
- "Carta de Venta": 7 requirements
- "Forjar Fierro": 4 requirements
- "Matricula de Herrar": 5 requirements
- "Traspaso de Herrar": 6 requirements
- "Boleta de Destazo": 5 requirements
- "Licencia de Destazo": 6 requirements

All requirement data MUST be migrated exactly as-is from the source TS files.

---

## 4. Nosotros Page (`/nosotros`)

**Description**: About page with header banner, mission/vision text, and PDF download links.

### 4.1 Header Banner

**Scenarios**:

- **Given** a user visits `/nosotros`, **When** the page loads, **Then** it MUST display a light gray background section (`bg-gray-50/90`) with:
  - Title: "Sobre Nosotros" (text-4xl to text-7xl responsive)
  - Subtitle: "Aprende mas sobre nuestro viaje, nuestros valores y nuestras aspiraciones"
  - The Bonito Oriental map SVG image (`Bonitomap.svg`)

### 4.2 Mission and Vision

**Scenarios**:

- **Given** the Nosotros page, **When** rendered below the banner, **Then** it MUST display side-by-side (md+) or stacked (mobile):
  - **Mision** section with title "Mision" and full text: "Ser una institucion publica lider en la prestacion de servicios de calidad con eficiencia, eficacia y transparencia a la poblacion del municipio, promoviendo el bienestar individual y colectivo, el desarrollo integral y sostenible en el ambito social, economico, cultural y ambiental, con un enfoque participativo e inclusivo que fomente la corresponsabilidad entre la ciudadania y las autoridades."
  - **Vision** section with title "Vision" and full text: "Ser un municipio modelo de participacion ciudadana y desarrollo comunal, reconocido por la excelencia en la gestion publica, con un personal altamente calificado, comprometido, amable y eficiente que trabaja en equipo para atender las necesidades de las personas y brindar soluciones innovadoras a la comunidad, construyendo un futuro prospero, sostenible y equitativo para todos."

### 4.3 PDF Downloads

**Scenarios**:

- **Given** the Nosotros page, **When** rendered below mission/vision, **Then** it MUST display 2 download buttons:
  - "Descargar Mision y Vision" linking to `/doc/Mision Y Vision.pdf` with `download` attribute
  - "Descargar Historia Municipal" linking to `/doc/HISTORIA.pdf` with `download` attribute
- **Given** each download button, **When** rendered, **Then** it MUST include a down-arrow icon and have an outlined/ghost style.

---

## 5. Contact Page (`/contact`)

**Description**: Contact form with name, email, subject, message fields + contact information sidebar.

### 5.1 Contact Form

**Scenarios**:

- **Given** a user visits `/contact`, **When** the page loads, **Then** it MUST display a 2-column layout (md+) or stacked (mobile):
  - Left: Form section with heading "Ponte en Contacto" and subtitle "Tienes una pregunta o quieres trabajar juntos? Completa el formulario a continuacion o contactanos directamente."
  - Right: Contact information panel

- **Given** the contact form, **When** rendered, **Then** it MUST contain these fields:
  - "Nombre" (text input, required, placeholder "Ingresa tu nombre")
  - "Correo Electronico" (email input, required, placeholder "Ingresa tu correo electronico")
  - "Asunto" (text input, required, placeholder "Ingresa el asunto")
  - "Mensaje" (textarea, required, placeholder "Ingresa tu mensaje", min-height 150px)
  - Submit button with text "Enviar Mensaje"

- **Given** the form fields "Nombre" and "Correo Electronico", **When** rendered on md+, **Then** they MUST be side-by-side (2-column grid). "Asunto" and "Mensaje" MUST be full-width.

### 5.2 Form Submission

**Scenarios**:

- **Given** the source uses Firebase `createContact()`, **When** migrating to Astro, **Then** the form SHOULD submit via an Astro API endpoint (`/api/contact`) or an external service (e.g., Formspree, Resend). The implementation detail is left to the design phase, but the form MUST provide user feedback on success (e.g., "Listo, Nos Pondremos En Contacto Contigo Pronto.") and clear all fields after successful submission.
- **Given** the form, **When** a required field is empty and submit is clicked, **Then** browser-native validation MUST prevent submission.

### 5.3 Contact Information Panel

**Scenarios**:

- **Given** the contact page, **When** rendered, **Then** the right panel MUST display:
  - Heading: "Informacion de Contacto"
  - Subtitle: "Encuentranos en la oficina o ponte en contacto a traves de otros canales."
  - Address: label "Direccion", value "Calle Centrar Este, 1 y 2 ave., Barrio Las Acacias"
  - Phone: label "Telefono", value "+504 2438-9111"
  - Email: label "Correo Electronico", value "municipalidadbonitoriental@gmail.com"

---

## 6. Portal Page (`/portal`)

**Description**: Page displaying a grid of municipal projects fetched from an API.

### 6.1 Page Layout

**Scenarios**:

- **Given** a user visits `/portal`, **When** the page loads, **Then** it MUST display a heading "PROYECTOS DESARROLLADOS EN 2024" (uppercase, centered, text-3xl on mobile, text-5xl on md+).
- **Given** the projects area, **When** rendered, **Then** it MUST display project cards in a responsive grid (1 col mobile, 2 col md, 4 col lg) with gap-4 and horizontal margin.

### 6.2 Project Cards

**Scenarios**:

- **Given** project data, **When** each card renders, **Then** it MUST display:
  - Title (field: `titulo`)
  - Zone/location (field: `zonas`) in smaller/muted text
  - Description (field: `descripcion`) in the card body, with overflow hidden (max height ~240px)
  - A footer link "Ver Aqui!!" pointing to the project's `enlace` URL (external, opens in new tab)

### 6.3 Data Source

**Scenarios**:

- **Given** the source fetches from `/api/post` (backed by Firebase), **When** migrating to Astro, **Then** the project data MAY be:
  - (a) Fetched from a static JSON file at build time, OR
  - (b) Fetched from a Firebase REST API at build/runtime
  - The exact approach SHALL be determined in the design phase. The data interface MUST match: `{ titulo: string, descripcion: string, zonas: string, enlace: string }`.

---

## 7. Static Data

### 7.1 Service Requirements Data

**Scenarios**:

- **Given** the 5 service data files (`Catastro.ts`, `Tributacion.ts`, `Justicia.ts`, `Secretaria.ts`, `Desarrollo.ts`), **When** migrating, **Then** all requirement arrays MUST be preserved exactly with the same string values.
- **Given** the index file (`Indice.ts`), **When** migrating, **Then** the mapping of service names to sub-services with their requirement arrays MUST be preserved.
- **Given** the target is Astro, **When** structuring data, **Then** the data SHOULD be placed in `src/data/` as TypeScript files or a single JSON file. The exact structure SHALL be determined in the design phase.

### 7.2 Historia Data

**Scenarios**:

- **Given** the `Historia.json` file, **When** migrating, **Then** it MUST be copied to the Astro project. It contains 8 historical entries with fields: `fecha`, `eventos`, `alcalde`, `regidores[]`, and optional `vice_alcalde`/`vice_alcaldesa`, `logros`, `presidencia_edificio_municipal`.
- **Note**: The Historia data is NOT currently rendered on any in-scope page (the Nosotros page does not use it — the History component has hardcoded mission/vision text). It SHOULD still be migrated for future use.

### 7.3 TypeScript Interfaces

**Scenarios**:

- **Given** the `type.ts` file, **When** migrating, **Then** the following interfaces MUST be preserved (excluding admin-only types):
  - `Proyecto { titulo: string, descripcion: string, zonas: string, enlace: string }`
  - `ContactData { name: string, email: string, message: string, subject: string }`

---

## 8. Assets

### 8.1 Images

**Scenarios**:

- **Given** the public images, **When** migrating, **Then** the following MUST be copied to the Astro `public/` directory preserving paths:
  - `/image/central-park.png`
  - `/image/finance.jpg`
  - `/image/justice.png`
  - `/image/map.png`
  - `/image/architecture.png`
  - `/image/operator.png`

- **Given** the src-level assets, **When** migrating, **Then** the following MUST be copied to `src/assets/`:
  - `Muni.png` (hero logo)
  - `Bonitomap.svg` (nosotros map)
  - `servicios/architecture.png`
  - `servicios/finance.jpg`
  - `servicios/justice.png`
  - `servicios/map.png`
  - `servicios/operator.png`

- **Given** the servicios page imports images from `src/image/servicios/`, **When** migrating, **Then** these SHOULD use Astro's `<Image>` component for optimization (imported from `src/assets/`).

### 8.2 PDF Documents

**Scenarios**:

- **Given** the PDF documents, **When** migrating, **Then** the following MUST be copied to `public/doc/`:
  - `HISTORIA.pdf`
  - `Mision Y Vision.pdf`

### 8.3 Excluded Assets

- `/proceres/` folder (Heroes and Billetes images) — OUT OF SCOPE
- `matri.pdf`, `requmatri21.png` — admin-related, OUT OF SCOPE

---

## 9. Responsive Design

**Scenarios**:

- **Given** any page, **When** viewed on mobile (<md), **Then** all multi-column layouts MUST collapse to single column.
- **Given** any page, **When** viewed on tablet (md), **Then** layouts SHOULD use 2-column grids where applicable.
- **Given** any page, **When** viewed on desktop (lg+), **Then** layouts MUST use the full multi-column design as specified per section.
- **Given** the Nav, **When** on mobile, **Then** the horizontal links MUST be hidden and a hamburger menu MUST be shown. On lg+ the hamburger MUST be hidden.
- **Given** all text, **When** on different breakpoints, **Then** font sizes MUST scale responsively using Tailwind responsive prefixes (sm:, md:, lg:, xl:) matching the source patterns.

---

## 10. Technology Constraints

- **MUST** use Astro 6 with static rendering (SSG) by default
- **MUST** use Tailwind CSS 4 for all styling (no CSS modules, no styled-components)
- **MUST NOT** depend on React, NextUI, or Ant Design icons
- **SHOULD** use Astro's built-in `<Image>` component for image optimization
- **SHOULD** use native HTML `<dialog>` for modals on the servicios page
- **SHOULD** use minimal client-side JavaScript (only for hamburger menu toggle, modal open/close, and contact form submission)
- **MAY** use Astro islands (`client:load`) for interactive components (contact form, mobile nav toggle)
- Font: Inter (via Google Fonts CDN or `@fontsource/inter`)

---

## 11. SEO and Metadata

**Scenarios**:

- **Given** each page, **When** rendered, **Then** it MUST have a unique `<title>` tag:
  - Home: "Bonito Oriental"
  - Servicios: "Servicios | Bonito Oriental"
  - Nosotros: "Nosotros | Bonito Oriental"
  - Contacto: "Contacto | Bonito Oriental"
  - Portal: "Portal | Bonito Oriental"
- **Given** each page, **When** rendered, **Then** it MUST include `<meta name="description">` with relevant content.
- **Given** all pages, **When** rendered, **Then** the HTML MUST have `lang="es"`.
