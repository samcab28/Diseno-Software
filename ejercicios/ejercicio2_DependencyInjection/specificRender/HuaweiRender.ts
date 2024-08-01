import {Render} from '../RenderInterface';

export class HuaweiRender implements Render {
    renderContent(): string {
        //llamada a la funcion de reconocimiento facial
        this.reconocimientoFacial();
        
        // logica especifica  para renderizar en un dispositivo Huawei
        return "Contenido renderizado para Huawei";
    }

    reconocimientoFacial(): string {
        return "aplicacion de la funcion de reconomiento facial"
    }
    
}