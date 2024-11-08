// src/api/backendManager/routers/userRouter.ts
import { Router } from "express";
import { userController } from "../../index";

const userRouter = Router();

userRouter.get("/", (req, res) => userController.getUsers(req, res));
userRouter.post("/", (req, res) => userController.createUser(req, res));

export { userRouter };