import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { locationControler } from "../../index";

export const locationHealthCheckRegistry = new OpenAPIRegistry();
export const locationHealthCheckRouter: Router = express.Router();

locationHealthCheckRegistry.registerPath({
  method: "get",
  path: "/location",
  tags: ["Location Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    data: z.object({
      ip: z.string(),
      // Puedes agregar más campos específicos de la respuesta de ubicación si lo deseas
    }).optional(),
    message: z.string().optional()
  }), "Success"),
});

locationHealthCheckRouter.get("/", async (req: Request, res: Response) => {
    console.log("Location health check route accessed");
    
    const customRes = {
        status: (code: number) => ({
            json: (data: any) => {
                const serviceResponse = ServiceResponse.success("Location system is healthy", { 
                    status: "OK", 
                    ...data
                });
                return handleServiceResponse(serviceResponse, res);
            }
        }),
    };

    try {
        // Usamos locationController para verificar si el servicio de ubicación está funcionando
        await locationControler.getLocation(req, customRes as any);
    } catch (error) {
        console.error('Location health check failed:', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        const serviceResponse = ServiceResponse.failure("Location system check failed", { 
            status: "Error", 
            message: errorMessage 
        });
        return handleServiceResponse(serviceResponse, res);
    }
});

export default locationHealthCheckRouter;