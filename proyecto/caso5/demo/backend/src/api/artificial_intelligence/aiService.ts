// src/services/AIService.ts
import { AIBridge } from './aiBridge';
import { OpenAIModel } from './implementations/OpenAIModel';
import { GoogleAIModel } from './implementations/GoogleAIModel';
import { AIServiceError } from './utils/errors';
import { AIResponse, CurriculumAnalysis, AIStructuredResponse } from './aiInterface';

export class AIService {
    private aiBridge: AIBridge;
    private readonly validProviders = ['openai', 'google', 'meta'];

    constructor() {
        this.aiBridge = new AIBridge(new OpenAIModel());
    }

    private validateProvider(provider: string): void {
        if (!this.validProviders.includes(provider)) {
            throw new AIServiceError('Invalid AI provider specified', 400);
        }
    }

    private setProvider(provider: string): void {
        switch (provider) {
            case 'google':
                this.aiBridge.setAIModel(new GoogleAIModel());
                break;
            case 'openai':
            default:
                this.aiBridge.setAIModel(new OpenAIModel());
        }
    }

    async generateResponse(prompt: string, provider: string = 'openai'): Promise<AIResponse> {
        try {
            if (!prompt) {
                throw new AIServiceError('Prompt is required', 400);
            }

            this.validateProvider(provider);
            this.setProvider(provider);

            const response = await this.aiBridge.generateResponse(prompt);
            
            return {
                success: true,
                provider,
                response
            };
        } catch (error) {
            throw error;
        }
    }

    async analyzeCurriculum(information: string): Promise<CurriculumAnalysis> {
        try {
            this.setProvider('google');

            const prompt = `
                Por favor, analiza el siguiente currículum para un puesto de cuidador de casa y proporciona una respuesta en formato JSON con la siguiente estructura:
                {
                    "review": "reseña detallada",
                    "score": número del 1 al 10,
                    "details": {
                        "relevantExperience": "análisis de experiencia",
                        "references": "análisis de referencias",
                        "skills": "análisis de habilidades",
                        "reliability": "análisis de confiabilidad",
                        "potentialRisks": "análisis de riesgos potenciales"
                    }
                }

                Currículum a analizar:
                ${information}
            `;

            const aiResponse = await this.aiBridge.generateResponse(prompt);
            return this.parseAndCleanResponse(aiResponse);
        } catch (error) {
            throw new AIServiceError('Error analyzing curriculum', 500);
        }
    }

    private parseAndCleanResponse(response: string | any): CurriculumAnalysis {
        try {
            // Si la respuesta ya es un objeto, intentar procesarla directamente
            if (typeof response === 'object') {
                return this.cleanAnalysisObject(response);
            }

            // Limpiar la respuesta de markdown y caracteres especiales
            let cleanResponse = response.replace(/```json\n?|\n?```/g, '');
            
            // Intentar parsear el JSON
            const parsedResponse = JSON.parse(cleanResponse);
            return this.cleanAnalysisObject(parsedResponse);
            
        } catch (error) {
            // Si falla el parsing, usar el método de extracción de texto
            return this.extractAnalysisFromText(response as string);
        }
    }

    private cleanAnalysisObject(analysis: any): CurriculumAnalysis {
        return {
            review: this.cleanText(analysis.review || ''),
            score: this.validateAndNormalizeScore(analysis.score),
            isRecommended: this.validateAndNormalizeScore(analysis.score) > 7,
            details: {
                relevantExperience: this.cleanText(analysis.details?.relevantExperience || ''),
                references: this.cleanText(analysis.details?.references || ''),
                skills: this.cleanText(analysis.details?.skills || ''),
                reliability: this.cleanText(analysis.details?.reliability || ''),
                potentialRisks: this.cleanText(analysis.details?.potentialRisks || '')
            }
        };
    }

    private cleanText(text: string): string {
        return text
            .replace(/\*\*/g, '') // Eliminar asteriscos de markdown
            .replace(/\\n/g, ' ') // Reemplazar \n por espacios
            .replace(/\s+/g, ' ') // Eliminar espacios múltiples
            .trim(); // Eliminar espacios al inicio y final
    }

    private validateAndNormalizeScore(score: any): number {
        const numScore = Number(score);
        if (isNaN(numScore)) return 0;
        if (numScore < 0) return 0;
        if (numScore > 10) return 10;
        return Math.round(numScore * 10) / 10; // Redondear a 1 decimal
    }

    private extractAnalysisFromText(text: string): CurriculumAnalysis {
        // Buscar patrones específicos en el texto
        const scorePattern = /(?:puntuación|score|calificación|rating):\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*\/\s*10/i;
        const recommendationPattern = /(?:recomendado|recommended|aceptable|suitable):\s*(sí|si|yes|no|true|false)/i;
        
        // Extraer score
        const scoreMatch = text.match(scorePattern);
        const score = scoreMatch 
            ? this.validateAndNormalizeScore(scoreMatch[1] || scoreMatch[2])
            : this.extractScoreFromText(text);

        // Extraer recomendación
        const recommendationMatch = text.match(recommendationPattern);
        const explicitRecommendation = recommendationMatch
            ? /^(sí|si|yes|true)$/i.test(recommendationMatch[1])
            : null;

        // Dividir el texto en secciones para la reseña
        const sections = text.split(/\n{2,}/);
        const review = sections.find(s => s.length > 100) || text;

        return {
            review: review.trim(),
            score,
            isRecommended: explicitRecommendation !== null 
                ? explicitRecommendation 
                : score > 7,
            details: this.extractDetailsFromText(text)
        };
    }

    private extractScoreFromText(text: string): number {
        // Buscar números del 1-10 en el texto
        const numbers = text.match(/\b([0-9]|10)(?:\.\d)?\b/g);
        
        if (!numbers) return 0;
        
        // Filtrar y validar números encontrados
        const validScores = numbers
            .map(n => parseFloat(n))
            .filter(n => n >= 0 && n <= 10);
            
        if (validScores.length === 0) return 0;
        
        // Priorizar números que aparecen después de palabras clave
        const scoreKeywords = ['puntuación', 'score', 'calificación', 'rating', 'evaluación'];
        for (const keyword of scoreKeywords) {
            const keywordIndex = text.toLowerCase().indexOf(keyword);
            if (keywordIndex !== -1) {
                const subsequentText = text.slice(keywordIndex);
                const subsequentMatch = subsequentText.match(/\b([0-9]|10)(?:\.\d)?\b/);
                if (subsequentMatch) {
                    return this.validateAndNormalizeScore(subsequentMatch[0]);
                }
            }
        }
        
        // Si no se encuentra un score específico, usar el promedio de los números válidos
        return this.validateAndNormalizeScore(
            validScores.reduce((a, b) => a + b, 0) / validScores.length
        );
    }

    private extractDetailsFromText(text: string): CurriculumAnalysis['details'] {
        return {
            relevantExperience: this.extractSection(text, ['experiencia', 'experience']),
            references: this.extractSection(text, ['referencias', 'references']),
            skills: this.extractSection(text, ['habilidades', 'skills']),
            reliability: this.extractSection(text, ['confiabilidad', 'reliability']),
            potentialRisks: this.extractSection(text, ['riesgos', 'risks'])
        };
    }

    private extractSection(text: string, keywords: string[]): string {
        const regex = new RegExp(`(${keywords.join('|')}).*?:(.*?)(?=\\n\\n|$)`, 'is');
        const match = text.match(regex);
        return match ? match[2].trim() : '';
    }
}