import { Photo, PhotoAPIAdapter } from '../PhotoAPIAdapter';

/* Este adaptador implementa el método 'searchPhotos' de la interfaz 'PhotoAPIAdapter'
   y transforma la respuesta de la API de Pixabay en un formato compatible con 'PhotoAPIAdapter'. */
export class PixabayAdapter implements PhotoAPIAdapter {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async searchPhotos(query: string): Promise<Photo[]> {
    // Realizamos la llamada a la API de Pixabay utilizando 'fetch'
    const response = await fetch(`https://pixabay.com/api/?key=${this.apiKey}&q=${query}&per_page=50`);
    
    const data = await response.json();

    // Transformamos la respuesta en un formato que 'PhotoAPIAdapter' espera
    return data.hits.map((hit: any) => ({
      id: hit.id,
      url: hit.largeImageURL,
      likes: hit.likes,
      downloads: hit.downloads,
      views: hit.views,
    }));
  }
}
