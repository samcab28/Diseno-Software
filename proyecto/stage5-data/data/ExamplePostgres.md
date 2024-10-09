```------ POSGRESQL ------
{
  "Usuario": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "fechaNacimiento": "1985-05-15",
      "ciudadResidencia": "Madrid",
      "urlImagenPerfil": "http://example.com/imagen.jpg",
      "telefono": "123456789",
      "email": "juan@example.com",
      "contrasena": "contraseña123"
    }
  ],
  "UsuarioRegistrado": [
    {
      "idUsuario": 1,
      "cedula": "V-12345678",
      "hojaDelincuencia": false,
      "tarjetaCredito": "1234-5678-9012-3456",
      "tipoUsuario": "Cuidador"
    }
  ],
  "RedSocial": [
    {
      "id": 1,
      "idUsuario": 1,
      "nombrePlataforma": "Facebook",
      "urlPerfil": "http://facebook.com/juan.perez"
    }
  ],
  "DepositoGarantia": [
    {
      "id": 1,
      "idUsuario": 1,
      "idRecibeDep": 1,
      "monto": 200.00,
      "motivo": "Depósito para reservas"
    }
  ],
  "BitacoraDeposito": [
    {
      "id": 1,
      "idDepGar": 1,
      "fechaCreada": "2024-10-01T12:30:00Z"
    }
  ],
  "ServiciosAdicionales": [
    {
      "id": 1,
      "idUsuario": 1,
      "descripcion": "Cuidado de mascotas"
    }
  ],
  "Direccion": [
    {
      "id": 1,
      "idUsuario": 1,
      "pais": "España",
      "provincia": "Madrid",
      "canton": "Madrid"
    }
  ],
  "ContactoEmergencia": [
    {
      "id": 1,
      "idUsuario": 1,
      "nombreRelacion": "Hermano",
      "numeroContacto": "987654321"
    }
  ],
  "BitacoraTransacciones": [
    {
      "id": 1,
      "idPost": 1,
      "monto": 150.00,
      "motivo": "Pago por servicio"
    }
  ],
  "BitacoraCuidados": [
    {
      "id": 1,
      "idPost": 1,
      "idCuidador": 1,
      "observaciones": "Se siguieron todas las instrucciones."
    }
  ],
  "URLCuidados": [
    {
      "id": 1,
      "idBitacoraCuido": 1,
      "link": "http://example.com/instrucciones"
    }
  ],
  "ProtocolosEmergencia": [
    {
      "id": 1,
      "idInfoCasa": 1,
      "situacionEmergencia": "Incendio",
      "solucion": "Llamar al 112 y evacuar el edificio."
    }
  ],
  "Favorito": [
    {
      "id": 1,
      "idUsuario": 1,
      "idCuidador": 1
    }
  ]
}
```