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
}
