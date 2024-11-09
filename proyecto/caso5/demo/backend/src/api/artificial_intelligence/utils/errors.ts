export class AIServiceError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public provider?: string
    ) {
        super(message);
        this.name = 'AIServiceError';
    }
}