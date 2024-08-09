// Importamos las dependencias necesarias
import axios from 'axios';

// Definimos las interfaces para manejar las respuestas de las APIs
interface Photo {
  id: string;
  url: string;
  likes: number;
  downloads: number;
  views: number;
}

// Clase BromeliaPictInventory que gestiona la interacción con las APIs y la evaluación de las fotos
export class BromeliaPictInventory {
  private pixabayApiKey: string;
  private unsplashAccessKey: string;

  constructor(pixabayApiKey: string, unsplashAccessKey: string) {
    this.pixabayApiKey = pixabayApiKey;
    this.unsplashAccessKey = unsplashAccessKey;
  }

  // Método para buscar fotos en Pixabay
  private async searchPixabayPhotos(query: string): Promise<Photo[]> {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: this.pixabayApiKey,
        q: query,
        per_page: 50, // Recupera hasta 50 fotos
      },
    });

    return response.data.hits.map((hit: any) => ({
      id: hit.id,
      url: hit.largeImageURL,
      likes: hit.likes,
      downloads: hit.downloads,
      views: hit.views,
    }));
  }

  // Método para buscar fotos en Unsplash
  private async searchUnsplashPhotos(query: string): Promise<Photo[]> {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 50, // Recupera hasta 50 fotos
        client_id: this.unsplashAccessKey,
      },
    });

    return response.data.results.map((result: any) => ({
      id: result.id,
      url: result.urls.full,
      likes: result.likes,
      downloads: result.downloads || 0, // Unsplash no siempre tiene el campo "downloads"
      views: result.views || 0, // Unsplash no siempre tiene el campo "views"
    }));
  }

  // Método para rankear y combinar fotos de Pixabay y Unsplash
  public async getTopPhotos(query: string): Promise<Photo[]> {
    const pixabayPhotos = await this.searchPixabayPhotos(query);
    const unsplashPhotos = await this.searchUnsplashPhotos(query);

    return this.rankPhotosResult(unsplashPhotos, pixabayPhotos);
  }

  // Método hardcoded para rankear y combinar las fotos de ambas APIs
  private rankPhotosResult(unsplashPhotos: Photo[], pixabayPhotos: Photo[]): Photo[] {
    // Combinamos ambas listas
    const combinedPhotos = [...unsplashPhotos, ...pixabayPhotos];

    // Rankea las fotos basándose en un puntaje simple: likes + (downloads * 2) + (views * 0.5)
    combinedPhotos.sort((a, b) => {
      const scoreA = a.likes + (a.downloads * 2) + (a.views * 0.5);
      const scoreB = b.likes + (b.downloads * 2) + (b.views * 0.5);
      return scoreB - scoreA;
    });

    // Retornamos las 10 mejores fotos
    return combinedPhotos.slice(0, 10);
  }
}

// Ejemplo de uso
(async () => {
  const bromeliaPictInventory = new BromeliaPictInventory('PIXABAY_API_KEY', 'UNSPLASH_ACCESS_KEY');
  const topPhotos = await bromeliaPictInventory.getTopPhotos('nature');
  console.log(topPhotos);
})();
