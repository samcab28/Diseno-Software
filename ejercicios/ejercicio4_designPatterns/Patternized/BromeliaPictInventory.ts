// BromeliaPictInventory.ts
import { Photo, PhotoAPIAdapter } from './PhotoAPIAdapter';
import { RankingStrategy } from './RankingStrategy';
import { PixabayAdapter } from './PixabayAdapter';
import { UnsplashAdapter } from './UnsplashAdapter';
import { SimpleRankingStrategy } from './SimpleRankingStrategy';

/*  
    BRIDGE: La clase BromeliaPictInventory utiliza un RankingStrategy para clasificar las 
    fotos obtenidas de las APIs. La clase BromeliaPictInventory actúa como el cliente 
    que usa la abstracción RankingStrategy para obtener el ranking de fotos, pero no le 
    importa qué algoritmo específico se está usando.

    ADAPTER: La clase BromeliaPictInventory utiliza los adaptadores para obtener fotos de 
    ambas APIs a través de la interfaz común 'PhotoAPIAdapter'.
*/

export class BromeliaPictInventory {
  private pixabayAdapter: PhotoAPIAdapter;
  private unsplashAdapter: PhotoAPIAdapter;
  private rankingStrategy: RankingStrategy;

  constructor(
    pixabayApiKey: string,
    unsplashAccessKey: string,
    rankingStrategy: RankingStrategy
  ) {
    this.pixabayAdapter = new PixabayAdapter(pixabayApiKey);
    this.unsplashAdapter = new UnsplashAdapter(unsplashAccessKey);
    this.rankingStrategy = rankingStrategy;
  }

  public async getTopPhotos(query: string): Promise<Photo[]> {
    const pixabayPhotos = await this.pixabayAdapter.searchPhotos(query);
    const unsplashPhotos = await this.unsplashAdapter.searchPhotos(query);

    const combinedPhotos = [...pixabayPhotos, ...unsplashPhotos];
    return this.rankingStrategy.rank(combinedPhotos);
  }
}

// Ejemplo de uso
(async () => {
  const rankingStrategy: RankingStrategy = new SimpleRankingStrategy();  
  const bromeliaPictInventory = new BromeliaPictInventory(
    'PIXABAY_API_KEY',
    'UNSPLASH_ACCESS_KEY',
    rankingStrategy
  );
  const topPhotos = await bromeliaPictInventory.getTopPhotos('nature');
  console.log(topPhotos);
})();
