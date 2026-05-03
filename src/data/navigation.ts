import type { NavCallout, NavGroup, NavItem, NavLink } from '../types';

// ── Hierarchical nav (mega-menu) ─────────────────────────────────────────────

export const navGroups: (NavItem | NavGroup)[] = [
  { type: 'item', label: 'Inicio', href: '/' },
  {
    type: 'group',
    label: 'Servicios',
    children: [
      { label: 'Catálogo de Trámites', href: '/servicios' },
      { label: 'Vacantes de Empleo', href: '/empleo' },
    ],
  },
  {
    type: 'group',
    label: 'Gobierno',
    children: [
      { label: 'Sobre Nosotros', href: '/nosotros' },
      { label: 'Transparencia', href: '/transparencia' },
      { label: 'Cabildos Abiertos', href: '/transparencia/cabildos' },
    ],
  },
  {
    type: 'group',
    label: 'Comunidad',
    children: [
      { label: 'Noticias y Boletín', href: '/noticias' },
      { label: 'Mapa Interactivo', href: '/mapa' },
    ],
  },
  { type: 'item', label: 'Contacto', href: '/contact' },
];

/**
 * Emergency callout button — rendered separately from the dropdown system.
 * Set to a NavCallout object when contactos-emergencia apply runs:
 *   { label: 'Emergencias', href: '/emergencias', icon: 'lucide:siren', variant: 'critical' }
 */
export const navCallout: NavCallout | null = {
  label: 'Emergencias',
  href: '/emergencias',
  icon: 'lucide:siren',
  variant: 'critical',
};

// ── Legacy flat list (used by Footer) ────────────────────────────────────────

/**
 * @deprecated Use navGroups instead.
 * Kept for Footer backwards-compat. Derived from navGroups so it never drifts.
 */
export const navLinks: NavLink[] = navGroups.flatMap((entry) => {
  if (entry.type === 'item') return [{ label: entry.label, href: entry.href }];
  return entry.children;
});
