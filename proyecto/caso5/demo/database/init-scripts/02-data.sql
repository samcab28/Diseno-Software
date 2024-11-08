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
INSERT INTO Direccion (idCiudad, codigoPostal, latitud, longitud)
VALUES 
(1, '10203', 9.9271, -84.1366);  -- Escazú

-- Inserción en la tabla Usuarios
INSERT INTO Usuarios (nombre, apellido1, apellido2, fechaNacimiento, urlImagenPerfil, telefono, email, contrasena, idDireccion)
VALUES 
('Juan', 'Perez', 'Lopez', '1990-05-10', 'https://imagen.com/juan', '123456789', 'juan.perez@example.com', DIGEST('password123', 'sha256'), 1);