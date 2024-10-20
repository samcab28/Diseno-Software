export type ObjectId = string;

// Interfaces para MongoDB
export interface IInfoCasa {
  _id: ObjectId;
  idUsuario: number;
  descripcionBase: string;
  idDireccion: number;
  caracteristicas: any[];
}

export interface IPost {
  _id: ObjectId;
  idUsuario: number;
  motivo: string;
  idInfoCasa: ObjectId;
  ofertaPago: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'completado';
  fechaPublicacion: Date;
  deleted: boolean;
}

// Interfaces para PostgreSQL
export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: Date;
  urlImagenPerfil: string;
  telefono: string;
  email: string;
  contrasena: string;
  idDireccion: number;
}

export interface TipoUsuario {
  idTipoUsuario: number;
  descripcion: string;
}

export interface UsuarioClasificacion {
  idUsuario: number;
  idTipoUsuario: number;
}

export interface DocumentoUsuario {
  idDocUser: number;
  idUsuario: number;
  idTipoDocumento: number;
  numeroDocumento: string;
  fechaEmision: Date;
  fechaExpiracion: Date;
}

export interface Direccion {
  idDireccion: number;
  idCiudad: number;
  idEstado: number;
  idPais: number;
  codigoPostal: string;
  ubicacion: {
    type: 'Point';
    coordinates: [number, number]; // [longitud, latitud]
  };
}

export interface TipoContacto {
  idTipoContacto: number;
  nombre: string;
}

export interface Contacto {
  idContacto: number;
  idUsuario: number;
  idContactInfo: number;
  deleted: boolean;
}

export interface ContactInfo {
  idContactInfo: number;
  tipoContacto: number;
  valor: string;
  deleted: boolean;
}

export interface RedSocial {
  idRedSocial: number;
  idUsuario: number;
  idPlataforma: number;
  urlPerfil: string;
}

export interface Transaccion {
  idTransaccion: number;
  idUsuario: number;
  idTipoTransaccion: number;
  fecha: Date;
  monto: number;
  descripcion: string;
  numeroReferencia: number;
  checksum: string;
}

export interface Favoritos {
  idFavorito: number;
  idUsuario: number;
  idCuidador: number;
  deleted: boolean;
}

export interface Match {
  idMatch: number;
  idHost: number;
  idCuidador: number;
  idPost: number;
  fechaEstablecimiento: Date;
  estado: 'activo' | 'inactivo' | 'completado';
  observaciones: string;
  deleted: boolean;
}

export interface HistorialCuidador {
  idHistorial: number;
  idCuidador: number;
  fecha: Date;
  evento: string;
  observaciones: string;
}

export interface ContratoCuidador {
  idContrato: number;
  idHost: number;
  idCuidador: number;
  fechaInicio: Date;
  fechaFin: Date | null;
  estado: 'pendiente' | 'activo' | 'completado' | 'cancelado';
  observaciones: string;
}

export interface ProtocoloEmergencia {
  idProtocolo: number;
  idInfoCasa: number;
  situacionEmergencia: string;
  solucion: string;
}

export interface ServicioAdicional {
  idServicio: number;
  idUsuario: number;
  descripcion: string;
  deleted: boolean;
}

export interface SolicitudCuidador {
  idSolicitud: string;
  idNotificacion: string;
  idCuidador: number;
  idPost: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
}

// Interfaces para servicios de terceros
export interface Notificacion {
  id: string;
  destinatario: string;
  mensaje: string;
  tipo: 'email' | 'sms' | 'push';
  estado: 'enviado' | 'fallido' | 'pendiente';
}

export interface MensajeChat {
  id: string;
  idEmisor: number;
  idReceptor: number;
  contenido: string;
  fecha: Date;
  leido: boolean;
}

export interface Review {
  id: string;
  idUsuario: number;
  idCuidador: number;
  calificacion: number;
  comentario: string;
  fecha: Date;
}

export interface Localizacion {
  id: string;
  idUsuario: number;
  latitud: number;
  longitud: number;
  precision: number;
  fecha: Date;
}

export interface CognitoToken {
  jwtToken: string;
  payload: {
    sub: string;
    email: string;
    'cognito:groups': TipoUsuarioEnum[];
    exp: number;
  };
}

// Tipos auxiliares
export type TipoUsuarioEnum = 'cuidador' | 'host' | 'administrador';
export type EstadoMatch = 'activo' | 'inactivo' | 'completado';
export type EstadoContrato = 'pendiente' | 'activo' | 'completado' | 'cancelado';
export type EstadoPost = 'pendiente' | 'aceptado' | 'rechazado' | 'completado';