// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table Usuario {
  id integer [primary key]
  nombre varchar(256)
  apellido varchar(256)
  fechaNacimiento date
  ciudadResidencia varchar(256)
  urlImagenPerfil varchar(512)
  telefono varchar(16)
  email varchar(256)
  contrasena varchar(256)
}

Table UsuarioRegistrado {
  idUsuario integer [primary key]
  cedula varchar(64)
  hojaDelincuencia boolean
  tarjetaCredito varchar(16)
  tipoUsuario varchar(64)
}

Table RedSocial {
  id integer [primary key]
  idUsuario integer
  nombrePlataforma varchar(128)
  urlPerfil varchar(512)
}

Table DepositoGarantia {
  id integer [primary key]
  idUsuario integer
  idRecibeDep integer
  monto decimal(10,2)
  motivo text
}

Table BitacoraDeposito {
  id integer [primary key]
  idDepGar integer 
  fechaCreada timestamp
}

Table ServiciosAdicionales {
  id integer [primary key]
  idUsuario integer 
  descripcion text
}

Table Direccion {
  id integer [primary key]
  idUsuario integer 
  pais varchar(128)
  provincia varchar(128)
  canton varchar(128)
}

Table ContactoEmergencia {
  id integer [primary key]
  idUsuario integer 
  nombreRelacion varchar(256)
  numeroContacto varchar(16)
}

Table BitacoraTransacciones {
  id integer [primary key]
  idPost integer
  monto decimal(10,2)
  motivo text
}

Table BitacoraCuidados {
  id integer [primary key]
  idPost integer
  idCuidador integer 
  observaciones text
}

Table URLCuidados {
  id integer [primary key]
  idBitacoraCuido integer 
  link varchar(512)
}

Table ProtocolosEmergencia {
  id integer [primary key]
  idInfoCasa integer
  situacionEmergencia text
  solucion text
}

Table Favorito {
  id integer [primary key]
  idUsuario integer 
  idCuidador integer
}

Table InfoCasa {
  id integer [primary key]
  idUsuario integer 
  idDireccion integer 
  descripcionBase text
  numHabitaciones integer
  numBanos integer
  descripcionCuidados text
  piscina boolean
  jardin boolean
  mascotas boolean
}

Table Post {
  id integer [primary key]
  idUsuario integer 
  motivo text
  idInfoBasica integer 
  ofertaPago decimal(10,2)
  fechaInicio timestamp
  fechaFin timestamp
  subJsonPagos json
  estadoReservado boolean
}

Table BitacoraContactoHost {
  idHost integer 
  idCuidador integer 
  fechaInicioContacto timestamp
  primary key (idHost, idCuidador)
}

// Definición de Referencias
Ref: UsuarioRegistrado.idUsuario > Usuario.id 
Ref: RedSocial.idUsuario > Usuario.id 
Ref: DepositoGarantia.idUsuario > Usuario.id 
Ref: DepositoGarantia.idRecibeDep > Usuario.id 
Ref: BitacoraDeposito.idDepGar > DepositoGarantia.id
Ref: ServiciosAdicionales.idUsuario > Usuario.id
Ref: Direccion.idUsuario > Usuario.id 
Ref: ContactoEmergencia.idUsuario > Usuario.id
Ref: BitacoraCuidados.idCuidador > Usuario.id 
Ref: URLCuidados.idBitacoraCuido > BitacoraCuidados.id
Ref: Favorito.idUsuario > Usuario.id
Ref: Favorito.idCuidador > Usuario.id 
Ref: InfoCasa.idUsuario > Usuario.id 
Ref: InfoCasa.idDireccion > Direccion.id 
Ref: Post.idUsuario > Usuario.id
Ref: Post.idInfoBasica > InfoCasa.id 
Ref: BitacoraContactoHost.idHost > Usuario.id 
Ref: BitacoraContactoHost.idCuidador > Usuario.id 
Ref: BitacoraTransacciones.idPost > Post.id 
Ref: ProtocolosEmergencia.idInfoCasa > InfoCasa.id 
Ref: BitacoraCuidados.idPost > Post.id 