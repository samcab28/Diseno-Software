export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  ciudadResidencia: string;
  urlImagenPerfil: string;
  telefono: string;
  email: string;
  contrasena: string;
}

export interface UsuarioRegistrado extends Usuario {
  cedula: string;
  hojaDelincuencia: boolean;
  tarjetaCredito: string;
  ratingReviews: number;
  tipoUsuario: string;
}

export interface RedSocial {
  id: number;
  idUsuario: number;
  nombrePlataforma: string;
  urlPerfil: string;
}

export interface DepositoGarantia {
  id: number;
  idUsuario: number;
  idRecibeDep: number;
  monto: number;
  motivo: string;
}

export interface ServicioAdicional {
  id: number;
  idUsuario: number;
  descripcion: string;
}

export interface Direccion {
  id: number;
  idUsuario: number;
  pais: string;
  provincia: string;
  canton: string;
}

export interface ContactoEmergencia {
  id: number;
  idUsuario: number;
  nombreRelacion: string;
  numeroContacto: string;
}

export interface InfoCasa {
  id: number; 
  idUsuario: number;
  idDireccion: number;
  descripcionBase: string;
  numHabitaciones: number;
  numBanos: number;
  descripcionCuidados: string;
  piscina: boolean;
  jardin: boolean;
  mascotas: boolean;
}

export interface Post {
  id: number; 
  idUsuario: number;
  motivo: string;
  idInfoBasica: number;
  ofertaPago: number;
  fechaInicio: Date;
  fechaFin: Date;
  subJsonPagos: Record<string, unknown>;
  estadoReservado: boolean;
}

export interface BitacoraCuidados {
  id: number;
  idPost: number;
  idCuidador: number;
  observaciones: string;
}

export interface ProtocoloEmergencia {
  id: number;
  idInfoCasa: number;
  situacionEmergencia: string;
  solucion: string;
}

export interface Favorito {
  id: number;
  idUsuario: number;
  idCuidador: number;
}