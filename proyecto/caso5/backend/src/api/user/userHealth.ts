// src/api/healthCheck/userHealthCheckRouter.ts

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { userController } from "../../index";  // Importamos la instancia existente

export const userHealthCheckRegistry = new OpenAPIRegistry();
export const userHealthCheckRouter: Router = express.Router();

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
    };

    try {
        // Usamos userController directamente sin crear una nueva instancia
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
