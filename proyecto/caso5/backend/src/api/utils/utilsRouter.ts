// src/api/backendManager/routers/userRouter.ts
import { Router } from "express";
import { utilsControler } from "../../index";

const utilsRouter = Router();

utilsRouter.get("/location", (req, res) => utilsControler.getLocation(req, res));

export { utilsRouter };