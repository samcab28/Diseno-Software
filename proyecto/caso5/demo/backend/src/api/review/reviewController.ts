// src/api/review/reviewController.ts
import { Request, Response } from "express";
import { ReviewService } from "./reviewService";

export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    public async createReview(req: Request, res: Response): Promise<void> {
        try {
            const newReview = await this.reviewService.createReview(req.body);
            res.status(201).json({ status: "success", data: newReview });
        } catch (error) {
            console.error('Error in createReview controller:', error);
            this.handleError(res, error);
        }
    }

    public async getReviewsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const { userType } = req.query;

            if (isNaN(userId)) {
                res.status(400).json({ status: "error", message: "Invalid user ID" });
                return;
            }

            const reviews = await this.reviewService.getReviewsByUserId(
                userId, 
                userType as string
            );
            res.status(200).json({ status: "success", data: reviews });
        } catch (error) {
            console.error('Error in getReviewsByUserId controller:', error);
            this.handleError(res, error);
        }
    }

    public async respondToReview(req: Request, res: Response): Promise<void> {
        try {
            const { reviewId } = req.params;
            const { response } = req.body;

            const updatedReview = await this.reviewService.respondToReview(reviewId, response);
            res.status(200).json({ status: "success", data: updatedReview });
        } catch (error) {
            console.error('Error in respondToReview controller:', error);
            this.handleError(res, error);
        }
    }

    public async deleteReview(req: Request, res: Response): Promise<void> {
        try {
            const { reviewId } = req.params;
            await this.reviewService.deleteReview(reviewId);
            res.status(200).json({ status: "success", message: "Review deleted successfully" });
        } catch (error) {
            console.error('Error in deleteReview controller:', error);
            this.handleError(res, error);
        }
    }

    public async getReviewStats(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const { userType } = req.query;

            if (isNaN(userId)) {
                res.status(400).json({ status: "error", message: "Invalid user ID" });
                return;
            }

            const stats = await this.reviewService.getReviewStats(userId, userType as string);
            res.status(200).json({ status: "success", data: stats });
        } catch (error) {
            console.error('Error in getReviewStats controller:', error);
            this.handleError(res, error);
        }
    }

    private handleError(res: Response, error: any): void {
        let message = 'Internal server error';
        let status = 500;

        if (error instanceof Error) {
            message = error.message;
            if (error.name === 'ValidationError') {
                status = 400;
            }
        }

        res.status(status).json({ status: "error", message });
    }
}