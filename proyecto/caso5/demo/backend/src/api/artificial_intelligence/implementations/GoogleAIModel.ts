import { IAIModel } from '../aiInterface';

export class GoogleAIModel implements IAIModel {
    private apiKey: string;
    private apiUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY || '';
    }

    async generateResponse(prompt: string): Promise<string> {
        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Google AI Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text || 'No response generated';
        } catch (error) {
            console.error('Google AI Error:', error);
            throw new Error('Failed to generate Google AI response');
        }
    }
}