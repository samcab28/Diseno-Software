-- Inserción en la tabla Usuarios
INSERT INTO Usuarios (nombre, apellido1, apellido2, fechaNacimiento, urlImagenPerfil, telefono, email, contrasena, idDireccion)
VALUES 
('Juan', 'Perez', 'Lopez', '1990-05-10', 'https://imagen.com/juan', '123456789', 'juan.perez@example.com', ENCODE(DIGEST('password123', 'sha256'), 'hex'), 1);

-- Inserción en la tabla TipoUsuario
INSERT INTO TipoUsuario (descripcion)
VALUES 
('Cuidador'),
('Host'),
('Administrador');

-- Inserción en la tabla UsuariosClasificacion (asignar roles a un usuario)
INSERT INTO UsuariosClasificacion (idUsuario, idTipoUsuario)
VALUES 
(1, 1),  -- Usuario con id 1 tiene el rol de 'Cuidador'
(1, 2);  -- Usuario con id 1 tiene el rol de 'Host'

-- Inserción en la tabla TiposDocumentos
INSERT INTO TiposDocumentos (nombreDocumento)
VALUES 
('Pasaporte'),
('Licencia de Conducir');

-- Inserción en la tabla DocumentosUsuario (documentos del usuario)
INSERT INTO DocumentosUsuario (idUsuario, idTipoDocumento, numeroDocumento, fechaEmision, fechaExpiracion)
VALUES 
(1, 1, 'ABC123456', '2020-01-01', '2030-01-01'),  -- Pasaporte
(1, 2, 'XYZ987654', '2021-05-10', '2026-05-10');  -- Licencia de Conducir

-- Inserción en la tabla Pais
INSERT INTO Pais (nombre)
VALUES 
('Costa Rica');

-- Inserción en la tabla Estado
INSERT INTO Estado (idPais, nombre)
VALUES 
(1, 'San José');

-- Inserción en la tabla Ciudad
INSERT INTO Ciudad (idEstado, nombre)
VALUES 
(1, 'Escazú');

-- Inserción en la tabla Direccion
INSERT INTO Direccion (idCiudad, codigoPostal, ubicacion)
VALUES 
(1, '10203', ST_SetSRID(ST_MakePoint(-84.1366, 9.9271), 4326));  -- Escazú

-- Inserción en la tabla TipoContacto
INSERT INTO TipoContacto (nombre)
VALUES 
('Personal'),
('Emergencia'),
('Teléfono'),
('Correo Electrónico');

-- Inserción en la tabla ContactInfo (información de contacto)
INSERT INTO ContactInfo (tipoContacto, valor)
VALUES 
(1, '123456789'),  -- Teléfono
(2, '987654321'),  -- Emergencia
(3, '555123456'),  -- Teléfono adicional
(4, 'juan.perez@example.com');  -- Correo

-- Inserción en la tabla Contacto (asociación de contacto con usuario)
INSERT INTO Contacto (idUsuario, idContactInfo)
VALUES 
(1, 1),  -- Usuario con id 1 tiene teléfono
(1, 2),  -- Usuario con id 1 tiene contacto de emergencia
(1, 3),  -- Usuario con id 1 tiene otro teléfono
(1, 4);  -- Usuario con id 1 tiene correo electrónico

-- Inserción en la tabla TipoPlataforma
INSERT INTO TipoPlataforma (nombre)
VALUES 
('Facebook'),
('Instagram');

-- Inserción en la tabla RedSocial (asociación de un usuario con redes sociales)
INSERT INTO RedSocial (idUsuario, idPlataforma, urlPerfil)
VALUES 
(1, 1, 'https://facebook.com/juan.perez'),
(1, 2, 'https://instagram.com/juan.perez');

-- Inserción en la tabla TipoTransaccion
INSERT INTO TipoTransaccion (descripcion)
VALUES 
('Depósito'),
('Pago');

-- Inserción en la tabla Transacciones (transacciones del usuario)
INSERT INTO Transacciones (idUsuario, idTipoTransaccion, monto, descripcion, numeroReferencia, checksum)
VALUES 
(1, 1, 500.00, 'Depósito de garantía', 123456, ENCODE(DIGEST('deposito123', 'sha256'), 'hex')),
(1, 2, 100.00, 'Pago de servicio', 789012, ENCODE(DIGEST('pago456', 'sha256'), 'hex'));

-- Inserción en la tabla TipoEvento
INSERT INTO TipoEvento (descripcion)
VALUES 
('Contacto'),
('Cuidado');

-- Inserción en la tabla NivelesBitacora
INSERT INTO NivelesBitacora (nivel)
VALUES 
('Warning'),
('Information'),
('Error');

-- Inserción en la tabla Bitacora (bitácora de eventos)
INSERT INTO Bitacora (idTipoEvento, idNivel, source_id, object_id, detalles)
VALUES 
(1, 2, 'Usuarios', '1', 'Usuario registrado correctamente'),
(2, 3, 'Usuarios', '1', 'Error al intentar actualizar el perfil del usuario');

-- Inserción en la tabla Favoritos
INSERT INTO Favoritos (idUsuario, idCuidador)
VALUES 
(1, 2);  -- Usuario 1 tiene al cuidador 2 como favorito

-- Inserción en la tabla Match (relación entre Host y Cuidador)
INSERT INTO Match (idHost, idCuidador, estado)
VALUES 
(1, 2, 'activo');

-- Inserción en la tabla HistorialCuidador (historial de eventos con el cuidador)
INSERT INTO HistorialCuidador (idCuidador, evento)
VALUES 
(2, 'Cuidador asignado a usuario Juan Pérez'),
(2, 'Cuidador completó su tarea con éxito');

-- Inserción en la tabla ContratosCuidador (contrato entre Host y Cuidador)
INSERT INTO ContratosCuidador (idHost, idCuidador, fechaInicio, estado)
VALUES 
(1, 2, '2024-10-01', 'activo');

-- Inserción en la tabla ProtocolosEmergencia
INSERT INTO ProtocolosEmergencia (idInfoCasa, situacionEmergencia, solucion)
VALUES 
(1, 'Incendio', 'Evacuar inmediatamente y llamar al 911');

-- Inserción en la tabla ServiciosAdicionales
INSERT INTO ServiciosAdicionales (idUsuario, descripcion)
VALUES 
(1, 'Servicio de limpieza');
