export interface AIProvider {
    createAnalysis(request: AIRequest): Analysis;
    processAnalysis(analysis: Analysis): AnalysisResult;
    trainModel(config: TrainingConfig): TrainingResult;
    validateResults(results: Results): ValidationResult;
    getPrediction(input: Input): PredictionResult;
}