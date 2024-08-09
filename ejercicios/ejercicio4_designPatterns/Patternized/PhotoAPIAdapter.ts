// PhotoAPIAdapter.ts


export interface Photo {
    id: string;
    url: string;
    likes: number;
    downloads: number;
    views: number;
  }
  
/* Esta interfaz especifica el método que ambos adaptadores implementar */
export interface PhotoAPIAdapter {
    searchPhotos(query: string): Promise<Photo[]>;
  }
