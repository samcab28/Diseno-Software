# Índice

1. [Introducción](#introducción)
2. [Objetivos](#objetivos)
   1. [Objetivo General](#objetivo-general)
   2. [Objetivos Específicos](#objetivos-específicos)
3. [Arquitectura Propuesta](#arquitectura-propuesta)
   1. [Diseño de Microservicios](#diseño-de-microservicios)
4. [Requerimientos Tecnológicos](#requerimientos-tecnológicos)
   1. [Infraestructura](#infraestructura)
   2. [Tecnologías](#tecnologías)
5. [Diseño de Endpoints](#diseño-de-endpoints)
6. [Plan de Pruebas](#plan-de-pruebas)
7. [Recomendaciones](#recomendaciones)
8. [Conclusiones](#conclusiones)

## Introducción 

## Objetivos 

### Objetivo General 

### Objetivos Específicos 

## Arquitectura Propuesta

### Diseño de Microservicios 

## Requerimientos Tecnológicos 

### Infraestructura

### Tecnologías 

# Documentación API de Knowblock

## URL Base

```
https://api.knowblock.com/v1
```

## Autenticación

Todas las solicitudes a la API requieren un token JWT válido en el encabezado de Autorización:

```
Authorization: Bearer <token>
```

## Endpoints

### 1. Registro de Usuario

- **Nombre**: Registrar Usuario
- **Descripción**: Registra un nuevo usuario en la plataforma Knowblock, creando su perfil inicial y estableciendo sus credenciales de acceso.
- **Método HTTP**: POST
- **URL**: `/usuarios/registro`

#### Cuerpo de la Solicitud

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@ejemplo.com",
  "contrasena": "Cl@ve$egura123!",
  "fechaNacimiento": "1990-01-15",
  "pais": "España",
  "nivelEducativo": "Universitario",
  "areaInteres": ["Tecnología", "Educación"]
}
```

#### Encabezados

```
Content-Type: application/json
```

#### Respuestas

##### 201 Created

```json
{
  "usuarioId": "usr_12345abcde",
  "mensaje": "Usuario registrado exitosamente",
  "perfilUrl": "https://knowblock.com/perfil/juan.perez",
  "tokenActivacion": "act_xyz789",
  "instrucciones": "Por favor, active su cuenta haciendo clic en el enlace enviado a su correo electrónico."
}
```

##### 400 Bad Request

```json
{
  "error": "Datos de entrada inválidos",
  "detalles": [
    "El email ya está en uso",
    "La contraseña debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos",
    "El país especificado no es válido"
  ]
}
```

##### 409 Conflict

```json
{
  "error": "Conflicto en el registro",
  "mensaje": "Ya existe una cuenta asociada a este correo electrónico",
  "accionRecomendada": "Si olvidó su contraseña, puede usar la opción de recuperación de cuenta"
}
```

#### Notas Adicionales
- La contraseña debe cumplir con políticas de seguridad estrictas.
- Se envía un correo de verificación al email proporcionado.
- Los datos se almacenan de forma segura en la base de datos PostgreSQL.
- Se recomienda implementar un sistema de captcha para prevenir registros automatizados.

### 2. Autenticación de Usuario

- **Nombre**: Iniciar Sesión de Usuario
- **Descripción**: Autentica a un usuario existente y devuelve un token JWT para su uso en futuras solicitudes a la API.
- **Método HTTP**: POST
- **URL**: `/usuarios/login`

#### Cuerpo de la Solicitud

```json
{
  "email": "juan.perez@ejemplo.com",
  "contrasena": "Cl@ve$egura123!"
}
```

#### Encabezados

```
Content-Type: application/json
```

#### Respuestas

##### 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuarioId": "usr_12345abcde",
  "expiraEn": 3600,
  "tipoToken": "Bearer",
  "permisos": ["lectura", "escritura", "validacion"],
  "ultimoAcceso": "2024-03-17T10:30:00Z"
}
```

##### 400 Bad Request

```json
{
  "error": "Datos de entrada inválidos",
  "mensaje": "El email o la contraseña están vacíos o no cumplen con el formato requerido"
}
```

##### 401 Unauthorized

```json
{
  "error": "Autenticación fallida",
  "mensaje": "Email o contraseña incorrectos",
  "intentosRestantes": 2,
  "tiempoBloqueo": null
}
```

#### Notas Adicionales
- Implementar un sistema de bloqueo temporal después de varios intentos fallidos.
- El token JWT debe incluir información relevante como el ID del usuario y sus permisos.
- Registrar cada intento de inicio de sesión para análisis de seguridad.
- Considerar la implementación de autenticación de dos factores para mayor seguridad.

### 3. Obtener Información de Usuario

- **Nombre**: Obtener Perfil de Usuario
- **Descripción**: Recupera la información detallada del perfil de un usuario específico basado en su ID.
- **Método HTTP**: GET
- **URL**: `/usuarios/{usuarioId}`

#### Parámetros de Ruta
- `usuarioId` (string): Identificador único del usuario.

#### Encabezados

```
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "usuarioId": "usr_12345abcde",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@ejemplo.com",
  "fechaNacimiento": "1990-01-15",
  "pais": "España",
  "nivelEducativo": "Universitario",
  "areasInteres": ["Tecnología", "Educación"],
  "conocimientosValidados": [
    {
      "id": "con_789xyz",
      "titulo": "Introducción a Blockchain",
      "institucion": "Universidad Tecnológica",
      "fechaValidacion": "2024-02-20",
      "hashBlockchain": "0x..."
    }
  ],
  "redesSociales": {
    "linkedin": "https://linkedin.com/in/juanperez",
    "github": "https://github.com/juanperez"
  },
  "estadoCuenta": "activo",
  "fechaRegistro": "2024-01-01T00:00:00Z",
  "ultimoAcceso": "2024-03-17T10:30:00Z"
}
```

##### 400 Bad Request

```json
{
  "error": "Solicitud inválida",
  "mensaje": "El ID de usuario proporcionado no tiene un formato válido"
}
```

##### 403 Forbidden

```json
{
  "error": "Acceso denegado",
  "mensaje": "No tiene permisos para ver esta información",
  "razon": "El token proporcionado no corresponde al usuario solicitado o no tiene los permisos necesarios"
}
```

##### 404 Not Found

```json
{
  "error": "Usuario no encontrado",
  "mensaje": "No se encontró ningún usuario con el ID proporcionado",
  "sugerencia": "Verifique el ID del usuario e intente nuevamente"
}
```

#### Notas Adicionales
- Implementar cache para mejorar el rendimiento en solicitudes frecuentes.
- Considerar la posibilidad de incluir un parámetro para controlar el nivel de detalle de la información devuelta.
- Asegurar que la información sensible (como la fecha de nacimiento) solo se muestre a usuarios autorizados.
- Incluir enlaces a recursos relacionados, como los conocimientos validados del usuario.

### 4. Actualizar Información de Usuario

- **Nombre**: Actualizar Perfil de Usuario
- **Descripción**: Permite la actualización de la información del perfil de un usuario existente.
- **Método HTTP**: PUT
- **URL**: `/usuarios/{usuarioId}`

#### Parámetros de Ruta
- `usuarioId` (string): Identificador único del usuario.

#### Cuerpo de la Solicitud

```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez González",
  "nivelEducativo": "Postgrado",
  "areasInteres": ["Tecnología", "Educación", "Inteligencia Artificial"],
  "redesSociales": {
    "linkedin": "https://linkedin.com/in/juancperez",
    "github": "https://github.com/juancperez",
    "twitter": "https://twitter.com/juancperez"
  },
  "biografia": "Profesional en tecnología con más de 5 años de experiencia en desarrollo de software y educación en línea."
}
```

#### Encabezados

```
Content-Type: application/json
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "usuarioId": "usr_12345abcde",
  "mensaje": "Perfil actualizado exitosamente",
  "cambiosRealizados": [
    "Nombre actualizado",
    "Apellido actualizado",
    "Nivel educativo actualizado",
    "Áreas de interés actualizadas",
    "Redes sociales actualizadas",
    "Biografía añadida"
  ],
  "fechaActualizacion": "2024-03-17T14:45:00Z",
  "perfilUrl": "https://knowblock.com/perfil/juancperez"
}
```

##### 400 Bad Request

```json
{
  "error": "Datos inválidos",
  "detalles": [
    "El nivel educativo proporcionado no es válido",
    "La URL de LinkedIn no tiene un formato correcto"
  ],
  "sugerencias": [
    "Los niveles educativos válidos son: 'Secundaria', 'Universitario', 'Postgrado', 'Doctorado'",
    "Asegúrese de incluir 'https://' en las URLs de redes sociales"
  ]
}
```

##### 403 Forbidden

```json
{
  "error": "Acceso denegado",
  "mensaje": "No tiene permisos para modificar este perfil",
  "razon": "El token proporcionado no corresponde al usuario o ha expirado"
}
```

##### 404 Not Found

```json
{
  "error": "Usuario no encontrado",
  "mensaje": "No se encontró ningún usuario con el ID proporcionado",
  "sugerencia": "Verifique el ID del usuario e intente nuevamente"
}
```

#### Notas Adicionales
- Implementar validación de campos para asegurar la integridad de los datos.
- Considerar la posibilidad de actualización parcial (PATCH) para modificaciones menores.
- Registrar historial de cambios para auditoría y posible reversión.
- Enviar notificación al usuario sobre los cambios realizados en su perfil.
- Actualizar cualquier caché relacionada con la información del usuario.

### 5. Enviar Solicitud de Validación de Conocimiento

- **Nombre**: Enviar Solicitud de Validación de Conocimiento
- **Descripción**:  Permite a un usuario enviar una solicitud para validar un conocimiento adquirido, iniciando el proceso de verificación en la plataforma.
- **Método HTTP**: POST
- **URL**: `/api/knowledge/validate`

#### Cuerpo de la Solicitud

```json
{
  "usuarioId": "usr_12345abcde",
  "conocimiento": {
    "titulo": "Fundamentos de Inteligencia Artificial",
    "descripcion": "Curso completo sobre los principios básicos de IA",
    "institucion": "Universidad Tecnológica de Ejemplo",
    "fechaFinalizacion": "2024-02-15",
    "tipoCredencial": "certificado"
  },
  "evidencias": [
    {
      "tipo": "certificado",
      "url": "https://ejemplo.com/certificados/ia_fundamentos.pdf"
    },
    {
      "tipo": "proyecto",
      "url": "https://github.com/usuario/proyecto-ia-final"
    }
  ],
  "detallesAdicionales": "Completé el curso con una calificación de 95/100"
}
```

#### Encabezados

```
Content-Type: application/json
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "validacionId": "val_789xyz",
  "estado": "pendiente",
  "fechaSolicitud": "2024-03-18T15:30:00Z",
  "estimacionFinalizacion": "2024-03-25T15:30:00Z",
  "pasosSiguientes": [
    "Revisión inicial de la documentación",
    "Verificación con la institución emisora",
    "Evaluación por pares expertos"
  ],
  "mensajeUsuario": "Su solicitud de validación ha sido recibida y está siendo procesada. Le notificaremos cuando haya actualizaciones.",
  "urlSeguimiento": "https://knowblock.com/validaciones/val_789xyz"
}
```

##### 400 Bad Request

```json
{
  "error": "Datos faltantes o inválidos",
  "detalles": [
    "El campo 'titulo' del conocimiento es obligatorio",
    "La fecha de finalización no puede ser futura",
    "Se requiere al menos una evidencia válida"
  ],
  "sugerencias": [
    "Asegúrese de proporcionar un título para el conocimiento a validar",
    "Verifique que la fecha de finalización sea anterior o igual a la fecha actual",
    "Adjunte al menos un documento o enlace como evidencia del conocimiento"
  ]
}
```

##### 401 Unauthorized

```json
{
  "error": "No autorizado para solicitar validación",
  "mensaje": "Su cuenta no tiene los permisos necesarios para solicitar validaciones de conocimiento",
  "razon": "Es necesario completar el perfil de usuario y verificar la cuenta de email",
  "accionesRecomendadas": [
    "Complete su perfil de usuario en la plataforma",
    "Verifique su dirección de email siguiendo el enlace enviado a su correo",
    "Si el problema persiste, contacte al soporte técnico"
  ]
}
```

#### Notas Adicionales
- Implementar un sistema de cuotas para limitar el número de solicitudes de validación por usuario en un período determinado.
- Considerar la integración con servicios de verificación de documentos para automatizar parte del proceso.
- Mantener un registro detallado de todas las solicitudes y sus estados para auditorías y mejora del proceso.
- Ofrecer la opción de guardar borradores de solicitudes para que los usuarios puedan completarlas en múltiples sesiones.
Implementar un sistema de notificaciones para mantener al usuario informado sobre el progreso de su solicitud.

### 6. Consultar Estado de Validación de Conocimiento

- **Nombre**: Obtener Estado de Validación de Conocimiento
- **Descripción**: Permite consultar el estado actual de una solicitud de validación de conocimiento previamente enviada.
- **Método HTTP**: GET
- **URL**: `/conocimientos/{validacionId}/estado`

#### Parámetros de Ruta
- `validacionId` (string): Identificador único de la solicitud de validación.

#### Encabezados

```
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "validacionId": "val_789xyz",
  "estado": "en_proceso",
  "etapaActual": "verificación_institución",
  "progreso": 60,
  "fechaActualizacion": "2024-03-18T10:15:00Z",
  "detalles": {
    "etapasCompletadas": [
      "recepción_solicitud",
      "revisión_inicial_documentos",
      "verificación_identidad_usuario"
    ],
    "etapasPendientes": [
      "validación_por_pares",
      "registro_blockchain"
    ],
    "comentarios": "Esperando respuesta de la Universidad Tecnológica de Ejemplo para confirmar la autenticidad del certificado."
  },
  "estimacionFinalizacion": "2024-03-20T18:00:00Z",
  "hashBlockchain": null,
  "urlSeguimiento": "https://knowblock.com/validaciones/val_789xyz"
}
```

##### 400 Bad Request

```json
{
  "error": "Solicitud inválida",
  "mensaje": "El ID de validación proporcionado no tiene un formato válido",
  "sugerencia": "Asegúrese de utilizar el ID de validación completo, incluyendo el prefijo 'val_'"
}
```

##### 403 Forbidden

```json
{
  "error": "Acceso denegado",
  "mensaje": "No tiene permisos para consultar esta validación",
  "razon": "La validación pertenece a otro usuario o su token ha expirado"
}
```

##### 404 Not Found

```json
{
  "error": "Validación no encontrada",
  "mensaje": "No se encontró ninguna validación con el ID proporcionado",
  "sugerencia": "Verifique el ID de validación e intente nuevamente"
}
```

#### Notas Adicionales
- Implementar un sistema de caché para mejorar el rendimiento en consultas frecuentes.
- Considerar la posibilidad de incluir un webhook para notificar cambios de estado automáticamente.
- Asegurar que solo el usuario propietario de la validación o personal autorizado pueda acceder a esta información.
- Registrar cada consulta para análisis de uso y detección de patrones sospechosos.

### 7. Procesar Pago

- **Nombre**: Procesar Pago de Usuario
- **Descripción**: Procesa un pago para un usuario utilizando la pasarela de pago seleccionada, permitiendo la adquisición de servicios o validaciones en la plataforma.
- **Método HTTP**: POST
- **URL**: `/pagos/procesar`

#### Cuerpo de la Solicitud

```json
{
  "usuarioId": "usr_12345abcde",
  "monto": 99.99,
  "moneda": "EUR",
  "metodoPago": "tarjeta",
  "detallesPago": {
    "numeroTarjeta": "4111111111111111",
    "mesExpiracion": "12",
    "anioExpiracion": "2025",
    "cvv": "123",
    "nombreTitular": "Juan Pérez"
  },
  "conceptoPago": "Validación de conocimiento en IA",
  "idReferencia": "val_789xyz",
  "guardarMetodoPago": true
}
```

#### Encabezados

```
Content-Type: application/json
Authorization: Bearer <token>
```

#### Respuestas

##### 201 Created

```json
{
  "pagoId": "pag_456def",
  "estado": "completado",
  "transaccionId": "txn_9876543210",
  "monto": 99.99,
  "moneda": "EUR",
  "metodoPago": "tarjeta",
  "ultimosCuatroDigitos": "1111",
  "fechaProcesamiento": "2024-03-18T11:30:00Z",
  "conceptoPago": "Validación de conocimiento en IA",
  "idReferencia": "val_789xyz",
  "comprobanteUrl": "https://knowblock.com/pagos/comprobante/pag_456def.pdf",
  "metodosPagoGuardados": [
    {
      "id": "mp_789ghi",
      "tipo": "tarjeta",
      "ultimosCuatroDigitos": "1111",
      "marca": "Visa",
      "fechaExpiracion": "12/2025"
    }
  ]
}
```

##### 400 Bad Request

```json
{
  "error": "Información de pago inválida o incompleta",
  "detalles": [
    "El número de tarjeta no es válido",
    "La fecha de expiración es anterior a la fecha actual"
  ],
  "sugerencias": [
    "Verifique que el número de tarjeta tenga 16 dígitos",
    "Asegúrese de que la fecha de expiración sea futura"
  ]
}
```

##### 402 Payment Required

```json
{
  "error": "Pago rechazado",
  "mensaje": "La transacción no pudo ser procesada por la entidad financiera",
  "codigoError": "insufficient_funds",
  "descripcion": "Fondos insuficientes en la cuenta",
  "accionesRecomendadas": [
    "Verificar el saldo disponible en la tarjeta",
    "Intentar con un método de pago alternativo"
  ]
}
```

##### 403 Forbidden

```json
{
  "error": "Acceso denegado",
  "mensaje": "No tiene permisos para realizar este pago",
  "razon": "El token proporcionado no corresponde al usuario o ha expirado"
}
```

#### Notas Adicionales
- Implementar encriptación de extremo a extremo para los datos sensibles de pago.
- Cumplir con las normativas PCI DSS para el manejo de información de tarjetas de crédito.
- Considerar la implementación de un sistema de detección de fraudes.
- Ofrecer opciones de pago recurrente para servicios de suscripción.
- Integrar con múltiples pasarelas de pago para mayor flexibilidad y redundancia.

### 8. Consultar Estado de Pago

- **Nombre**: Obtener Estado de Pago
- **Descripción**: Permite consultar el estado actual de un pago previamente procesado en la plataforma.
- **Método HTTP**: GET
- **URL**: `/pagos/{pagoId}/estado`

#### Parámetros de Ruta
- `pagoId` (string): Identificador único del pago.

#### Encabezados

```
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "pagoId": "pag_456def",
  "estado": "completado",
  "detallesEstado": {
    "codigo": "payment_success",
    "descripcion": "El pago se ha procesado y confirmado exitosamente"
  },
  "transaccionId": "txn_9876543210",
  "monto": 99.99,
  "moneda": "EUR",
  "metodoPago": {
    "tipo": "tarjeta",
    "ultimosCuatroDigitos": "1111",
    "marca": "Visa"
  },
  "fechaProcesamiento": "2024-03-18T11:30:00Z",
  "fechaActualizacion": "2024-03-18T11:31:15Z",
  "conceptoPago": "Validación de conocimiento en IA",
  "idReferencia": "val_789xyz",
  "comprobanteUrl": "https://knowblock.com/pagos/comprobante/pag_456def.pdf",
  "desglosePago": {
    "subtotal": 95.00,
    "impuestos": 4.99,
    "total": 99.99
  },
  "historialEstados": [
    {
      "estado": "iniciado",
      "fecha": "2024-03-18T11:29:45Z"
    },
    {
      "estado": "procesando",
      "fecha": "2024-03-18T11:30:00Z"
    },
    {
      "estado": "completado",
      "fecha": "2024-03-18T11:31:15Z"
    }
  ]
}
```

##### 400 Bad Request

```json
{
  "error": "Solicitud inválida",
  "mensaje": "El ID de pago proporcionado no tiene un formato válido",
  "sugerencia": "Asegúrese de utilizar el ID de pago completo, incluyendo el prefijo 'pag_'"
}
```

##### 403 Forbidden

```json
{
  "error": "Acceso denegado",
  "mensaje": "No tiene permisos para consultar este pago",
  "razon": "El pago pertenece a otro usuario o su token ha expirado"
}
```

##### 404 Not Found

```json
{
  "error": "Pago no encontrado",
  "mensaje": "No se encontró ningún pago con el ID proporcionado",
  "sugerencia": "Verifique el ID de pago e intente nuevamente"
}
```

#### Notas Adicionales
- Implementar un sistema de notificaciones para informar al usuario sobre cambios en el estado del pago.
- Considerar la posibilidad de ofrecer reembolsos o cancelaciones dentro de un período específico.
- Mantener un registro detallado de todas las transacciones para auditorías y resolución de disputas.
- Asegurar que la información sensible, como los detalles completos de la tarjeta, nunca se devuelva en las respuestas.

### 9. Enviar Notificación

- **Nombre**: Enviar Notificación a Usuarios
- **Descripción**: Permite enviar notificaciones personalizadas a un usuario específico o a un grupo de usuarios de la plataforma.
- **Método HTTP**: POST
- **URL**: `/notificaciones/enviar`

#### Cuerpo de la Solicitud

```json
{
  "tipo": "individual",
  "destinatarios": ["usr_12345abcde"],
  "titulo": "Actualización de su validación de conocimiento",
  "cuerpo": "Su solicitud de validación para 'Fundamentos de IA' ha sido aprobada. ¡Felicidades!",
  "prioridad": "alta",
  "categoria": "validacion_conocimiento",
  "datos": {
    "validacionId": "val_789xyz",
    "curso": "Fundamentos de Inteligencia Artificial",
    "institucion": "Universidad Tecnológica de Ejemplo"
  },
  "accion": {
    "tipo": "redireccion",
    "url": "https://knowblock.com/validaciones/val_789xyz"
  },
  "programada": false
}
```

#### Encabezados

```
Content-Type: application/json
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "notificacionId": "not_135ace",
  "estado": "enviada",
  "fechaEnvio": "2024-03-18T14:00:00Z",
  "destinatariosAlcanzados": 1,
  "detalles": {
    "entregada": true,
    "leida": false,
    "fechaEntrega": "2024-03-18T14:00:05Z"
  },
  "estadisticas": {
    "tasaApertura": null,
    "tasaClics": null
  },
  "siguientesAcciones": [
    "Monitorear la tasa de apertura",
    "Evaluar la efectividad de la notificación"
  ]
}
```

##### 400 Bad Request

```json
{
  "error": "Datos faltantes o inválidos",
  "detalles": [
    "El campo 'destinatarios' no puede estar vacío",
    "La prioridad especificada no es válida"
  ],
  "sugerencias": [
    "Asegúrese de incluir al menos un destinatario",
    "Las prioridades válidas son: 'baja', 'media', 'alta'"
  ]
}
```

##### 403 Forbidden

```json
{
  "error": "No autorizado para enviar notificaciones",
  "mensaje": "Su cuenta no tiene permisos para enviar notificaciones masivas",
  "accionRecomendada": "Contacte al administrador para solicitar los permisos necesarios"
}
```

#### Notas Adicionales
- Implementar un sistema de cuotas para evitar el envío excesivo de notificaciones.
- Ofrecer la opción de programar notificaciones para envío futuro.
- Permitir a los usuarios configurar sus preferencias de notificación (por ejemplo, optar por no recibir ciertos tipos de notificaciones).
- Considerar la integración con servicios de notificación push para dispositivos móviles.
- Mantener un registro detallado de todas las notificaciones enviadas para análisis y mejora continua.

### 10. Generar Reporte de Transacciones

- **Nombre**: Generar Reporte de Transacciones
- **Descripción**: Permite a usuarios autorizados generar un reporte detallado de transacciones, filtrado por fecha, usuario o estado.
- **Método HTTP**: GET
- **URL**: `/api/reports/transactions`

#### Parámetros de Ruta
- fechaInicio (string, formato ISO8601): Fecha de inicio del período del reporte.
- echaFin (string, formato ISO8601): Fecha de fin del período del reporte.
- usuarioId (string, opcional): ID del usuario para filtrar transacciones específicas.
- estado (string, opcional): Estado de las transacciones a incluir (ej. "completada", "pendiente", "rechazada").
- tipoTransaccion (string, opcional): Tipo de transacción (ej. "pago", "reembolso", "validacion").
- formato (string, opcional): Formato de salida del reporte ("json", "csv", "pdf"). Por defecto: "json".

#### Encabezados

```
Authorization: Bearer <token>
```

#### Respuestas

##### 200 OK

```json
{
  "reporteId": "rep_246bdf",
  "parametros": {
    "fechaInicio": "2024-01-01T00:00:00Z",
    "fechaFin": "2024-03-18T23:59:59Z",
    "usuarioId": null,
    "estado": "completada",
    "tipoTransaccion": null
  },
  "resumen": {
    "totalTransacciones": 1500,
    "montoTotal": 75000.00,
    "moneda": "EUR",
    "transaccionesPorTipo": {
      "pago": 1200,
      "reembolso": 50,
      "validacion": 250
    }
  },
  "transacciones": [
    {
      "id": "txn_123abc",
      "fecha": "2024-03-15T10:30:00Z",
      "usuarioId": "usr_12345abcde",
      "tipo": "pago",
      "monto": 99.99,
      "estado": "completada",
      "detalles": {
        "conceptoPago": "Validación de conocimiento en IA",
        "metodoPago": "tarjeta"
      }
    },
    // ... más transacciones ...
  ],
  "paginacion": {
    "totalPaginas": 30,
    "paginaActual": 1,
    "elementosPorPagina": 50,
    "siguientePagina": "/api/reports/transactions?page=2&fechaInicio=2024-01-01T00:00:00Z&fechaFin=2024-03-18T23:59:59Z&estado=completada"
  },
  "metadatos": {
    "fechaGeneracion": "2024-03-19T08:00:00Z",
    "generadoPor": "usr_admin789",
    "tiempoGeneracion": "3.5 segundos"
  }
}
```

##### 400 Bad Request

```json
{
  "error": "Parámetros de consulta inválidos",
  "detalles": [
    "El formato de fecha para 'fechaInicio' es inválido",
    "El estado especificado no es reconocido"
  ],
  "sugerencias": [
    "Utilice el formato ISO8601 para las fechas (ej. '2024-03-18T00:00:00Z')",
    "Los estados válidos son: 'completada', 'pendiente', 'rechazada'"
  ]
}
```

##### 403 Forbidden

```json
{
  "error": "No autorizado para generar este reporte",
  "mensaje": "Su cuenta no tiene los permisos necesarios para acceder a los reportes de transacciones",
  "razon": "Se requieren privilegios de administrador o analista financiero",
  "accionesRecomendadas": [
    "Solicite los permisos necesarios a través del portal de administración",
    "Si cree que esto es un error, contacte al equipo de soporte"
  ]
}
```


#### Notas Adicionales
- Implementar paginación para manejar grandes volúmenes de datos de manera eficiente.
- Considerar la implementación de caché para reportes frecuentemente solicitados.
- Ofrecer la opción de programar reportes recurrentes para envío automático.
- Asegurar que los datos sensibles estén debidamente anonimizados o encriptados en los reportes.
- Mantener un registro de auditoría de quién accede a qué reportes y cuándo.
- Para reportes muy grandes o complejos, considerar un procesamiento asíncrono con notificación al usuario cuando el reporte esté listo.


## Plan de Pruebas 

## Recomendaciones 

## Conclusiones 
