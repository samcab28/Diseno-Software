import { ExternalService } from './externalService';
import { ServiceResponse } from '../serviceResponse';
import { ServiceStatus } from '../serviceStatus';
import { ServiceConfig } from '../serviceConfig';

export class NoonlightService implements ExternalService {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: ServiceConfig) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl;
    }

    public async call(method: string, params: Map<string, any>): Promise<ServiceResponse> {
        // Implementación
    }

    public getStatus(): ServiceStatus {
        // Implementación
    }

    private async createAlarm(location: any, userInfo: any): Promise<any> {
        // Implementación
    }

    private async updateAlarm(alarmId: string, status: string): Promise<any> {
        // Implementación
    }

    private async dispatchEmergencyServices(alarmId: string): Promise<any> {
        // Implementación
    }
}