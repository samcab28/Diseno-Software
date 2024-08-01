// importar la interfaz Render y la clase RenderHandler
import { Render } from './RenderInterface';
import { RenderHandler } from './RenderHandler';

// importar las clases de render específicas
import { GalaxyRender } from './specificRender/GalaxyRender';
import { HuaweiRender } from './specificRender/HuaweiRender';
import { IpadRender } from './specificRender/IpadRender';
import { XiaomiRender } from './specificRender/XiomiRender';
import { IphoneRender } from './specificRender/IphoneRender';


// renderizacion en base a los dispositivos disponibles, en caso de queres agregar mas dipositivos hacerlo aca
function getRenderForDevice(device: string): Render {
    switch (device) {
        case "Galaxy":
            return new GalaxyRender();
        case "Huawei":
            return new HuaweiRender();
        case "iPad":
            return new IpadRender();
        case "Xiaomi":
            return new XiaomiRender();
        case "iPhone":
            return new IphoneRender();
        default:
            //render de error
            throw new Error("Dispositivo no soportado");
    }
}

/*
La funcion GetDevice hace referencia a una funcion NO existente que tendria la funcion
de poder informar sobre el dispositivo seleccionado. 
Esta funcion deberia de existir y funcionar en una aplicacion funcional que sea capaz de poder hacer 
envio y recepcion de solicitudes con el protocolo HTTPs
*/
const device = GetDevice(params...); 

//segun el dispositivo obtener instancia correspondiente
const render = getRenderForDevice(device);

//inyectar la instancia en el render handler
const handler = new RenderHandler(render);

// Manejar la solicitud y obtener el contenido renderizado
const content = handler.handleRequest();

