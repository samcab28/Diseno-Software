// src/api/infoCasa/infoCasaHealth.ts
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { infoCasaController } from "../../index";

export const infoCasaHealthRegistry = new OpenAPIRegistry();
export const infoCasaHealthRouter: Router = express.Router();

infoCasaHealthRegistry.registerPath({
  method: "get",
  path: "/info-casas",
  tags: ["InfoCasa Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    data: z.array(z.unknown()).optional(),
    message: z.string().optional()
  }), "Success"),
});

infoCasaHealthRouter.get("/", async (req: Request, res: Response) => {
    console.log("InfoCasa health check route accessed");
    
    const customRes = {
        status: (code: number) => ({
            json: (data: any) => {
                const serviceResponse = ServiceResponse.success("InfoCasa system is healthy", { 
                    status: "OK", 
                    ...data
                });
                return handleServiceResponse(serviceResponse, res);
            }
        }),
    };

    try {
        await infoCasaController.getInfoCasas(req, customRes as any);
    } catch (error) {
        console.error('InfoCasa health check failed:', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        const serviceResponse = ServiceResponse.failure("InfoCasa system check failed", { status: "Error", message: errorMessage });
        return handleServiceResponse(serviceResponse, res);
    }
});

export default infoCasaHealthRouter;