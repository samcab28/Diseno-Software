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



