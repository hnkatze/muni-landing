# Proposal: Migración Landing Muni (Next.js → Astro)

## Intent

Migrar el contenido estático del proyecto `muni` (Next.js 14) al nuevo proyecto `muni-landing` (Astro 6 + Tailwind 4). El proyecto actual tiene overhead de React/Next.js para contenido que es mayormente estático. Astro elimina JavaScript innecesario, mejora performance y simplifica el mantenimiento.

## Scope

### In Scope
- Home page: hero + cards de servicios overview
- Servicios page: listado completo con datos estáticos (Catastro, Tributación, Justicia, Secretaría, Desarrollo)
- Nosotros page: historia, misión/visión, mapa
- Contact page: formulario con envío (API endpoint)
- Portal page: listado de proyectos
- Layout raíz: Nav + Footer
- Assets: imágenes de servicios, documentos PDF, favicon
- Datos estáticos: 5 archivos TS de servicios + historia.json

### Out of Scope
- Recursos page (próceres/billetes) — descartado por el usuario
- Admin system (login, dashboard, CRUD) — app separada
- Firebase Auth — no necesario para landing
- Framer Motion animations — se simplifica con CSS/Tailwind
- shadcn/ui completo — solo se portan estilos, no la librería

## Approach

1. **Copiar assets** del proyecto origen (`public/`) al destino
2. **Portar datos estáticos** (archivos TS de servicios, historia.json) a `src/data/`
3. **Crear layout** raíz con Nav y Footer como componentes Astro
4. **Convertir páginas** de React TSX a Astro components (server-rendered, zero JS)
5. **Contact form**: Astro API endpoint (`src/pages/api/contact.ts`) + minimal client JS
6. **Portal**: fetch de datos en build time o client-side island

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/` | New | 5 páginas Astro (index, servicios, nosotros, contact, portal) |
| `src/components/` | New | ~10 componentes (Nav, Footer, Hero, Cards, Form, etc.) |
| `src/layouts/` | Modified | Layout raíz con estructura HTML completa |
| `src/data/` | New | Datos estáticos portados (servicios, historia) |
| `src/styles/` | Modified | Global CSS con Tailwind imports |
| `public/` | New | ~40 archivos (imágenes, PDFs, favicon) |
| `astro.config.mjs` | Modified | Posible config de image optimization |
| `package.json` | Modified | Posible dependencia de Firebase (para contact API) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Diferencias Tailwind 3→4 en clases portadas | Med | Revisar breaking changes de Tailwind 4, adaptar clases |
| Contact form sin backend Firebase | Med | Crear API endpoint en Astro, o usar servicio externo |
| Imágenes pesadas sin optimización | Low | Usar `astro:assets` para optimización automática |
| Datos de servicios desactualizados | Low | Verificar contra proyecto origen antes de portar |

## Rollback Plan

El proyecto destino (`muni-landing`) está vacío (solo template). Rollback es simplemente:
1. `git revert` o `git reset` al commit inicial
2. El proyecto origen (`muni`) no se modifica en ningún momento

## Dependencies

- Acceso de lectura al proyecto origen: `C:\Users\Camilo\proyectos\muni`
- Firebase config (si se implementa contact form con Firebase)

## Success Criteria

- [ ] Todas las páginas estáticas renderizan correctamente (`astro build` exitoso)
- [ ] Nav funcional con links a todas las secciones
- [ ] Servicios muestra los 5 departamentos con sus requisitos
- [ ] Nosotros muestra historia y misión/visión
- [ ] Contact form envía datos correctamente
- [ ] Portal muestra listado de proyectos
- [ ] Assets (imágenes, PDFs) cargan correctamente
- [ ] Responsive en mobile y desktop
- [ ] Zero JavaScript innecesario en páginas estáticas
