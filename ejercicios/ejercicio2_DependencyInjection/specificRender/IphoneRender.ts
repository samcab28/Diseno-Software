import {Render} from '../RenderInterface';

export class IphoneRender implements Render {
    renderContent(): string {
        //llamada a la funcion de analisis de piel
        this.analisisPiel();

        // logica especifica para renderizar en un iPhone
        return "Contenido renderizado para iPhone";
    }

    analisisPiel(): string{
        return "funcion de analisis de piel"
    }
}