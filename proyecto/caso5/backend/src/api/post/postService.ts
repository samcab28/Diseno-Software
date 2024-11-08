// src/api/post/postService.ts
import { DataManager } from '../data/services/dataManager';

export class PostService {
    constructor(private readonly dataManager: DataManager) {}

    async getAllPosts() {
        try {
            const query = JSON.stringify({ deleted: false });
            return await this.dataManager.query('MongoDB', query, ['Post']);
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    async createPost(postData: any) {
        try {
            const command = JSON.stringify({
                operation: 'insert',
                data: { ...postData, fechaPublicacion: new Date() }
            });
            return await this.dataManager.execute('MongoDB', command, ['Post']);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePostStatus(postId: string, estado: string) {
        try {
            const command = JSON.stringify({
                operation: 'update',
                filter: { _id: postId },
                update: { $set: { estado } }
            });
            return await this.dataManager.execute('MongoDB', command, ['Post']);
        } catch (error) {
            console.error('Error updating post status:', error);
            throw error;
        }
    }
}