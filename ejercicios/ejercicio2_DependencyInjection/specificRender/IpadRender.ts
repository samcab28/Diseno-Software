import {Render} from '../RenderInterface';

export class IpadRender implements Render {
    renderContent(): string {
        //llamada a la funcion especial de renderizado de generacion instructivos
        this.generacionInstructivo();

        // logica especifica para renderizar en un iPad
        return "Contenido renderizado para iPad";
    }

    generacionInstructivo(): string {
        return "Generacion de instructivos segun el maquillaje"
    }
}