// src/api-docs/openAPIDocumentGenerator.ts

import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";
import { userHealthCheckRegistry } from "@/api/user/userHealth";
import { databaseHealthCheckRegistry } from "@/api/data/databaseHealtCheck";
import { infoCasaHealthRegistry } from "@/api/infoCasa/infoCasaHealth";
import { postHealthRegistry } from "@/api/post/postHealth";
import { locationHealthCheckRegistry } from "@/api/location/locationHealth";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userHealthCheckRegistry,
    databaseHealthCheckRegistry,
    infoCasaHealthRegistry,
    postHealthRegistry,
    locationHealthCheckRegistry
  ]);
  
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}