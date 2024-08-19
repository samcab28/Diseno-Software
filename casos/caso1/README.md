# Caso 1: Diseño de Software

## Cosas que hacer

1. Revisar autenticación Okta.
2. Crear usuarios sin base de datos utilizando los servicios existentes. Crear al menos 4 usuarios:

    2.1 Implementar autenticación multifactor (MFA).

    2.2 Asignar usuarios a grupos específicos:
    - **Marketing**: Solo puede acceder a la aplicación CRM. Mínimo: 1 usuario.
    - **Sales**: Puede acceder tanto a la aplicación CRM como a la aplicación de Pagos. Mínimo: 2 usuarios.
    - **C-Level**: Solo puede acceder a la aplicación CRM. Mínimo: 1 usuario.

    2.3 Otorgar permisos:
    - **#1**: Permisos de medios de pago. Los dos usuarios de Sales deben tener métodos de pago distintos.
    - **#2**: Permisos de dificultad. Solo los usuarios de Marketing y C-Level pueden modificar la información de contacto. Los usuarios de Sales no tienen acceso.
    - **#3**: Permisos en la aplicación CRM. Los usuarios del grupo Sales deben ver las columnas "Sales Goals" y "Sales Amount". Los usuarios de C-Level deben tener acceso completo. Un usuario de Marketing debe tener acceso a una columna específica.
    - **#4**: En la aplicación CRM, el proceso de "sales target" debe estar disponible solo para los usuarios de C-Level.

    Para los últimos pasos, se recomienda seguir las guías proporcionadas por el profesor.

3. Verificar la configuración desde Postman.

## Links

- Documentación de Okta: [Okta API Reference](https://developer.okta.com/docs/reference/rest/)
- Tutorial sobre sincronización Okta y Postman: [Ver en YouTube](https://www.youtube.com/watch?v=u1Fqh4KneXI)
- Página de usuario Okta: [Dashboard de Okta](https://dashboard.fga.dev/customers/01J5MGFTY5REWXEYZSZHWS0MA6/stores/01J5MGFWCPJDXY4ERGG43RZYFF/dev-mode)
- Dashboard de usuario Okta: [Página de Usuario Okta](https://dashboard.fga.dev/customers/01J5MGFTY5REWXEYZSZHWS0MA6/stores/01J5MGFWCPJDXY4ERGG43RZYFF/dev-mode)

### Creación de Usuarios

1. Crear grupos de usuarios con la colección de grupos. Utiliza la API de Postman para esto. Enlace para la creación: [Crear Grupos](https://web.postman.co/workspace/1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-1b54cbfe-6dd6-48fd-b233-9962b65004da?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9)

   ### listado de grupos

    - **Marketing**: Solo puede acceder a la aplicación CRM.  
      ID del grupo: `00gj2d8nwakXjQ4YJ5d7`  
      [Grupo en Okta](https://dev-32963311.okta.com/api/v1/groups/00gj2d8nwakXjQ4YJ5d7/users)

    - **Sales**: Puede acceder tanto a la aplicación CRM como a la aplicación de Pagos.  
      ID del grupo: `00gj2d9aszhPgXjxn5d7`  
      [Grupo en Okta](https://dev-32963311.okta.com/api/v1/groups/00gj2d9aszhPgXjxn5d7/users)

    - **C-Level**: Solo puede acceder a la aplicación CRM.  
      ID del grupo: `00gj2d9menFkvEuUx5d7`  
      [Grupo en Okta](https://dev-32963311.okta.com/api/v1/groups/00gj2d9menFkvEuUx5d7/users)



2. Crear usuarios con la colección de usuarios. Asegúrate de asignar grupos mediante solicitudes especiales que contengan el ID del grupo. Verifica que los usuarios se hayan agregado correctamente:
   - Enlace para crear usuarios con grupo: [Crear Usuarios con Grupo](https://web.postman.co/workspace/Diseno_Caso1~1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-1b54cbfe-6dd6-48fd-b233-9962b65004da?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9)

   - Enlace para establecer contraseñas: [Establecer Contraseña](https://web.postman.co/workspace/1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-1a40808f-4f80-469a-8aea-98ca23235c2b?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9)

   Todos los contraseñas de los usuarios son: `Samir1234Hola`


    - **Isaac Brock**  
    ID: `00uj2dchp27O8TV765d7`  
    [Perfil en Okta](https://dev-32963311.okta.com/api/v1/users/00uj2dchp27O8TV765d7)  
    Query de confirmación en Okta Dashboard para tuplas: is user:00uj2dchp27O8TV765d7 related to group:00gj2d9menFkvEuUx5d7 as members?

    - **Pedro Gonzalez**  
    ID: `00uj2dfakvH6aRA1G5d7`  
    [Perfil en Okta](https://dev-32963311.okta.com/api/v1/users/00uj2dfakvH6aRA1G5d7)  
    Query de confirmación en Okta Dashboard para tuplas: is user:00uj2dfakvH6aRA1G5d7 related to group:00gj2d9aszhPgXjxn5d7 as members?

    - **Michael Ramirez**  
    ID: `00uj2dfhhseBFzi515d7`  
    [Perfil en Okta](https://dev-32963311.okta.com/api/v1/users/00uj2dfhhseBFzi515d7)  
    Query de confirmación en Okta Dashboard para tuplas: is user:00uj2dfhhseBFzi515d7 related to group:00gj2d8nwakXjQ4YJ5d7 as members?

    - **Juan Mora**  
    ID: `00uj2dh5l1xQZ9xjQ5d7`  
    [Perfil en Okta](https://dev-32963311.okta.com/api/v1/users/00uj2dh5l1xQZ9xjQ5d7)  
    Query de confirmación en Okta Dashboard para tuplas: is user:00uj2dh5l1xQZ9xjQ5d7 related to group:00gj2d9aszhPgXjxn5d7 as members?

    - **sam2**  
      ID: `00uj2dv72qFwJ5ts45d7`  
      [Perfil en Okta](https://dev-32963311.okta.com/api/v1/users/00uj2dv72qFwJ5ts45d7)


### Habilitar MFA

- Documentación de referencia: [Guía de MFA de Okta](https://developer.okta.com/docs/guides/mfa/ga/main/)
- Usuario de prueba: sam2 / samircabreratab@gmail.com
- ID del usuario de prueba: `00uj2dv72qFwJ5ts45d7`
- Enlace para inscripción del usuario: [Enrolar Usuario](https://web.postman.co/workspace/Diseno_Caso1~1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-b678dd04-4ca3-42c9-bc6c-280e5d5f1cf2?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9)
- ID de respuesta: `uftj2dvr9juLm3UI75d7`
- ID de respuesta de autenticación confirmada: `uftj2dvr9juLm3UI75d7`
- Enlace para confirmar autenticación: [Confirmar Autenticación](https://web.postman.co/workspace/Diseno_Caso1~1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-1817a32a-c220-4f38-a620-f4e25913b3db?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9). Se debe ingresar el número de Google Authenticator.






### permiso 1, metodos de pago

se agrego un atributo desde schemas para que este pueda ser definido como metodo de pago: 

### permiso 2

opcion 1: mediante roles

- https://developer.okta.com/docs/reference/api/roles/
- https://developer.okta.com/docs/reference/api/roles/#permission-types

opcion 2: mediante put de rule basic condition


### permiso 3

### permiso 4