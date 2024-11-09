// src/controllers/AIController.ts
import { Request, Response } from 'express';
import { AIService } from './aiService';
import { AIServiceError } from './utils/errors';
import { validationResult, body } from 'express-validator';

export class AIController {
    private aiService: AIService;

    constructor() {
        this.aiService = new AIService();
    }

    async generateResponse(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { prompt, provider = 'openai' } = req.body;
            const response = await this.aiService.generateResponse(prompt, provider);
            res.json(response);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async analyzeCurriculum(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { information } = req.body;
            const analysis = await this.aiService.analyzeCurriculum(information);
            
            res.json({
                success: true,
                analysis,
                timestamp: new Date().toISOString(),
                requestId: this.generateRequestId()
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: any, res: Response) {
        console.error('Error in AIController:', error);
        
        if (error instanceof AIServiceError) {
            res.status(error.statusCode).json({
                success: false,
                error: error.message,
                provider: error.provider,
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'An unexpected error occurred',
                timestamp: new Date().toISOString()
            });
        }
    }

    private generateRequestId(): string {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
