import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";

import { PostgreSQLRepository } from "./api/data/repositories/postgreSQLRepository";
import { dbConfig } from "./config/database";

const postgresRepository = PostgreSQLRepository.getInstance(dbConfig);

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

// Connect to the database when the application starts
postgresRepository.connect()
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Failed to connect to database", error));

// Ensure the connection is closed when the application stops
process.on('SIGINT', async () => {
  await postgresRepository.disconnect();
  process.exit(0);
});

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
