import { ExternalService } from './externalService';
import { ServiceResponse } from '../serviceResponse';
import { ServiceStatus } from '../serviceStatus';
import { ServiceConfig } from '../serviceConfig';

export class ReviewIOService implements ExternalService {
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

    private async submitReview(productId: string, rating: number, comment: string): Promise<any> {
        // Implementación
    }

    private async getProductReviews(productId: string): Promise<any> {
        // Implementación
    }
}