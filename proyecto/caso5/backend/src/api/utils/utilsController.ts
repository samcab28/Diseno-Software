import { Request, Response } from "express";
import axios from 'axios';

export class UtilsController {
    public async getLocation(req: Request, res: Response): Promise<void> {
        try {
            // Obtener IP del cliente (en este caso, estática para la prueba)
            const ip = req.ip || req.socket.remoteAddress;
            console.log("IP del cliente:", ip);

            // Definir la URL de la API con la clave de acceso y la IP
            const url = `https://apiip.net/api/check?ip=67.250.186.196&accessKey=cbdc3143-6a0a-44ae-93ec-c596e9147b12`;

            // Realizar la solicitud con axios
            const response = await axios.get(url);

            // Extraer datos de ubicación
            const location = {
                latitude: response.data.lat,
                longitude: response.data.lon
            };

            res.status(200).json({
                status: "success",
                data: location
            });
        } catch (error) {
            console.error('Error in getLocation controller:', error);
            this.handleError(res, error);
        }
    }

    private handleError(res: Response, error: any): void {
        let message = 'Internal server error';
        let status = 500;

        if (error instanceof Error) {
            message = error.message;
            if (error.name === 'ValidationError') {
                status = 400;
            }
        }

        res.status(status).json({ status: "error", message });
    }
}
