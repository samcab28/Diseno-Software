import { ExternalServiceFactory } from './externalServiceFactory';
import { ExternalService } from './services/externalService';
import { ServiceConfig } from './serviceConfig';
import { ServiceResponse } from './serviceResponse';

export class ExternalServicesFacade {
    private serviceFactory: ExternalServiceFactory;
    private services: Map<string, ExternalService>;

    constructor(serviceFactory: ExternalServiceFactory) {
        this.serviceFactory = serviceFactory;
        this.services = new Map<string, ExternalService>();
    }

    public getService(serviceName: string): ExternalService | undefined {
        // Implementación
    }

    public async callService(serviceName: string, method: string, params: Map<string, any>): Promise<ServiceResponse> {
        // Implementación
    }

    public registerService(serviceName: string, serviceConfig: ServiceConfig): void {
        // Implementación
    }
}