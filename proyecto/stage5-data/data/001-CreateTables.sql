-- Tabla: Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(256) NOT NULL,
    apellido VARCHAR(256) NOT NULL,
    fechaNacimiento DATE,
    ciudadResidencia VARCHAR(256),
    urlImagenPerfil VARCHAR(512),
    telefono VARCHAR(16),
    email VARCHAR(256),
    contrasena VARCHAR(256)
);

-- Tabla: Usuario Registrado
CREATE TABLE UsuarioRegistrado (
    idUsuario INTEGER REFERENCES Usuario(id),
    cedula VARCHAR(64),
    hojaDelincuencia BOOLEAN,
    tarjetaCredito VARCHAR(16),
    tipoUsuario VARCHAR(64),
    PRIMARY KEY (idUsuario)
);

-- Tabla: Red Social
CREATE TABLE RedSocial (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuario(id),
    nombrePlataforma VARCHAR(128),
    urlPerfil VARCHAR(512)
);

-- Tabla: Depósito de Garantía
CREATE TABLE DepositoGarantia (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuario(id),
    idRecibeDep INTEGER REFERENCES Usuario(id),
    monto DECIMAL(10, 2),
    motivo TEXT
);

-- Tabla: Bitácora Depósito
CREATE TABLE BitacoraDeposito (
    id SERIAL PRIMARY KEY,
    idDepGar INTEGER REFERENCES DepositoGarantia(id),
    fechaCreada TIMESTAMP DEFAULT NOW()
);

-- Tabla: Servicios Adicionales
CREATE TABLE ServiciosAdicionales (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuario(id),
    descripcion TEXT
);

-- Tabla: Dirección
CREATE TABLE Direccion (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuario(id),
    pais VARCHAR(128),
    provincia VARCHAR(128),
    canton VARCHAR(128)
);

-- Tabla: Contacto de Emergencia
CREATE TABLE ContactoEmergencia (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuario(id),
    nombreRelacion VARCHAR(256),
    numeroContacto VARCHAR(16)
);

-- Tabla: Bitácora de Transacciones
CREATE TABLE BitacoraTransacciones (
    id SERIAL PRIMARY KEY,
    idPost INTEGER,
    monto DECIMAL(10, 2),
    motivo TEXT
);

-- Tabla: Bitácora de Cuidados
CREATE TABLE BitacoraCuidados (
    id SERIAL PRIMARY KEY,
    idPost INTEGER,
    idCuidador INTEGER REFERENCES Usuario(id),
    observaciones TEXT
);

-- Tabla: URL de Cuidados
CREATE TABLE URLCuidados (
    id SERIAL PRIMARY KEY,
    idBitacoraCuido INTEGER REFERENCES BitacoraCuidados(id),
    link VARCHAR(512)
);

-- Tabla: Protocolos de Emergencia
CREATE TABLE ProtocolosEmergencia (
    id SERIAL PRIMARY KEY,
    idInfoCasa INTEGER,
    situacionEmergencia TEXT,
    solucion TEXT
);

-- Tabla: Favorito
CREATE TABLE Favorito (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER REFERENCES Usuario(id),
    idCuidador INTEGER REFERENCES Usuario(id)
);

-- Tabla: Bitácora Contacto Host
CREATE TABLE BitacoraContactoHost (
    idHost INTEGER REFERENCES Usuario(id),
    idCuidador INTEGER REFERENCES Usuario(id),
    fechaInicioContacto TIMESTAMP,
    PRIMARY KEY (idHost, idCuidador)
);
