// src/api/location/locationService.ts
import { DataManager } from '../data/services/dataManager';

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface NearbyLocation {
    idDireccion: number;
    distance: number;
    infoCasa?: any;
    direccion?: any;
}

export class LocationService {
    constructor(private readonly dataManager: DataManager) {}

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radio de la Tierra en kilómetros
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distancia en kilómetros
        
        return parseFloat(distance.toFixed(2));
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI/180);
    }

    public async findNearbyLocations(userLocation: Coordinates, maxDistance: number = 10): Promise<any[]> {
        try {
            // 1. Obtener todas las direcciones de PostgreSQL
            const query = `
                SELECT d.*, c.nombre as ciudad_nombre, e.nombre as estado_nombre
                FROM Direccion d
                JOIN Ciudad c ON d.idCiudad = c.idCiudad
                JOIN Estado e ON c.idEstado = e.idEstado
            `;
            const direcciones = await this.dataManager.query('PostgreSQL', query);

            // 2. Calcular distancias y filtrar por maxDistance
            const nearbyLocations: NearbyLocation[] = direcciones
                .map((dir: any) => ({
                    idDireccion: dir.iddireccion,
                    distance: this.calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        parseFloat(dir.latitud),
                        parseFloat(dir.longitud)
                    ),
                    direccion: {
                        ...dir,
                        distancia: 0 // Se actualizará con la distancia calculada
                    }
                }))
                .filter((loc: NearbyLocation) => loc.distance <= maxDistance)
                .sort((a: NearbyLocation, b: NearbyLocation) => a.distance - b.distance);

            // 3. Obtener las InfoCasas correspondientes de MongoDB
            const infoCasasPromises = nearbyLocations.map(async location => {
                const query = JSON.stringify({
                    idDireccion: location.idDireccion,
                });
                const infoCasas = await this.dataManager.query('MongoDB', query, ['InfoCasa']);
                
                return {
                    ...location,
                    direccion: {
                        ...location.direccion,
                        distancia: location.distance
                    },
                    infoCasas: infoCasas
                };
            });

            const results = await Promise.all(infoCasasPromises);
            
            // 4. Filtrar solo las ubicaciones que tienen InfoCasas asociadas
            return results.filter(result => result.infoCasas && result.infoCasas.length > 0);
        } catch (error) {
            console.error('Error finding nearby locations:', error);
            throw new Error('Could not find nearby locations');
        }
    }
}