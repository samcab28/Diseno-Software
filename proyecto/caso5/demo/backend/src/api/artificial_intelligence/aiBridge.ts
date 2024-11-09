import { IAIModel } from './aiInterface';

export class AIBridge {
    private aiModel: IAIModel;

    constructor(aiModel: IAIModel) {
        this.aiModel = aiModel;
    }

    async generateResponse(prompt: string): Promise<string> {
        return await this.aiModel.generateResponse(prompt);
    }

    setAIModel(aiModel: IAIModel) {
        this.aiModel = aiModel;
    }
}