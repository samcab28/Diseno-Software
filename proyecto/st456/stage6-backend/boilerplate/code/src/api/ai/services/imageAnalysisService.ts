import { AIService } from './aiService';
import { AIProvider } from '../providers/aiProvider';

export class ImageAnalysisService extends AIService {
    private imageConfig: ImageConfig;

    constructor(aiProvider: AIProvider, imageConfig: ImageConfig) {
        super(aiProvider);
        this.imageConfig = imageConfig;
    }

    analyze(): AIAnalysisResult {
        // Implementation
    }

    detectObjects(): DetectionResult {
        // Implementation
    }

    classifyImage(): ClassificationResult {
        // Implementation
    }

    generateDescription(): DescriptionResult {
        // Implementation
    }
}