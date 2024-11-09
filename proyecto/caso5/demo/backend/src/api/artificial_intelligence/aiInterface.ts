export interface IAIModel {
    generateResponse(prompt: string): Promise<string>;
}

export interface AIResponse {
    success: boolean;
    provider?: string;
    response: string | AIStructuredResponse;
    error?: string;
}

export interface AIStructuredResponse {
    review: string;
    score: number;
    recommendation: string;
}

export interface CurriculumAnalysis {
    review: string;
    score: number;
    isRecommended: boolean;
    details?: {
        relevantExperience?: string;
        references?: string;
        skills?: string;
        reliability?: string;
        potentialRisks?: string;
    };
}