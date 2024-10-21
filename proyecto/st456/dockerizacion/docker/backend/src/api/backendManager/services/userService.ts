// backend-service/services/userService.ts

import { DataManager } from "../../data/services/dataManager";

export class UserService {
    private dataManager: DataManager;

    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }

    public async getAllUsers(): Promise<any[]> {
        try {
            const query = 'SELECT * FROM usuarios;';
            return await this.dataManager.performOperation('query', query);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Could not fetch users');
        }
    }
}
