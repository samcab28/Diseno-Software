export class SQSClient {
    private credentials: any; // AWSCredentials type to be implemented
    private region: string;

    constructor(credentials: any, region: string) {
        this.credentials = credentials;
        this.region = region;
    }

    public async sendMessage(queueUrl: string, messageBody: string): Promise<any> {
        // Implementación
    }

    public async receiveMessage(queueUrl: string): Promise<any> {
        // Implementación
    }

    public async deleteMessage(queueUrl: string, receiptHandle: string): Promise<any> {
        // Implementación
    }

    public async createQueue(queueName: string): Promise<any> {
        // Implementación
    }
}