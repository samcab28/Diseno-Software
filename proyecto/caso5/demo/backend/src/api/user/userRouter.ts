// src/api/backendManager/routers/userRouter.ts
import { Router } from "express";
import { userController } from "../../index";

const userRouter = Router();

// Rutas definidas
userRouter.get("/", (req, res) => userController.getUsers(req, res));
userRouter.get("/favorites/:userID", (req, res) => userController.getFavoritesByUserID(req, res));
userRouter.post("/", (req, res) => userController.createUser(req, res));
userRouter.post("/favorites", (req, res) => userController.addFavorite(req, res));
userRouter.put("/favorites/:userID/:cuidadorID", (req, res) => userController.deleteFavorite(req, res));
userRouter.post("/search-additional-services", (req, res) => userController.searchAdditionalServices(req, res));

export { userRouter }; 