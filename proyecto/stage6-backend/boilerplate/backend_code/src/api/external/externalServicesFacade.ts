import { ExternalServiceFactory } from './externalServiceFactory';
import { ExternalService } from './services/externalService';

export class ExternalServicesFacade {
    private serviceFactory: ExternalServiceFactory;
    private services: Map<string, ExternalService>;

    constructor(serviceFactory: ExternalServiceFactory) {
        this.serviceFactory = serviceFactory;
        this.services = new Map();
    }

    public getService(serviceName: string): ExternalService {
        // Implementation
    }

    public callService(serviceName: string, method: string, params: Map<string, any>): any {
        // Implementation
    }

    public registerService(serviceName: string, serviceConfig: any): void {
        // Implementation
    }
}