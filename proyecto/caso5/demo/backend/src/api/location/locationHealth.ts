// src/api/location/locationHealth.ts
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { locationControler } from "../../index";

export const locationHealthRegistry = new OpenAPIRegistry();
export const locationHealthRouter: Router = express.Router();

// Definir los esquemas para las respuestas
locationHealthRegistry.registerPath({
  method: "get",
  path: "/location/health",
  tags: ["Location Health Check"],
  responses: createApiResponse(z.object({
    status: z.string(),
    data: z.object({
      nearbyLocations: z.array(z.any()).optional(),
      testCoordinates: z.object({
        latitude: z.number(),
        longitude: z.number()
      })
    }).optional(),
    message: z.string().optional()
  }), "Success"),
});

// Endpoint para health check
locationHealthRouter.get("/", async (_req: Request, res: Response) => {
    console.log("Location health check route accessed");
    
    try {
        // Usar coordenadas de prueba (Escazú centro)
        const testLocation = {
            latitude: 9.9271,
            longitude: -84.1366
        };

        // Crear un mock request para probar el controlador
        const mockRequest = {
            query: {
                latitude: testLocation.latitude.toString(),
                longitude: testLocation.longitude.toString(),
                maxDistance: "5"
            }
        } as unknown as Request;

        // Crear un mock response que capture la respuesta
        let capturedResponse: any = null;
        const mockResponse = {
            status: (code: number) => ({
                json: (data: any) => {
                    capturedResponse = data;
                    return mockResponse;
                }
            })
        } as Response;

        // Llamar al controlador con los mocks
        await locationControler.findNearbyLocations(mockRequest, mockResponse);

        // Construir la respuesta del health check
        const serviceResponse = ServiceResponse.success(
            "Location system is healthy", 
            {
                testCoordinates: testLocation,
                nearbyLocations: capturedResponse?.data || []
            }
        );
        
        return handleServiceResponse(serviceResponse, res);
    } catch (error) {
        console.error('Location health check failed:', error);
        
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        const serviceResponse = ServiceResponse.failure(
            "Location system check failed", 
            { status: "Error", message: errorMessage }
        );
        return handleServiceResponse(serviceResponse, res);
    }
});

// Registro del endpoint principal de búsqueda por ubicación
locationHealthRegistry.registerPath({
  method: "get",
  path: "/location/nearby",
  tags: ["Location"],
  parameters: [
    {
      name: "latitude",
      in: "query",
      required: true,
      schema: { type: "number" },
    },
    {
      name: "longitude",
      in: "query",
      required: true,
      schema: { type: "number" },
    },
    {
      name: "maxDistance",
      in: "query",
      required: false,
      schema: { type: "number", default: 10 },
    },
  ],
  responses: createApiResponse(
    z.object({
      status: z.string(),
      data: z.array(
        z.object({
          distance: z.number(),
          direccion: z.any(),
          infoCasas: z.array(z.any())
        })
      )
    }),
    "Success"
  ),
});

export default locationHealthRouter;