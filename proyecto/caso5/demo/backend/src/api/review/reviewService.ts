// src/api/review/reviewService.ts
import { DataManager } from '../data/services/dataManager';

export class ReviewService {
    constructor(private readonly dataManager: DataManager) {}

    public async createReview(reviewData: {
        fromUserId: number;
        toUserId: number;
        rating: number;
        comment: string;
        userType: 'publisher' | 'caregiver';
        postId: string;
    }) {
        try {
            const canReview = await this.canUserReview(
                reviewData.fromUserId,
                reviewData.toUserId,
                reviewData.postId
            );

            if (!canReview) {
                throw new Error('No se puede crear la review para este servicio');
            }

            const command = JSON.stringify({
                type: 'insert',
                data: {
                    ...reviewData,
                    createdAt: new Date(),
                    deleted: false
                }
            });

            return await this.dataManager.execute('MongoDB', command, ['Review']);
        } catch (error) {
            console.error('Error creating review:', error);
            throw new Error('Could not create review');
        }
    }

    private async canUserReview(fromUserId: number, toUserId: number, postId: string): Promise<boolean> {
        try {
            // Verificar si el post está completado
            const postQuery = JSON.stringify({
                _id: postId,
                estado: 'completado'
            });
            const posts = await this.dataManager.query('MongoDB', postQuery, ['Post']);
            
            if (posts.length === 0) {
                return false;
            }

            // Verificar si ya existe una review
            const reviewQuery = JSON.stringify({
                fromUserId,
                toUserId,
                postId,
                deleted: false
            });
            const existingReviews = await this.dataManager.query('MongoDB', reviewQuery, ['Review']);

            return existingReviews.length === 0;
        } catch (error) {
            console.error('Error checking review eligibility:', error);
            throw error;
        }
    }

    public async getReviewsByUserId(userId: number, userType?: string) {
        try {
            const query = JSON.stringify({
                toUserId: userId,
                deleted: false,
                ...(userType && { userType })
            });
            
            return await this.dataManager.query('MongoDB', query, ['Review']);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw new Error('Could not fetch reviews');
        }
    }

    public async respondToReview(reviewId: string, response: string) {
        try {
            const command = JSON.stringify({
                type: 'update',
                filter: { _id: reviewId, deleted: false },
                update: {
                    $set: {
                        responseComment: response,
                        responseDate: new Date()
                    }
                }
            });

            return await this.dataManager.execute('MongoDB', command, ['Review']);
        } catch (error) {
            console.error('Error responding to review:', error);
            throw new Error('Could not respond to review');
        }
    }

    public async deleteReview(reviewId: string) {
        try {
            const command = JSON.stringify({
                type: 'update',
                filter: { _id: reviewId },
                update: { $set: { deleted: true } }
            });

            return await this.dataManager.execute('MongoDB', command, ['Review']);
        } catch (error) {
            console.error('Error deleting review:', error);
            throw new Error('Could not delete review');
        }
    }

    public async getReviewStats(userId: number, userType?: string) {
        try {
            const reviews = await this.getReviewsByUserId(userId, userType);
            
            const stats = {
                totalReviews: reviews.length,
                averageRating: 0,
                ratingDistribution: {
                    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
                }
            };

            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
                stats.averageRating = Number((totalRating / reviews.length).toFixed(1));

                reviews.forEach((review: any) => {
                    stats.ratingDistribution[review.rating as keyof typeof stats.ratingDistribution]++;
                });
            }

            return stats;
        } catch (error) {
            console.error('Error calculating review stats:', error);
            throw new Error('Could not calculate review statistics');
        }
    }
}