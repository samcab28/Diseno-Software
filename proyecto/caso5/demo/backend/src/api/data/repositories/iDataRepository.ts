// IRepository.ts
export interface IRepository {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query(query: string, params?: any[]): Promise<any[]>;
    execute(command: string, params?: any[]): Promise<any>;
}
