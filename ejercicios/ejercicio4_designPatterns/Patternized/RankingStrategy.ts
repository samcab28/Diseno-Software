// RankingStrategy.ts
import { Photo } from './PhotoAPIAdapter';


/*  El patrón de diseño 'Bridge' se aplica a la estrategia de rankings.
    Tenemos esta interfaz para que pueda ser implementada por diferentes algoritmos de ranking. 
    Esta interfaz actúa como la abstracción en el patrón Bridge. */
export interface RankingStrategy {
  rank(photos: Photo[]): Photo[];
}
