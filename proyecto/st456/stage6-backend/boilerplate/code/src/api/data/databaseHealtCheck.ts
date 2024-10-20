import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { PostgreSQLRepository } from "./repositories/postgreSQLRepository";

export const databaseHealthCheckRegistry = new OpenAPIRegistry();
export const databaseHealthCheckRouter: Router = express.Router();

const postgresRepository = new PostgreSQLRepository({
  host: 'localhost',
  port: 30200,
  user: 'postgres',
  password: 'JFgEfCkTf0',
  database: 'minchapp'
});

// Conectar a la base de datos al inicio de la aplicación
postgresRepository.connect()
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Failed to connect to database", error));

// Asegurar que la conexión se cierre cuando la aplicación se detenga
process.on('SIGINT', async () => {
  await postgresRepository.disconnect();
  process.exit(0);
});

databaseHealthCheckRegistry.registerPath({
  method: "get",
  path: "/database-health",
  tags: ["Database Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    message: z.string()
  }), "Success"),
});

databaseHealthCheckRouter.get("/", async (_req: Request, res: Response) => {
    console.log("Database health check route accessed");
    try {
        const result = await postgresRepository.query('SELECT NOW() as current_time');
        const currentTime = result[0].current_time;
        const serviceResponse = ServiceResponse.success("Database connection is healthy", { 
            status: "OK", 
            message: `Successfully connected to the database. Current database time: ${currentTime}` 
        });
        return handleServiceResponse(serviceResponse, res);
    } catch (error) {
        console.error('Database health check failed:', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        const serviceResponse = ServiceResponse.failure("Database connection failed", { status: "Error", message: errorMessage });
        return handleServiceResponse(serviceResponse, res);
    }
});