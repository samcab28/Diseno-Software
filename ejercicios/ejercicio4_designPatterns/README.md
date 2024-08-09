# Ejercicio 4 diseno software
## Samir Cabrera, 2022161229 y Pamela Morataya, 2022108818

# BromeliaPictInventory

Este proyecto implementa una solución para integrar y unificar las respuestas de las APIs de Unsplash y Pixabay, aplicando patrones de diseño **Adapter** y **Bridge** para manejar la complejidad de las diferencias entre ambas APIs y permitir flexibilidad en la clasificación de las fotos.

## Estructura del Proyecto

El proyecto está dividido en las siguientes carpetas:

- **naive/**: Contiene la estructura inicial del código antes de aplicar los patrones de diseño.
- **patternized/**: Contiene la nueva estructura del código, donde se han aplicado los patrones **Adapter** y **Bridge**.

### Carpetas Clave

1. **apiCalls/**:
   - Contiene los adaptadores que interactúan con las APIs de Unsplash y Pixabay.
   - **PixabayAdapter**: Implementa el método `searchPhotos` de la interfaz `PhotoAPIAdapter`, transformando la respuesta de la API de Pixabay al formato esperado.
   - **UnsplashAdapter**: Implementa el método `searchPhotos` de la interfaz `PhotoAPIAdapter`, adaptando la respuesta de la API de Unsplash al formato común.
   - Esta estructura permite que se puedan agregar más adaptadores en el futuro para interactuar con otras APIs de fotos, haciendo el sistema extensible.

2. **ranks/**:
   - Contiene diferentes estrategias de ranking de fotos.
   - **SimpleRankingStrategy**: Implementa una estrategia básica de ranking.
   - El diseño utiliza el patrón **Bridge**, lo que permite que se puedan agregar fácilmente nuevas estrategias de ranking sin modificar la clase principal `BromeliaPictInventory`.

## Uso de Patrones de Diseño

### Adapter Pattern

El patrón **Adapter** es utilizado para unificar las interfaces de las APIs de Unsplash y Pixabay bajo una interfaz común `PhotoAPIAdapter`. Esto permite que `BromeliaPictInventory` pueda interactuar con ambas APIs de manera uniforme, sin necesidad de conocer las particularidades de cada una.

### Bridge Pattern

El patrón **Bridge** es aplicado para la estrategia de ranking de fotos. `BromeliaPictInventory` utiliza una interfaz `RankingStrategy` que actúa como la abstracción, permitiendo la implementación de múltiples algoritmos de ranking. Esto facilita la adición de nuevas estrategias de ranking sin alterar la lógica principal de la clase.


