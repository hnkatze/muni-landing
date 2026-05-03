/** Transparencia Activa — TypeScript interfaces for LIBOAS-compliance data */

/** A row in the budget (presupuesto) table */
export interface PresupuestoRow {
  year: number;
  description: string;
  amount: string;
  pdfUrl?: string;
}

/** A row in the budget execution (ejecucion presupuestaria) table */
export interface EjecucionRow {
  year: number;
  trimestre: string;
  aprobado: string;
  ejecutado: string;
  porcentaje: string;
  pdfUrl?: string;
}

/** A row in the annual operating plan (POA) table */
export interface PoaRow {
  year: number;
  description: string;
  pdfUrl?: string;
}

/** A row in the financial statements (estados financieros) table */
export interface EstadoFinancieroRow {
  year: number;
  tipo: string;
  pdfUrl?: string;
}

/** A row in the public salary disclosure (salarios publicos) table */
export interface SalarioRow {
  cargo: string;
  dependencia: string;
  salarioMensual: string;
  year: number;
}

/** A row in the sworn declarations (declaraciones juradas) table */
export interface DeclaracionRow {
  funcionario: string;
  cargo: string;
  year: number;
  pdfUrl?: string;
}

/** Category slugs for the 7 transparency sections */
export const TRANSPARENCIA_CATEGORIES = [
  'presupuesto',
  'ejecucion',
  'poa',
  'estados-financieros',
  'salarios',
  'declaraciones',
  'cabildos',
] as const;

export type TransparenciaCategory = (typeof TRANSPARENCIA_CATEGORIES)[number];

/** Metadata card for each transparency category (used by the hub) */
export interface TransparenciaCategoryMeta {
  slug: TransparenciaCategory;
  label: string;
  description: string;
  icon: string;
  lastUpdated?: string;
}
