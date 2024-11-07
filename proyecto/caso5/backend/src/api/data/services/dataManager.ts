// DataManager.ts
import { IRepository } from './../repositories/iDataRepository';
import { RepositoryFactory } from './../repositories/repositoryFactory';

export class DataManager {
    private repositories: { [key: string]: IRepository } = {};

    public registerRepository(name: string, config: any): void {
        this.repositories[name] = RepositoryFactory.getInstance().getRepository(name, config);
    }

    public async connect(): Promise<void> {
        for (const repository of Object.values(this.repositories)) {
            await repository.connect();
        }
    }

    public async disconnect(): Promise<void> {
        for (const repository of Object.values(this.repositories)) {
            await repository.disconnect();
        }
    }

    public async query(repositoryName: string, query: string, params?: any[]): Promise<any> {
        const repository = this.repositories[repositoryName];
        if (!repository) throw new Error(`Repository '${repositoryName}' not found`);
        return await repository.query(query, params);
    }

    public async execute(repositoryName: string, command: string, params?: any[]): Promise<any> {
        const repository = this.repositories[repositoryName];
        if (!repository) throw new Error(`Repository '${repositoryName}' not found`);
        return await repository.execute(command, params);
    }
}
