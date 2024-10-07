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

  export interface Cuidador extends UsuarioRegistrado {
    especialidad: string;
    experiencia: string;
    tarifa: number;
    disponibilidad: string;
    descripcion: string;
    credenciales: string[];
  }
  
  export interface Post {
    id: number;
    idUsuario: number;
    motivo: string;
    infoBasica: string;
    ofertaPago: number;
    fechaInicio: Date;
    fechaFin: Date;
    subconPagos: string;
    estadoRservado: boolean;
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
  
  export interface Direccion {
    id: number;
    idUsuario: number;
    pais: string;
    provincia: string;
    canton: string;
  }
  
  export interface Review {
    id: number;
    idUsuario: number;
    idRecibReview: number;
    calificacion: number;
    comentario: string;
    fechaCreado: Date;
  }
  
  export interface BitacoraCuidados {
    id: number;
    idPost: number;
    idCuidador: number;
    observaciones: string;
  }
  
  export interface BitacoraContactoHost {
    idPost: number;
    idCuidador: number;
    fechaInicioContacto: Date;
  }
  
  export interface Resena {
    id: number;
    idUsuario: number;
    idRecibReview: number;
    calificacion: number;
    comentario: string;
    fechaCreado: Date;
  }
  
  export interface CasaCuidado extends InfoCasa {
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
  }