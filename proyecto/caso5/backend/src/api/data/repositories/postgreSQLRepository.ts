// PostgreSQLRepository.ts
import { Pool, PoolConfig, QueryResult } from 'pg';
import { IRepository } from './iDataRepository';

export class PostgreSQLRepository implements IRepository {
    private static instance: PostgreSQLRepository;
    private pool: Pool;
    private isConnected: boolean = false;

    private constructor(config: PoolConfig) {
        this.pool = new Pool(config);
    }

    public static getInstance(config: PoolConfig): PostgreSQLRepository {
        if (!PostgreSQLRepository.instance) {
            PostgreSQLRepository.instance = new PostgreSQLRepository(config);
        }
        return PostgreSQLRepository.instance;
    }

    async connect(): Promise<void> {
        if (this.isConnected) return;
        const client = await this.pool.connect();
        client.release();
        this.isConnected = true;
    }

    async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.pool.end();
            this.isConnected = false;
        }
    }

    async query(query: string, params?: any[]): Promise<any[]> {
        if (!this.isConnected) await this.connect();
        const result = await this.pool.query(query, params);
        return result.rows;
    }

    async execute(command: string, params?: any[]): Promise<QueryResult> {
        if (!this.isConnected) await this.connect();
        return await this.pool.query(command, params);
    }
}
