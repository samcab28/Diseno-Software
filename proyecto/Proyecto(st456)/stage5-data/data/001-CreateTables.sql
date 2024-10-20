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

-- Tabla que define diferentes roles como "Cuidador", "Host", "Administrador"
CREATE TABLE TipoUsuario (
    idTipoUsuario SERIAL PRIMARY KEY,  
    descripcion VARCHAR(128) NOT NULL  -- Ejemplo: 'Cuidador', 'Host', 'Administrador'
);

-- Tabla que permite la asignación de múltiples roles a un mismo usuario
-- Un usuario puede ser, por ejemplo, 'Cuidador' y 'Host' al mismo tiempo.
CREATE TABLE UsuariosClasificacion (
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoUsuario INTEGER REFERENCES TipoUsuario(idTipoUsuario),
    PRIMARY KEY (idUsuario, idTipoUsuario)
);

CREATE TABLE TiposDocumentos (
    idTipoDocumento SERIAL PRIMARY KEY,
    nombreDocumento VARCHAR(50) NOT NULL
);

-- Tabla de Documentos por Usuario (cada usuario puede tener múltiples documentos)
CREATE TABLE DocumentosUsuario (
    idDocUser SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoDocumento INTEGER REFERENCES TiposDocumentos(idTipoDocumento),
    numeroDocumento VARCHAR(64) NOT NULL,
    fechaEmision DATE,
    fechaExpiracion DATE
);

CREATE TABLE UsuariosVerificados (
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    fechaVerificacion DATE NOT NULL DEFAULT CURRENT_DATE,  -- Fecha en que fue verificado
    PRIMARY KEY (idUsuario)  -- Para asegurarse de que un usuario solo aparezca una vez como verificado
);


-- DIRECCION
-- Habilitar la extensión PostGIS: para manejar la parte de latitudes y longitudes
CREATE EXTENSION IF NOT EXISTS postgis;

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
    -- agregar address/detalles varchar
    ubicacion GEOGRAPHY(Point, 4326)  -- Usar el tipo de dato GEOGRAPHY para almacenar latitud y longitud
);
 -- 4326 corresponde al sistema WGS 84, que es el sistema de referencia geográfica más comúnmente utilizado, especialmente en aplicaciones de GPS y mapas.
-- Ejemplo de Uso: Un punto que representa la ubicación de la Torre Eiffel en París podría ser representado como ST_MakePoint(2.2945, 48.8584), donde 2.2945 es la longitud y 48.8584 es la latitud.

-- CONTACTO
CREATE TABLE TipoContacto (
    idTipoContacto SERIAL PRIMARY KEY,
    nombre VARCHAR(256) UNIQUE  -- Ejemplo: 'personal', 'emergencia', 'teléfono', 'correo electrónico'
);

-- Tabla de contactos
CREATE TABLE Contacto (
    idContacto SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idContactInfo INTEGER REFERENCES ContactInfo(idContactInfo), -- el id puede no estar o ser la union de usuario y contact info
    deleted BOOLEAN DEFAULT FALSE 
);

-- Tabla de información de contacto
CREATE TABLE ContactInfo (
    idContactInfo SERIAL PRIMARY KEY,
    tipoContacto INTEGER REFERENCES TipoContacto(idTipoContacto),
    valor VARCHAR(256),  -- Teléfono o Correo
    deleted BOOLEAN DEFAULT FALSE  
);
---
-----------------------------
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
----------------------------

-- Se une depósitos de garantía y pagos en una sola tabla
CREATE TABLE TipoTransaccion (
    idTipoTransaccion SERIAL PRIMARY KEY,  
    descripcion VARCHAR(64) UNIQUE NOT NULL  -- Descripción del tipo de transacción (ejemplo: 'depósito', 'pago')
);

-- Tabla de transacciones
CREATE TABLE Transacciones (
    idTransaccion SERIAL PRIMARY KEY,  
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idTipoTransaccion INTEGER REFERENCES TipoTransaccion(idTipoTransaccion),  -- Referencia al tipo de transacción
    fecha TIMESTAMP DEFAULT NOW(),
    monto DECIMAL(10, 2),
    descripcion TEXT,
    numeroReferencia INTEGER,
    checksum VARCHAR(64) 
);

-- Una bitácora para registros de contacto y de cuidados con los cuidadores.
CREATE TABLE TipoEvento (
    idTipoEvento SERIAL PRIMARY KEY, 
    descripcion VARCHAR(64) UNIQUE NOT NULL  -- Descripción del tipo de evento (ejemplo: 'contacto', 'cuidado')
);

-- Tabla que define los diferentes niveles de gravedad o tipo de evento en la bitácora
CREATE TABLE NivelesBitacora (
    idNivel SERIAL PRIMARY KEY,
    nivel VARCHAR(32) UNIQUE NOT NULL  -- Ejemplos: 'Warning', 'Information', 'Error', etc.
);

-- Tabla de bitácora
CREATE TABLE Bitacora (
    idBitacora SERIAL PRIMARY KEY,
    idTipoEvento INTEGER REFERENCES TipoEvento(idTipoEvento),  
    idNivel INTEGER REFERENCES NivelesBitacora(idNivel),  
    source_id VARCHAR(64),  -- FK artificial: identifica la tabla/entidad que genera el evento
    object_id VARCHAR(64),  -- Identifica el objeto afectado (ej: idUsuario, idDocumento, etc.)
    fecha TIMESTAMP DEFAULT NOW(),  -- Fecha y hora del evento
    detalles TEXT,  
    checksum VARCHAR(64)  
);

CREATE TABLE Favoritos (
    idFavorito SERIAL PRIMARY KEY,  
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Match ( -- para lograr establecer una relación de confianza entre el host y el cuidador
    idMatch SERIAL PRIMARY KEY,
    idHost INTEGER REFERENCES Usuarios(idUsuario),  
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    idPost INTEGER REFERENCES Post(idPost),
    fechaEstablecimiento TIMESTAMP DEFAULT NOW(), 
    estado VARCHAR(64) DEFAULT 'inactivo',  -- Estado de la relación:'activo', 'inactivo', 'completado'
    observaciones TEXT,
    deleted BOOLEAN DEFAULT FALSE 
);

-- Tabla que almacena el historial de eventos relacionados con los cuidadores
CREATE TABLE HistorialCuidador (
    idHistorial SERIAL PRIMARY KEY,
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    fecha TIMESTAMP DEFAULT NOW(),
    evento TEXT,  -- Descripción del evento o actividad relacionada al cuidador
    observaciones TEXT
);

-- Tabla para gestionar contratos entre host y cuidador
CREATE TABLE ContratosCuidador (
    idContrato SERIAL PRIMARY KEY,
    idHost INTEGER REFERENCES Usuarios(idUsuario),
    idCuidador INTEGER REFERENCES Usuarios(idUsuario),
    fechaInicio DATE NOT NULL,  -- Fecha en que el cuidador empieza su trabajo en la casa del host
    fechaFin DATE,  -- Fecha en que termina el contrato, si existe
    estado VARCHAR(64) DEFAULT 'pendiente',  -- Estado del contrato: 'activo', 'completado', 'cancelado'
    observaciones TEXT
);

CREATE TABLE ProtocolosEmergencia (
    idProtocolo SERIAL PRIMARY KEY, 
    idInfoCasa INTEGER REFERENCES InfoCasa(id),
    situacionEmergencia TEXT,
    solucion TEXT NOT NULL
);

CREATE TABLE ServiciosAdicionales (
    idServicio SERIAL PRIMARY KEY, 
    idUsuario INTEGER REFERENCES Usuarios(idUsuario),
    descripcion TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE 
);
