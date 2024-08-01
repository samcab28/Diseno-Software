# Curso diseno de software

# Ejercicio evaluado 2: Injection Dependency

## Profesor: Rodrigo Nunez Nunez

## Estudiante: Samir Cabrera Tabash, 2022161229

### Documentacion

En el siguiente ejercicio se ve la aplicacion del patron arquitectonico de Dependency injection. Se hace una respuesta directa al problema de la plataforma "Ellivhsan" que queria tener ciertas funcionalidades especiales segun cada dispositivo. 

Esto se logro mediante el patron previamente mencionado. Se tiene tres archivos principales y un folder. 
- Main.ts: Se encuentra la logica principal del programa
- RenderInterface.ts: Archivo que figura como la interfaz del patron de diseno
- RenderHandler.ts: Archivo donde se da la dependency injection

En el folder specific render se encuentran los archivos de cada render en especifico. Ahi figuran varios dispositivos moviles que seran capaces de poder renderizar una funcion especial.


