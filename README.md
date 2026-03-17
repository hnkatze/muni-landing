# Municipalidad de Bonito Oriental — Landing Page

Sitio web informativo oficial de la Municipalidad de Bonito Oriental, Honduras. Construido con Astro 6 y generado completamente de forma estatica (SSG), sin JavaScript en el cliente por defecto. Incluye animaciones con GSAP + ScrollTrigger, iconografia con Lucide via `astro-icon`, y estilos con Tailwind CSS 4.

---

## Tecnologias

| Tecnologia | Version | Uso |
|---|---|---|
| [Astro](https://astro.build) | ^6.0 | Framework principal, SSG |
| [Tailwind CSS](https://tailwindcss.com) | ^4.2 | Estilos utilitarios via Vite plugin |
| [GSAP + ScrollTrigger](https://gsap.com) | ^3.14 | Animaciones de entrada al hacer scroll |
| [astro-icon + Lucide](https://github.com/natemoo-re/astro-icon) | ^1.1 | Iconografia SVG declarativa |
| TypeScript | — | Tipado en datos y tipos compartidos |

---

## Requisitos previos

- Node.js `>= 22.12.0`
- npm, pnpm o cualquier gestor de paquetes compatible

---

## Instalacion

```bash
# Clonar el repositorio
git clone <repo-url>
cd muni-landing

# Instalar dependencias
npm install
```

---

## Desarrollo

```bash
# Iniciar servidor de desarrollo (http://localhost:4321)
npm run dev

# Compilar para produccion
npm run build

# Previsualizar el build de produccion localmente
npm run preview
```

---

## Estructura del proyecto

```
muni-landing/
└── src/
    ├── assets/                  # Imagenes y SVGs procesados por Astro
    │   ├── Muni.png
    │   ├── Bonitomap.svg
    │   └── servicios/
    ├── components/              # Componentes Astro reutilizables
    │   ├── Nav.astro
    │   ├── Hero.astro
    │   ├── AboutSection.astro
    │   ├── ServiceCard.astro
    │   ├── ServiceSection.astro
    │   ├── RequirementsModal.astro
    │   ├── MissionVision.astro
    │   ├── DownloadButton.astro
    │   ├── ContactForm.astro
    │   ├── ContactInfo.astro
    │   ├── ProjectCard.astro
    │   └── Footer.astro
    ├── data/                    # Datos estaticos tipados
    │   ├── navigation.ts        # Links del menu de navegacion
    │   ├── servicios.ts         # Departamentos, sub-servicios y requisitos
    │   ├── proyectos.json       # Proyectos municipales del portal
    │   └── historia.json        # Datos historicos del municipio
    ├── layouts/
    │   └── Layout.astro         # Layout base con Nav, slot y Footer
    ├── pages/                   # Rutas del sitio (file-based routing)
    │   ├── index.astro          # /
    │   ├── servicios.astro      # /servicios
    │   ├── nosotros.astro       # /nosotros
    │   ├── portal.astro         # /portal
    │   └── contact.astro        # /contact
    ├── styles/
    │   └── global.css           # Importacion de Tailwind y definicion del tema
    └── types/
        └── index.ts             # Interfaces TypeScript compartidas
```

---

## Paginas

| Ruta | Titulo | Descripcion |
|---|---|---|
| `/` | Inicio | Hero con logo institucional, seccion Sobre Nosotros y tarjetas de los 5 servicios principales |
| `/servicios` | Servicios | Cinco departamentos municipales con sub-servicios; cada uno abre un modal nativo con los requisitos |
| `/nosotros` | Nosotros | Mapa del municipio, mision y vision institucional, y descarga de PDFs oficiales |
| `/portal` | Portal | Grilla de proyectos desarrollados en 2024 con animacion de entrada via GSAP |
| `/contact` | Contacto | Formulario de contacto (dos tercios del ancho) y datos de contacto institucional |

---

## Paleta de colores

Los colores se definen en `src/styles/global.css` con la directiva `@theme` de Tailwind CSS 4 y se consumen como clases utilitarias en toda la aplicacion.

| Token | Clase Tailwind | Hex | Uso |
|---|---|---|---|
| Gov Navy | `bg-gov-navy` / `text-gov-navy` | `#003366` | Color institucional primario, navegacion, titulos |
| Gov Navy Light | `bg-gov-navy-light` | `#004B87` | Gradientes de fondo en hero y banners |
| Gov Teal | `bg-gov-teal` | `#0B7A9F` | Acentos secundarios y cierres de gradiente |
| Muni Green | `text-muni-green` | `#2ECC71` | Indicadores de estado y acciones positivas |
| Muni Gold | `bg-muni-gold` | `#D4AF37` | Separadores decorativos y logotipo |
| Text Primary | `text-text-primary` | `#1A1A2E` | Cuerpo de texto principal |
| BG Subtle | `bg-bg-subtle` | `#F8F9FB` | Fondo general del sitio |

---

## Caracteristicas principales

### SSG sin JavaScript por defecto

Astro genera HTML estatico puro en tiempo de compilacion. El JavaScript del cliente se incluye unicamente donde se requiere, por ejemplo las animaciones GSAP en `portal.astro` mediante la etiqueta `<script>`.

### Animaciones GSAP con ScrollTrigger

Las animaciones se activan cuando los elementos entran al viewport. Se utiliza `gsap.from()` con propiedades `y`, `scale` y `stagger` para crear entradas fluidas. Los elementos nunca se ocultan con `opacity: 0` en el HTML inicial, evitando contenido invisible si el script no carga.

### Modal nativo `<dialog>`

La pagina `/servicios` usa el elemento HTML estandar `<dialog>` para mostrar los requisitos de cada tramite, sin librerias externas. El modal se abre con `.showModal()` y se cierra mediante el atributo nativo `method="dialog"`.

### Iconografia con Lucide

Los iconos se declaran como strings de referencia (`lucide:coins`, `lucide:scale`, `lucide:map`, etc.) y son resueltos en tiempo de compilacion por `astro-icon`. No se envia codigo de iconos al cliente.

### Diseno responsivo

Todos los layouts utilizan grillas y flexbox de Tailwind con breakpoints `md:` y `lg:`. La barra de navegacion incluye menu hamburguesa para dispositivos moviles.

---

## Formulario de contacto

El componente `ContactForm.astro` esta preparado para integrarse con [Formspree](https://formspree.io).

> **TODO:** Reemplazar el atributo `action` del formulario con el endpoint de Formspree del proyecto.

```html
<!-- src/components/ContactForm.astro -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ...
</form>
```

---

## Despliegue

El sitio es completamente estatico. El contenido de la carpeta `/dist` generada por `npm run build` puede subirse a cualquier servicio de hosting de archivos estaticos.

Plataformas recomendadas: Vercel, Netlify, Cloudflare Pages, GitHub Pages.

---

## Autor

Desarrollado por **Camilo Henriquez**.

LinkedIn: [linkedin.com/in/hnkatze](https://www.linkedin.com/in/hnkatze/)

---

## Licencia

Uso institucional — Municipalidad de Bonito Oriental, Honduras.
