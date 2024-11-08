import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { databaseHealthCheckRouter } from "@/api/data/databaseHealtCheck";

//routers
import { userRouter } from "@/api/user/userRouter";
import { infoCasaRouter } from "@/api/infoCasa/infoCasaRouter";
import { postRouter } from "@/api/post/postRouter";
import { locationRouter } from "./api/location/locationRouter";
import { reviewRouter } from "./api/review/reviewRouter";

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use("/database-health", databaseHealthCheckRouter);
app.use("/info-casas", infoCasaRouter);
app.use("/posts", postRouter);
app.use("/location", locationRouter);
app.use("/reviews", reviewRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
