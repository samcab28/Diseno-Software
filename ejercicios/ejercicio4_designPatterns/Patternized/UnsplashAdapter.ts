// UnsplashAdapter.ts
import axios from 'axios';
import { Photo, PhotoAPIAdapter } from './PhotoAPIAdapter';

export class UnsplashAdapter implements PhotoAPIAdapter {
  private accessKey: string;

  constructor(accessKey: string) {
    this.accessKey = accessKey;
  }

  public async searchPhotos(query: string): Promise<Photo[]> {
    // Aquí iría la llamada real a la API de Unsplash
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 50,
        client_id: this.accessKey,
      },
    });

    // Transformamos la respuesta en un formato que 'PhotoAPIAdapter' espera
    return response.data.results.map((result: any) => ({
      id: result.id,
      url: result.urls.full,
      likes: result.likes,
      downloads: result.downloads || 0,
      views: result.views || 0,
    }));
  }
}
