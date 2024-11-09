// index.ts
import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import { DataManager } from "./api/data/services/dataManager";
import { dbConfig, mongoConfig } from "./config/database";

// usuarios
import { UserService } from "./api/user/userService";
import { UserController } from "./api/user/userController";

// infocasa
import { InfoCasaService } from "./api/infoCasa/infoCasaService";
import { InfoCasaController } from "./api/infoCasa/infoCasaController";

// solicitudes de cuido
import { PostService } from "./api/post/postService";
import { PostController } from "./api/post/postController";
import mongoose from 'mongoose';

//location
import { LocationController } from "./api/location/locationController"

//AI
import { AIController } from "./api/artificial_intelligence/aiController";

// Inicialización del DataManager
export const dataManager = new DataManager();
dataManager.registerRepository("PostgreSQL", dbConfig);
dataManager.registerRepository("MongoDB", mongoConfig);

// Inicialización de servicios
export const userService = new UserService(dataManager);
export const infoCasaService = new InfoCasaService(dataManager);
export const postService = new PostService(dataManager);

// Inicialización de controladores
export const userController = new UserController(userService);
export const infoCasaController = new InfoCasaController(infoCasaService);
export const postController = new PostController(postService);
export const locationControler = new LocationController();
export const aiController = new AIController();

// Inicialización del servidor
const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

// Manejo de cierre del servidor
const onCloseSignal = async () => {
  logger.info("sigint received, shutting down");
  await mongoose.disconnect(); // Aseguramos la desconexión de MongoDB Atlas
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

// Conexión a MongoDB Atlas y otras bases de datos
async function connectDatabases() {
  try {
    console.log("Conectando a MongoDB Atlas...");
    await mongoose.connect(mongoConfig.uri, {
      ...mongoConfig.options,
      w: 'majority' as const
    });
    await dataManager.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
}

// Iniciar conexión a las bases de datos
connectDatabases();

// Manejo de desconexión
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  await dataManager.disconnect();
  process.exit(0);
});

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);