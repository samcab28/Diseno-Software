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

-- Insercion en la tabla Usuarios
INSERT INTO Usuarios (nombre, apellido1, apellido2, fechaNacimiento, urlImagenPerfil, telefono, email, contrasena, idDireccion)
VALUES 
('Juan', 'Perez', 'Lopez', '1990-05-10', 'https://imagen.com/juan', '123456789', 'juan.perez@example.com', DIGEST('password123', 'sha256'), 1);
('Maria', 'Rodriguez', 'Campos', '1992-03-15', 'https://imagen.com/maria', '87654321', 'maria.rodriguez@example.com', DIGEST('password456', 'sha256'), 2),
('Carlos', 'Gonzalez', 'Vargas', '1988-07-22', 'https://imagen.com/carlos', '98765432', 'carlos.gonzalez@example.com', DIGEST('password789', 'sha256'), 3),
('Ana', 'Fernandez', 'Mora', '1995-11-30', 'https://imagen.com/ana', '76543210', 'ana.fernandez@example.com', DIGEST('passwordabc', 'sha256'), 4),
('Pedro', 'Jimenez', 'Castro', '1991-09-05', 'https://imagen.com/pedro', '65432109', 'pedro.jimenez@example.com', DIGEST('passworddef', 'sha256'), 5);