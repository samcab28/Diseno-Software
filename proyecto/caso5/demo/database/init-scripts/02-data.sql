-- Insercion en la tabla Pais
INSERT INTO Pais (nombre)
VALUES 
('Costa Rica');

-- Insercion en la tabla Estado
INSERT INTO Estado (idPais, nombre)
VALUES 
(1, 'San Jose');

-- Insercion en la tabla Ciudad
INSERT INTO Ciudad (idEstado, nombre)
VALUES 
(1, 'Escazu'),
(1, 'Santa Ana'),
(1, 'Moravia'),
(1, 'Curridabat'),
(1, 'Tibas'),
(1, 'Montes de Oca');

-- Insercion en la tabla Direccion
INSERT INTO Direccion (idCiudad, codigoPostal, latitud, longitud)
VALUES 
(1, '10203', 9.9271, -84.1366),  -- Escazu

-- Santa Ana (cerca de Escazu)
(2, '10901', 9.9324, -84.1834),  -- Centro de Santa Ana
(2, '10903', 9.9354, -84.1891),  -- Pozos

-- Moravia
(3, '11401', 9.9612, -84.0488),  -- Centro de Moravia
(3, '11402', 9.9572, -84.0398),  -- Los Colegios

-- Curridabat
(4, '11801', 9.9130, -84.0341),  -- Centro de Curridabat
(4, '11802', 9.9174, -84.0317),  -- Granadilla

-- Tibas
(5, '11301', 9.9538, -84.0798),  -- Centro de Tibas
(5, '11302', 9.9484, -84.0744),  -- Colima

-- Montes de Oca
(6, '11501', 9.9333, -84.0333),  -- San Pedro
(6, '11502', 9.9406, -84.0297);  -- Sabanilla

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
