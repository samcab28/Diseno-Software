# Caso 1 diseno software


## cosas que hacer

1. ver autenticacion otka
2. crear usuarios, sin db. hacerlo con los mismos servicios que hay. 4 minimo

    2.1 hacer autenticacion doble MFA 

    2.2 seleccionar gente segun grupos:
    1. marketing: Can only access the CRM application. minimo: 1
    2. sales:  Can access both the CRM and Payments applications. minimo: 2
    3. c-level: Can only access the CRM application. minimo: 1


    2.3 otorgar permisos:
    - #1: ss de medios de pagos, los dos sales users deberian de tener distintos metodos de pago 
    - #2: ss de dificultad, permiso de ver si puede modificar la informacion de contacto, sales NO tiene acceso, los demas si
    - #3: ss CRM app, ver las columnas del sales group: "Sales Goals" y "Sales Amount", C-level tiene acceso, uno de marketing tiene acceso a una columna, permiso No por grupo = permiso Otorgado
    - #4: ss CRM app, "sales target process" solo C-level

    para esto ultimo se recomienda ver los pasos guiados del profesor


3. comprobar desde postman


## documentos 

documentacion: https://developer.okta.com/docs/reference/rest/

tutorial sincronizacion otka - postman: https://www.youtube.com/watch?v=u1Fqh4KneXI 

### creacion de usuarios

1. crear grupos de usuarios con grupes collection
2. crear usuarios con user collection, ademas hacer enfasis en la asignacion de grupo mediante solicitud especial que contenga ID grupo, hacer pruebas de que se hayan agregado ok. 

todos los passwords son: Samir1234Hola

- marketing: michael ramirez

- sales: pedro gonzalez y juan mora

- c-level: isaack brock 

para la creacion de usuarios se uso: 

- create user with group: https://web.postman.co/workspace/1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-1b54cbfe-6dd6-48fd-b233-9962b65004da?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9
- set password: https://web.postman.co/workspace/1315bfff-6894-47a5-9774-9f9bb6b36fbe/request/31493491-1a40808f-4f80-469a-8aea-98ca23235c2b?action=share&source=copy-link&creator=31493491&active-environment=3a19c96e-63d6-45f0-814e-88e7189c11d9


### enable MFA

documentacion de referencia: https://developer.okta.com/docs/guides/mfa/ga/main/ 

usuario prueba = sam2 / samircabreratab@gmail.com 

id usuario prueba: 00uj2dv72qFwJ5ts45d7

id respuesta: uftj2dvr9juLm3UI75d7

id respuesta autenticacion confirmada: uftj2dvr9juLm3UI75d7 