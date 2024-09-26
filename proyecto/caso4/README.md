# Documentación del Microservicio Go

## Estructura del Proyecto

El proyecto está organizado en varios paquetes:

- `main.go`: Punto de entrada de la aplicación
- `internal/`: Contiene la lógica interna del servicio
  - `service/`: Define la interfaz del servicio y su implementación
  - `endpoint/`: Define los endpoints y las estructuras de solicitud/respuesta
  - `transport/`: Maneja la codificación/decodificación HTTP
- `pkg/`: Contiene paquetes reutilizables
  - `db/`: Maneja la conexión a la base de datos PostgreSQL
  - `cache/`: Maneja la conexión al cache Redis

## Componentes Principales

### 1. Main (`main.go`)

Este archivo es el punto de entrada de la aplicación. Sus principales funciones son:

- Inicializar las conexiones a la base de datos y al cache
- Crear una instancia del servicio
- Definir y configurar los endpoints
- Configurar los manejadores HTTP
- Iniciar el servidor HTTP

#### Flujo de ejecución:

1. Se establecen conexiones con PostgreSQL y Redis
2. Se crea una instancia del servicio utilizando estas conexiones
3. Se definen los endpoints utilizando la instancia del servicio
4. Se configuran los manejadores HTTP para cada endpoint
5. Se inicia el servidor HTTP en el puerto 8080

### 2. Service (`internal/service/service.go`)

Define la interfaz `Service` y su implementación `basicService`. Este componente contiene la lógica de negocio principal.

#### Métodos:

- `GetData`: Obtiene datos (implementación pendiente)
- `GetDataPool`: Obtiene datos utilizando un pool de conexiones (implementación pendiente)
- `GetDataCache`: Obtiene datos del cache (implementación pendiente)

### 3. Endpoints (`internal/endpoint/endpoints.go`)

Define la estructura de los endpoints y las funciones para crearlos. Utiliza el patrón de diseño "endpoint" de go-kit.

#### Endpoints definidos:

- `GetDataEndpoint`
- `GetDataPoolEndpoint`
- `GetDataCacheEndpoint`

Cada endpoint toma una solicitud, la procesa utilizando el servicio, y devuelve una respuesta.

### 4. Transport (`internal/transport/http.go`)

Maneja la codificación y decodificación de las solicitudes y respuestas HTTP.

#### Funciones principales:

- `DecodeGetDataRequest`: Decodifica la solicitud HTTP en una estructura `GetDataRequest`
- `EncodeResponse`: Codifica la respuesta en formato JSON

### 5. Database (`pkg/db/db.go`)

Maneja la conexión a PostgreSQL (implementación no mostrada en el código proporcionado).

### 6. Cache (`pkg/cache/cache.go`)

Maneja la conexión a Redis (implementación no mostrada en el código proporcionado).

## Flujo de una Solicitud

1. Una solicitud HTTP llega al servidor
2. El manejador HTTP correspondiente la procesa
3. La solicitud se decodifica usando `DecodeGetDataRequest`
4. El endpoint apropiado se ejecuta, llamando al método correspondiente del servicio
5. El servicio procesa la solicitud, interactuando con la base de datos o el cache según sea necesario
6. El resultado se envuelve en una respuesta
7. La respuesta se codifica usando `EncodeResponse` y se envía de vuelta al cliente

## Notas Adicionales

- El proyecto utiliza el framework go-kit para estructurar el microservicio
- La implementación actual es un esqueleto; las funciones principales del servicio están sin implementar
- Se utiliza PostgreSQL como base de datos principal y Redis como sistema de caché