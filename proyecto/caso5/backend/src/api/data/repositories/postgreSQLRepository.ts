import { Pool, PoolConfig, QueryResult } from 'pg';
import { IRepository } from '../services/dataManager';

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
        if (this.isConnected) {
            console.log('Already connected to PostgreSQL database');
            return;
        }

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
        if (!this.isConnected) {
            console.log('Already disconnected from PostgreSQL database');
            return;
        }

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
            await this.connect();
        }
        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async execute(command: string, params?: any[]): Promise<QueryResult> {
        if (!this.isConnected) {
            await this.connect();
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