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

-- Inserciones en la tabla Usuarios
INSERT INTO Usuarios (nombre, apellido1, apellido2, fechaNacimiento, urlImagenPerfil, telefono, email, contrasena, idDireccion)
VALUES 
('Carlos', 'Ramirez', 'Garcia', '1988-03-15', 'https://imagen.com/carlos', '234567891', 'carlos.ramirez@example.com', DIGEST('password123', 'sha256'), 1),
('Luis', 'Martinez', 'Sanchez', '1985-12-21', 'https://imagen.com/luis', '345678912', 'luis.martinez@example.com', DIGEST('password123', 'sha256'), 1),
('Ana', 'Hernandez', 'Diaz', '1992-07-09', 'https://imagen.com/ana', '456789123', 'ana.hernandez@example.com', DIGEST('password123', 'sha256'), 1),
('Maria', 'Gomez', 'Ruiz', '1993-04-20', 'https://imagen.com/maria', '567891234', 'maria.gomez@example.com', DIGEST('password123', 'sha256'), 1),
('David', 'Jimenez', 'Moreno', '1991-09-30', 'https://imagen.com/david', '678912345', 'david.jimenez@example.com', DIGEST('password123', 'sha256'), 1),
('Sandra', 'Lopez', 'Alvarez', '1987-11-11', 'https://imagen.com/sandra', '789123456', 'sandra.lopez@example.com', DIGEST('password123', 'sha256'), 1),
('Jose', 'Castro', 'Ortega', '1984-02-02', 'https://imagen.com/jose', '891234567', 'jose.castro@example.com', DIGEST('password123', 'sha256'), 1),
('Laura', 'Vega', 'Mendez', '1995-08-18', 'https://imagen.com/laura', '912345678', 'laura.vega@example.com', DIGEST('password123', 'sha256'), 1),
('Francisco', 'Rojas', 'Flores', '1986-06-06', 'https://imagen.com/francisco', '123456780', 'francisco.rojas@example.com', DIGEST('password123', 'sha256'), 1),
('Marta', 'Diaz', 'Perez', '1989-01-29', 'https://imagen.com/marta', '234567890', 'marta.diaz@example.com', DIGEST('password123', 'sha256'), 1);

-- Inserciones en la tabla de servicios adicionales
INSERT INTO ServiciosAdicionales (idUsuario, descripcion, deleted)
VALUES
(3, 'Paseo de mascotas', FALSE),
(3, 'Cuidado nocturno', FALSE),
(4, 'Limpieza general', FALSE),
(4, 'Acompañamiento a citas médicas', FALSE),
(7, 'Cuidado de personas mayores', FALSE),
(7, 'Ayuda en las tareas domésticas', FALSE),
(7, 'Entrenamiento de mascotas', FALSE);