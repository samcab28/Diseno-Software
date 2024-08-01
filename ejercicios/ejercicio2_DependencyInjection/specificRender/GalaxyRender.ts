import {Render} from '../RenderInterface';

export class GalaxyRender implements Render {
    renderContent(): string {
        //llamada a la funcion especial de giroscopio galaxy
        this.giroscopio360();

        // logica especifica para renderizar en un dispositivo Galaxy
        return "Contenido renderizado para Galaxy";
    }

    giroscopio360(): string {
        return "Logica para la funcionalidad del Giroscopio 360"
    }
}