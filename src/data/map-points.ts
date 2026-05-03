import type { MapPoint } from '../types/map';

/**
 * Seed data — 17 points of interest in and around Bonito Oriental, Colón.
 * Town center: 15.747876, -85.737224.
 * Coordinates are approximations for seed/demo purposes; verify each before production.
 */
export const mapPoints: MapPoint[] = [
  // ── Oficinas Municipales ────────────────────────────────────────────────────
  {
    id: 'alcaldia-central',
    name: 'Alcaldía Municipal de Bonito Oriental',
    category: 'oficinas-municipales',
    coords: [15.7479, -85.7372],
    description: 'Sede principal del gobierno municipal.',
    address: 'Parque Central, Bonito Oriental, Colón',
    phone: '+504 2433-8100',
    hours: 'Lunes–Viernes 7:00–15:00',
  },
  {
    id: 'oficina-catastro',
    name: 'Oficina Municipal de Catastro',
    category: 'oficinas-municipales',
    coords: [15.7485, -85.7365],
    description: 'Registro y actualización del catastro urbano y rural.',
    address: 'Calle Principal, Bonito Oriental, Colón',
    phone: '+504 2433-8110',
    hours: 'Lunes–Viernes 7:30–15:00',
  },
  {
    id: 'juzgado-municipal',
    name: 'Juzgado de Policía Municipal',
    category: 'oficinas-municipales',
    coords: [15.7472, -85.7380],
    description: 'Administración de justicia a nivel local.',
    address: 'Barrio El Centro, Bonito Oriental, Colón',
    hours: 'Lunes–Viernes 8:00–16:00',
  },

  // ── Escuelas ────────────────────────────────────────────────────────────────
  {
    id: 'escuela-francisco-morazan',
    name: 'Escuela Francisco Morazán',
    category: 'escuelas',
    coords: [15.7496, -85.7358],
    description: 'Centro educativo de primaria en el área urbana.',
    address: 'Barrio La Esperanza, Bonito Oriental, Colón',
  },
  {
    id: 'escuela-jose-cecilio-del-valle',
    name: 'Escuela José Cecilio del Valle',
    category: 'escuelas',
    coords: [15.7463, -85.7400],
    description: 'Escuela de primaria en la zona norte del municipio.',
    address: 'Colonia San José, Bonito Oriental, Colón',
  },
  {
    id: 'instituto-bonito-oriental',
    name: 'Instituto Nacional de Bonito Oriental',
    category: 'escuelas',
    coords: [15.7506, -85.7385],
    description: 'Centro de educación secundaria del municipio.',
    address: 'Barrio El Centro, Bonito Oriental, Colón',
    phone: '+504 2433-8200',
    hours: 'Lunes–Viernes 7:00–16:00',
  },
  {
    id: 'escuela-lempira',
    name: 'Escuela Cacique Lempira',
    category: 'escuelas',
    coords: [15.7449, -85.7412],
    description: 'Escuela primaria bilingüe de la aldea El Progreso.',
    address: 'Aldea El Progreso, Bonito Oriental, Colón',
  },

  // ── Centros de Salud ────────────────────────────────────────────────────────
  {
    id: 'cesamo-bonito-oriental',
    name: 'CESAMO Bonito Oriental',
    category: 'centros-salud',
    coords: [15.7489, -85.7395],
    description: 'Centro de salud con atención médica primaria y vacunación.',
    address: 'Barrio La Unión, Bonito Oriental, Colón',
    phone: '+504 2433-8300',
    hours: 'Lunes–Viernes 7:00–15:00',
  },
  {
    id: 'cesamo-aldea-san-pablo',
    name: 'CESAR Aldea San Pablo',
    category: 'centros-salud',
    coords: [15.7429, -85.7340],
    description: 'Puesto de salud rural con promotores comunitarios.',
    address: 'Aldea San Pablo, Bonito Oriental, Colón',
    hours: 'Lunes, Miércoles y Viernes 8:00–12:00',
  },
  {
    id: 'clinica-medica-colonial',
    name: 'Clínica Médica Colonial',
    category: 'centros-salud',
    coords: [15.7475, -85.7378],
    description: 'Clínica privada con servicios de medicina general y laboratorio.',
    address: 'Calle Comercial, Bonito Oriental, Colón',
    phone: '+504 2433-8350',
    hours: 'Lunes–Sábado 7:00–18:00',
  },

  // ── Parques y Mercados ──────────────────────────────────────────────────────
  {
    id: 'parque-central',
    name: 'Parque Central de Bonito Oriental',
    category: 'parques-mercados',
    coords: [15.7481, -85.7375],
    description: 'Espacio público central con áreas verdes y kiosco municipal.',
    address: 'Centro, Bonito Oriental, Colón',
  },
  {
    id: 'mercado-municipal',
    name: 'Mercado Municipal',
    category: 'parques-mercados',
    coords: [15.7469, -85.7390],
    description: 'Mercado de abastos con productos locales, carnes y artesanías.',
    address: 'Barrio El Comercio, Bonito Oriental, Colón',
    hours: 'Todos los días 5:00–17:00',
  },

  // ── Atractivos Turísticos ───────────────────────────────────────────────────
  {
    id: 'rio-sico',
    name: 'Río Sico — Área de Balneario',
    category: 'atractivos-turisticos',
    coords: [15.7411, -85.7330],
    description: 'Balneario natural en las riberas del río Sico, popular entre familias.',
    address: 'Salida sur de Bonito Oriental, Colón',
  },
  {
    id: 'mirador-cerro-azul',
    name: 'Mirador Cerro Azul',
    category: 'atractivos-turisticos',
    coords: [15.7541, -85.7445],
    description: 'Mirador con vistas panorámicas del valle y la cordillera.',
    address: 'Camino al Cerro Azul, Bonito Oriental, Colón',
  },
  {
    id: 'cascada-la-tigra',
    name: 'Cascada La Tigra',
    category: 'atractivos-turisticos',
    coords: [15.7391, -85.7490],
    description: 'Cascada natural de 12 metros, accesible por sendero a pie.',
    address: 'Aldea La Tigra, Bonito Oriental, Colón',
  },

  // ── Barrios y Aldeas ────────────────────────────────────────────────────────
  {
    id: 'barrio-el-centro',
    name: 'Barrio El Centro',
    category: 'barrios-aldeas',
    coords: [15.7479, -85.7380],
    description: 'Casco urbano principal y corazón comercial del municipio.',
    address: 'Centro Urbano, Bonito Oriental, Colón',
  },
  {
    id: 'aldea-las-delicias',
    name: 'Aldea Las Delicias',
    category: 'barrios-aldeas',
    coords: [15.7343, -85.7570],
    description: 'Aldea rural con producción agrícola de cacao y plátano.',
    address: 'Aldea Las Delicias, Bonito Oriental, Colón',
  },
];
