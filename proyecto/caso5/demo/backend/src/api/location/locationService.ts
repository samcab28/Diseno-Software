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
            console.log('Iniciando búsqueda con:', { userLocation, maxDistance });

            // 1. Obtener todas las direcciones de PostgreSQL
            const query = `
                SELECT d.*, c.nombre as ciudad_nombre, e.nombre as estado_nombre
                FROM Direccion d
                JOIN Ciudad c ON d.idCiudad = c.idCiudad
                JOIN Estado e ON c.idEstado = e.idEstado
            `;
            const direcciones = await this.dataManager.query('PostgreSQL', query);
            console.log('Direcciones encontradas en PostgreSQL:', direcciones);

            // 2. Calcular distancias y filtrar por maxDistance
            const nearbyLocations: NearbyLocation[] = direcciones
                .map((dir: any) => {
                    const distance = this.calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        parseFloat(dir.latitud),
                        parseFloat(dir.longitud)
                    );
                    console.log('Calculando distancia para:', {
                        direccion: dir,
                        distancia: distance
                    });
                    return {
                        idDireccion: dir.iddireccion,
                        distance,
                        direccion: {
                            ...dir,
                            distancia: distance
                        }
                    };
                })
                .filter((loc: NearbyLocation) => {
                    const withinRange = loc.distance <= maxDistance;
                    console.log('Evaluando distancia:', {
                        ubicacion: loc,
                        dentroDelRango: withinRange
                    });
                    return withinRange;
                })
                .sort((a: NearbyLocation, b: NearbyLocation) => a.distance - b.distance);

            console.log('Ubicaciones cercanas encontradas:', nearbyLocations);

            // 3. Obtener las InfoCasas correspondientes de MongoDB
            const infoCasasPromises = nearbyLocations.map(async location => {
                console.log('Buscando InfoCasas para dirección:', location.idDireccion);
                
                // Probar primero buscando todo
                console.log('Obteniendo todas las InfoCasas...');
                const allQuery = JSON.stringify({});
                const allInfoCasas = await this.dataManager.query('MongoDB', allQuery, ['InfoCasa']);
                console.log('Todas las InfoCasas:', allInfoCasas);
                
                // Luego hacer la búsqueda específica
                const query = JSON.stringify({
                    idDireccion: Number(location.idDireccion)
                });
                const infoCasas = await this.dataManager.query('MongoDB', query, ['InfoCasa']);
                console.log('InfoCasas específicas encontradas:', infoCasas);
                
                return {
                    ...location,
                    direccion: {
                        ...location.direccion,
                        distancia: location.distance
                    },
                    infoCasas
                };
            });

            const results = await Promise.all(infoCasasPromises);
            console.log('Resultados finales antes del filtro:', results);
            
            // 4. Filtrar solo las ubicaciones que tienen InfoCasas asociadas
            const filteredResults = results.filter(result => result.infoCasas && result.infoCasas.length > 0);
            console.log('Resultados finales después del filtro:', filteredResults);
            
            return filteredResults;
        } catch (error) {
            console.error('Error detallado en findNearbyLocations:', error);
            throw new Error('Could not find nearby locations');
        }
    }
}