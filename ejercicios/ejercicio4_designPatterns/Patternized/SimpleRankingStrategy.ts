// SimpleRankingStrategy.ts
import { RankingStrategy } from './RankingStrategy';
import { Photo } from './PhotoAPIAdapter';

/*  Las implementaciones concretas de RankingStrategy representan diferentes formas
    de implementación de la abstracción de ranking. Por ejemplo, SimpleRankingStrategy 
    es una implementación concreta que clasifica las fotos basándose en un algoritmo específico. */

export class SimpleRankingStrategy implements RankingStrategy {
  public rank(photos: Photo[]): Photo[] {
    photos.sort((a, b) => {
      const scoreA = a.likes + (a.downloads * 2) + (a.views * 0.5);
      const scoreB = b.likes + (b.downloads * 2) + (b.views * 0.5);
      return scoreB - scoreA;
    });

    return photos.slice(0, 10);
  }
}
