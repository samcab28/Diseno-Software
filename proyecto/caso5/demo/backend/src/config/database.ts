import { PoolConfig } from 'pg';

export const dbConfig: PoolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'eG4clXnlGm',
    database: process.env.DB_NAME || 'datos'
};

export const mongoConfig = {
    uri: process.env.MONGODB_URI || 'mongodb+srv://MinchappUser:4J7ElmUdrtlyQPKA@clusterminchapp.hqy9u.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMinchapp',
    options: {
        retryWrites: true,
        w: 'majority'
    }
};