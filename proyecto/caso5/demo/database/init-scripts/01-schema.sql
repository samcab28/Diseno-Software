--CREATE DATABASE datos;
\c datos;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS Pais (
    idPais SERIAL PRIMARY KEY,  
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS Estado (
    idEstado SERIAL PRIMARY KEY,  
    idPais INTEGER REFERENCES Pais(idPais),
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS Ciudad (
    idCiudad SERIAL PRIMARY KEY, 
    idEstado INTEGER REFERENCES Estado(idEstado),
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS Direccion (
    idDireccion SERIAL PRIMARY KEY,  
    idCiudad INTEGER REFERENCES Ciudad(idCiudad),
    codigoPostal VARCHAR(16),
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8)
);

CREATE TABLE IF NOT EXISTS Usuarios (
    idUsuario SERIAL PRIMARY KEY,  
    nombre VARCHAR(256) NOT NULL,
    apellido1 VARCHAR(256) NOT NULL,
    apellido2 VARCHAR(256) NOT NULL,
    fechaNacimiento DATE,
    urlImagenPerfil VARCHAR(512),
    telefono VARCHAR(16),
    email VARCHAR(256) UNIQUE,
    contrasena BYTEA,
    idDireccion INTEGER REFERENCES Direccion(idDireccion)
);

CREATE TABLE IF NOT EXISTS TipoUsuario (
    idTipoUsuario SERIAL PRIMARY KEY,  
    descripcion VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS UsuariosClasificacion (
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoUsuario INTEGER REFERENCES TipoUsuario(idTipoUsuario),
    PRIMARY KEY (idUsuario, idTipoUsuario)
);

CREATE TABLE IF NOT EXISTS UsuariosVerificados (
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    fechaVerificacion DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (idUsuario)
);

CREATE TABLE IF NOT EXISTS TiposDocumentos (
    idTipoDocumento SERIAL PRIMARY KEY,
    nombreDocumento VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS DocumentosUsuario (
    idDocUser SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoDocumento INTEGER REFERENCES TiposDocumentos(idTipoDocumento),
    numeroDocumento VARCHAR(64) NOT NULL,
    fechaEmision DATE,
    fechaExpiracion DATE
);

CREATE TABLE IF NOT EXISTS TipoContacto (
    idTipoContacto SERIAL PRIMARY KEY,
    nombre VARCHAR(256) UNIQUE
);

CREATE TABLE IF NOT EXISTS ContactInfo (
    idContactInfo SERIAL PRIMARY KEY,
    tipoContacto INTEGER REFERENCES TipoContacto(idTipoContacto),
    valor VARCHAR(256),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Contacto (
    idContacto SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idContactInfo INTEGER REFERENCES ContactInfo(idContactInfo),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS TipoPlataforma (
    idTipoPlataforma SERIAL PRIMARY KEY,  
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS RedSocial (
    idRedSocial SERIAL PRIMARY KEY,  
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idPlataforma INTEGER REFERENCES TipoPlataforma(idTipoPlataforma),
    urlPerfil VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS TipoTransaccion (
    idTipoTransaccion SERIAL PRIMARY KEY,  
    descripcion VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Transacciones (
    idTransaccion SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoTransaccion INTEGER REFERENCES TipoTransaccion(idTipoTransaccion),
    fecha TIMESTAMP DEFAULT NOW(),
    monto DECIMAL(10, 2),
    descripcion TEXT,
    numeroReferencia INTEGER,
    checksum BYTEA
);

CREATE TABLE IF NOT EXISTS TipoEvento (
    idTipoEvento SERIAL PRIMARY KEY, 
    descripcion VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS NivelesBitacora (
    idNivel SERIAL PRIMARY KEY,
    nivel VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Bitacora (
    idBitacora SERIAL PRIMARY KEY,
    idTipoEvento INTEGER REFERENCES TipoEvento(idTipoEvento),
    idNivel INTEGER REFERENCES NivelesBitacora(idNivel),
    source_id VARCHAR(64),
    object_id VARCHAR(64),
    fecha TIMESTAMP DEFAULT NOW(),
    detalles TEXT,
    checksum BYTEA
);

CREATE TABLE IF NOT EXISTS Favoritos (
    idFavorito SERIAL PRIMARY KEY,  
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Match (
    idMatch SERIAL PRIMARY KEY,
    idHost INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    idPost VARCHAR(24),
    fechaEstablecimiento TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(64) DEFAULT 'inactivo',
    observaciones TEXT,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS HistorialCuidador (
    idHistorial SERIAL PRIMARY KEY,
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    fecha TIMESTAMP DEFAULT NOW(),
    evento TEXT,
    observaciones TEXT
);

CREATE TABLE IF NOT EXISTS ContratosCuidador (
    idContrato SERIAL PRIMARY KEY,
    idHost INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    estado VARCHAR(64) DEFAULT 'pendiente',
    observaciones TEXT
);

CREATE TABLE IF NOT EXISTS ProtocolosEmergencia (
    idProtocolo SERIAL PRIMARY KEY,
    idInfoCasa VARCHAR(24),
    situacionEmergencia TEXT,
    solucion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ServiciosAdicionales (
    idServicio SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    descripcion TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE
);