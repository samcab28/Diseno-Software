// src/api/healthCheck/userHealthCheckRouter.ts

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { PostgreSQLRepository } from "../data/repositories/postgreSQLRepository";
import { dbConfig } from "../../config/database";
import { DataManager } from "../../api/data/services/dataManager";
import { UserService } from "../backendManager/services/userService";
import { UserController } from "../backendManager/controllers/userController";

export const userHealthCheckRegistry = new OpenAPIRegistry();
export const userHealthCheckRouter: Router = express.Router();

// Recreate the exact same setup as in userRouter.ts
const postgresRepository = PostgreSQLRepository.getInstance(dbConfig);
const dataManager = new DataManager(postgresRepository);
const userService = new UserService(dataManager);
const userController = new UserController(userService);

userHealthCheckRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    data: z.array(z.unknown()).optional(),
    message: z.string().optional()
  }), "Success"),
});

userHealthCheckRouter.get("/", async (req: Request, res: Response) => {
    console.log("User health check route accessed");
    
    // Create a custom response object that mimics Express.Response
    const customRes = {
        status: (code: number) => ({
            json: (data: any) => {
                const serviceResponse = ServiceResponse.success("User system is healthy", { 
                    status: "OK", 
                    ...data
                });
                return handleServiceResponse(serviceResponse, res);
            }
        }),
        // Add other methods if necessary
    };

    try {
        // Call the controller method directly, just like in the main route
        await userController.getUsers(req, customRes as any);
    } catch (error) {
        console.error('User health check failed:', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        const serviceResponse = ServiceResponse.failure("User system check failed", { status: "Error", message: errorMessage });
        return handleServiceResponse(serviceResponse, res);
    }
});

export default userHealthCheckRouter;