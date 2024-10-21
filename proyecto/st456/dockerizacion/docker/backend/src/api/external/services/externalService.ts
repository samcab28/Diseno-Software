import { ServiceResponse } from '../serviceResponse';
import { ServiceStatus } from '../serviceStatus';

export interface ExternalService {
    call(method: string, params: Map<string, any>): Promise<ServiceResponse>;
    getStatus(): ServiceStatus;
}