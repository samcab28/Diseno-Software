boiler plate obtenido de: https://github.com/edwinhern/express-typescript-2024

# Justificacion de eleccion

Se eligio este boilerplate porque: 

1. tiene una dockerizacion directa y configurada
2. tiene un buen esquema de .env para poder desarrollar variables de entorno de manera segura y organizada
3. tiene una buena politica de seguridad mediante CORS que es facilmente escalable
4. tiene un buen sistema de testing para tener altos estandares de calidad
5. tiene un buen sistema de ejemplos para creacion de nuevos servicios
6. cuenta con una interfaz automatica para que el servicio se cargue en Swagger Api, por ahora no se ha explorado mucho esta herramienta pero a lo que se ha visto sirve para hacer testing inmediato de la URL en el navegador.

# Ejecucion del proyecto

Se ha seguido toda la ejecucion del proyecto paso a paso de manera correcta, logrando que corra de la manera que deberia. Todos los pasos se encuentran documentados en el Git original del repositorio.

# lista de cambios del boilerplate

Script de creacion para el sistema, se debe de tener en cuenta que para hoy 11 de octubre, todavia NO se ha hecho la union con el frontend, no obstante ya se cuentan con todos los archivos necesarios para soportar los demas microservicios. 

```
# Crear directorios principales
mkdir -p src/common/models/{interfaces,types}
mkdir -p src/common/middleware/auth
mkdir -p src/common/utils

# Crear directorios de API
mkdir -p src/api/orchestrator
mkdir -p src/api/ai/{services,providers}
mkdir -p src/api/payment/{services,providers}
mkdir -p src/api/data/{services,repositories}
mkdir -p src/api/gateway/{services,strategies}
mkdir -p src/api/auth/{services,models}
mkdir -p src/api/external/{services,providers}
mkdir -p src/api/notification/{services,clients,models}

# Crear directorios de configuración
mkdir -p src/config

# Crear archivos de interfaces
touch src/common/models/interfaces/IDataRepository.ts
touch src/common/models/interfaces/IAIProvider.ts
touch src/common/models/interfaces/IPaymentProvider.ts
touch src/common/models/interfaces/IExternalService.ts

# Crear archivos de tipos
touch src/common/models/types/AITypes.ts
touch src/common/models/types/PaymentTypes.ts
touch src/common/models/types/NotificationTypes.ts
touch src/common/models/types/ServiceTypes.ts

# Crear archivos principales
touch src/api/orchestrator/systemOrchestrator.ts
touch src/api/orchestrator/orchestratorRoutes.ts
touch src/api/orchestrator/orchestratorController.ts

# Crear archivos de configuración
touch src/config/aws.ts
touch src/config/cognito.ts
touch src/config/database.ts
touch src/config/external.ts
```

