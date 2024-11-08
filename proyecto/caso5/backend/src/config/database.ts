import { PoolConfig } from 'pg';

export const dbConfig: PoolConfig = {
    host: 'localhost',  // nombre del servicio Kubernetes
    port: 30200,                           // puerto del servicio (interno)
    user: 'postgres',
    password: 'trGSuqleh9',
    database: 'datos'
};

export const mongoConfig = {
    uri: process.env.MONGODB_URI || 'mongodb+srv://MinchappUser:4J7ElmUdrtlyQPKA@clusterminchapp.hqy9u.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMinchapp',
    options: {
        // Removemos las opciones deprecadas
        retryWrites: true,
        w: 'majority'
    }
};