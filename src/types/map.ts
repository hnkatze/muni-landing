/** Category slugs for municipal points of interest. */
export const MAP_CATEGORIES = [
  'oficinas-municipales',
  'escuelas',
  'centros-salud',
  'parques-mercados',
  'atractivos-turisticos',
  'barrios-aldeas',
] as const;

export type MapCategory = (typeof MAP_CATEGORIES)[number];

/** URL hash slugs that map to categories. */
export const HASH_TO_CATEGORY: Record<string, MapCategory> = {
  oficinas: 'oficinas-municipales',
  escuelas: 'escuelas',
  salud: 'centros-salud',
  parques: 'parques-mercados',
  turismo: 'atractivos-turisticos',
  barrios: 'barrios-aldeas',
};

/** A single municipal point of interest. */
export interface MapPoint {
  id: string;
  name: string;
  category: MapCategory;
  /** [latitude, longitude] */
  coords: [number, number];
  description?: string;
  address?: string;
  phone?: string;
  hours?: string;
  website?: string;
}

/** Display labels for each category. */
export const CATEGORY_LABELS: Record<MapCategory, string> = {
  'oficinas-municipales': 'Oficinas Municipales',
  'escuelas': 'Escuelas',
  'centros-salud': 'Centros de Salud',
  'parques-mercados': 'Parques y Mercados',
  'atractivos-turisticos': 'Atractivos Turísticos',
  'barrios-aldeas': 'Barrios y Aldeas',
};

/** Tailwind color classes and hex colors for map marker icons per category. */
export const CATEGORY_COLORS: Record<MapCategory, { bg: string; text: string; hex: string }> = {
  'oficinas-municipales': { bg: 'bg-gov-navy',       text: 'text-white', hex: '#0F4C81' },
  'escuelas':             { bg: 'bg-muni-gold',       text: 'text-white', hex: '#E8A838' },
  'centros-salud':        { bg: 'bg-red-600',         text: 'text-white', hex: '#DC2626' },
  'parques-mercados':     { bg: 'bg-muni-green',      text: 'text-white', hex: '#3D9B5E' },
  'atractivos-turisticos':{ bg: 'bg-gov-teal',        text: 'text-white', hex: '#2E86C1' },
  'barrios-aldeas':       { bg: 'bg-earth',           text: 'text-white', hex: '#8B6F47' },
};
