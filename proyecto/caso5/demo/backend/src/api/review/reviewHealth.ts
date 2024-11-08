// src/api/review/reviewHealth.ts
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { reviewController } from "../../index";

export const reviewHealthRegistry = new OpenAPIRegistry();
export const reviewHealthRouter: Router = express.Router();

reviewHealthRegistry.registerPath({
  method: "get",
  path: "/reviews/health",
  tags: ["Review Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    data: z.array(z.unknown()).optional(),
    message: z.string().optional()
  }), "Success"),
});

reviewHealthRouter.get("/", async (req: Request, res: Response) => {
    console.log("Review health check route accessed");
    
    const customRes = {
        status: (code: number) => ({
            json: (data: any) => {
                const serviceResponse = ServiceResponse.success("Review system is healthy", { 
                    status: "OK", 
                    ...data
                });
                return handleServiceResponse(serviceResponse, res);
            }
        }),
    };

    try {
        // Verificamos el sistema de reviews obteniendo las reviews de un usuario de prueba
        await reviewController.getReviewsByUserId(
            Object.assign(req, { params: { userId: '1' } }) as Request,
            customRes as any
        );
    } catch (error) {
        console.error('Review health check failed:', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        const serviceResponse = ServiceResponse.failure(
            "Review system check failed", 
            { status: "Error", message: errorMessage }
        );
        return handleServiceResponse(serviceResponse, res);
    }
});

export default reviewHealthRouter;