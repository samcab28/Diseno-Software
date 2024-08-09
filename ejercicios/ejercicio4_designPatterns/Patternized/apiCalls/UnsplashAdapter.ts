import { Photo, PhotoAPIAdapter } from '../PhotoAPIAdapter';

export class UnsplashAdapter implements PhotoAPIAdapter {
  private accessKey: string;

  constructor(accessKey: string) {
    this.accessKey = accessKey;
  }

  public async searchPhotos(query: string): Promise<Photo[]> {
    // Realizamos la llamada a la API de Unsplash utilizando 'fetch'
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=50&client_id=${this.accessKey}`);

    const data = await response.json();

    // Transformamos la respuesta en un formato que 'PhotoAPIAdapter' espera
    return data.results.map((result: any) => ({
      id: result.id,
      url: result.urls.full,
      likes: result.likes,
      downloads: result.downloads || 0, // Algunos campos pueden no estar presentes en la respuesta
      views: result.views || 0,
    }));
  }
}
