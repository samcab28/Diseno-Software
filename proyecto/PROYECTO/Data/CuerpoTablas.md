## Tablas del Sistema

### 1. Usuario
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador único del usuario             |
| `nombre`            | Nombre del usuario                          |
| `apellido`          | Apellido del usuario                        |
| `fechaNacimiento`   | Fecha de nacimiento                         |
| `ciudadResidencia`  | Ciudad de residencia                        |
| `urlImagenPerfil`   | URL de la imagen de perfil                  |
| `telefono`          | Teléfono                                    |
| `email`             | Correo electrónico                          |
| `contrasena`        | Contraseña                                  |

### 2. Usuario Registrado
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `idUsuario`         | Identificador del usuario                   |
| `cedula`            | Cédula                                      |
| `hojaDelincuencia`  | Hoja de delincuencia                        |
| `tarjetaCredito`    | Tarjeta de crédito                          |
| `ratingReviews`     | Promedio de calificación en reseñas         |
| `tipoUsuario`       | Tipo de usuario (cuidador, host, admin)      |

### 3. Reviews
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la reseña                  |
| `idUsuario`         | Usuario que realizó la reseña               |
| `idRecibeReview`    | Usuario que recibe la reseña                |
| `calificacion`      | Calificación (1-5)                          |
| `comentario`        | Comentario                                  |
| `fechaCreado`       | Fecha de creación                           |

### 4. Red Social
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la red social              |
| `idUsuario`         | Usuario asociado                            |
| `nombrePlataforma`  | Nombre de la plataforma                     |
| `urlPerfil`         | URL del perfil en la plataforma             |

### 5. Depósito de Garantía
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador del depósito                  |
| `idUsuario`         | Usuario que realiza el depósito             |
| `idRecibeDep`       | Usuario que recibe el depósito              |
| `monto`             | Monto del depósito                          |
| `motivo`            | Motivo del depósito                         |

### 6. Bitácora Depósito
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la bitácora                |
| `idDepGar`          | Identificador del depósito de garantía      |
| `fechaCreada`       | Fecha de creación                           |

### 7. Servicios Adicionales
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador del servicio                  |
| `idUsuario`         | Usuario que ofrece el servicio              |
| `descripcion`       | Descripción del servicio                    |

### 8. Review Servicios
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la reseña                  |
| `idServicio`        | Servicio que se está reseñando              |
| `idUsuario`         | Usuario que realizó la reseña               |
| `calificacion`      | Calificación (1-5)                          |
| `comentario`        | Comentario                                  |
| `fechaCreado`       | Fecha de creación                           |

### 9. Dirección
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la dirección               |
| `idUsuario`         | Usuario asociado                            |
| `pais`              | País                                        |
| `provincia`         | Provincia                                   |
| `canton`            | Cantón                                      |

### 10. Contacto de Emergencia
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador del contacto                  |
| `idUsuario`         | Usuario asociado                            |
| `nombreRelacion`    | Nombre y relación con el usuario            |
| `numeroContacto`    | Número de contacto                          |

### 11. Bitácora de Transacciones
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la bitácora                |
| `idPost`            | Identificador del post relacionado          |
| `monto`             | Monto de la transacción                     |
| `motivo`            | Motivo de la transacción                    |

### 12. Bitácora de Cuidados
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la bitácora                |
| `idPost`            | Identificador del post relacionado          |
| `idCuidador`        | Identificador del cuidador                  |
| `observaciones`     | Observaciones                               |

### 13. URL de Cuidados
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la URL                     |
| `idBitacoraCuido`   | Identificador de la bitácora de cuidados    |
| `link`              | Enlace a la imagen o video                  |

### 14. Protocolos de Emergencia
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador del protocolo                 |
| `idInfoCasa`        | Identificador de la información de la casa  |
| `situacionEmergencia` | Descripción de la situación de emergencia  |
| `solucion`          | Solución propuesta                          |

### 15. Favorito
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador del favorito                  |
| `idUsuario`         | Usuario que agregó el favorito              |
| `idCuidador`        | Identificador del cuidador favorito         |

### 16. Info Casa
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador de la información de la casa  |
| `idUsuario`         | Usuario asociado                            |
| `idDireccion`       | Dirección asociada                          |
| `descripcionBase`   | Descripción básica de la casa               |
| `numHabitaciones`   | Número de habitaciones                      |
| `numBanos`          | Número de baños                             |
| `descripcionCuidados` | Descripción de cuidados                   |
| `piscina`           | Tiene piscina (bool)                        |
| `jardin`            | Tiene jardín (bool)                         |
| `mascotas`          | Tiene mascotas (bool)                       |

### 17. Post
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `idUsuario`         | Usuario que crea el post                    |
| `motivo`            | Motivo del post (casa/mascota)              |
| `idInfoBasica`      | Información básica de la casa               |
| `ofertaPago`        | Oferta de pago                              |
| `fechaInicio`       | Fecha de inicio                             |
| `fechaFin`          | Fecha de finalización                       |

### 18. Sub-Ison Pagos
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `id`                | Identificador del pago                      |
| `asunto`            | Asunto del pago                             |
| `fecha`             | Fecha del pago                              |
| `monto`             | Monto del pago                              |
| `descripcionTipoPago` | Descripción del tipo de pago              |

### 19. Estado Reservado
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `estadoReservado`   | Estado de reserva (bool)                    |

### 20. Bitácora Contacto Host
| Campo               | Descripción                                 |
|---------------------|---------------------------------------------|
| `idHost`            | Identificador del host                      |
| `idCuidador`        | Identificador del cuidador                  |
| `fechaInicioContacto` | Fecha de inicio de contacto               |
