# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

----------------------------------------------------------------------------------------------------

# MinchappFE

Este directorio contiene todos los componentes y lógica del frontend de la aplicación Minchapp.

## Estructura

- components/: Componentes reutilizables de React
  - common/: Componentes comunes utilizados en toda la aplicación
  - cuidadores/: Componentes específicos para la funcionalidad de cuidadores
  - host/: Componentes específicos para la funcionalidad de hosts
  - profile/: Componentes relacionados con perfiles de usuario

- pages/: Componentes de página completa
- hooks/: Hooks personalizados 
- services/: Funciones para interactuar con APIs
- utils/: Funciones de utilidad
- styles/: Estilos globales y variables
- assets/: Archivos estáticos (imágenes, fuentes)
- context/: Contextos de React para compartir información entre componentes
- redux/: Configuración para manejar la información compartida en toda la aplicación
  - slices/: Partes individuales de la información compartida
  - store.ts: Archivo principal que organiza toda la información compartida


- types/: Definiciones de tipos TypeScript

## Descargar dependencias

Creamo el proyecto con typescript
```
npx create-react-app minchapp --template typescript
```
En la carpeta minchapp instalamos bootstrap
```
cd minchapp
npm install bootstrap@5.3.3
npm install react-bootstrap @types/react-bootstrap
npm install react-bootstrap-icons
npm install react-router-dom


```	
Para implementar el patrón Observer y manejar el estado global de manera más eficiente,Redux:
```
npm install redux react-redux @reduxjs/toolkit
```

Para manejar las peticiones HTTP:
```
npm install axios
```

Para la validación de formularios:
```
npm install formik yup
```

Para manejar fechas:
```
npm install date-fns
```

Para implementar mapas y geolocalización:
```
npm install react-leaflet leaflet
```

Para implementar infinite scrolling en las listas:
```
npm install react-infinite-scroll-component
```


## Matriz de requerimientos y componentes visuales

| Requerimiento                                          | ListaCuidadores | PerfilCuidador | ComparacionCuidadores | FormularioContacto |
|--------------------------------------------------------|-----------------|----------------|----------------------|---------------------|
| Visualizar información de cuidadores                   | X               | X              | X                    |                     |
| Ver detalles de cuidadores                             |                 | X              |                      |                     |
| Crear vínculo con el dueño de la casa                  |                 | X              |                      | X                   |
| Mostrar media de los cuidadores                        |                 | X              |                      |                     |
| Mostrar redes sociales de cuidadores                   |                 | X              |                      |                     |
| Mostrar reviews y testimonios                          |                 | X              |                      |                     |
| Mostrar depósitos de garantía                          |                 | X              |                      |                     |
| Mostrar rates de cuidadores                            | X               | X              | X                    |                     |
| Mostrar hoja de delincuencia                           |                 | X              |                      |                     |
| Filtrar cuidadores                                     | X               |                |                      |                     |
| Búsqueda textual de cuidadores                         | X               |                |                      |                     |
| Integración con IA para recomendaciones                | X               |                |                      |                     |
| Geolocalización y cálculo de distancia                 | X               |                |                      |                     |
| Mostrar facilidades y credenciales                     |                 | X              | X                    |                     |
| Paginación de resultados                               | X               |                |                      |                     |
| Marcar cuidadores como favoritos                       | X               |                |                      |                     |
| Enviar solicitud de contacto                           |                 |                |                      | X                   |