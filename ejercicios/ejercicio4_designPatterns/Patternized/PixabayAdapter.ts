// PixabayAdapter.ts
import axios from 'axios';
import { Photo, PhotoAPIAdapter } from './PhotoAPIAdapter';


/*  Este adaptador implementa el método 'searchPhotos' de la interfaz 'PhotoAPIAdapter'
    y transforma la respuesta de la API de Pixabay en un formato compatible con 'PhotoAPIAdapter'. */
export class PixabayAdapter implements PhotoAPIAdapter {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async searchPhotos(query: string): Promise<Photo[]> {
    // Aquí iría la llamada real a la API de Pixabay. 
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: this.apiKey,
        q: query,
        per_page: 50,
      },
    });

    // Transformamos la respuesta en un formato que 'PhotoAPIAdapter' espera
    return response.data.hits.map((hit: any) => ({
      id: hit.id,
      url: hit.largeImageURL,
      likes: hit.likes,
      downloads: hit.downloads,
      views: hit.views,
    }));
  }
}
