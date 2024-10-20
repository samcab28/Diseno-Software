import { AIProvider } from '../providers/aiProvider

export abstract class AIService {
    protected aiProvider: AIProvider;

    constructor(aiProvider: AIProvider) {
        this.aiProvider = aiProvider;
    }

    analyze(): AIAnalysisResult {
        // Implementation
    }

    predict(): PredictionResult {
        // Implementation
    }

    train(): TrainingResult {
        // Implementation
    }

    evaluate(): EvaluationResult {
        // Implementation
    }

    validate(): ValidationResult {
        // Implementation
    }
}