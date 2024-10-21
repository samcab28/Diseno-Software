CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE Pais (
    idPais SERIAL PRIMARY KEY,  
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE Estado (
    idEstado SERIAL PRIMARY KEY,  
    idPais INTEGER REFERENCES Pais(idPais),
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE Ciudad (
    idCiudad SERIAL PRIMARY KEY, 
    idEstado INTEGER REFERENCES Estado(idEstado),
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE Direccion (
    idDireccion SERIAL PRIMARY KEY,  
    idCiudad INTEGER REFERENCES Ciudad(idCiudad),
    codigoPostal VARCHAR(16),
    ubicacion GEOGRAPHY(Point, 4326)
);
CREATE TABLE Usuarios (
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

CREATE TABLE TipoUsuario (
    idTipoUsuario SERIAL PRIMARY KEY,  
    descripcion VARCHAR(128) NOT NULL
);

CREATE TABLE UsuariosClasificacion (
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoUsuario INTEGER REFERENCES TipoUsuario(idTipoUsuario),
    PRIMARY KEY (idUsuario, idTipoUsuario)
);

CREATE TABLE UsuariosVerificados (
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    fechaVerificacion DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (idUsuario)
);
CREATE TABLE TiposDocumentos (
    idTipoDocumento SERIAL PRIMARY KEY,
    nombreDocumento VARCHAR(50) NOT NULL
);

CREATE TABLE DocumentosUsuario (
    idDocUser SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoDocumento INTEGER REFERENCES TiposDocumentos(idTipoDocumento),
    numeroDocumento VARCHAR(64) NOT NULL,
    fechaEmision DATE,
    fechaExpiracion DATE
);
CREATE TABLE TipoContacto (
    idTipoContacto SERIAL PRIMARY KEY,
    nombre VARCHAR(256) UNIQUE
);

CREATE TABLE ContactInfo (
    idContactInfo SERIAL PRIMARY KEY,
    tipoContacto INTEGER REFERENCES TipoContacto(idTipoContacto),
    valor VARCHAR(256),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Contacto (
    idContacto SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idContactInfo INTEGER REFERENCES ContactInfo(idContactInfo),
    deleted BOOLEAN DEFAULT FALSE
);
CREATE TABLE TipoPlataforma (
    idTipoPlataforma SERIAL PRIMARY KEY,  
    nombre VARCHAR(128) NOT NULL
);

CREATE TABLE RedSocial (
    idRedSocial SERIAL PRIMARY KEY,  
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idPlataforma INTEGER REFERENCES TipoPlataforma(idTipoPlataforma),
    urlPerfil VARCHAR(512)
);
CREATE TABLE TipoTransaccion (
    idTipoTransaccion SERIAL PRIMARY KEY,  
    descripcion VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE Transacciones (
    idTransaccion SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoTransaccion INTEGER REFERENCES TipoTransaccion(idTipoTransaccion),
    fecha TIMESTAMP DEFAULT NOW(),
    monto DECIMAL(10, 2),
    descripcion TEXT,
    numeroReferencia INTEGER,
    checksum BYTEA
);
CREATE TABLE TipoEvento (
    idTipoEvento SERIAL PRIMARY KEY, 
    descripcion VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE NivelesBitacora (
    idNivel SERIAL PRIMARY KEY,
    nivel VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE Bitacora (
    idBitacora SERIAL PRIMARY KEY,
    idTipoEvento INTEGER REFERENCES TipoEvento(idTipoEvento),
    idNivel INTEGER REFERENCES NivelesBitacora(idNivel),
    source_id VARCHAR(64),
    object_id VARCHAR(64),
    fecha TIMESTAMP DEFAULT NOW(),
    detalles TEXT,
    checksum BYTEA
);
CREATE TABLE Favoritos (
    idFavorito SERIAL PRIMARY KEY,  
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Match (
    idMatch SERIAL PRIMARY KEY,
    idHost INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    idPost VARCHAR(24),
    fechaEstablecimiento TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(64) DEFAULT 'inactivo',
    observaciones TEXT,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE HistorialCuidador (
    idHistorial SERIAL PRIMARY KEY,
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    fecha TIMESTAMP DEFAULT NOW(),
    evento TEXT,
    observaciones TEXT
);

CREATE TABLE ContratosCuidador (
    idContrato SERIAL PRIMARY KEY,
    idHost INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    estado VARCHAR(64) DEFAULT 'pendiente',
    observaciones TEXT
);
CREATE TABLE ProtocolosEmergencia (
    idProtocolo SERIAL PRIMARY KEY,
    idInfoCasa VARCHAR(24),
    situacionEmergencia TEXT,
    solucion TEXT NOT NULL
);

CREATE TABLE ServiciosAdicionales (
    idServicio SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    descripcion TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE
);