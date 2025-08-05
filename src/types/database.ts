// Database types based on the provided schema
export interface Cargo {
  id: number;
  nombre: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  fechaHorCreacion: Date;
  activo: boolean;
  allRubros: boolean;
  fechaUpdacion: Date;
  tipoCliente_Codigo: string;
  apiKey: string;
}

export interface Usuario {
  id: number;
  login: string;
  password: string;
  nombres: string;
  apellidos: string;
  esActivo: boolean;
  isAdmin: boolean;
  allRubros: boolean;
  fechaHorCreacion: Date;
  fechaHorActualizacion: Date;
  cliente_ID: number;
  cargo_ID: number;
  fechaCambioPsw: Date;
  apiKey: string;
}

export interface Sistema {
  codigo: string;
  nombre: string;
  descripcion: string;
  puedeDesencriptacion: boolean;
  activo: boolean;
  usaGoocha: boolean;
  subrogado: boolean;
  tipoSistema_Codigo: string;
  usaIP: boolean;
}

export interface Rubro {
  id: number;
  nombre: string;
  origen: string;
  categoria_ID: number;
}

export interface Medio {
  id: number;
  nombre: string;
  abreviacion: string;
}

export interface Marca {
  id: number;
  nombre: string;
}

export interface Soporte {
  id: number;
  nombre: string;
  abreviacion: string;
  medio_ID: number;
  ciudad: string;
  region: string;
  ciudad_ID: number;
  regionID: number;
}

export interface Acceso {
  id: number;
  cliente_ID: number;
  sistema_Codigo: string;
  filtroRubros: string;
  allRubros: boolean;
  activo: boolean;
}

export interface AccesoRubro {
  access_ID: number;
  rubro_ID: number;
  multimedia: boolean;
}

export interface AccesoMedio {
  access_ID: number;
  medio_ID: number;
  multimedia: boolean;
  conCargaDiana: boolean;
  tipo: string;
  allSoportes: boolean;
}

export interface AccesoSoporte {
  access_ID: number;
  soporte_ID: number;
}

export interface AccesoRating {
  id: number;
  cliente_ID: number;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FiltroMarcasClientes {
  cliente_ID: number;
  marca_ID: number;
  fecha_Inicio: Date;
  fecha_Fin: Date;
  accesoMultimedia: boolean;
  sistema_Codigo: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FiltroRubroClientes {
  id: number;
  cliente_ID: number;
  rubro_ID: number;
  fecha_Inicio: Date;
  fecha_Fin: Date;
  accesoMultimedia: boolean;
  sistema_Codigo: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}