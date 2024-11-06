import { PoolConfig } from 'pg';

export const dbConfig: PoolConfig = {
    host: 'design-databases-postgresql',  // nombre del servicio Kubernetes
    port: 5432,                           // puerto del servicio (interno)
    user: 'postgres',
    password: 'VxdL2i7b3d',
    database: 'datos'
};
