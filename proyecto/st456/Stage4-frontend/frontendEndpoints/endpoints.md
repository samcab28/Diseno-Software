# Detailed API Endpoints Specification

## Authentication

### Login
- **Method**: POST
- **Path**: `/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "jwtToken": "string",
    "payload": {
      "sub": "string",
      "email": "string",
      "cognito:groups": ["string"],
      "exp": number
    }
  }
  ```
- **Error Response**: 
  - Status: 401 Unauthorized
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

## Cuidador (Caretaker) Endpoints

### Get Caretaker Data
- **Method**: GET
- **Path**: `/cuidador/{email}`
- **Response**:
  ```json
  {
    "idUsuario": number,
    "nombre": "string",
    "apellido1": "string",
    "apellido2": "string",
    "fechaNacimiento": "Date",
    "urlImagenPerfil": "string",
    "telefono": "string",
    "email": "string",
    "idDireccion": number
  }
  ```

### Get Opportunities for Caretakers
- **Method**: GET
- **Path**: `/cuidador/oportunidades`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "idUsuario": number,
      "motivo": "string",
      "idInfoCasa": "string",
      "ofertaPago": number,
      "fechaInicio": "Date",
      "fechaFin": "Date",
      "estado": "string",
      "fechaPublicacion": "Date",
      "deleted": boolean
    }
  ]
  ```

### Get Detailed Opportunity
- **Method**: GET
- **Path**: `/cuidador/oportunidad/{id}`
- **Response**:
  ```json
  {
    "_id": "string",
    "idUsuario": number,
    "motivo": "string",
    "idInfoCasa": "string",
    "ofertaPago": number,
    "fechaInicio": "Date",
    "fechaFin": "Date",
    "estado": "string",
    "fechaPublicacion": "Date",
    "deleted": boolean,
    "infoCasa": {
      "_id": "string",
      "idUsuario": number,
      "descripcionBase": "string",
      "idDireccion": number,
      "caracteristicas": [
        {
          "tipo": "string",
          "cantidad": number
        }
      ]
    }
  }
  ```

### Get Sent Requests
- **Method**: GET
- **Path**: `/cuidador/solicitudes`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "idUsuario": number,
      "motivo": "string",
      "idInfoCasa": "string",
      "ofertaPago": number,
      "fechaInicio": "Date",
      "fechaFin": "Date",
      "estado": "string",
      "fechaPublicacion": "Date",
      "deleted": boolean
    }
  ]
  ```

### Get Caretaker Services
- **Method**: GET
- **Path**: `/cuidador/servicios`
- **Response**:
  ```json
  [
    {
      "idServicio": number,
      "idUsuario": number,
      "descripcion": "string",
      "deleted": boolean
    }
  ]
  ```

### Get All Posts with House Info
- **Method**: GET
- **Path**: `/cuidador/posts`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "idUsuario": number,
      "motivo": "string",
      "idInfoCasa": "string",
      "ofertaPago": number,
      "fechaInicio": "Date",
      "fechaFin": "Date",
      "estado": "string",
      "fechaPublicacion": "Date",
      "deleted": boolean,
      "infoCasa": {
        "_id": "string",
        "idUsuario": number,
        "descripcionBase": "string",
        "idDireccion": number,
        "caracteristicas": [
          {
            "tipo": "string",
            "cantidad": number
          }
        ]
      }
    }
  ]
  ```

### Handle Like on a Post
- **Method**: POST
- **Path**: `/cuidador/like/{postId}`
- **Response**: 
  - Status: 200 OK
  ```json
  {
    "message": "Like registered successfully"
  }
  ```

### Get All Caretakers with Services
- **Method**: GET
- **Path**: `/cuidadores`
- **Response**:
  ```json
  [
    {
      "idUsuario": number,
      "nombre": "string",
      "apellido1": "string",
      "apellido2": "string",
      "fechaNacimiento": "Date",
      "urlImagenPerfil": "string",
      "telefono": "string",
      "email": "string",
      "idDireccion": number,
      "servicios": [
        {
          "idServicio": number,
          "idUsuario": number,
          "descripcion": "string",
          "deleted": boolean
        }
      ],
      "calificacion": number
    }
  ]
  ```

### Get Detailed Caretaker Profile
- **Method**: GET
- **Path**: `/cuidador/{id}/perfil`
- **Response**:
  ```json
  {
    "idUsuario": number,
    "nombre": "string",
    "apellido1": "string",
    "apellido2": "string",
    "fechaNacimiento": "Date",
    "urlImagenPerfil": "string",
    "telefono": "string",
    "email": "string",
    "idDireccion": number,
    "servicios": [
      {
        "idServicio": number,
        "idUsuario": number,
        "descripcion": "string",
        "deleted": boolean
      }
    ],
    "calificacion": number,
    "experiencia": "string",
    "reviews": [
      {
        "id": "string",
        "idUsuario": number,
        "idCuidador": number,
        "calificacion": number,
        "comentario": "string",
        "fecha": "Date"
      }
    ]
  }
  ```

### Express Interest in a Caretaker
- **Method**: POST
- **Path**: `/cuidador/{id}/interes`
- **Response**: 
  - Status: 200 OK
  ```json
  {
    "message": "Interest expressed successfully"
  }
  ```

## Host Endpoints

### Get Host Data
- **Method**: GET
- **Path**: `/host`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "idUsuario": number,
    "nombre": "string",
    "apellido1": "string",
    "apellido2": "string",
    "fechaNacimiento": "Date",
    "urlImagenPerfil": "string",
    "telefono": "string",
    "email": "string",
    "idDireccion": number
  }
  ```

### Get Posts by Host
- **Method**: GET
- **Path**: `/host/{userId}/posts`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "idUsuario": number,
      "motivo": "string",
      "idInfoCasa": "string",
      "ofertaPago": number,
      "fechaInicio": "Date",
      "fechaFin": "Date",
      "estado": "string",
      "fechaPublicacion": "Date",
      "deleted": boolean
    }
  ]
  ```

### Get Favorites for Host
- **Method**: GET
- **Path**: `/host/{userId}/favoritos`
- **Response**:
  ```json
  [
    {
      "idFavorito": number,
      "idUsuario": number,
      "idCuidador": number,
      "deleted": boolean
    }
  ]
  ```

### Get Requests for Host
- **Method**: GET
- **Path**: `/host/{userId}/solicitudes`
- **Response**:
  ```json
  [
    {
      "idSolicitud": "string",
      "idNotificacion": "string",
      "idCuidador": number,
      "idPost": "string",
      "estado": "string"
    }
  ]
  ```

### Get Messages Between Host and Caretaker
- **Method**: GET
- **Path**: `/host/{hostId}/messages/{cuidadorId}`
- **Response**:
  ```json
  [
    {
      "id": "string",
      "idEmisor": number,
      "idReceptor": number,
      "contenido": "string",
      "fecha": "Date",
      "leido": boolean
    }
  ]
  ```

### Send a Message
- **Method**: POST
- **Path**: `/host/message`
- **Request Body**:
  ```json
  {
    "idEmisor": number,
    "idReceptor": number,
    "contenido": "string"
  }
  ```
- **Response**: 
  - Status: 200 OK
  ```json
  {
    "message": "Message sent successfully"
  }
  ```

## General Endpoints

### Get All Posts
- **Method**: GET
- **Path**: `/posts`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "idUsuario": number,
      "motivo": "string",
      "idInfoCasa": "string",
      "ofertaPago": number,
      "fechaInicio": "Date",
      "fechaFin": "Date",
      "estado": "string",
      "fechaPublicacion": "Date",
      "deleted": boolean
    }
  ]
  ```
