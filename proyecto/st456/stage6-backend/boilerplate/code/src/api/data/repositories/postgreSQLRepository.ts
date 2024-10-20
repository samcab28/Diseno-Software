// postgreSQLRepository.ts
import { Pool, PoolConfig } from 'pg';
import { IRepository } from '../services/dataManager';

export class PostgreSQLRepository implements IRepository {
    private pool: Pool;
    private isConnected: boolean = false;

    constructor(config: PoolConfig) {
        this.pool = new Pool(config);
    }

    async connect(): Promise<void> {
        try {
            const client = await this.pool.connect();
            client.release();
            this.isConnected = true;
            console.log('Connected to PostgreSQL database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.pool.end();
            this.isConnected = false;
            console.log('Disconnected from PostgreSQL database');
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
            throw error;
        }
    }

    async query(query: string, params?: any[]): Promise<any> {
        if (!this.isConnected) {
            throw new Error('Not connected to the database');
        }
        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async execute(command: string, params?: any[]): Promise<any> {
        if (!this.isConnected) {
            throw new Error('Not connected to the database');
        }
        try {
            const result = await this.pool.query(command, params);
            return result;
        } catch (error) {
            console.error('Error executing command:', error);
            throw error;
        }
    }
}
