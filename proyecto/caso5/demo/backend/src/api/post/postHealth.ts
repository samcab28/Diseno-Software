// src/api/post/postHealth.ts
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { postController } from "../../index";

export const postHealthRegistry = new OpenAPIRegistry();
export const postHealthRouter: Router = express.Router();

postHealthRegistry.registerPath({
  method: "get",
  path: "/posts",
  tags: ["Post Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    data: z.array(z.unknown()).optional(),
    message: z.string().optional()
  }), "Success"),
});

postHealthRouter.get("/", async (req: Request, res: Response) => {
    console.log("Post health check route accessed");
    
    const customRes = {
        status: (code: number) => ({
            json: (data: any) => {
                const serviceResponse = ServiceResponse.success("Post system is healthy", { 
                    status: "OK", 
                    ...data
                });
                return handleServiceResponse(serviceResponse, res);
            }
        }),
    };

    try {
        await postController.getPosts(req, customRes as any);
    } catch (error) {
        console.error('Post health check failed:', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        const serviceResponse = ServiceResponse.failure("Post system check failed", { status: "Error", message: errorMessage });
        return handleServiceResponse(serviceResponse, res);
    }
});

export default postHealthRouter;