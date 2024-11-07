// index.ts
import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import { DataManager } from "./api/data/services/dataManager";
import { dbConfig } from "./config/database";
import { UserService } from "./api/user/userService";
import { UserController } from "./api/user/userController";

// Inicialización del DataManager
export const dataManager = new DataManager();
dataManager.registerRepository("PostgreSQL", dbConfig);

// Inicialización de servicios
export const userService = new UserService(dataManager);

// Inicialización de controladores
export const userController = new UserController(userService);

// Inicialización del servidor
const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

// Manejo de cierre del servidor
const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

// Conexión a la base de datos
dataManager.connect()
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Failed to connect to database", error));

// Manejo de desconexión
process.on('SIGINT', async () => {
  await dataManager.disconnect();
  process.exit(0);
});

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);