INSERT INTO Usuario (nombre, apellido, fechaNacimiento, ciudadResidencia, urlImagenPerfil, telefono, email, contrasena)
VALUES ('Juan', 'Pérez', '1990-05-15', 'San José', 'http://example.com/imagen.jpg', '1234567890', 'juan.perez@example.com', decode('password123', 'escape'));

INSERT INTO TipoUsuario (descripcion)
VALUES ('Cuidador'), ('Host'), ('Administrador');

INSERT INTO UsuarioTipo (idUsuario, idTipoUsuario)
VALUES (1, 1),  -- Juan Pérez es Cuidador

INSERT INTO InfoUsuario (idUsuario, cedula, hojaDelincuencia)
VALUES (1, '123456789', false);

INSERT INTO Pais (nombre)
VALUES ('Costa Rica');

INSERT INTO Estado (idPais, nombre)
VALUES (1, 'San José');

INSERT INTO Ciudad (idEstado, nombre)
VALUES (1, 'San José');

INSERT INTO Direccion (idCiudad, calle1, calle2, codigoPostal, latitud, longitud)
VALUES (1, 'Calle Principal', 'Calle Secundaria', '10101', 9.928, -84.090);

INSERT INTO Contacto (idUsuario, tipoContacto, nombre, numeroContacto, email)
VALUES (1, 'emergencia', 'María López', '0987654321', 'maria.lopez@example.com');

INSERT INTO TipoPlataforma (nombre)
VALUES ('Facebook'), ('Instagram'), ('Twitter');

INSERT INTO RedSocial (idUsuario, idPlataforma, urlPerfil)
VALUES (1, 1, 'http://facebook.com/juanperez'),
       (1, 2, 'http://instagram.com/juanperez');

INSERT INTO Transaccion (idUsuario, monto, descripcion, tipo, numeroReferencia, checksum)
VALUES (1, 100.00, 'Depósito de garantía', 'depósito', 'REF123456', 'CHECKSUM123');

INSERT INTO Bitacora (idUsuario, idCuidador, tipo, observaciones)
VALUES (1, 1, 'contacto', 'Contacto inicial para servicio de cuidado.');

INSERT INTO Favorito (idUsuario, idCuidador)
VALUES (1, 1);  -- Juan Pérez agrega a sí mismo como favorito

INSERT INTO ProtocolosEmergencia (idInfoCasa, situacionEmergencia, solucion)
VALUES (1, 'Incendio', 'Llamar a bomberos y evacuar.');

INSERT INTO ServiciosAdicionales (idUsuario, descripcion)
VALUES (1, 'Cuidado de mascotas', false);
