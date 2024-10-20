Table Usuario {
  id integer [primary key]
  nombre varchar(256)
  apellido1 varchar(256)
  apellido2 varchar(256)
  fechaNacimiento date
  urlImagenPerfil varchar(512)
  telefono varchar(16)
  email varchar(256) [unique]
  contrasena bytea
  idDireccion integer
}

Table TipoUsuario {
  id integer [primary key]
  descripcion varchar(128)
}

Table UsuariosClasificacion {
  idUsuario integer
  idTipoUsuario integer
  primary key (idUsuario, idTipoUsuario)
}

Table TiposDocumentos {
  id integer [primary key]
  nombreDocumento varchar(50)
}

Table DocumentosUsuario {
  id integer [primary key]
  idUsuario integer
  idTipoDocumento integer
  numeroDocumento varchar(64)
  fechaEmision date
  fechaExpiracion date
}

Table UsuariosVerificados {
  idUsuario integer [primary key]
  fechaVerificacion date
}

Table Pais {
  id integer [primary key]
  nombre varchar(128)
}

Table Estado {
  id integer [primary key]
  idPais integer
  nombre varchar(128)
}

Table Ciudad {
  id integer [primary key]
  idEstado integer
  nombre varchar(128)
}

Table Direccion {
  id integer [primary key]
  idCiudad integer
  codigoPostal varchar(16)
  ubicacion geography(Point, 4326)
}

Table TipoContacto {
  id integer [primary key]
  nombre varchar(256) [unique]
}

Table ContactInfo {
  id integer [primary key]
  tipoContacto integer
  valor varchar(256)
  deleted boolean [default: false]
}

Table Contacto {
  id integer [primary key]
  idUsuario integer
  idContactInfo integer
  deleted boolean [default: false]
}

Table TipoPlataforma {
  id integer [primary key]
  nombre varchar(128)
}

Table RedSocial {
  id integer [primary key]
  idUsuario integer
  idPlataforma integer
  urlPerfil varchar(512)
}

Table TipoTransaccion {
  id integer [primary key]
  descripcion varchar(64) [unique]
}

Table Transacciones {
  id integer [primary key]
  idUsuario integer
  idTipoTransaccion integer
  fecha timestamp 
  monto decimal(10, 2)
  descripcion text
  numeroReferencia integer
  checksum bytea
}

Table TipoEvento {
  id integer [primary key]
  descripcion varchar(64) [unique]
}

Table NivelesBitacora {
  id integer [primary key]
  nivel varchar(32) [unique]
}

Table Bitacora {
  id integer [primary key]
  idTipoEvento integer
  idNivel integer
  source_id varchar(64)
  object_id varchar(64)
  fecha timestamp
  detalles text
  checksum bytea
}

Table Favoritos {
  id integer [primary key]
  idUsuario integer
  idCuidador integer
  deleted boolean [default: false]
}

Table Match {
  id integer [primary key]
  idHost integer
  idCuidador integer
  idPost varchar(24)
  fechaEstablecimiento timestamp 
  estado varchar(64) [default: 'inactivo']
  observaciones text
  deleted boolean [default: false]
}

Table HistorialCuidador {
  id integer [primary key]
  idCuidador integer
  fecha timestamp 
  evento text
  observaciones text
}

Table ContratosCuidador {
  id integer [primary key]
  idHost integer
  idCuidador integer
  fechaInicio date
  fechaFin date
  estado varchar(64) [default: 'pendiente']
  observaciones text
}

Table ProtocolosEmergencia {
  id integer [primary key]
  idInfoCasa varchar(24)
  situacionEmergencia text
  solucion text
}

Table ServiciosAdicionales {
  id integer [primary key]
  idUsuario integer
  descripcion text
  deleted boolean [default: false]
}

Table Post {
  id ObjectId [primary key]
  idUsuario integer [ref: > Usuario.id]
  motivo text
  idInfoCasa ObjectId
  ofertaPago integer
  fechaPublicacion timestamp 
  fechaInicio date
  fechaFin date
  estado enum('pendiente', 'aceptado', 'rechazado', 'completado')
  deleted boolean [default: false]
}


Table InfoCasa {
  id ObjectId [primary key]
  idUsuario integer [ref: > Usuario.id]
  descripcionBase text
  idDireccion integer [ref: > Direccion.id]
  caracteristicas jsonb
}



// Definición de Referencias
Ref: Usuario.idDireccion > Direccion.id 
Ref: UsuariosClasificacion.idUsuario > Usuario.id 
Ref: UsuariosClasificacion.idTipoUsuario > TipoUsuario.id 
Ref: DocumentosUsuario.idUsuario > Usuario.id 
Ref: UsuariosVerificados.idUsuario > Usuario.id 
Ref: DocumentosUsuario.idTipoDocumento > TiposDocumentos.id 
Ref: Direccion.idCiudad > Ciudad.id 
Ref: Ciudad.idEstado > Estado.id 
Ref: Estado.idPais > Pais.id 
Ref: Contacto.idUsuario > Usuario.id 
Ref: Contacto.idContactInfo > ContactInfo.id 
Ref: ContactInfo.tipoContacto > TipoContacto.id 
Ref: RedSocial.idUsuario > Usuario.id 
Ref: RedSocial.idPlataforma > TipoPlataforma.id 
Ref: Transacciones.idUsuario > Usuario.id 
Ref: Transacciones.idTipoTransaccion > TipoTransaccion.id 
Ref: Bitacora.idTipoEvento > TipoEvento.id 
Ref: Bitacora.idNivel > NivelesBitacora.id 
Ref: Favoritos.idUsuario > Usuario.id 
Ref: Favoritos.idCuidador > Usuario.id 
Ref: Match.idHost > Usuario.id 
Ref: Match.idCuidador > Usuario.id 
Ref: Match.idPost > Post.id 
Ref: HistorialCuidador.idCuidador > Usuario.id 
Ref: ContratosCuidador.idHost > Usuario.id 
Ref: ContratosCuidador.idCuidador > Usuario.id 
Ref: ProtocolosEmergencia.idInfoCasa > InfoCasa.id 
Ref: ServiciosAdicionales.idUsuario > Usuario.id 
