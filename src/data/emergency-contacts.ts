export const CATEGORIES = [
  'vida-critica',
  'seguridad',
  'salud',
  'servicios-publicos',
] as const;

export type EmergencyCategory = (typeof CATEGORIES)[number];

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  category: EmergencyCategory;
  icon: string;
  location?: string;
  hours?: string;
  notes?: string;
  isCritical?: boolean;
  lastVerified: string;
}

export const emergencyContacts: EmergencyContact[] = [
  // ── Vida Crítica ─────────────────────────────────────────────────────────────
  {
    id: 'sistema-nacional-emergencias-911',
    name: 'Sistema Nacional de Emergencias',
    phone: '911',
    category: 'vida-critica',
    icon: 'lucide:siren',
    hours: '24/7',
    notes: 'Línea de emergencias unificada — Policía, Bomberos, Cruz Roja',
    isCritical: true,
    lastVerified: '2026-04-01',
  },
  {
    id: 'cuerpo-bomberos-tocoa',
    name: 'Cuerpo de Bomberos — Tocoa',
    phone: '198',
    category: 'vida-critica',
    icon: 'lucide:flame',
    location: 'Tocoa, Colón',
    hours: '24/7',
    notes: 'Estación más cercana a Bonito Oriental',
    isCritical: true,
    lastVerified: '2026-04-01',
  },
  {
    id: 'cruz-roja-colon',
    name: 'Cruz Roja Hondureña — Seccional Colón',
    phone: '+504 2434-3199',
    whatsapp: '50424343199',
    category: 'vida-critica',
    icon: 'lucide:heart-pulse',
    location: 'Tocoa, Colón',
    hours: '24/7',
    notes: 'Emergencias médicas y ambulancias',
    isCritical: true,
    lastVerified: '2026-04-01',
  },
  {
    id: 'copeco-colon',
    name: 'COPECO — Región Colón',
    phone: '+504 2434-2020',
    category: 'vida-critica',
    icon: 'lucide:triangle-alert',
    location: 'Tocoa, Colón',
    hours: '24/7',
    notes: 'Comisión Permanente de Contingencias — alertas, desastres naturales',
    isCritical: true,
    lastVerified: '2026-04-01',
  },
  {
    id: 'linea-114-violencia',
    name: 'Línea 114 — Denuncia Violencia Doméstica',
    phone: '114',
    category: 'vida-critica',
    icon: 'lucide:shield-alert',
    hours: '24/7',
    notes: 'Ministerio Público — atención a víctimas de violencia doméstica y de género',
    isCritical: true,
    lastVerified: '2026-04-01',
  },

  // ── Seguridad ─────────────────────────────────────────────────────────────────
  {
    id: 'policia-nacional-bonito-oriental',
    name: 'Policía Nacional — Bonito Oriental',
    phone: '199',
    category: 'seguridad',
    icon: 'lucide:shield',
    location: 'Barrio Las Acacias, Bonito Oriental',
    hours: '24/7',
    lastVerified: '2026-04-01',
  },
  {
    id: 'policia-municipal-bonito-oriental',
    name: 'Policía Municipal — Bonito Oriental',
    phone: '+504 2438-9120',
    whatsapp: '50424389120',
    category: 'seguridad',
    icon: 'lucide:badge-check',
    location: 'Municipalidad de Bonito Oriental',
    hours: 'Lun–Vie 7:00–16:00',
    notes: 'Orden público, control de ruido, infracciones municipales',
    lastVerified: '2026-04-01',
  },

  // ── Salud ──────────────────────────────────────────────────────────────────────
  {
    id: 'hospital-regional-tocoa',
    name: 'Hospital Regional de Tocoa',
    phone: '+504 2434-3154',
    category: 'salud',
    icon: 'lucide:hospital',
    location: 'Barrio El Centro, Tocoa, Colón',
    hours: '24/7 — Emergencias siempre abiertas',
    notes: 'Centro hospitalario de referencia más cercano a Bonito Oriental',
    lastVerified: '2026-04-01',
  },
  {
    id: 'cesamo-bonito-oriental',
    name: 'CESAMO — Bonito Oriental',
    phone: '+504 2438-9140',
    category: 'salud',
    icon: 'lucide:stethoscope',
    location: 'Barrio Central, Bonito Oriental',
    hours: 'Lun–Vie 7:00–14:00',
    notes: 'Centro de Salud con Médico y Odontólogo — consulta general, vacunación',
    lastVerified: '2026-04-01',
  },

  // ── Servicios Públicos ────────────────────────────────────────────────────────
  {
    id: 'enee-reportes-colon',
    name: 'ENEE — Reportes de Fallas Eléctricas',
    phone: '+504 2434-3050',
    whatsapp: '50424343050',
    category: 'servicios-publicos',
    icon: 'lucide:zap',
    location: 'Oficina Regional Tocoa, Colón',
    hours: '24/7 para emergencias eléctricas',
    notes: 'Reportar apagones, cables caídos, cortes de servicio',
    lastVerified: '2026-04-01',
  },
  {
    id: 'sanaa-reportes-agua',
    name: 'SANAA / Junta de Agua — Reportes',
    phone: '+504 2438-9155',
    category: 'servicios-publicos',
    icon: 'lucide:droplets',
    location: 'Bonito Oriental',
    hours: 'Lun–Vie 7:00–16:00',
    notes: 'Reportar fugas, cortes de agua potable y fallas en el servicio',
    lastVerified: '2026-04-01',
  },
  {
    id: 'juzgado-paz-municipal',
    name: 'Juzgado de Paz Municipal',
    phone: '+504 2438-9130',
    category: 'servicios-publicos',
    icon: 'lucide:scale',
    location: 'Municipalidad de Bonito Oriental',
    hours: 'Lun–Vie 8:00–16:00',
    notes: 'Mediación de conflictos, actas, asuntos civiles menores',
    lastVerified: '2026-04-01',
  },
];
