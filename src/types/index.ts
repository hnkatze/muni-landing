/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
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
