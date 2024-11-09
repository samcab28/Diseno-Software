import { IAIModel } from '../aiInterface';

export class OpenAIModel implements IAIModel {
    private apiKey: string;
    private apiUrl: string = 'https://api.openai.com/v1/completions';

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY || '';
    }

    async generateResponse(prompt: string): Promise<string> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    prompt: prompt,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0].text || 'No response generated';
        } catch (error) {
            console.error('OpenAI Error:', error);
            throw new Error('Failed to generate OpenAI response');
        }
    }
}