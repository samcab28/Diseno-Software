// dataManager.ts
export interface IRepository {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query(query: string, params?: any[]): Promise<any>;
    execute(command: string, params?: any[]): Promise<any>;
}

export class DataManager {
    private repository: IRepository;

    constructor(repository: IRepository) {
        this.repository = repository;
    }

    public async connect(): Promise<void> {
        await this.repository.connect();
    }

    public async disconnect(): Promise<void> {
        await this.repository.disconnect();
    }

    public async performOperation(operation: string, data: string, params?: any[]): Promise<any> {
        switch (operation) {
            case 'query':
                return await this.repository.query(data, params);
            case 'execute':
                return await this.repository.execute(data, params);
            default:
                throw new Error('Unknown operation');
        }
    }
}
