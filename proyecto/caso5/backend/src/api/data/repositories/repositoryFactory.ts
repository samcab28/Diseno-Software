// RepositoryFactory.ts
import { PostgreSQLRepository } from './postgreSQLRepository';
import { MongoDBRepository } from './mongoDBRepository';
import { IRepository } from './iDataRepository';
import { PoolConfig } from 'pg';

export class RepositoryFactory {
    private static instance: RepositoryFactory;
    private repositories: { [key: string]: IRepository } = {};

    private constructor() {}

    public static getInstance(): RepositoryFactory {
        if (!RepositoryFactory.instance) {
            RepositoryFactory.instance = new RepositoryFactory();
        }
        return RepositoryFactory.instance;
    }

    public getRepository(name: string, config: any): IRepository {
        if (!this.repositories[name]) {
            switch (name) {
                case 'PostgreSQL':
                    if (!config) throw new Error('Configuration is required for PostgreSQL repository');
                    this.repositories[name] = PostgreSQLRepository.getInstance(config);
                    break;
                case 'MongoDB':
                    if (!config || !config.uri) throw new Error('MongoDB URI is required');
                    this.repositories[name] = MongoDBRepository.getInstance(config.uri);
                    break;
                default:
                    throw new Error(`Repository '${name}' not found`);
            }
        }
        return this.repositories[name];
    }
}
