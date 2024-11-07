import { PoolConfig } from 'pg';

export const dbConfig: PoolConfig = {
    host: 'localhost',  // nombre del servicio Kubernetes
    port: 30200,                           // puerto del servicio (interno)
    user: 'postgres',
    password: 'trGSuqleh9',
    database: 'datos'
};

export const mongoConfig = {
    uri: 'mongodb://localhost:27017/datos', 
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};