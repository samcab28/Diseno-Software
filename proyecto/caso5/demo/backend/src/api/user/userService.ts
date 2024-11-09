import { DataManager } from '../data/services/dataManager';
import { User } from './userModel';

export class UserService {
    private dataManager: DataManager;

    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }

    public async getAllUsers(): Promise<User[]> {
        try {
            const usersData = await this.dataManager.query('PostgreSQL', 'SELECT * FROM usuarios');
            return usersData.map((userData: any) => new User(userData));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Could not fetch users');
        }
    }

    public async createUser(userData: any): Promise<User> {
        try {
            const newUser = new User(userData);
            const result = await this.dataManager.execute(
                'PostgreSQL',
                `INSERT INTO usuarios (nombre, apellido1, apellido2, fechaNacimiento, urlImagenPerfil, telefono, email, contrasena, idDireccion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                [
                    newUser.nombre,
                    newUser.apellido1,
                    newUser.apellido2,
                    newUser.fechaNacimiento,
                    newUser.urlImagenPerfil,
                    newUser.telefono,
                    newUser.email,
                    newUser.contrasena,
                    newUser.idDireccion,
                ]
            );
            return new User(result.rows[0]);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Could not create user');
        }
    }

    public async addFavorite(userID: number, cuidadorID: number): Promise<any> {
        try {
            // Verifica si ya existe la relación
            const existingFavorite = await this.dataManager.execute(
                'PostgreSQL',
                `SELECT * FROM Favoritos WHERE idUsuario = $1 AND idCuidador = $2`,
                [userID, cuidadorID]
            );
    
            if (existingFavorite.rows.length > 0) {
                // Si existe y está marcado como deleted, actualiza a deleted = false
                if (existingFavorite.rows[0].deleted === true) {
                    const result = await this.dataManager.execute(
                        'PostgreSQL',
                        `UPDATE Favoritos SET deleted = FALSE WHERE idUsuario = $1 AND idCuidador = $2 RETURNING *`,
                        [userID, cuidadorID]
                    );
                    return result.rows[0]; // Devuelve la fila actualizada
                } else {
                    // Si la relación ya existe y no está borrada, devuelve un mensaje
                    return { message: 'La relación ya existe y no está marcada como eliminada' };
                }
            } else {
                // Si no existe, inserta un nuevo registro
                const result = await this.dataManager.execute(
                    'PostgreSQL',
                    `INSERT INTO Favoritos (idUsuario, idCuidador) VALUES ($1, $2) RETURNING *`,
                    [userID, cuidadorID]
                );
                return result.rows[0]; // Devuelve la nueva fila insertada
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw new Error('Could not add favorite');
        }
    }    

    public async getFavoritesByUserID(userID: number): Promise<any[]> {
        try {
            // Ejecuta la consulta para obtener los favoritos por idUsuario
            const result = await this.dataManager.execute(
                'PostgreSQL',
                `SELECT * FROM Favoritos WHERE idUsuario = $1 AND deleted = FALSE`,
                [userID]
            );
    
            return result.rows; // Devuelve las filas encontradas
        } catch (error) {
            console.error('Error fetching favorites by userID:', error);
            throw new Error('Could not fetch favorites');
        }
    }

    public async deleteFavorite(userID: number, cuidadorID: number): Promise<void> {
        try {
            // Actualiza el registro para marcarlo como eliminado
            const result = await this.dataManager.execute(
                'PostgreSQL',
                `UPDATE Favoritos SET deleted = TRUE WHERE idUsuario = $1 AND idCuidador = $2`,
                [userID, cuidadorID]
            );
    
            if (result.rowCount === 0) {
                throw new Error('Favorite not found or already deleted');
            }
    
            console.log('Favorite marked as deleted successfully');
        } catch (error) {
            console.error('Error deleting favorite:', error);
            throw new Error('Could not delete favorite');
        }
    }

    public async searchAdditionalServices(keywords: string[]): Promise<User[]> {
        const placeholders = keywords.map((_, i) => `$${i + 1}`).join(' OR descripcion ILIKE ');
        const query = `
            SELECT u.*
            FROM Usuarios u
            JOIN ServiciosAdicionales sa ON u.idUsuario = sa.idUsuario
            WHERE sa.deleted = FALSE AND (
                sa.descripcion ILIKE ${placeholders}
            )
            GROUP BY u.idUsuario
            ORDER BY COUNT(sa.idServicio) DESC;
        `;
    
        try {
            const result = await this.dataManager.execute('PostgreSQL', query, keywords.map(k => `%${k}%`));
            return result.rows.map((row: any) => new User(row));
        } catch (error) {
            console.error('Error searching additional services:', error);
            throw new Error('Could not search additional services');
        }
    }
    

    public async searchAdditionalServices(keywords: string[]): Promise<User[]> {
        const placeholders = keywords.map((_, i) => `$${i + 1}`).join(' OR descripcion ILIKE ');
        const query = `
            SELECT u.*
            FROM Usuarios u
            JOIN ServiciosAdicionales sa ON u.idUsuario = sa.idUsuario
            WHERE sa.deleted = FALSE AND (
                sa.descripcion ILIKE ${placeholders}
            )
            GROUP BY u.idUsuario
            ORDER BY COUNT(sa.idServicio) DESC;
        `;
    
        try {
            const result = await this.dataManager.execute('PostgreSQL', query, keywords.map(k => `%${k}%`));
            return result.rows.map((row: any) => new User(row));
        } catch (error) {
            console.error('Error searching additional services:', error);
            throw new Error('Could not search additional services');
        }
    }
    
    
}
