# Proposal: Rediseño Premium Municipal

## Intent

El sitio actual funciona pero tiene estética genérica de template. Para una página informativa municipal, necesita transmitir autoridad, profesionalismo y modernidad. El rediseño aplica una identidad visual cohesiva + animaciones GSAP para crear una experiencia premium.

## Scope

### In Scope
- Paleta de colores institucional (Navy, Teal, Green, Gold)
- GSAP animations en todos los componentes (ScrollTrigger, transforms — NO opacity:0)
- Nav rediseñado: badge oficial, hover underline animado, hide/show on scroll
- Hero modernizado: gradient background, CTAs, scroll indicator
- Service cards: rectangulares con overlay + badge
- About section: gold glow, stat badges
- Contact: icon cards con gradients
- Footer: actualizado con nueva paleta
- Portal: hover effects con GSAP
- Servicios page: section reveals

### Out of Scope
- Cambios en datos/contenido (texto, requisitos, etc.)
- Nuevas páginas
- Backend/API changes
- Dark mode

## Approach

1. Instalar GSAP + configurar Tailwind 4 theme con colores custom
2. Rediseñar cada componente con nueva paleta y patrones de diseño gobierno
3. Agregar animaciones GSAP por componente (scroll-triggered)
4. Todas las animaciones usan transforms (translateY, scale, clipPath) — nunca opacity:0

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | Modified | Agregar gsap |
| `src/styles/global.css` | Modified | Theme colors en @theme |
| `src/components/*.astro` | Modified | Todos los componentes rediseñados |
| `src/pages/*.astro` | Modified | Todas las páginas actualizadas |
| `src/layouts/Layout.astro` | Modified | GSAP setup global |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| GSAP bundle size | Low | Tree-shaking, solo importar lo necesario |
| Animations en mobile lentas | Low | force3D:true, transforms GPU-accelerated |
| Tailwind 4 @theme syntax | Low | Verificar docs de Tailwind 4 |

## Rollback Plan

Git revert al commit anterior. El rediseño es puramente visual, no cambia datos ni estructura.

## Success Criteria

- [ ] Build exitoso sin errores
- [ ] Paleta de colores consistente en todas las páginas
- [ ] Animaciones GSAP funcionan en scroll (sin opacity:0)
- [ ] Nav hide/show funcional
- [ ] Cards con hover effects
- [ ] Aspecto profesional digno de gobierno municipal
