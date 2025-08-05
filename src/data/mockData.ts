import { Cliente, Usuario, Cargo, Rubro, Medio, Marca, Soporte, Sistema } from '@/types/database';

export const mockCargos: Cargo[] = [
  { id: 1, nombre: "Administrador" },
  { id: 2, nombre: "Analista" },
  { id: 3, nombre: "Supervisor" },
  { id: 4, nombre: "Ejecutivo" },
];

export const mockClientes: Cliente[] = [
  {
    id: 1,
    nombre: "Empresa Telecomunicaciones S.A.",
    fechaHorCreacion: new Date('2023-01-15'),
    activo: true,
    allRubros: true,
    fechaUpdacion: new Date('2024-01-05'),
    tipoCliente_Codigo: "CORP",
    apiKey: "api_key_telecom_123"
  },
  {
    id: 2,
    nombre: "Banco Nacional",
    fechaHorCreacion: new Date('2023-03-20'),
    activo: true,
    allRubros: false,
    fechaUpdacion: new Date('2024-01-10'),
    tipoCliente_Codigo: "BANK",
    apiKey: "api_key_banco_456"
  },
  {
    id: 3,
    nombre: "Retail Express",
    fechaHorCreacion: new Date('2023-06-10'),
    activo: false,
    allRubros: false,
    fechaUpdacion: new Date('2023-12-15'),
    tipoCliente_Codigo: "RETAIL",
    apiKey: "api_key_retail_789"
  },
  {
    id: 4,
    nombre: "Seguros Premium",
    fechaHorCreacion: new Date('2023-08-05'),
    activo: true,
    allRubros: true,
    fechaUpdacion: new Date('2024-01-08'),
    tipoCliente_Codigo: "INS",
    apiKey: "api_key_seguros_012"
  }
];

export const mockUsuarios: Usuario[] = [
  {
    id: 1,
    login: "juan.perez",
    password: "********",
    nombres: "Juan Carlos",
    apellidos: "Pérez García",
    esActivo: true,
    isAdmin: true,
    allRubros: true,
    fechaHorCreacion: new Date('2023-01-16'),
    fechaHorActualizacion: new Date('2024-01-05'),
    cliente_ID: 1,
    cargo_ID: 1,
    fechaCambioPsw: new Date('2024-01-01'),
    apiKey: "user_api_juan_123"
  },
  {
    id: 2,
    login: "maria.lopez",
    password: "********",
    nombres: "María Elena",
    apellidos: "López Rodríguez",
    esActivo: true,
    isAdmin: false,
    allRubros: false,
    fechaHorCreacion: new Date('2023-03-22'),
    fechaHorActualizacion: new Date('2024-01-10'),
    cliente_ID: 2,
    cargo_ID: 2,
    fechaCambioPsw: new Date('2023-12-01'),
    apiKey: "user_api_maria_456"
  },
  {
    id: 3,
    login: "carlos.martinez",
    password: "********",
    nombres: "Carlos Alberto",
    apellidos: "Martínez Silva",
    esActivo: false,
    isAdmin: false,
    allRubros: false,
    fechaHorCreacion: new Date('2023-06-12'),
    fechaHorActualizacion: new Date('2023-12-15'),
    cliente_ID: 3,
    cargo_ID: 4,
    fechaCambioPsw: new Date('2023-09-01'),
    apiKey: "user_api_carlos_789"
  },
  {
    id: 4,
    login: "ana.gonzalez",
    password: "********",
    nombres: "Ana Sofía",
    apellidos: "González Mendoza",
    esActivo: true,
    isAdmin: false,
    allRubros: true,
    fechaHorCreacion: new Date('2023-08-07'),
    fechaHorActualizacion: new Date('2024-01-08'),
    cliente_ID: 4,
    cargo_ID: 3,
    fechaCambioPsw: new Date('2023-11-15'),
    apiKey: "user_api_ana_012"
  }
];

export const mockRubros: Rubro[] = [
  { id: 1, nombre: "Telecomunicaciones", origen: "Nacional", categoria_ID: 1 },
  { id: 2, nombre: "Banca y Finanzas", origen: "Nacional", categoria_ID: 2 },
  { id: 3, nombre: "Retail y Comercio", origen: "Nacional", categoria_ID: 3 },
  { id: 4, nombre: "Seguros", origen: "Nacional", categoria_ID: 4 },
  { id: 5, nombre: "Automotriz", origen: "Internacional", categoria_ID: 5 },
  { id: 6, nombre: "Alimentación", origen: "Nacional", categoria_ID: 6 },
];

export const mockMedios: Medio[] = [
  { id: 1, nombre: "Televisión", abreviacion: "TV" },
  { id: 2, nombre: "Radio", abreviacion: "RAD" },
  { id: 3, nombre: "Prensa", abreviacion: "PRE" },
  { id: 4, nombre: "Digital", abreviacion: "DIG" },
  { id: 5, nombre: "Exterior", abreviacion: "EXT" },
];

export const mockMarcas: Marca[] = [
  { id: 1, nombre: "TeleMax" },
  { id: 2, nombre: "Banco Futuro" },
  { id: 3, nombre: "MegaStore" },
  { id: 4, nombre: "SecureLife" },
  { id: 5, nombre: "AutoPlus" },
  { id: 6, nombre: "FreshMart" },
];

export const mockSoportes: Soporte[] = [
  { id: 1, nombre: "Canal 7", abreviacion: "C7", medio_ID: 1, ciudad: "Santiago", region: "Metropolitana", ciudad_ID: 1, regionID: 1 },
  { id: 2, nombre: "Radio Nacional", abreviacion: "RN", medio_ID: 2, ciudad: "Santiago", region: "Metropolitana", ciudad_ID: 1, regionID: 1 },
  { id: 3, nombre: "El Diario", abreviacion: "ED", medio_ID: 3, ciudad: "Valparaíso", region: "Valparaíso", ciudad_ID: 2, regionID: 2 },
  { id: 4, nombre: "Portal Web", abreviacion: "PW", medio_ID: 4, ciudad: "Concepción", region: "Biobío", ciudad_ID: 3, regionID: 3 },
  { id: 5, nombre: "Billboard Central", abreviacion: "BC", medio_ID: 5, ciudad: "Santiago", region: "Metropolitana", ciudad_ID: 1, regionID: 1 },
];

export const mockSistemas: Sistema[] = [
  {
    codigo: "SYS001",
    nombre: "Sistema de Monitoreo",
    descripcion: "Sistema principal de monitoreo de medios",
    puedeDesencriptacion: true,
    activo: true,
    usaGoocha: false,
    subrogado: false,
    tipoSistema_Codigo: "MONITOR",
    usaIP: true
  },
  {
    codigo: "SYS002",
    nombre: "Sistema de Análisis",
    descripcion: "Sistema de análisis y reportes",
    puedeDesencriptacion: false,
    activo: true,
    usaGoocha: true,
    subrogado: false,
    tipoSistema_Codigo: "ANALYSIS",
    usaIP: false
  }
];