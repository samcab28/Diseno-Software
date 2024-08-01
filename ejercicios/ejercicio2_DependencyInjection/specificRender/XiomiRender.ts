import {Render} from '../RenderInterface';

export class XiaomiRender implements Render {
    renderContent(): string {
        //llamada a la funcion especial de manipulacion de video
        this.manipulacionVideo();

        // logica especifica  para renderizar en un dispositivo Xiaomi
        return "Contenido renderizado para Xiaomi";
    }

    manipulacionVideo(): string {
        return "funcion de manipulacion de video"
    }
}