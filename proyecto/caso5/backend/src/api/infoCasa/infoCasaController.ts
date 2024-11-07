// src/api/infoCasa/infoCasaController.ts
import { Request, Response } from "express";
import { InfoCasaService } from "./infoCasaService";

export class InfoCasaController {
    constructor(private readonly infoCasaService: InfoCasaService) {}

    async getInfoCasas(req: Request, res: Response) {
        try {
            const infoCasas = await this.infoCasaService.getAllInfoCasas();
            res.status(200).json({ status: "success", data: infoCasas });
        } catch (error) {
            console.error('Error in getInfoCasas controller:', error);
            res.status(500).json({ 
                status: "error", 
                message: error instanceof Error ? error.message : 'Internal server error' 
            });
        }
    }

    async createInfoCasa(req: Request, res: Response) {
        try {
            const newInfoCasa = await this.infoCasaService.createInfoCasa(req.body);
            res.status(201).json({ status: "success", data: newInfoCasa });
        } catch (error) {
            console.error('Error in createInfoCasa controller:', error);
            res.status(500).json({ 
                status: "error", 
                message: error instanceof Error ? error.message : 'Internal server error' 
            });
        }
    }
}