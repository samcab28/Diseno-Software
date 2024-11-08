import mongoose, { Connection } from 'mongoose';
import { IRepository } from './iDataRepository';

export class MongoDBRepository implements IRepository {
    private static instance: MongoDBRepository;
    private connection: Connection | null = null;
    private isConnected: boolean = false;

    private constructor(private uri: string) {}

    public static getInstance(uri: string): MongoDBRepository {
        if (!MongoDBRepository.instance) {
            MongoDBRepository.instance = new MongoDBRepository(uri);
        }
        return MongoDBRepository.instance;
    }

    async connect(): Promise<void> {
        if (this.isConnected) return;
        
        try {
            await mongoose.connect(this.uri);
            this.connection = mongoose.connection;
            this.isConnected = true;
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (this.isConnected) {
            await mongoose.disconnect();
            this.isConnected = false;
            this.connection = null;
        }
    }

    async query(query: string, params?: any[]): Promise<any[]> {
        if (!this.isConnected) await this.connect();
        
        try {
            const [modelName, ...queryParams] = params || [];
            const model = mongoose.model(modelName);
            return await model.find(JSON.parse(query)).exec();
        } catch (error) {
            console.error('Error executing MongoDB query:', error);
            throw error;
        }
    }

    async execute(command: string, params?: any[]): Promise<any> {
        if (!this.isConnected) await this.connect();

        try {
            const [modelName, ...commandParams] = params || [];
            const model = mongoose.model(modelName);
            const operation = JSON.parse(command);
            
            switch (operation.type) {
                case 'insert':
                    return await model.collection.insertOne(operation.data);
                case 'update':
                    return await model.collection.updateOne(operation.filter, operation.update);
                case 'delete':
                    return await model.collection.deleteOne(operation.filter);
                case 'bulk':
                    return await model.collection.bulkWrite(operation.operations);
                default:
                    throw new Error(`Unsupported operation type: ${operation.type}`);
            }
        } catch (error) {
            console.error('Error executing MongoDB command:', error);
            throw error;
        }
    }
}