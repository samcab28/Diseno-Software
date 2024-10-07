-- 002_insert_initial_data.sql

-- Llenado de la tabla Usuario
INSERT INTO Usuario (nombre, apellido, fechaNacimiento, ciudadResidencia, urlImagenPerfil, telefono, email, contrasena) VALUES
('Juan', 'Pérez', '1985-05-15', 'Madrid', 'http://example.com/imagen.jpg', '123456789', 'juan@example.com', 'contraseña123'),
('Ana', 'García', '1990-07-10', 'Barcelona', 'http://example.com/imagen2.jpg', '987654321', 'ana@example.com', 'contraseña456');

-- Llenado de la tabla UsuarioRegistrado
INSERT INTO UsuarioRegistrado (idUsuario, cedula, hojaDelincuencia, tarjetaCredito, ratingReviews, tipoUsuario) VALUES
(1, 'V-12345678', FALSE, '1234-5678-9012-3456', 4.5, 'Cuidador'),
(2, 'V-87654321', TRUE, '6543-2109-8765-4321', 3.8, 'Host');

-- Llenado de la tabla RedSocial
INSERT INTO RedSocial (idUsuario, nombrePlataforma, urlPerfil) VALUES
(1, 'Facebook', 'http://facebook.com/juan.perez'),
(2, 'LinkedIn', 'http://linkedin.com/ana.garcia');

-- Llenado de la tabla DepositoGarantia
INSERT INTO DepositoGarantia (idUsuario, idRecibeDep, monto, motivo) VALUES
(1, 2, 200.00, 'Depósito de reserva'),
(2, 1, 150.00, 'Depósito de seguridad');

-- Llenado de la tabla BitacoraDeposito
INSERT INTO BitacoraDeposito (idDepGar, fechaCreada) VALUES
(1, NOW()),
(2, NOW());

-- Llenado de la tabla ServiciosAdicionales
INSERT INTO ServiciosAdicionales (idUsuario, descripcion) VALUES
(1, 'Cuidado de mascotas'),
(2, 'Limpieza profunda de hogar');

-- Llenado de la tabla Direccion
INSERT INTO Direccion (idUsuario, pais, provincia, canton) VALUES
(1, 'España', 'Madrid', 'Madrid'),
(2, 'España', 'Cataluña', 'Barcelona');

-- Llenado de la tabla ContactoEmergencia
INSERT INTO ContactoEmergencia (idUsuario, nombreRelacion, numeroContacto) VALUES
(1, 'Hermano', '987654321'),
(2, 'Padre', '123456789');

-- Llenado de la tabla BitacoraTransacciones
INSERT INTO BitacoraTransacciones (idPost, monto, motivo) VALUES
(1, 100.00, 'Pago de reserva inicial'),
(2, 150.00, 'Pago por servicio adicional');

-- Llenado de la tabla BitacoraCuidados
INSERT INTO BitacoraCuidados (idPost, idCuidador, observaciones) VALUES
(1, 1, 'Seguimiento de todas las instrucciones.'),
(2, 2, 'Cuidados específicos proporcionados.');

-- Llenado de la tabla URLCuidados
INSERT INTO URLCuidados (idBitacoraCuido, link) VALUES
(1, 'http://example.com/cuidados1'),
(2, 'http://example.com/cuidados2');

-- Llenado de la tabla ProtocolosEmergencia
INSERT INTO ProtocolosEmergencia (idInfoCasa, situacionEmergencia, solucion) VALUES
(1, 'Incendio', 'Evacuar y llamar a emergencias.'),
(2, 'Inundación', 'Cerrar el suministro de agua y llamar a un técnico.');

-- Llenado de la tabla Favorito
INSERT INTO Favorito (idUsuario, idCuidador) VALUES
(1, 2),
(2, 1);

-- Llenado de la tabla BitacoraContactoHost
INSERT INTO BitacoraContactoHost (idHost, idCuidador, fechaInicioContacto) VALUES
(1, 2, NOW()),
(2, 1, NOW());
