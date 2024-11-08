// src/api/infoCasa/infoCasaService.ts
import { DataManager } from '../data/services/dataManager';

export class InfoCasaService {
    constructor(private readonly dataManager: DataManager) {}

    async getAllInfoCasas() {
        try {
            const query = JSON.stringify({});
            return await this.dataManager.query('MongoDB', query, ['InfoCasa']);
        } catch (error) {
            console.error('Error fetching info casas:', error);
            throw error;
        }
    }

    async createInfoCasa(infoCasaData: any) {
        try {
            const command = JSON.stringify({
                operation: 'insert',
                data: infoCasaData
            });
            return await this.dataManager.execute('MongoDB', command, ['InfoCasa']);
        } catch (error) {
            console.error('Error creating info casa:', error);
            throw error;
        }
    }
}