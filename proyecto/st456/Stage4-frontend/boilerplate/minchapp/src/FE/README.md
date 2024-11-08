# MinchappFE

## Descripción del Proyecto
Minchapp es una plataforma innovadora diseñada para conectar a dueños de mascotas (hosts) con cuidadores confiables. El objetivo principal es facilitar una conexión segura y eficiente entre hosts que necesitan servicios de cuidado para sus hogares y mascotas, y cuidadores que ofrecen estos servicios. La plataforma se enfoca en establecer una relación de confianza mediante un sistema de match, permitiendo que los hosts inicien conversaciones con los cuidadores que les interesan.

## Estructura de Carpetas
MinchappFE/
├── src/
│   ├── assets/
│   │   └── [Imágenes y recursos estáticos]
│   ├── components/
│   │   ├── common/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── Unauthorized.tsx
│   │   ├── cuidadores/
│   │   │   ├── BuscarOportunidades.tsx
│   │   │   ├── DashboardCuidador.tsx
│   │   │   ├── ListaCasasCuidado.tsx
│   │   │   ├── ListaCuidadores.tsx
│   │   │   ├── PerfilCuidador.tsx
│   │   │   └── SolicitudesEnviadas.tsx
│   │   └── host/
│   │   │   ├── ChatComponent.tsx
│   │   │   ├── DashboardHost.tsx
│   │   │   ├── DetalleOportunidad.tsx
│   │   │   ├── NotificacionesCuidadores.tsx
│   │   │   ├── PublishCareNeed.tsx
│   │   └── profile/ 
│   │       ├── PerfilCuidador.tsx
│   │       └── UserProfile.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useNotifications.tsx
│   ├── services/
│   │   ├── cognitoService.tsx
│   │   ├── mockApiCuidador.tsx
│   │   └── mockApiHost.tsx
│   ├── styles/
│   │   ├── DashboardCuidador.css
│   │   ├── DashboardHost.css
│   │   ├── DetalleOportunidad.css
│   │   └── PublicarNecesidad.css
│   ├── types/
│   │   └── index.tsx
│   └── utils/
│       └── [Archivos de utilidad para un futuro]
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
Copy
## Descripción de los Archivos y Carpetas

### src/
Contiene el código fuente principal de la aplicación.

#### assets/
Recursos estáticos como imágenes y logos.

#### components/
Componentes React organizados por funcionalidad.

##### common/
Componentes comunes utilizados en toda la aplicación.
- `Footer.tsx`: Pie de página.
- `Header.tsx`: Barra de navegación superior.
- `Login.tsx`: Componente de inicio de sesión.
- `ProtectedRoute.tsx`: Componente para proteger rutas que requieren autenticación.
- `Unauthorized.tsx`: Página de acceso no autorizado.

##### cuidadores/
Componentes relacionados con los cuidadores.
- `BuscarOportunidades.tsx`: Página para buscar oportunidades de cuidado.
- `DashboardCuidador.tsx`: Panel principal para cuidadores.
- `DetalleOportunidad.tsx`: Detalles de una oportunidad de cuidado.
- `ListaCasasCuidado.tsx`: Lista de casas disponibles para cuidar.
- `ListaCuidadores.tsx`: Lista de cuidadores disponibles.
- `PerfilCuidador.tsx`: Perfil detallado de un cuidador.
- `SolicitudesEnviadas.tsx`: Lista de solicitudes enviadas por el cuidador.

##### host/
Componentes relacionados con los hosts.
- `ChatComponent.tsx`: Componente de chat entre host y cuidador.
- `DashboardHost.tsx`: Panel principal para hosts.
- `NotificacionesCuidadores.tsx`: Notificaciones de cuidadores interesados.
- `PublishCareNeed.tsx`: Formulario para publicar una necesidad de cuidado.
- `UserProfile.tsx`: Perfil de usuario (host o cuidador).

#### context/
Contextos de React para el manejo de estado global.
- `AuthContext.tsx`: Contexto de autenticación.

#### hooks/
Hooks personalizados.
- `useNotifications.tsx`: Hook para manejar notificaciones.

#### services/
Funciones para interactuar con APIs y servicios externos.
- `cognitoService.tsx`: Servicios relacionados con la autenticación de Cognito.
- `mockApiCuidador.tsx`: Servicios mock para cuidadores.
- `mockApiHost.tsx`: Servicios mock para hosts.

#### styles/
Estilos específicos de componentes.
- `DashboardCuidador.css`: Estilos para el dashboard del cuidador.
- `DashboardHost.css`: Estilos para el dashboard del host.
- `DetalleOportunidad.css`: Estilos para la página de detalle de oportunidad.
- `PublicarNecesidad.css`: Estilos para el formulario de publicar necesidad.

#### types/
Definiciones de tipos TypeScript.
- `index.tsx`: Definiciones de interfaces y tipos comunes.

#### utils/
Funciones de utilidad (si existen en el proyecto).

### Archivos de Configuración
- `.gitignore`: Especifica archivos y carpetas ignorados por Git.
- `package.json`: Define las dependencias y scripts del proyecto.
- `README.md`: Documentación principal del proyecto.
- `tsconfig.json`: Configuración de TypeScript.

## Tecnologías Utilizadas
- React con TypeScript
- React Router para la navegación 
- Context API para el manejo de estado global
- React bootstrap para 
- CSS para estilos
- Axios para llamadas a la API (inferido por el uso de servicios mock)