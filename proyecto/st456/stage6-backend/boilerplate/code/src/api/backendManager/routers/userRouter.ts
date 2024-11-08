// src/api/backendManager/routers/userRouter.ts

import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { DataManager } from "../../data/services/dataManager";
import { PostgreSQLRepository } from "../../data/repositories/postgreSQLRepository";
import { dbConfig } from "../../../config/database";

const postgresRepository = PostgreSQLRepository.getInstance(dbConfig);
const dataManager = new DataManager(postgresRepository);
const userService = new UserService(dataManager);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.get("/", (req, res) => userController.getUsers(req, res));

export { userRouter };