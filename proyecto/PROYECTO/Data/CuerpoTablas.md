# Tablas del Sistema
## PostgreSQL
### 1. Usuario
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `nombre`            | `VARCHAR(256)`   |
| `apellido`          | `VARCHAR(256)`   |
| `fechaNacimiento`   | `DATE`           |
| `ciudadResidencia`  | `VARCHAR(256)`   |
| `urlImagenPerfil`   | `VARCHAR(512)`   |
| `telefono`          | `VARCHAR(16)`    |
| `email`             | `VARCHAR(256)`   |
| `contrasena`        | `VARCHAR(256)`   |

### 2. Usuario Registrado
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `idUsuario`         | `INTEGER`        |
| `cedula`            | `VARCHAR(64)`    |
| `hojaDelincuencia`  | `BOOLEAN`        |
| `tarjetaCredito`    | `VARCHAR(16)`    |
| `ratingReviews`     | `FLOAT`          |
| `tipoUsuario`       | `VARCHAR(64)`    |

### 3. Reviews
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `idRecibeReview`    | `INTEGER`        |
| `calificacion`      | `INTEGER`        |
| `comentario`        | `TEXT`           |
| `fechaCreado`       | `TIMESTAMP`      |

### 4. Red Social
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `nombrePlataforma`  | `VARCHAR(128)`   |
| `urlPerfil`         | `VARCHAR(512)`   |

### 5. Depósito de Garantía
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `idRecibeDep`       | `INTEGER`        |
| `monto`             | `DECIMAL(10,2)`  |
| `motivo`            | `TEXT`           |

### 6. Bitácora Depósito
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idDepGar`          | `INTEGER`        |
| `fechaCreada`       | `TIMESTAMP`      |

### 7. Servicios Adicionales
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `descripcion`       | `TEXT`           |

### 8. Review Servicios
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idServicio`        | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `calificacion`      | `INTEGER`        |
| `comentario`        | `TEXT`           |
| `fechaCreado`       | `TIMESTAMP`      |

### 9. Dirección
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `pais`              | `VARCHAR(128)`   |
| `provincia`         | `VARCHAR(128)`   |
| `canton`            | `VARCHAR(128)`   |

### 10. Contacto de Emergencia
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `nombreRelacion`    | `VARCHAR(256)`   |
| `numeroContacto`    | `VARCHAR(16)`    |

### 11. Bitácora de Transacciones
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idPost`            | `INTEGER`        |
| `monto`             | `DECIMAL(10,2)`  |
| `motivo`            | `TEXT`           |

### 12. Bitácora de Cuidados
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idPost`            | `INTEGER`        |
| `idCuidador`        | `INTEGER`        |
| `observaciones`     | `TEXT`           |

### 13. URL de Cuidados
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idBitacoraCuido`   | `INTEGER`        |
| `link`              | `VARCHAR(512)`   |

### 14. Protocolos de Emergencia
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idInfoCasa`        | `INTEGER`        |
| `situacionEmergencia` | `TEXT`         |
| `solucion`          | `TEXT`           |

### 15. Favorito
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `idCuidador`        | `INTEGER`        |

--------------------------------------------------------------
## MongoDB

### 16. Info Casa
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `idDireccion`       | `INTEGER`        |
| `descripcionBase`   | `TEXT`           |
| `numHabitaciones`   | `INTEGER`        |
| `numBanos`          | `INTEGER`        |
| `descripcionCuidados` | `TEXT`         |
| `piscina`           | `BOOLEAN`        |
| `jardin`            | `BOOLEAN`        |
| `mascotas`          | `BOOLEAN`        |

### 17. Post
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `id`                | `INTEGER`        |
| `idUsuario`         | `INTEGER`        |
| `motivo`            | `TEXT`           |
| `idInfoBasica`      | `INTEGER`        |
| `ofertaPago`        | `DECIMAL(10,2)`  |
| `fechaInicio`       | `TIMESTAMP`      |
| `fechaFin`          | `TIMESTAMP`      |
| `subJsonPagos`      | `JSON`           |
| `estadoReservado`   | `BOOLEAN`        |

- Sub-json Pagos
```
{
  "pagos": [
    {
      "id": 0,
      "asunto": "",
      "fecha": "",
      "monto": 0.0,
      "descripcionTipoPago": ""
    }
  ]
}
```

### 18. Bitácora Contacto Host
| Campo               | Tipo de Dato     |
|---------------------|------------------|
| `idHost`            | `INTEGER`        |
| `idCuidador`        | `INTEGER`        |
| `fechaInicioContacto` | `TIMESTAMP`    |
