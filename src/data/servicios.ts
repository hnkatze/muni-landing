import type { ServiceDepartment } from '../types';

export const serviceDepartments: ServiceDepartment[] = [
  {
    id: 'secretaria',
    title: 'Secretaria',
    description:
      'Esta oficina se encarga de las gestiones directas con el alcalde y todo lo relacionado con la administracion de la municipalidad.',
    icon: 'lucide:clipboard-list',
    subServices: [
      {
        title: 'Requisitos para Matrimonio',
        requirements: [
          'Acta de Soltería (de ambos)',
          'Constancia de Parentesco Familiar (de ambos)',
          'Antecedentes Penales que debe decir Constancia de Matrimonio (de ambos)',
          'Si es Extranjero debe presentar los PRIMEROS TRES REQUISITOS autenticados por el Consulado',
          'Solvencia Municipal',
          'Fotocopia de DNI de los Testigos',
          'Fotocopia de DNI de los Contrayentes',
          'Menores de 21 años presentar Autorización de los Padres que debe decir Constancia de Matrimonio en Secretaría de la Municipalidad y Fotocopia de las DNI',
          'Exámenes médicos, en caso de existir hijos entre ambos presentar Certificaciones de nacimiento de los mismos en lugar de certificado médico.',
        ],
      },
      {
        title: 'Requisitos para Patronato y Juntas de Agua',
        requirements: [
          'La copia del libro de actas, firma y huella de cada integrante.',
          'La copia de la DNI de cada integrante.',
          'Traer el sello.',
          'Recordatorio: Solo tiene vigencia de un año.',
          'Elegir obligatoriamente el Auxiliar (Patronato).',
        ],
      },
    ],
  },
  {
    id: 'tributacion',
    title: 'Tributacion',
    description:
      'Oficina encargada de la gestion de impuestos y tributos en el municipio.',
    icon: 'lucide:coins',
    subServices: [
      {
        title: 'Permisos de Operacion',
        requirements: [
          'RTN',
          'DNI',
          'ESCRITURA DE COMERCIANTE INDIVIDUAL',
          'SOLVENCIA MUNICIPAL',
          'COPIA DEL PAGO DE RECIBO DE BIENES INMUEBLES',
        ],
      },
      {
        title: 'Solicitud de Solvencia Municipal',
        requirements: ['DNI', 'PRESENTARSE PERSONALMENTE'],
      },
      {
        title: 'Permisos para Rotulos Publicitarios',
        requirements: [
          'DNI',
          'RTN DE LA EMPRESA',
          'SOLICITUD PARA LA INSPECCIÓN DEL ROTULO',
          'MEDIDAS DEL ROTULO',
        ],
      },
      {
        title: 'Servicio de Tren de Aseo',
        requirements: [
          'SOLICITAR EL SERVICIO EN LA OFICINA DE ADMINISTRACIÓN TRIBUTARIA',
          'REALIZAR LOS PAGOS MENSUALES DEL SERVICIO',
          'DNI',
        ],
      },
    ],
  },
  {
    id: 'catastro',
    title: 'Catastro',
    description:
      'Oficina encargada con lo relacionado con los bienes y muebles(Pagos, gestiones de dominios plenos, impuestos).',
    icon: 'lucide:map',
    subServices: [
      {
        title: 'Constancias Catastrales',
        requirements: [
          'Escritura Pública o Dominio Pleno',
          'Pago de Bienes Inmuebles',
        ],
      },
      {
        title: 'Lotificacion',
        requirements: [
          'Pago de Bienes Inmuebles',
          'Solicitud dirigida a la Corporación Municipal',
          'Copia de escritura de la Lotificación',
          'Plano General del terreno y Plano de Lotificación tamaño Cartulina',
          'Copia del DNI del propietario',
          'Apertura y balastreo de calle de la lotificación',
          'Definir el 10 % del área verde en el plano de la lotificación',
        ],
      },
      {
        title: 'Urbanizacion',
        requirements: [
          'Pago de Bienes Inmuebles',
          'Solicitud dirigida a la Corporación Municipal',
          'Copia de escritura de la Urbanización',
          'Plano General del terreno y Plano de la Urbanización tamaño Cartulina',
          'Copia del DNI del propietario',
          'Apertura y balastreo de calle de la Urbanización',
          'Definir el 10 % del área verde en el plano de la Urbanización',
          'Proyecto de Electrificación',
          'Proyecto de Agua Potable',
        ],
      },
      {
        title: 'Dominio Pleno',
        requirements: [
          'Abono de Lps 500.00 en el momento que se mide',
          'Documento privado de compra venta o donativo de propiedad debidamente Autenticado, que no tenga medidas ni colindancias y que especifique el barrio o la comunidad',
          'Copia de DNI del dueño del solar',
          'Constancia del Patronato donde el comprador o beneficiario de la donación es el dueño del predio y que no traiga medidas ni colindantes. También deberá especificar el barrio o la comunidad en que está ubicado, con copia de DNI del firmante de la constancia',
          'Dos testigos colindantes y copia de su DNI, ellos deberán firmar el formato de catastro al momento de la medición',
          'Solvencia Municipal del solicitante',
          'El solar deberá estar limpio',
          'Cuando el dueño del solar este ausente, deberá otorgar una carta poder a favor del que haga el trámite',
        ],
      },
      {
        title: 'Declaracion Jurada',
        requirements: [
          'Escritura Pública o Dominio Pleno',
          'Pago de Bienes Inmuebles',
        ],
      },
      {
        title: 'Medidas y Croquis',
        requirements: [
          'Escritura Pública o Dominio Pleno',
          'Pago de Bienes Inmuebles',
        ],
      },
      {
        title: 'Permisos de Construccion',
        requirements: [
          'Escritura Pública o Dominio Pleno',
          'Pago de Bienes Inmuebles',
        ],
      },
    ],
  },
  {
    id: 'desarrollo',
    title: 'Desarrollo',
    description:
      'Oficina encargada del desarrollo y bienestar comunitario en el municipio.',
    icon: 'lucide:building-2',
    subServices: [
      {
        title: 'Solicitud de Carnet de Auxiliar',
        requirements: [
          'Fotocopia de cédula de identidad',
          '3 fotografías tamaño carnet',
          'Juramentado con el patronato',
        ],
      },
      {
        title: 'Solicitud de Ayudas',
        requirements: [
          'Fotocopia de cédula de identidad',
          'Fotografias de La Causa de la Ayuda',
          'Solicitud de Ayuda Escrita y Firmada a Mano',
          'Sellada por el Patronato o Institución(En caso de ser necesario)',
        ],
      },
    ],
  },
  {
    id: 'justicia',
    title: 'Justicia',
    description:
      'Oficina encargada de los tramites legales y judiciales dentro del municipio.',
    icon: 'lucide:scale',
    subServices: [
      {
        title: 'Matricula de Motosierra',
        requirements: [
          'Factura a nombre de la persona dueña de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Guia de Traslado de Ganado',
        requirements: [
          'Certificación o antecedentes de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Marca, color y placa de vehículo en el que será trasladado',
          'Nombre del conductor',
          'Lugar hacia donde será trasladado',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Cancelacion de Herrar',
        requirements: [
          'Certificación, el fierro tiene que estar matriculado en este municipio',
          'DNI de carácter obligatorio',
          'Motivo por el cual será cancelado',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Transporte de Queso',
        requirements: [
          'Licencia sanitaria de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Datos del vehículo en el cual será trasladado',
          'Lugar hacia donde será trasladado',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Transporte de Carne',
        requirements: [
          'Licencia sanitaria de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Datos del vehículo en el cual será trasladado',
          'Lugar hacia donde será trasladado',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Permiso para Carpa',
        requirements: [
          'DNI de carácter obligatorio',
          'Motivo por el cual se colocará',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Permiso para Maraton',
        requirements: [
          'DNI del solicitante y de la persona enferma',
          'Constancia del hospital o clínica donde está ingresado de carácter obligatorio',
          'Receta médica',
          'Lugar donde se van a colocar',
        ],
      },
      {
        title: 'Carta de Venta',
        requirements: [
          'Certificación de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Nombre del comprador',
          'Cantidad y color de las reses',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
          'De no presentarse el dueño de la certificación tendrán que tener su respectiva autorización por escrito',
        ],
      },
      {
        title: 'Forjar Fierro',
        requirements: [
          'Traer tres o más diseños que desee realizar',
          'DNI de carácter obligatorio',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Matricula de Herrar',
        requirements: [
          'Tener permiso de forjar fierro (autorización)',
          'DNI de carácter obligatorio',
          'En caso que se saltara el procedimiento y manden a realizar el fierro sin la autorización se aplicara una multa de ciento cincuenta lempiras (150)',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Traspaso de Herrar',
        requirements: [
          'El fierro tiene que estar matriculado en este municipio de lo contrario tendría que esperar tres días avilés para poder verificar que no haya uno igual o parecido',
          'DNI de carácter obligatorio',
          'Siempre tendrá que presentarse el dueño de la certificación, obligatorio',
          'Si la persona dueña de la certificación ya falleció, tendrán que presentar la respectiva acta de defunción',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Boleta de Destazo',
        requirements: [
          'Certificación o antecedente de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Dirección a donde se llevará la carne',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
      {
        title: 'Licencia de Destazo',
        requirements: [
          'Certificación o antecedente de carácter obligatorio',
          'DNI de carácter obligatorio',
          'Solo las personas que ya tengan el permiso autorizado por el centro de salud podrán sacar su licencia de destazo (destazar en sus viviendas)',
          'Dirección donde se llevará la carne',
          'Estar al día con su Solvencia Municipal',
          'Tramite meramente personal',
        ],
      },
    ],
  },
];
