{
  "Usuarios": [
    {
      "idUsuario": 1,
      "nombre": "Juan",
      "apellido1": "Perez",
      "apellido2": "Lopez",
      "fechaNacimiento": "1990-05-10",
      "urlImagenPerfil": "https://imagen.com/juan",
      "telefono": "123456789",
      "email": "juan.perez@example.com",
      "contrasena": "password123",
      "idDireccion": 1
    }
  ],
  "TipoUsuario": [
    {
      "idTipoUsuario": 1,
      "descripcion": "Cuidador"
    },
    {
      "idTipoUsuario": 2,
      "descripcion": "Host"
    },
    {
      "idTipoUsuario": 3,
      "descripcion": "Administrador"
    }
  ],
  "UsuariosClasificacion": [
    {
      "idUsuario": 1,
      "idTipoUsuario": 1
    },
    {
      "idUsuario": 1,
      "idTipoUsuario": 2
    }
  ],
  "TiposDocumentos": [
    {
      "idTipoDocumento": 1,
      "nombreDocumento": "Pasaporte"
    },
    {
      "idTipoDocumento": 2,
      "nombreDocumento": "Licencia de Conducir"
    }
  ],
  "DocumentosUsuario": [
    {
      "idUsuario": 1,
      "idTipoDocumento": 1,
      "numeroDocumento": "ABC123456",
      "fechaEmision": "2020-01-01",
      "fechaExpiracion": "2030-01-01"
    },
    {
      "idUsuario": 1,
      "idTipoDocumento": 2,
      "numeroDocumento": "XYZ987654",
      "fechaEmision": "2021-05-10",
      "fechaExpiracion": "2026-05-10"
    }
  ],
  "UsuariosVerificados": [
    {
      "idUsuario": 1,
      "fechaVerificacion": "2024-10-20",
    }
  ],
  "Pais": [
    {
      "idPais": 1,
      "nombre": "Costa Rica"
    }
  ],
  "Estado": [
    {
      "idEstado": 1,
      "idPais": 1,
      "nombre": "San José"
    }
  ],
  "Ciudad": [
    {
      "idCiudad": 1,
      "idEstado": 1,
      "nombre": "Escazú"
    }
  ],
  "Direccion": [
    {
      "idDireccion": 1,
      "idCiudad": 1,
      "codigoPostal": "10203",
      "ubicacion": {
        "type": "Point",
        "coordinates": [-84.1366, 9.9271]
      }
    }
  ],
  "TipoContacto": [
    {
      "idTipoContacto": 1,
      "nombre": "Personal"
    },
    {
      "idTipoContacto": 2,
      "nombre": "Emergencia"
    },
    {
      "idTipoContacto": 3,
      "nombre": "Teléfono"
    },
    {
      "idTipoContacto": 4,
      "nombre": "Correo Electrónico"
    }
  ],
  "ContactInfo": [
    {
      "idContactInfo": 1,
      "tipoContacto": 1,
      "valor": "123456789"
    },
    {
      "idContactInfo": 2,
      "tipoContacto": 2,
      "valor": "987654321"
    },
    {
      "idContactInfo": 3,
      "tipoContacto": 3,
      "valor": "555123456"
    },
    {
      "idContactInfo": 4,
      "tipoContacto": 4,
      "valor": "juan.perez@example.com"
    }
  ],
  "Contacto": [
    {
      "idUsuario": 1,
      "idContactInfo": 1
    },
    {
      "idUsuario": 1,
      "idContactInfo": 2
    },
    {
      "idUsuario": 1,
      "idContactInfo": 3
    },
    {
      "idUsuario": 1,
      "idContactInfo": 4
    }
  ],
  "TipoPlataforma": [
    {
      "idPlataforma": 1,
      "nombre": "Facebook"
    },
    {
      "idPlataforma": 2,
      "nombre": "Instagram"
    }
  ],
  "RedSocial": [
    {
      "idUsuario": 1,
      "idPlataforma": 1,
      "urlPerfil": "https://facebook.com/juan.perez"
    },
    {
      "idUsuario": 1,
      "idPlataforma": 2,
      "urlPerfil": "https://instagram.com/juan.perez"
    }
  ],
  "TipoTransaccion": [
    {
      "idTipoTransaccion": 1,
      "descripcion": "Depósito"
    },
    {
      "idTipoTransaccion": 2,
      "descripcion": "Pago"
    }
  ],
  "Transacciones": [
    {
      "idUsuario": 1,
      "idTipoTransaccion": 1,
      "monto": 500.00,
      "descripcion": "Depósito de garantía",
      "numeroReferencia": 123456,
      "checksum": "checksum1"
    },
    {
      "idUsuario": 1,
      "idTipoTransaccion": 2,
      "monto": 100.00,
      "descripcion": "Pago de servicio",
      "numeroReferencia": 789012,
      "checksum": "checksum2"
    }
  ],
  "TipoEvento": [
    {
      "idTipoEvento": 1,
      "descripcion": "Contacto"
    },
    {
      "idTipoEvento": 2,
      "descripcion": "Cuidado"
    }
  ],
  "NivelesBitacora": [
    {
      "idNivel": 1,
      "nivel": "Warning"
    },
    {
      "idNivel": 2,
      "nivel": "Information"
    },
    {
      "idNivel": 3,
      "nivel": "Error"
    }
  ],
  "Bitacora": [
    {
      "idTipoEvento": 1,
      "idNivel": 2,
      "source_id": "Usuarios",
      "object_id": "1",
      "detalles": "Usuario registrado correctamente"
    },
    {
      "idTipoEvento": 2,
      "idNivel": 3,
      "source_id": "Usuarios",
      "object_id": "1",
      "detalles": "Error al intentar actualizar el perfil del usuario"
    }
  ],
  "Favoritos": [
    {
      "idUsuario": 1,
      "idCuidador": 2
    }
  ],
  "Match": [
    {
      "idHost": 1,
      "idCuidador": 2,
      "estado": "activo"
    }
  ],
  "HistorialCuidador": [
    {
      "idCuidador": 2,
      "evento": "Cuidador asignado a usuario Juan Pérez"
    },
    {
      "idCuidador": 2,
      "evento": "Cuidador completó su tarea con éxito"
    }
  ],
  "ContratosCuidador": [
    {
      "idHost": 1,
      "idCuidador": 2,
      "fechaInicio": "2024-10-01",
      "estado": "activo"
    }
  ],
  "ProtocolosEmergencia": [
    {
      "idInfoCasa": 1,
      "situacionEmergencia": "Incendio",
      "solucion": "Evacuar inmediatamente y llamar al 911"
    }
  ],
  "ServiciosAdicionales": [
    {
      "idUsuario": 1,
      "descripcion": "Servicio de limpieza"
    }
  ]
}
