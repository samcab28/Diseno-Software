// src/api/healthCheck/databaseHealthCheckRouter.ts

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { PostgreSQLRepository } from "../data/repositories/postgreSQLRepository";
import { dbConfig } from "../../config/database";

export const databaseHealthCheckRegistry = new OpenAPIRegistry();
export const databaseHealthCheckRouter: Router = express.Router();

const postgresRepository = PostgreSQLRepository.getInstance(dbConfig);

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