//Clase que se usa para hacer la inyeccion de dependencias
import { Render } from './RenderInterface';

export class RenderHandler {
    private renderStrategy: Render;

    constructor(renderStrategy: Render) {
        this.renderStrategy = renderStrategy;
    }

    handleRequest(): string {
        // segun el render enviado usar la renderizacion adecuada
        return this.renderStrategy.renderContent();
    }
}