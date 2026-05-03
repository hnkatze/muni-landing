/**
 * @deprecated Use NavItem | NavGroup instead.
 * Kept for Footer and any code still referencing the flat list.
 */
export interface NavLink {
  label: string;
  href: string;
}

// ── Hierarchical navigation types ────────────────────────────────────────────

/** A flat navigation entry with no children. */
export interface NavItem {
  readonly type: 'item';
  label: string;
  href: string;
}

/** A grouped navigation entry with dropdown children. */
export interface NavGroup {
  readonly type: 'group';
  label: string;
  /** When empty, the group is hidden from all menus. */
  children: NavLink[];
}

/** An emergency callout button rendered separately from the dropdown system. */
export interface NavCallout {
  label: string;
  href: string;
  /** Lucide icon name, e.g. "lucide:siren". */
  icon: string;
  variant: 'critical';
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
  icon: string;
  subServices: SubService[];
}

/** Home page service card data */
export interface ServiceCardData {
  title: string;
  description: string;
  icon: string;
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

// ── Noticias types ────────────────────────────────────────────────────────────

/** Category values for noticias content collection. */
export type NoticiaCategory =
  | 'comunicado'
  | 'evento'
  | 'obra'
  | 'alerta'
  | 'transparencia';

/** A news / bulletin entry (mirrors the noticias collection schema). */
export interface Noticia {
  title: string;
  slug?: string;
  excerpt: string;
  publishedAt: Date;
  category: NoticiaCategory;
  author?: string;
  tags: string[];
  image?: { src: string; alt: string };
  featured: boolean;
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
